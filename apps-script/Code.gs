const SETTINGS = {
  spreadsheetId: '1sA5iKlPIIdQHShS6q6NZ2dGyA3Dg6cDqg-cKZFgyUxU',
  certificateFolderId: '1LUG-fYby0pfIZtDy1SEQwH2unbogP2lE',
  certificateTemplateId: '1p6GiXGadLPCFtxieBygKU5UKafUxnQGQIccpT1F-kaI',
  passPercent: 80,
  maxAttempts: 3,
  lockoutHours: 24,
  timeZone: 'Asia/Riyadh',
  courseOrder: ['WAH-001', 'CSP-002', 'SCA-003', 'FOP-004', 'HEM-005', 'MMI-006', 'RIG-007', 'SIG-008', 'FIR-009', 'HSK-010', 'EXC-011', 'ELC-012', 'LOTO-013', 'PPE-014', 'HPT-015', 'HAZ-016', 'EMR-017'],
};

function doGet() {
  return json_({ ok: true, data: { service: 'TDC HSE Training Records', status: 'ready' } });
}

function doPost(event) {
  const bridge = event && event.parameter && event.parameter.bridge === '1';
  const channel = bridge ? clean_(event.parameter.channel || '', 80) : '';
  try {
    const request = JSON.parse(bridge ? (event.parameter.payload || '{}') : ((event.postData && event.postData.contents) || '{}'));
    const identity = verifyFirebaseToken_(request.idToken);
    let data;
    if (request.action === 'registerLearner') data = registerLearner_(identity, request);
    else if (request.action === 'submitAttempt') data = submitAttempt_(identity, request);
    else if (request.action === 'getProfile') data = getProfile_(identity);
    else throw new Error('Unsupported action.');
    const result = { ok: true, data: data };
    return bridge ? bridge_(channel, result) : json_(result);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    const result = { ok: false, error: String(error && error.message ? error.message : error) };
    return bridge ? bridge_(channel, result) : json_(result);
  }
}

function verifyFirebaseToken_(idToken) {
  if (!idToken) throw new Error('Authentication is required.');
  const apiKey = PropertiesService.getScriptProperties().getProperty('FIREBASE_API_KEY');
  if (!apiKey) throw new Error('FIREBASE_API_KEY is missing from Apps Script properties.');
  const response = UrlFetchApp.fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + encodeURIComponent(apiKey),
    { method: 'post', contentType: 'application/json', payload: JSON.stringify({ idToken: idToken }), muteHttpExceptions: true }
  );
  if (response.getResponseCode() !== 200) throw new Error('Your session has expired. Please sign in again.');
  const user = JSON.parse(response.getContentText()).users[0];
  if (!user || !user.localId || !user.email) throw new Error('The Firebase account is invalid.');
  return { uid: user.localId, email: String(user.email).toLowerCase(), displayName: user.displayName || '' };
}

function registerLearner_(identity, request) {
  const sheet = sheet_('Learners');
  const rows = values_(sheet);
  const now = new Date();
  const index = rows.findIndex(function (row, i) { return i > 0 && row[1] === identity.uid; });
  const fullName = clean_(request.fullName || identity.displayName || 'Learner', 120);
  const language = allowedLanguage_(request.language);
  if (index >= 1) {
    sheet.getRange(index + 1, 3, 1, 6).setValues([[fullName, identity.email, language, 'Active', rows[index][6] || now, now]]);
    return { learnerId: rows[index][0] };
  }
  const learnerId = 'LRN-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  sheet.appendRow([learnerId, identity.uid, fullName, identity.email, language, 'Active', now, now]);
  audit_(identity, 'LEARNER_REGISTERED', '', learnerId, 'Success', language);
  return { learnerId: learnerId };
}

