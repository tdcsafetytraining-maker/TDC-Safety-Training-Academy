import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const showDetails = process.argv.includes('--details');

function loadTypeScript(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const module = { exports: {} };
  new Function('exports', 'module', 'require', output)(module.exports, module, () => ({}));
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
};

const backendSource = fs.readFileSync(path.join(root, 'apps-script/Code.gs'), 'utf8');
const backendKeys = Object.fromEntries([...backendSource.matchAll(/'([A-Z]{3,4}-\d{3})':\s*\[([^\]]+)\]/g)].map((match) => [match[1], match[2].split(',').map((value) => Number(value.trim()))]));
const titleMapSource = backendSource.slice(backendSource.indexOf('const ENGLISH_COURSE_TITLES = {'), backendSource.indexOf('\n};', backendSource.indexOf('const ENGLISH_COURSE_TITLES = {')));
const backendEnglishTitles = Object.fromEntries([...titleMapSource.matchAll(/'([A-Z]{3,4}-\d{3})':\s*'([^']+)'/g)].map((match) => [match[1], match[2]]));

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
    });
  }
  const backendKey = backendKeys[courseId];
  if (!backendKey) throw new Error(`${courseId} is missing from the Apps Script grader.`);
  if (backendKey.join() !== englishKey.join()) throw new Error(`${courseId} website key ${englishKey} differs from backend key ${backendKey}.`);
  console.log(`${courseId}: ${englishKey.map((index) => String.fromCharCode(65 + index)).join(', ')}`);
  if (showDetails && courseId !== 'WAH-001') {
    localized.en.quiz.forEach((question, index) => console.log(`  ${index + 1}. ${question.q}\n     ${String.fromCharCode(65 + question.correct)}. ${question.a[question.correct]}`));
  }
}

console.log(`Answer-key consistency passed for ${Object.keys(courses).length} courses and ${Object.keys(courses).length * 5} questions.`);

