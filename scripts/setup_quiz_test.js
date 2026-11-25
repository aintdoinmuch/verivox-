const fs = require("fs");
const path = require("path");

const quizModulePath = path.join(process.cwd(), "src", "lib", "data", "quiz-questions.ts");
const content = fs.readFileSync(quizModulePath, "utf8");

const testRunnerScript = `
const fs = require("fs");
const { QUIZ_QUESTIONS, QUIZ_CATEGORIES, evaluateQuiz, getPerformanceTier } = require("./.tmp_quiz.js");

console.log("=================================================");
console.log("SUITE 6: AWARENESS QUIZ (24 QUESTIONS) INTEGRITY");
console.log("=================================================");

let passedCount = 0;
let totalTests = 0;

// Test 1: Total Question Count
totalTests++;
console.log("\\nTest 1: Total question count verification...");
if (QUIZ_QUESTIONS.length === 24) {
  console.log("  -> PASS: Exactly 24 questions present.");
  passedCount++;
} else {
  console.error("  -> FAIL: Expected 24 questions, found " + QUIZ_QUESTIONS.length);
}

// Test 2: Category Ranges & Totals
totalTests++;
console.log("\\nTest 2: Category distribution verification...");
const expectedCategories = [
  { id: "cat-1", range: [1, 5], count: 5 },
  { id: "cat-2", range: [6, 10], count: 5 },
  { id: "cat-3", range: [11, 15], count: 5 },
  { id: "cat-4", range: [16, 19], count: 4 },
  { id: "cat-5", range: [20, 24], count: 5 },
];

let categoriesValid = true;
QUIZ_CATEGORIES.forEach((cat, idx) => {
  const expected = expectedCategories[idx];
  const qCount = QUIZ_QUESTIONS.filter(q => q.categoryId === cat.id).length;
  console.log("   * " + cat.title + " (Q" + cat.questionRange[0] + "–" + cat.questionRange[1] + "): " + qCount + " questions");
  if (qCount !== expected.count || cat.questionRange[0] !== expected.range[0] || cat.questionRange[1] !== expected.range[1]) {
    categoriesValid = false;
  }
});

if (categoriesValid) {
  console.log("  -> PASS: All 5 categories match exact official distribution.");
  passedCount++;
} else {
  console.error("  -> FAIL: Category range mismatch.");
}

// Test 3: Four Selectable Options & Non-Empty Explanations for all 24 questions
totalTests++;
console.log("\\nTest 3: Option structure & explanation completeness...");
let allOptionsValid = true;
QUIZ_QUESTIONS.forEach(q => {
  if (!q.options || q.options.length !== 4) allOptionsValid = false;
  if (!["A", "B", "C", "D"].includes(q.correctAnswer)) allOptionsValid = false;
  if (!q.explanation || q.explanation.length < 20) allOptionsValid = false;
  const keys = q.options.map(o => o.key);
  if (keys.join("") !== "ABCD") allOptionsValid = false;
});

if (allOptionsValid) {
  console.log("  -> PASS: All 24 questions have 4 options (A-D) and exhaustive explanations.");
  passedCount++;
} else {
  console.error("  -> FAIL: Incomplete options or missing explanations.");
}

// Test 4: Perfect Score Evaluation (24/24)
totalTests++;
console.log("\\nTest 4: Perfect Score Evaluation (100% correct)...");
const perfectAnswers = {};
QUIZ_QUESTIONS.forEach(q => {
  perfectAnswers[q.id] = q.correctAnswer;
});

const perfectResult = evaluateQuiz(perfectAnswers);
if (
  perfectResult.score === 24 &&
  perfectResult.percentage === 100 &&
  perfectResult.incorrectCount === 0 &&
  perfectResult.tier.level === "Excellent Awareness" &&
  perfectResult.strongCategories.length === 5 &&
  perfectResult.improvementCategories.length === 0
) {
  console.log("  -> PASS: Perfect score evaluated accurately (24/24, 100%, Level: " + perfectResult.tier.level + ").");
  passedCount++;
} else {
  console.error("  -> FAIL in perfect score evaluation:", perfectResult);
}

// Test 5: Partial Score Evaluation (e.g. Cat 1 correct, Cat 2-5 wrong)
totalTests++;
console.log("\\nTest 5: Partial Category-Specific Score Evaluation...");
const partialAnswers = {};
QUIZ_QUESTIONS.forEach(q => {
  if (q.categoryId === "cat-1") {
    partialAnswers[q.id] = q.correctAnswer; // 5/5
  } else {
    // pick wrong answer
    partialAnswers[q.id] = q.correctAnswer === "A" ? "B" : "A";
  }
});

const partialResult = evaluateQuiz(partialAnswers);
const cat1 = partialResult.categoryResults.find(c => c.category.id === "cat-1");
const cat2 = partialResult.categoryResults.find(c => c.category.id === "cat-2");

if (
  partialResult.score === 5 &&
  partialResult.incorrectCount === 19 &&
  cat1.score === 5 &&
  cat1.percentage === 100 &&
  cat1.status === "strong" &&
  cat2.score === 0 &&
  cat2.percentage === 0 &&
  cat2.status === "needs-work"
) {
  console.log("  -> PASS: Category scoring correctly isolated (Cat 1: 5/5 100%, Cat 2: 0/5 0%).");
  passedCount++;
} else {
  console.error("  -> FAIL in partial score evaluation:", partialResult);
}

// Clean up temporary files
try {
  fs.unlinkSync("./scripts/.tmp_quiz.js");
  fs.unlinkSync("./scripts/.tmp_runner.js");
} catch (e) {}

console.log("\\n--- SUITE 6 SUMMARY ---");
console.log("Total Quiz Tests: " + totalTests + ", Passed: " + passedCount + ", Failed: " + (totalTests - passedCount));
`;

const ts = require("typescript");
const jsOutput = ts.transpile(content);
fs.writeFileSync("./scripts/.tmp_quiz.js", jsOutput);
fs.writeFileSync("./scripts/.tmp_runner.js", testRunnerScript);