function submitAttempt_(identity, request) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const courseId = clean_(request.courseId, 50);
    const courseTitle = clean_(request.courseTitle, 160);
    const learnerName = clean_(request.learnerName || identity.displayName || 'Learner', 120);
    const idNumber = clean_(request.idNumber || '', 60);
    const language = allowedLanguage_(request.language);
    verifyCourseUnlocked_(identity.uid, courseId);
    const grading = gradeAnswers_(courseId, request.answers);
    const score = grading.scorePercent;
    const correctAnswers = grading.correctAnswers;
    const totalQuestions = grading.totalQuestions;
    if (!courseId || !courseTitle) throw new Error('Course information is incomplete.');

    const now = new Date();
    const previous = courseAttempts_(identity.uid, courseId);
    const state = attemptState_(previous, now);
    if (state.lockoutUntil && now < state.lockoutUntil) {
      throw new Error('Course locked until ' + iso_(state.lockoutUntil) + '.');
    }

    const attemptNumber = state.attemptNumber;
    const passed = score >= SETTINGS.passPercent;
    const lockoutUntil = !passed && attemptNumber >= SETTINGS.maxAttempts
      ? new Date(now.getTime() + SETTINGS.lockoutHours * 60 * 60 * 1000)
      : '';
    const attemptId = 'ATT-' + Utilities.getUuid().slice(0, 10).toUpperCase();
    sheet_('Attempts').appendRow([
      attemptId, identity.uid, learnerName, courseId, courseTitle, attemptNumber,
      request.startedAt ? new Date(request.startedAt) : now, now, score, correctAnswers,
      totalQuestions, passed ? 'Passed' : (lockoutUntil ? 'Locked' : 'Failed'), lockoutUntil, language,
    ]);

    let certificate;
    if (passed) certificate = completeCourse_(identity, {
      learnerName: learnerName,
      idNumber: idNumber,
      courseId: courseId,
      courseTitle: courseTitle,
      language: language,
      score: score,
      completedAt: now,
      oshaReferences: clean_(request.oshaReferences || '', 500),
    });
    audit_(identity, 'ASSESSMENT_SUBMITTED', courseId, attemptId, passed ? 'Passed' : 'Failed', 'Score ' + score + '%');
    return {
      passed: passed,
      attemptNumber: attemptNumber,
      lockoutUntil: lockoutUntil ? iso_(lockoutUntil) : null,
      certificate: certificate || null,
    };
  } finally {
    lock.releaseLock();
  }
}

function verifyCourseUnlocked_(uid, courseId) {
  const index = SETTINGS.courseOrder.indexOf(courseId);
  if (index < 0) throw new Error('This course is not in the approved course sequence.');
  if (index === 0) return;
  const previousCourseId = SETTINGS.courseOrder[index - 1];
  if (!certificateFor_(uid, previousCourseId)) {
    throw new Error('Complete the previous course before taking this assessment.');
  }
}

function completeCourse_(identity, result) {
  const existing = certificateFor_(identity.uid, result.courseId);
  if (existing) return existing;

  const year = Utilities.formatDate(result.completedAt, SETTINGS.timeZone, 'yyyy');
  const serial = nextSerial_(year);
  const certificateId = 'TDC/STA/' + pad_(serial, 3) + '/' + year;
  const fileName = 'TDC-STA-' + pad_(serial, 3) + '-' + year + '.pdf';
  const completionId = 'CMP-' + Utilities.getUuid().slice(0, 10).toUpperCase();
  const folder = DriveApp.getFolderById(SETTINGS.certificateFolderId);
  const template = DriveApp.getFileById(SETTINGS.certificateTemplateId);
  const workingCopy = template.makeCopy('TEMP ' + certificateId.replaceAll('/', '-'), folder);

  try {
    const presentation = SlidesApp.openById(workingCopy.getId());
    const replacements = {
      '{{TRAINEE_NAME}}': result.learnerName,
      '{{ID_NUMBER}}': result.idNumber || 'N/A',
      '{{SCORE_PERCENT}}': String(result.score),
      '{{COURSE_TITLE}}': result.courseTitle,
      '{{COMPLETION_DATE}}': Utilities.formatDate(result.completedAt, SETTINGS.timeZone, 'dd-MM-yyyy'),
      '{{CERTIFICATE_ID}}': certificateId,
      '{{SIGNATORY_TITLE}}': PropertiesService.getScriptProperties().getProperty('SIGNATORY_TITLE') || 'HSE Manager',
      '{{SIGNATORY_NAME}}': PropertiesService.getScriptProperties().getProperty('SIGNATORY_NAME') || 'Authorized Signatory',
    };
    Object.keys(replacements).forEach(function (key) { presentation.replaceAllText(key, replacements[key]); });
    presentation.saveAndClose();
    Utilities.sleep(1000);

    const pdfBlob = workingCopy.getAs(MimeType.PDF).setName(fileName);
    const pdf = folder.createFile(pdfBlob);
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=' + pdf.getId();

    sheet_('Completions').appendRow([
      completionId, certificateId, identity.uid, result.learnerName, identity.email,
      result.courseId, result.courseTitle, result.language, result.score, result.completedAt,
      result.oshaReferences, 'Generated',
    ]);
    sheet_('Certificates').appendRow([
      certificateId, completionId, identity.uid, result.learnerName, result.courseId,
      result.courseTitle, result.completedAt, result.score, fileName, pdf.getId(),
      downloadUrl, new Date(), 'Active',
    ]);
    audit_(identity, 'CERTIFICATE_GENERATED', result.courseId, certificateId, 'Success', fileName);
    return {
      certificateId: certificateId,
      courseTitle: result.courseTitle,
      completionDate: Utilities.formatDate(result.completedAt, SETTINGS.timeZone, 'dd-MM-yyyy'),
      scorePercent: result.score,
      fileName: fileName,
      downloadUrl: downloadUrl,
    };
  } finally {
    workingCopy.setTrashed(true);
  }
}

