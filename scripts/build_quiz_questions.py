import json
import re
import os

with open("scratch_prompt.txt", "r", encoding="utf-8") as f:
    text = f.read()

q_section_match = re.search(r"## 5\. COMPLETE QUESTION BANK(.*?)## 6\. QUIZ SCORING SYSTEM", text, re.DOTALL)
if not q_section_match:
    print("Could not find question section in scratch_prompt.txt")
    exit(1)

content = q_section_match.group(1)

# Split by categories
cat_blocks = re.split(r"### (CATEGORY \d+ [^\n]+)", content)

category_meta = [
    {
        "id": "cat-1",
        "key": "general-cybersecurity",
        "title": "Category 1 — General Cybersecurity Awareness",
        "shortTitle": "General Cybersecurity",
        "badge": "FOUNDATIONS",
        "description": "Core password safety, phishing vectors, urgency patterns, and initial triage.",
        "questionRange": [1, 5]
    },
    {
        "id": "cat-2",
        "key": "voice-cloning-ai",
        "title": "Category 2 — Voice Cloning and AI Scams",
        "shortTitle": "Voice Cloning & AI Scams",
        "badge": "ACOUSTIC & VIDEO",
        "description": "Synthetic speech imitation, video cloning, celebrity endorsements, and family safe codes.",
        "questionRange": [6, 10]
    },
    {
        "id": "cat-3",
        "key": "adult-focused-scams",
        "title": "Category 3 — Adult-Focused Scams",
        "shortTitle": "Adult-Focused Scams",
        "badge": "WORK & WEALTH",
        "description": "Business email compromise, fraudulent recruitment, romance investment, and money mule traps.",
        "questionRange": [11, 15]
    },
    {
        "id": "cat-4",
        "key": "teens-young-adults",
        "title": "Category 4 — Teens and Young Adults",
        "shortTitle": "Teens & Young Adults",
        "badge": "DIGITAL HABITS",
        "description": "Gaming credential phishing, extortion threats, public Wi-Fi risks, and UPI payment traps.",
        "questionRange": [16, 19]
    },
    {
        "id": "cat-5",
        "key": "future-facing-ai",
        "title": "Category 5 — Future-Facing AI Scams",
        "shortTitle": "Future-Facing AI Scams",
        "badge": "NEXT-GEN RISKS",
        "description": "Autonomous digital agents, hyper-realistic government deepfakes, and multi-channel verification.",
        "questionRange": [20, 24]
    }
]

questions_list = []

for i in range(1, len(cat_blocks), 2):
    cat_header = cat_blocks[i].strip()
    cat_content = cat_blocks[i+1].strip()
    cat_idx = (i - 1) // 2
    cat_info = category_meta[cat_idx]

    q_matches = list(re.finditer(
        r"QUESTION (\d+)\s*\n\s*(.*?)\n\s*A\.\s*(.*?)\n\s*B\.\s*(.*?)\n\s*C\.\s*(.*?)\n\s*D\.\s*(.*?)\n\s*Correct answer:\s*([A-D])\s*\n\s*Explanation:\s*(.*?)(?=(?:\n\s*(?:QUESTION|###|##))|\s*$)",
        cat_content,
        re.DOTALL
    ))

    for m in q_matches:
        num, q_text, a, b, c, d, ans, exp = m.groups()
        q_obj = {
            "id": int(num),
            "number": int(num),
            "categoryId": cat_info["id"],
            "categoryKey": cat_info["key"],
            "categoryTitle": cat_info["title"],
            "categoryShortTitle": cat_info["shortTitle"],
            "categoryBadge": cat_info["badge"],
            "question": q_text.strip(),
            "options": [
                {"key": "A", "text": a.strip()},
                {"key": "B", "text": b.strip()},
                {"key": "C", "text": c.strip()},
                {"key": "D", "text": d.strip()},
            ],
            "correctAnswer": ans.strip(),
            "explanation": exp.strip(),
        }
        questions_list.append(q_obj)

print("Parsed", len(questions_list), "questions across", len(category_meta), "categories.")

os.makedirs("src/lib/data", exist_ok=True)

categories_json = json.dumps(category_meta, indent=2, ensure_ascii=False)
questions_json = json.dumps(questions_list, indent=2, ensure_ascii=False)

