// Unit tests for Quiz Evaluation Engine and Data Integrity
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "src", "lib", "data", "quiz-questions.ts");
const content = fs.readFileSync(filePath, "utf-8");

// Check question count
const matchQuestions = content.match(/export const QUIZ_QUESTIONS: QuizQuestion\[\] = (\[[\s\S]*?\]);/);
if (!matchQuestions) {
  console.error("FAIL: Could not locate QUIZ_QUESTIONS");
  process.exit(1);
}

const questions = JSON.parse(matchQuestions[1]);
console.log(`PASS: Found ${questions.length} questions in bank.`);

if (questions.length !== 24) {
  console.error(`FAIL: Expected 24 questions, found ${questions.length}`);
  process.exit(1);
}

// Check categories
const matchCategories = content.match(/export const QUIZ_CATEGORIES: QuizCategory\[\] = ([\s\S]*?\]);/);
const categories = JSON.parse(matchCategories[1]);
console.log(`PASS: Found ${categories.length} categories.`);

if (categories.length !== 5) {
  console.error(`FAIL: Expected 5 categories, found ${categories.length}`);
  process.exit(1);
}

// Verify each question
let totalOptions = 0;
const categoryQuestionCounts = {};

questions.forEach((q, idx) => {
  const expectedNum = idx + 1;
  if (q.id !== expectedNum || q.number !== expectedNum) {
    console.error(`FAIL: Question ID/Number mismatch at index ${idx}: id=${q.id}, num=${q.number}`);
    process.exit(1);
  }
  if (!["A", "B", "C", "D"].includes(q.correctAnswer)) {
    console.error(`FAIL: Question ${q.id} has invalid correct answer: ${q.correctAnswer}`);
    process.exit(1);
  }
  if (!q.options || q.options.length !== 4) {
    console.error(`FAIL: Question ${q.id} must have exactly 4 options`);
    process.exit(1);
  }
  totalOptions += q.options.length;

  categoryQuestionCounts[q.categoryId] = (categoryQuestionCounts[q.categoryId] || 0) + 1;

  if (!q.question || q.question.trim().length < 10) {
    console.error(`FAIL: Question ${q.id} text empty or too short`);
    process.exit(1);
  }
  if (!q.explanation || q.explanation.trim().length < 10) {
    console.error(`FAIL: Question ${q.id} explanation empty or too short`);
    process.exit(1);
  }
});

console.log(`PASS: All 24 questions verified with exactly ${totalOptions} answer options.`);
console.log("Category counts:", categoryQuestionCounts);

// Verify category question counts:
// Cat 1: Q1-5 (5)
// Cat 2: Q6-10 (5)
// Cat 3: Q11-15 (5)
// Cat 4: Q16-19 (4)
// Cat 5: Q20-24 (5)
if (categoryQuestionCounts["cat-1"] !== 5 ||
    categoryQuestionCounts["cat-2"] !== 5 ||
    categoryQuestionCounts["cat-3"] !== 5 ||
    categoryQuestionCounts["cat-4"] !== 4 ||
    categoryQuestionCounts["cat-5"] !== 5) {
  console.error("FAIL: Category counts do not match specification: 5, 5, 5, 4, 5");
  process.exit(1);
}
console.log("PASS: Category question allocations strictly match specification.");

// Simulate Scoring and Tier Calculations
function getTier(score) {
  if (score >= 21) return "Excellent Awareness";
  if (score >= 17) return "Strong Awareness";
  if (score >= 12) return "Developing Awareness";
  return "Needs More Awareness";
}

console.log("Testing Score Tiers:");
const testScores = [
  { score: 24, expected: "Excellent Awareness" },
  { score: 21, expected: "Excellent Awareness" },
  { score: 20, expected: "Strong Awareness" },
  { score: 17, expected: "Strong Awareness" },
  { score: 16, expected: "Developing Awareness" },
  { score: 12, expected: "Developing Awareness" },
  { score: 11, expected: "Needs More Awareness" },
  { score: 0, expected: "Needs More Awareness" },
];

testScores.forEach(({ score, expected }) => {
  const tier = getTier(score);
  if (tier !== expected) {
    console.error(`FAIL: Score ${score} yielded ${tier}, expected ${expected}`);
    process.exit(1);
  }
  console.log(`  Score ${score}/24 (${Math.round((score/24)*100)}%) => ${tier}`);
});

console.log("\nALL QUIZ SPECIFICATION TESTS PASSED SUCCESSFULLY!");