function getProfile_(identity) {
  const learners = values_(sheet_('Learners'));
  const learner = learners.find(function (row, i) { return i > 0 && row[1] === identity.uid; });
  const certificateRows = values_(sheet_('Certificates')).filter(function (row, i) {
    return i > 0 && row[2] === identity.uid && row[12] === 'Active';
  });
  const certificates = certificateRows.map(function (row) {
    return {
      certificateId: row[0], courseTitle: row[5], completionDate: displayDate_(row[6]),
      scorePercent: Number(row[7]), fileName: row[8], downloadUrl: row[10],
    };
  }).reverse();
  return {
    fullName: learner ? learner[2] : identity.displayName,
    email: identity.email,
    certificates: certificates,
    completedCourseIds: certificateRows.map(function (row) { return row[4]; }).filter(String),
  };
}

function courseAttempts_(uid, courseId) {
  return values_(sheet_('Attempts')).filter(function (row, i) {
    return i > 0 && row[1] === uid && row[3] === courseId;
  }).map(function (row) { return { attempt: Number(row[5]), submittedAt: new Date(row[7]), result: row[11], lockoutUntil: row[12] ? new Date(row[12]) : null }; });
}

function attemptState_(attempts, now) {
  if (!attempts.length) return { attemptNumber: 1, lockoutUntil: null };
  const last = attempts[attempts.length - 1];
  if (last.result === 'Passed') return { attemptNumber: 1, lockoutUntil: null };
  if (last.lockoutUntil && now < last.lockoutUntil) return { attemptNumber: SETTINGS.maxAttempts + 1, lockoutUntil: last.lockoutUntil };
  if (last.lockoutUntil && now >= last.lockoutUntil) return { attemptNumber: 1, lockoutUntil: null };
  return { attemptNumber: Math.min(last.attempt + 1, SETTINGS.maxAttempts), lockoutUntil: null };
}

function certificateFor_(uid, courseId) {
  const rows = values_(sheet_('Certificates'));
  const row = rows.find(function (item, i) { return i > 0 && item[2] === uid && item[4] === courseId && item[12] === 'Active'; });
  if (!row) return null;
  return { certificateId: row[0], courseTitle: row[5], completionDate: displayDate_(row[6]), scorePercent: Number(row[7]), fileName: row[8], downloadUrl: row[10] };
}

function nextSerial_(year) {
  const regex = new RegExp('^TDC/STA/(\\d{3,})/' + year + '$');
  return values_(sheet_('Certificates')).reduce(function (max, row, i) {
    if (i === 0) return max;
    const match = String(row[0] || '').match(regex);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0) + 1;
}

function gradeAnswers_(courseId, answers) {
  const keys = {
    'WAH-001': [1, 2, 0, 3, 1],
    'CSP-002': [1, 2, 0, 3, 1],
    'SCA-003': [1, 0, 3, 1, 2],
  };
  const key = keys[courseId];
  if (!key) throw new Error('No approved answer key exists for this course.');
  if (!Array.isArray(answers) || answers.length !== key.length) throw new Error('All assessment questions must be answered.');
  const correct = answers.reduce(function (total, answer, index) {
    return total + (Number(answer) === key[index] ? 1 : 0);
  }, 0);
  return { correctAnswers: correct, totalQuestions: key.length, scorePercent: Math.round(correct / key.length * 100) };
}

function audit_(identity, action, courseId, recordId, result, details) {
  sheet_('Audit Log').appendRow(['EVT-' + Utilities.getUuid().slice(0, 10).toUpperCase(), new Date(), identity.uid, identity.email, action, courseId, recordId, result, details]);
}

function sheet_(name) {
  const sheet = SpreadsheetApp.openById(SETTINGS.spreadsheetId).getSheetByName(name);
  if (!sheet) throw new Error('Missing sheet: ' + name);
  return sheet;
}

function values_(sheet) { return sheet.getDataRange().getValues(); }
function clean_(value, max) { return String(value || '').replace(/[<>]/g, '').trim().slice(0, max); }
function allowedLanguage_(value) { return ['en', 'ar', 'ur', 'hi'].indexOf(value) >= 0 ? value : 'en'; }
function pad_(value, length) { return String(value).padStart(length, '0'); }
function iso_(date) { return Utilities.formatDate(date, SETTINGS.timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"); }
function displayDate_(date) { return Utilities.formatDate(new Date(date), SETTINGS.timeZone, 'dd-MM-yyyy'); }
function json_(payload) { return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON); }
function bridge_(channel, payload) {
  const safePayload = JSON.stringify(payload).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  const safeChannel = JSON.stringify(channel);
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>parent.postMessage({channel:' + safeChannel + ',payload:' + safePayload + '},"*");<\/script>')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