ts_output = f"""// VoiceGuard AI - 24-Question Deepfake and Cybersecurity Awareness Assessment Bank
// Sourced verbatim from official specification. Do not remove, rewrite, shorten or replace.

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuizOption {{
  key: OptionKey;
  text: string;
}}

export interface QuizQuestion {{
  id: number;
  number: number;
  categoryId: string;
  categoryKey: string;
  categoryTitle: string;
  categoryShortTitle: string;
  categoryBadge: string;
  question: string;
  options: QuizOption[];
  correctAnswer: OptionKey;
  explanation: string;
}}

export interface QuizCategory {{
  id: string;
  key: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  questionRange: [number, number];
}}

export const QUIZ_CATEGORIES: QuizCategory[] = {categories_json};

export const QUIZ_QUESTIONS: QuizQuestion[] = {questions_json};

export interface PerformanceTier {{
  minScore: number;
  maxScore: number;
  level: string;
  headline: string;
  description: string;
  badgeVariant: "emerald" | "blue" | "amber" | "rose";
  accentColor: string;
}}

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {{
    minScore: 21,
    maxScore: 24,
    level: "Excellent Awareness",
    headline: "Exceptional Digital Vigilance and Forensic Acumen",
    description: "You demonstrate comprehensive mastery of emerging voice-cloning techniques, social engineering indicators, business email compromise, and next-generation deepfake verification protocols.",
    badgeVariant: "emerald",
    accentColor: "#10B981",
  }},
  {{
    minScore: 17,
    maxScore: 20,
    level: "Strong Awareness",
    headline: "High Scam Resilience with Minor Tactical Vulnerabilities",
    description: "You possess solid foundational and practical knowledge of digital threats, with keen awareness across most synthetic impersonation and financial fraud patterns.",
    badgeVariant: "blue",
    accentColor: "#477BFF",
  }},
  {{
    minScore: 12,
    maxScore: 16,
    level: "Developing Awareness",
    headline: "Moderate Intuition Requiring Systematic Verification Habits",
    description: "You recognize overt warning signs but remain susceptible to advanced urgency framing, cloned voice familiarity, or sophisticated multi-channel phishing.",
    badgeVariant: "amber",
    accentColor: "#F59E0B",
  }},
  {{
    minScore: 0,
    maxScore: 11,
    level: "Needs More Awareness",
    headline: "Elevated Vulnerability to Modern AI Manipulation",
    description: "Modern AI-generated voice and video attacks can readily bypass traditional intuition. Familiarizing yourself with out-of-band verification and zero-trust communication is strongly advised.",
    badgeVariant: "rose",
    accentColor: "#EF4444",
  }},
];

export function getPerformanceTier(score: number): PerformanceTier {{
  const tier = PERFORMANCE_TIERS.find(
    (t) => score >= t.minScore && score <= t.maxScore
  );
  return tier || PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
}}

export interface CategoryResult {{
  category: QuizCategory;
  score: number;
  total: number;
  percentage: number;
  status: "strong" | "moderate" | "needs-work";
}}

export interface QuizEvaluationResult {{
  totalQuestions: number;
  score: number;
  incorrectCount: number;
  percentage: number;
  tier: PerformanceTier;
  categoryResults: CategoryResult[];
  strongCategories: CategoryResult[];
  improvementCategories: CategoryResult[];
  answers: Record<number, OptionKey>;
  reviewedQuestions: Array<QuizQuestion & {{
    userAnswer: OptionKey | undefined;
    isCorrect: boolean;
  }}>;
}}

export function evaluateQuiz(answers: Record<number, OptionKey>): QuizEvaluationResult {{
  let score = 0;
  const reviewedQuestions = QUIZ_QUESTIONS.map((q) => {{
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) score += 1;
    return {{
      ...q,
      userAnswer,
      isCorrect,
    }};
  }});

  const totalQuestions = QUIZ_QUESTIONS.length;
  const incorrectCount = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);
  const tier = getPerformanceTier(score);

  const categoryResults: CategoryResult[] = QUIZ_CATEGORIES.map((cat) => {{
    const catQuestions = reviewedQuestions.filter((q) => q.categoryId === cat.id);
    const catTotal = catQuestions.length;
    const catScore = catQuestions.filter((q) => q.isCorrect).length;
    const catPct = catTotal > 0 ? Math.round((catScore / catTotal) * 100) : 0;
    
    let status: "strong" | "moderate" | "needs-work" = "needs-work";
    if (catPct >= 80) status = "strong";
    else if (catPct >= 50) status = "moderate";

    return {{
      category: cat,
      score: catScore,
      total: catTotal,
      percentage: catPct,
      status,
    }};
  }});

  const strongCategories = categoryResults.filter((c) => c.status === "strong");
  const improvementCategories = categoryResults.filter((c) => c.status !== "strong");

  return {{
    totalQuestions,
    score,
    incorrectCount,
    percentage,
    tier,
    categoryResults,
    strongCategories,
    improvementCategories,
    answers,
    reviewedQuestions,
  }};
}}
"""

with open("src/lib/data/quiz-questions.ts", "w", encoding="utf-8") as out:
    out.write(ts_output)

print("Saved src/lib/data/quiz-questions.ts successfully!")
