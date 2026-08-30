import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const showDetails = process.argv.includes('--details');

const moduleCache = new Map();
function loadTypeScript(relativePath) {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  if (moduleCache.has(normalizedPath)) return moduleCache.get(normalizedPath);
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  moduleCache.set(normalizedPath, module.exports);
  const localRequire = (specifier) => {
    if (!specifier.startsWith('.')) return {};
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(normalizedPath), `${specifier}.ts`));
    return loadTypeScript(resolved);
  };
  new Function('exports', 'module', 'require', output)(module.exports, module, localRequire);
  moduleCache.set(normalizedPath, module.exports);
  return module.exports;
}

const modules = {
  catalog: loadTypeScript('lib/course-catalog.ts'),
  scaffold: loadTypeScript('lib/phase-one-courses.ts'),
  falling: loadTypeScript('lib/falling-object-course.ts'),
  equipment: loadTypeScript('lib/equipment-course.ts'),
  machine: loadTypeScript('lib/man-machine-course.ts'),
  a: loadTypeScript('lib/final-courses-a.ts'),
  b: loadTypeScript('lib/final-courses-b.ts'),
  c: loadTypeScript('lib/final-courses-c.ts'),
  extra: loadTypeScript('lib/additional-courses.ts'),
};

const pageSource = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const workingAtHeightKeys = [...pageSource.slice(pageSource.indexOf('const course ='), pageSource.indexOf('export default function Home')).matchAll(/correct:\s*(\d)/g)].map((match) => Number(match[1]));
if (workingAtHeightKeys.length !== 20) throw new Error(`Expected 20 localized Working at Height keys, found ${workingAtHeightKeys.length}.`);
for (let offset = 5; offset < workingAtHeightKeys.length; offset += 5) {
  if (workingAtHeightKeys.slice(offset, offset + 5).join() !== workingAtHeightKeys.slice(0, 5).join()) throw new Error('Working at Height translations do not share one answer key.');
}

const courses = {
  'WAH-001': { en: { quiz: workingAtHeightKeys.slice(0, 5).map((correct) => ({ a: ['', '', '', ''], correct })) } },
  'CSP-002': modules.catalog.confinedSpaceCourse,
  'SCA-003': modules.scaffold.scaffoldCourse,
  'FOP-004': modules.falling.fallingObjectCourse,
  'HEM-005': modules.equipment.equipmentCourse,
  'MMI-006': modules.machine.manMachineCourse,
  'RIG-007': modules.a.riggingCourse,
  'SIG-008': modules.a.signalCourse,
  'FIR-009': modules.b.fireCourse,
  'HSK-010': modules.b.housekeepingCourse,
  'EXC-011': modules.b.excavationCourse,
  'ELC-012': modules.b.electricalCourse,
  'LOTO-013': modules.b.lotoCourse,
  'PPE-014': modules.c.ppeCourse,
  'HPT-015': modules.c.toolsCourse,
  'HAZ-016': modules.c.hazcomCourse,
  'EMR-017': modules.c.emergencyCourse,
  'STM-018': modules.extra.materialStorageCourse,
  'PTW-019': modules.extra.permitToWorkCourse,
  'BAR-020': modules.extra.barriersSignsCourse,
  'FLO-021': modules.extra.floorOpeningCourse,
  'TBT-022': modules.extra.toolboxTalkCourse,
  'MHL-023': modules.extra.manualHandlingCourse,
};

const backendSource = fs.readFileSync(path.join(root, 'apps-script/Code.gs'), 'utf8');
const backendKeys = Object.fromEntries([...backendSource.matchAll(/'([A-Z]{3,4}-\d{3})':\s*\[([^\]]+)\]/g)].map((match) => [match[1], match[2].split(',').map((value) => Number(value.trim()))]));
const titleMapSource = backendSource.slice(backendSource.indexOf('const ENGLISH_COURSE_TITLES = {'), backendSource.indexOf('\n};', backendSource.indexOf('const ENGLISH_COURSE_TITLES = {')));
const backendEnglishTitles = Object.fromEntries([...titleMapSource.matchAll(/'([A-Z]{3,4}-\d{3})':\s*'([^']+)'/g)].map((match) => [match[1], match[2]]));
const seenQuestions = new Map();
const seenAnswerSets = new Map();
const genericQuestionFragments = ['what must control the work', 'who verifies changing conditions', 'may a site rule be more protective'];
const normalize = (value) => String(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

for (const [courseId, localized] of Object.entries(courses)) {
  const catalogTitle = modules.catalog.courseCatalog.find((course) => course.id === courseId)?.titles.en;
  if (!catalogTitle || backendEnglishTitles[courseId] !== catalogTitle) throw new Error(`${courseId} certificate title does not match the English course catalog title.`);
  const englishKey = localized.en.quiz.map((question) => question.correct);
  if (englishKey.length !== 5) throw new Error(`${courseId} has ${englishKey.length} questions; expected 5.`);
  for (const [language, lesson] of Object.entries(localized)) {
    const key = lesson.quiz.map((question) => question.correct);
    if (key.join() !== englishKey.join()) throw new Error(`${courseId} ${language} key ${key} differs from English ${englishKey}.`);
    lesson.quiz.forEach((question, index) => {
      if (question.a.length !== 4) throw new Error(`${courseId} ${language} question ${index + 1} does not have four options.`);
      if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct >= question.a.length) throw new Error(`${courseId} ${language} question ${index + 1} has invalid answer index ${question.correct}.`);
      if (question.a.some(Boolean) && new Set(question.a.map(normalize)).size !== question.a.length) throw new Error(`${courseId} ${language} question ${index + 1} contains duplicate answer choices.`);
    });
  }
  localized.en.quiz.forEach((question, index) => {
    if (!question.q) return;
    const normalizedQuestion = normalize(question.q);
    if (genericQuestionFragments.some((fragment) => normalizedQuestion.includes(fragment))) throw new Error(`${courseId} question ${index + 1} still uses a generic shared assessment prompt.`);
    const previousQuestion = seenQuestions.get(normalizedQuestion);
    if (previousQuestion && previousQuestion !== courseId) throw new Error(`${courseId} duplicates a question used by ${previousQuestion}: ${question.q}`);
    seenQuestions.set(normalizedQuestion, courseId);
    const normalizedAnswers = question.a.map(normalize).sort().join('|');
    const previousAnswers = seenAnswerSets.get(normalizedAnswers);
    if (previousAnswers && previousAnswers !== courseId) throw new Error(`${courseId} duplicates a complete answer set used by ${previousAnswers}: ${question.q}`);
    seenAnswerSets.set(normalizedAnswers, courseId);
  });
  const backendKey = backendKeys[courseId];
  if (!backendKey) throw new Error(`${courseId} is missing from the Apps Script grader.`);
  if (backendKey.join() !== englishKey.join()) throw new Error(`${courseId} website key ${englishKey} differs from backend key ${backendKey}.`);
  console.log(`${courseId}: ${englishKey.map((index) => String.fromCharCode(65 + index)).join(', ')}`);
  if (showDetails && courseId !== 'WAH-001') {
    localized.en.quiz.forEach((question, index) => console.log(`  ${index + 1}. ${question.q}\n     ${String.fromCharCode(65 + question.correct)}. ${question.a[question.correct]}`));
  }
}

console.log(`Answer-key consistency passed for ${Object.keys(courses).length} courses and ${Object.keys(courses).length * 5} questions.`);

