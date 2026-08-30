import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const moduleCache = new Map();
function loadTypeScript(relativePath) {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  if (moduleCache.has(normalizedPath)) return moduleCache.get(normalizedPath);
  const source = fs.readFileSync(path.join(root, relativePath), 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const module = { exports: {} };
  moduleCache.set(normalizedPath, module.exports);
  const localRequire = (specifier) => specifier.startsWith('.') ? loadTypeScript(path.posix.normalize(path.posix.join(path.posix.dirname(normalizedPath), `${specifier}.ts`))) : {};
  new Function('exports', 'module', 'require', output)(module.exports, module, localRequire);
  moduleCache.set(normalizedPath, module.exports);
  return module.exports;
}

const modules = {
  catalog: loadTypeScript('lib/course-catalog.ts'), scaffold: loadTypeScript('lib/phase-one-courses.ts'),
  falling: loadTypeScript('lib/falling-object-course.ts'), equipment: loadTypeScript('lib/equipment-course.ts'),
  machine: loadTypeScript('lib/man-machine-course.ts'), a: loadTypeScript('lib/final-courses-a.ts'),
  b: loadTypeScript('lib/final-courses-b.ts'), c: loadTypeScript('lib/final-courses-c.ts'),
  extra: loadTypeScript('lib/additional-courses.ts'),
};

const pageSource = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const courseStart = pageSource.indexOf('const course = ') + 'const course = '.length;
const courseEnd = pageSource.indexOf('export default function Home');
const workingAtHeight = new Function(`return (${pageSource.slice(courseStart, courseEnd).trim().replace(/;\s*$/, '')})`)();

const english = {
  'WAH-001': workingAtHeight.en,
  'CSP-002': modules.catalog.confinedSpaceCourse.en,
  'SCA-003': modules.scaffold.scaffoldCourse.en,
  'FOP-004': modules.falling.fallingObjectCourse.en,
  'HEM-005': modules.equipment.equipmentCourse.en,
  'MMI-006': modules.machine.manMachineCourse.en,
  'RIG-007': modules.a.riggingCourse.en,
  'SIG-008': modules.a.signalCourse.en,
  'FIR-009': modules.b.fireCourse.en,
  'HSK-010': modules.b.housekeepingCourse.en,
  'EXC-011': modules.b.excavationCourse.en,
  'ELC-012': modules.b.electricalCourse.en,
  'LOTO-013': modules.b.lotoCourse.en,
  'PPE-014': modules.c.ppeCourse.en,
  'HPT-015': modules.c.toolsCourse.en,
  'HAZ-016': modules.c.hazcomCourse.en,
  'EMR-017': modules.c.emergencyCourse.en,
  'STM-018': modules.extra.materialStorageCourse.en,
  'PTW-019': modules.extra.permitToWorkCourse.en,
  'BAR-020': modules.extra.barriersSignsCourse.en,
  'FLO-021': modules.extra.floorOpeningCourse.en,
  'TBT-022': modules.extra.toolboxTalkCourse.en,
  'MHL-023': modules.extra.manualHandlingCourse.en,
};

const protectedTerms = ['OSHA','PPE','SDS','LFL','PEL','ROPS','PTW','JSA','FOD','GFCI','NIOSH','CPR','PFAS','MUTCD','TDC'];
function protect(text) {
  let protectedText = text;
  const replacements = [];
  for (const term of protectedTerms) {
    const pattern = new RegExp(`\\b${term}\\b`, 'g');
    protectedText = protectedText.replace(pattern, () => {
      const token = `[[[TDC_TERM_${replacements.length}]]]`;
      replacements.push(term);
      return token;
    });
  }
  return { text: protectedText, restore: (translated) => replacements.reduce((value, term, index) => value.replace(new RegExp(`\\[{2,3}TDC_TERM_${index}\\]{2,3}`, 'g'), term), translated) };
}

async function translateBatch(items) {
  const protectedItems = items.map(protect);
  const markers = protectedItems.slice(1).map((_, index) => `[[[TDC_SPLIT_${String(index + 1).padStart(4, '0')}]]]`);
  const joined = protectedItems.map((item, index) => index ? `${markers[index - 1]}\n${item.text}` : item.text).join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=bn&dt=t&q=${encodeURIComponent(joined)}`;
  let response;
  for (let attempt = 1; attempt <= 4; attempt++) {
    response = await fetch(url);
    if (response.ok) break;
    if (attempt === 4) throw new Error(`Translation failed: ${response.status}`);
    await new Promise((resolve) => setTimeout(resolve, attempt * 800));
  }
  const payload = await response.json();
  const translated = payload[0].map((part) => part[0]).join('');
  const splitPattern = /\[\[\[TDC_SPLIT_\d{4}\]\]\]\s*/g;
  const parts = translated.split(splitPattern);
  if (parts.length !== items.length) throw new Error(`Expected ${items.length} translated strings, received ${parts.length}.`);
  return parts.map((part, index) => protectedItems[index].restore(part.trim()));
}

async function translateStrings(strings) {
  const result = [];
  let batch = [];
  let length = 0;
  for (const value of strings) {
    if (batch.length && length + value.length > 3200) {
      result.push(...await translateBatch(batch));
      batch = []; length = 0;
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    batch.push(value); length += value.length + 32;
  }
  if (batch.length) result.push(...await translateBatch(batch));
  return result;
}

const output = {};
for (const [courseId, source] of Object.entries(english)) {
  const catalog = modules.catalog.courseCatalog.find((item) => item.id === courseId);
  const strings = [catalog.titles.en, ...source.slides.flatMap((slide) => [slide.title, slide.text]), ...source.quiz.flatMap((question) => [question.q, ...question.a])];
  const translated = await translateStrings(strings);
  let cursor = 0;
  const title = translated[cursor++];
  const slides = source.slides.map((slide) => ({ n: slide.n, title: translated[cursor++], text: translated[cursor++], ref: slide.ref }));
  const quiz = source.quiz.map((question) => ({ q: translated[cursor++], a: question.a.map(() => translated[cursor++]), correct: question.correct }));
  if (cursor !== translated.length) throw new Error(`${courseId}: translation cursor mismatch.`);
  output[courseId] = { title, slides, quiz };
  console.log(`${courseId}: ${slides.length} slides, ${quiz.length} questions translated`);
}

const file = `import type { CourseLesson } from './course-catalog';\n\nexport type BanglaCourse = CourseLesson & { title: string };\n\nexport const banglaCourses: Record<string, BanglaCourse> = ${JSON.stringify(output, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'lib/bangla-courses.generated.ts'), file, 'utf8');
console.log(`Wrote lib/bangla-courses.generated.ts with ${Object.keys(output).length} courses.`);

