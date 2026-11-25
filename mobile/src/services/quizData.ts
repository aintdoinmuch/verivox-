// VoiceGuard AI - 24-Question Deepfake and Cybersecurity Awareness Assessment Bank
// Sourced verbatim from official specification. Do not remove, rewrite, shorten or replace.

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuizOption {
  key: OptionKey;
  text: string;
}

export interface QuizQuestion {
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
}

export interface QuizCategory {
  id: string;
  key: string;
  title: string;
  shortTitle: string;
  badge: string;
  description: string;
  questionRange: [number, number];
}

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    "id": "cat-1",
    "key": "general-cybersecurity",
    "title": "Category 1 — General Cybersecurity Awareness",
    "shortTitle": "General Cybersecurity",
    "badge": "FOUNDATIONS",
    "description": "Core password safety, phishing vectors, urgency patterns, and initial triage.",
    "questionRange": [
      1,
      5
    ]
  },
  {
    "id": "cat-2",
    "key": "voice-cloning-ai",
    "title": "Category 2 — Voice Cloning and AI Scams",
    "shortTitle": "Voice Cloning & AI Scams",
    "badge": "ACOUSTIC & VIDEO",
    "description": "Synthetic speech imitation, video cloning, celebrity endorsements, and family safe codes.",
    "questionRange": [
      6,
      10
    ]
  },
  {
    "id": "cat-3",
    "key": "adult-focused-scams",
    "title": "Category 3 — Adult-Focused Scams",
    "shortTitle": "Adult-Focused Scams",
    "badge": "WORK & WEALTH",
    "description": "Business email compromise, fraudulent recruitment, romance investment, and money mule traps.",
    "questionRange": [
      11,
      15
    ]
  },
  {
    "id": "cat-4",
    "key": "teens-young-adults",
    "title": "Category 4 — Teens and Young Adults",
    "shortTitle": "Teens & Young Adults",
    "badge": "DIGITAL HABITS",
    "description": "Gaming credential phishing, extortion threats, public Wi-Fi risks, and UPI payment traps.",
    "questionRange": [
      16,
      19
    ]
  },
  {
    "id": "cat-5",
    "key": "future-facing-ai",
    "title": "Category 5 — Future-Facing AI Scams",
    "shortTitle": "Future-Facing AI Scams",
    "badge": "NEXT-GEN RISKS",
    "description": "Autonomous digital agents, hyper-realistic government deepfakes, and multi-channel verification.",
    "questionRange": [
      20,
      24
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": 1,
    "number": 1,
    "categoryId": "cat-1",
    "categoryKey": "general-cybersecurity",
    "categoryTitle": "Category 1 — General Cybersecurity Awareness",
    "categoryShortTitle": "General Cybersecurity",
    "categoryBadge": "FOUNDATIONS",
    "question": "You receive a call from someone claiming to be your grandson. The voice sounds like him and says he is in trouble and needs money immediately. What should you do first?",
    "options": [
      {
        "key": "A",
        "text": "Send money immediately"
      },
      {
        "key": "B",
        "text": "Ask for a bank transfer to a new account"
      },
      {
        "key": "C",
        "text": "Hang up and call the person directly using a number you already have"
      },
      {
        "key": "D",
        "text": "Share your bank OTP to “verify” the emergency"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Voice-cloning technology can imitate a loved one from a short audio clip, so verify through a known phone number or a family code word before sending money."
  },
  {
    "id": 2,
    "number": 2,
    "categoryId": "cat-1",
    "categoryKey": "general-cybersecurity",
    "categoryTitle": "Category 1 — General Cybersecurity Awareness",
    "categoryShortTitle": "General Cybersecurity",
    "categoryBadge": "FOUNDATIONS",
    "question": "Which of these is the safest password?",
    "options": [
      {
        "key": "A",
        "text": "password123"
      },
      {
        "key": "B",
        "text": "Your birthday"
      },
      {
        "key": "C",
        "text": "A long unique passphrase with symbols, numbers, and capital letters"
      },
      {
        "key": "D",
        "text": "The same password for every website"
      }
    ],
    "correctAnswer": "C",
    "explanation": "A unique password prevents one leaked account from exposing your other accounts."
  },
  {
    "id": 3,
    "number": 3,
    "categoryId": "cat-1",
    "categoryKey": "general-cybersecurity",
    "categoryTitle": "Category 1 — General Cybersecurity Awareness",
    "categoryShortTitle": "General Cybersecurity",
    "categoryBadge": "FOUNDATIONS",
    "question": "A message says: “Your account will be blocked in 10 minutes. Click this link and enter your OTP.” What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Click quickly before time runs out"
      },
      {
        "key": "B",
        "text": "Enter the OTP and send a screenshot"
      },
      {
        "key": "C",
        "text": "Do not click; open the official app or website yourself and check the account"
      },
      {
        "key": "D",
        "text": "Forward it to friends to ask whether it is real"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Urgency plus a request for an OTP is a common phishing pattern; legitimate services do not need your OTP to “protect” your account."
  },
  {
    "id": 4,
    "number": 4,
    "categoryId": "cat-1",
    "categoryKey": "general-cybersecurity",
    "categoryTitle": "Category 1 — General Cybersecurity Awareness",
    "categoryShortTitle": "General Cybersecurity",
    "categoryBadge": "FOUNDATIONS",
    "question": "What does “phishing” mean?",
    "options": [
      {
        "key": "A",
        "text": "A game played on a phone"
      },
      {
        "key": "B",
        "text": "A scam that tricks you into revealing personal or financial information"
      },
      {
        "key": "C",
        "text": "A type of computer virus only found in emails"
      },
      {
        "key": "D",
        "text": "A way to make your internet faster"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Phishing can arrive by email, text, social media, QR code, phone call, or fake website."
  },
  {
    "id": 5,
    "number": 5,
    "categoryId": "cat-1",
    "categoryKey": "general-cybersecurity",
    "categoryTitle": "Category 1 — General Cybersecurity Awareness",
    "categoryShortTitle": "General Cybersecurity",
    "categoryBadge": "FOUNDATIONS",
    "question": "You meet someone online who is very loving, avoids video calls, and soon asks you to invest in crypto. What is the most likely warning sign?",
    "options": [
      {
        "key": "A",
        "text": "They use emojis"
      },
      {
        "key": "B",
        "text": "They have a profile photo"
      },
      {
        "key": "C",
        "text": "They may be running a romance/investment scam"
      },
      {
        "key": "D",
        "text": "They reply quickly"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Scammers can build trust for weeks or months before steering victims to fake trading platforms or cryptocurrency investments."
  },
  {
    "id": 6,
    "number": 6,
    "categoryId": "cat-2",
    "categoryKey": "voice-cloning-ai",
    "categoryTitle": "Category 2 — Voice Cloning and AI Scams",
    "categoryShortTitle": "Voice Cloning & AI Scams",
    "categoryBadge": "ACOUSTIC & VIDEO",
    "question": "A caller sounds exactly like your bank manager and asks you to read out an OTP “for verification.” What is the safest response?",
    "options": [
      {
        "key": "A",
        "text": "Read the OTP because the voice sounds real"
      },
      {
        "key": "B",
        "text": "Say you will call the bank using the number on your card or official app, then hang up"
      },
      {
        "key": "C",
        "text": "Give the OTP only if they know your date of birth"
      },
      {
        "key": "D",
        "text": "Send a screenshot of the OTP"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Never share OTPs, PINs, passwords, or one-time codes; call the organisation back through an independently verified contact method."
  },
  {
    "id": 7,
    "number": 7,
    "categoryId": "cat-2",
    "categoryKey": "voice-cloning-ai",
    "categoryTitle": "Category 2 — Voice Cloning and AI Scams",
    "categoryShortTitle": "Voice Cloning & AI Scams",
    "categoryBadge": "ACOUSTIC & VIDEO",
    "question": "Why can a “perfectly familiar voice” no longer prove that a caller is really your relative?",
    "options": [
      {
        "key": "A",
        "text": "Voices cannot be copied"
      },
      {
        "key": "B",
        "text": "AI can create a convincing voice clone from a short sample of someone’s voice"
      },
      {
        "key": "C",
        "text": "Only celebrities can be voice-cloned"
      },
      {
        "key": "D",
        "text": "Phone calls are always recorded by scammers"
      }
    ],
    "correctAnswer": "B",
    "explanation": "The FTC says voice-cloning tools can generate a near-perfect clone from a short audio snippet."
  },
  {
    "id": 8,
    "number": 8,
    "categoryId": "cat-2",
    "categoryKey": "voice-cloning-ai",
    "categoryTitle": "Category 2 — Voice Cloning and AI Scams",
    "categoryShortTitle": "Voice Cloning & AI Scams",
    "categoryBadge": "ACOUSTIC & VIDEO",
    "question": "Your “daughter” video-calls you, appears distressed, and asks for urgent money. What is a strong family safety practice?",
    "options": [
      {
        "key": "A",
        "text": "Send money first and ask questions later"
      },
      {
        "key": "B",
        "text": "Agree on a private family verification question or code word in advance"
      },
      {
        "key": "C",
        "text": "Trust any video because videos cannot be faked"
      },
      {
        "key": "D",
        "text": "Share your card details to speed up the rescue"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Deepfake video and cloned audio are being used to impersonate trusted people, so a pre-agreed verification method is more reliable than appearance or voice alone."
  },
  {
    "id": 9,
    "number": 9,
    "categoryId": "cat-2",
    "categoryKey": "voice-cloning-ai",
    "categoryTitle": "Category 2 — Voice Cloning and AI Scams",
    "categoryShortTitle": "Voice Cloning & AI Scams",
    "categoryBadge": "ACOUSTIC & VIDEO",
    "question": "Which request is a major red flag during an online friendship or romance?",
    "options": [
      {
        "key": "A",
        "text": "“Let’s talk tomorrow.”"
      },
      {
        "key": "B",
        "text": "“I can’t video-call right now.”"
      },
      {
        "key": "C",
        "text": "“Send money, gift cards, or crypto because I have an emergency.”"
      },
      {
        "key": "D",
        "text": "“I like the same music as you.”"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Requests for money, gift cards, cryptocurrency, or help moving funds are major scam warning signs, especially after an online relationship has been built."
  },
  {
    "id": 10,
    "number": 10,
    "categoryId": "cat-2",
    "categoryKey": "voice-cloning-ai",
    "categoryTitle": "Category 2 — Voice Cloning and AI Scams",
    "categoryShortTitle": "Voice Cloning & AI Scams",
    "categoryBadge": "ACOUSTIC & VIDEO",
    "question": "You see a celebrity endorsing a crypto investment in a realistic video. What should you assume?",
    "options": [
      {
        "key": "A",
        "text": "It must be genuine because it looks real"
      },
      {
        "key": "B",
        "text": "It could be an AI deepfake, so verify through the celebrity’s official channels"
      },
      {
        "key": "C",
        "text": "All celebrity ads are scams"
      },
      {
        "key": "D",
        "text": "Crypto is always safe if a celebrity promotes it"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Criminals use AI-generated videos of public figures to build false trust and promote fraudulent investments."
  },
  {
    "id": 11,
    "number": 11,
    "categoryId": "cat-3",
    "categoryKey": "adult-focused-scams",
    "categoryTitle": "Category 3 — Adult-Focused Scams",
    "categoryShortTitle": "Adult-Focused Scams",
    "categoryBadge": "WORK & WEALTH",
    "question": "An “HR manager” offers you a high-paying remote job, then asks you to pay a processing fee or buy equipment through a link. What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Pay immediately because the salary is excellent"
      },
      {
        "key": "B",
        "text": "Verify the company through its official website and never pay to get a job"
      },
      {
        "key": "C",
        "text": "Share your Aadhaar/passport and bank details for onboarding"
      },
      {
        "key": "D",
        "text": "Install an unknown app sent by the recruiter"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Legitimate employers do not ask candidates to pay for a job or send money through unofficial links."
  },
  {
    "id": 12,
    "number": 12,
    "categoryId": "cat-3",
    "categoryKey": "adult-focused-scams",
    "categoryTitle": "Category 3 — Adult-Focused Scams",
    "categoryShortTitle": "Adult-Focused Scams",
    "categoryBadge": "WORK & WEALTH",
    "question": "You receive an email that appears to be from your company’s CEO, urgently asking you to transfer funds or change payment details. What is the best action?",
    "options": [
      {
        "key": "A",
        "text": "Transfer immediately because it is from the CEO"
      },
      {
        "key": "B",
        "text": "Reply to the email and ask for confirmation"
      },
      {
        "key": "C",
        "text": "Verify through a known phone call or internal approved channel before acting"
      },
      {
        "key": "D",
        "text": "Forward the invoice to the supplier and pay"
      }
    ],
    "correctAnswer": "C",
    "explanation": "This is business email compromise (BEC); AI can generate convincing executive emails and voice messages to pressure employees into fraudulent transfers."
  },
  {
    "id": 13,
    "number": 13,
    "categoryId": "cat-3",
    "categoryKey": "adult-focused-scams",
    "categoryTitle": "Category 3 — Adult-Focused Scams",
    "categoryShortTitle": "Adult-Focused Scams",
    "categoryBadge": "WORK & WEALTH",
    "question": "A caller says they are from a government agency and threatens arrest unless you pay immediately through a gift card or crypto wallet. What is this?",
    "options": [
      {
        "key": "A",
        "text": "A routine tax process"
      },
      {
        "key": "B",
        "text": "A government emergency payment"
      },
      {
        "key": "C",
        "text": "A scam; real agencies do not demand immediate payment through gift cards or crypto"
      },
      {
        "key": "D",
        "text": "A secure identity-verification call"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Pressure, threats, secrecy, and unusual payment methods are classic scam indicators."
  },
  {
    "id": 14,
    "number": 14,
    "categoryId": "cat-3",
    "categoryKey": "adult-focused-scams",
    "categoryTitle": "Category 3 — Adult-Focused Scams",
    "categoryShortTitle": "Adult-Focused Scams",
    "categoryBadge": "WORK & WEALTH",
    "question": "Which type of scam commonly targets adults by combining emotional manipulation with fake investment platforms?",
    "options": [
      {
        "key": "A",
        "text": "Prize-lottery scam"
      },
      {
        "key": "B",
        "text": "“Pig-butchering” or romance-baiting investment scam"
      },
      {
        "key": "C",
        "text": "Software-update scam"
      },
      {
        "key": "D",
        "text": "Wi-Fi password scam"
      }
    ],
    "correctAnswer": "B",
    "explanation": "The scammer builds a relationship, then encourages the victim to invest on a fraudulent platform that shows fake profits before blocking withdrawals."
  },
  {
    "id": 15,
    "number": 15,
    "categoryId": "cat-3",
    "categoryKey": "adult-focused-scams",
    "categoryTitle": "Category 3 — Adult-Focused Scams",
    "categoryShortTitle": "Adult-Focused Scams",
    "categoryBadge": "WORK & WEALTH",
    "question": "You are asked to receive money into your bank account and forward it to someone else for a small commission. What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Accept it because it is easy money"
      },
      {
        "key": "B",
        "text": "Refuse; you may become a money mule in a criminal scheme"
      },
      {
        "key": "C",
        "text": "Share your account details only with trusted friends"
      },
      {
        "key": "D",
        "text": "Use a different bank account to avoid detection"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Receiving and forwarding criminal funds can make you part of money laundering and can lead to serious legal consequences."
  },
  {
    "id": 16,
    "number": 16,
    "categoryId": "cat-4",
    "categoryKey": "teens-young-adults",
    "categoryTitle": "Category 4 — Teens and Young Adults",
    "categoryShortTitle": "Teens & Young Adults",
    "categoryBadge": "DIGITAL HABITS",
    "question": "A stranger on a game or social app offers free game currency if you share your login code. What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Share it quickly before the offer expires"
      },
      {
        "key": "B",
        "text": "Refuse and report/block the account"
      },
      {
        "key": "C",
        "text": "Give only the password, not the code"
      },
      {
        "key": "D",
        "text": "Send a screenshot of your account settings"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Free rewards that require a login code are often attempts to take over an account."
  },
  {
    "id": 17,
    "number": 17,
    "categoryId": "cat-4",
    "categoryKey": "teens-young-adults",
    "categoryTitle": "Category 4 — Teens and Young Adults",
    "categoryShortTitle": "Teens & Young Adults",
    "categoryBadge": "DIGITAL HABITS",
    "question": "Someone online threatens to share an embarrassing photo unless you pay. What is the safest response?",
    "options": [
      {
        "key": "A",
        "text": "Pay once so they delete it"
      },
      {
        "key": "B",
        "text": "Keep chatting and negotiate"
      },
      {
        "key": "C",
        "text": "Do not pay; save evidence, stop contact, tell a trusted adult, and report the account/platform"
      },
      {
        "key": "D",
        "text": "Share more photos to prove you are trustworthy"
      }
    ],
    "correctAnswer": "C",
    "explanation": "Paying can lead to more demands; reporting and preserving evidence is safer."
  },
  {
    "id": 18,
    "number": 18,
    "categoryId": "cat-4",
    "categoryKey": "teens-young-adults",
    "categoryTitle": "Category 4 — Teens and Young Adults",
    "categoryShortTitle": "Teens & Young Adults",
    "categoryBadge": "DIGITAL HABITS",
    "question": "Which is the safest way to use public Wi-Fi?",
    "options": [
      {
        "key": "A",
        "text": "Log into banking apps and enter card details"
      },
      {
        "key": "B",
        "text": "Avoid sensitive logins or use a trusted VPN, and never enter OTPs on an unknown site"
      },
      {
        "key": "C",
        "text": "Turn off your phone lock"
      },
      {
        "key": "D",
        "text": "Connect to any network named “Free Wi-Fi”"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Public networks can be monitored or spoofed, so avoid financial transactions and sensitive logins."
  },
  {
    "id": 19,
    "number": 19,
    "categoryId": "cat-4",
    "categoryKey": "teens-young-adults",
    "categoryTitle": "Category 4 — Teens and Young Adults",
    "categoryShortTitle": "Teens & Young Adults",
    "categoryBadge": "DIGITAL HABITS",
    "question": "A QR code on a poster takes you to a page asking for your UPI PIN to claim a cashback reward. What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Enter the PIN; QR codes are always safe"
      },
      {
        "key": "B",
        "text": "Do not enter it; a UPI PIN is for making payments, not receiving money"
      },
      {
        "key": "C",
        "text": "Enter the PIN only once"
      },
      {
        "key": "D",
        "text": "Scan it with a public charging cable"
      }
    ],
    "correctAnswer": "B",
    "explanation": "You never need to enter a PIN to receive money; this is a common payment-app scam pattern."
  },
  {
    "id": 20,
    "number": 20,
    "categoryId": "cat-5",
    "categoryKey": "future-facing-ai",
    "categoryTitle": "Category 5 — Future-Facing AI Scams",
    "categoryShortTitle": "Future-Facing AI Scams",
    "categoryBadge": "NEXT-GEN RISKS",
    "question": "In the future, a scammer may use AI to create a realistic video of a government official announcing a “national emergency investment.” What is the best defence?",
    "options": [
      {
        "key": "A",
        "text": "Trust the video because it looks official"
      },
      {
        "key": "B",
        "text": "Verify through official government websites, apps, or helplines before acting"
      },
      {
        "key": "C",
        "text": "Send money to reserve your spot"
      },
      {
        "key": "D",
        "text": "Forward your ID documents to the video’s WhatsApp number"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Deepfake media can be generated or manipulated by AI, so verification through independent official channels is essential."
  },
  {
    "id": 21,
    "number": 21,
    "categoryId": "cat-5",
    "categoryKey": "future-facing-ai",
    "categoryTitle": "Category 5 — Future-Facing AI Scams",
    "categoryShortTitle": "Future-Facing AI Scams",
    "categoryBadge": "NEXT-GEN RISKS",
    "question": "Which future scam is most likely to become more convincing as AI improves?",
    "options": [
      {
        "key": "A",
        "text": "A scammer using a cloned voice of a relative"
      },
      {
        "key": "B",
        "text": "A scammer sending a handwritten letter"
      },
      {
        "key": "C",
        "text": "A scammer asking you to visit a government office in person"
      },
      {
        "key": "D",
        "text": "A scammer using a paper form"
      }
    ],
    "correctAnswer": "A",
    "explanation": "Voice cloning, deepfake video, fake IDs, and AI-written messages are already being used to impersonate trusted people and organisations."
  },
  {
    "id": 22,
    "number": 22,
    "categoryId": "cat-5",
    "categoryKey": "future-facing-ai",
    "categoryTitle": "Category 5 — Future-Facing AI Scams",
    "categoryShortTitle": "Future-Facing AI Scams",
    "categoryBadge": "NEXT-GEN RISKS",
    "question": "A “digital assistant” calls you, knows your name and recent purchase, and says your account has suspicious activity. What should you do?",
    "options": [
      {
        "key": "A",
        "text": "Share your card number because it knows personal details"
      },
      {
        "key": "B",
        "text": "Hang up and contact the company using the number on its official app or website"
      },
      {
        "key": "C",
        "text": "Give your OTP to stop the fraud"
      },
      {
        "key": "D",
        "text": "Allow remote access to your phone"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Scammers can obtain or guess public details to sound convincing; independent verification is the safest response."
  },
  {
    "id": 23,
    "number": 23,
    "categoryId": "cat-5",
    "categoryKey": "future-facing-ai",
    "categoryTitle": "Category 5 — Future-Facing AI Scams",
    "categoryShortTitle": "Future-Facing AI Scams",
    "categoryBadge": "NEXT-GEN RISKS",
    "question": "You receive a message: “Your parcel is held at customs. Pay a small fee through this link to release it.” What is the safest action?",
    "options": [
      {
        "key": "A",
        "text": "Pay because the message includes a tracking number"
      },
      {
        "key": "B",
        "text": "Check the delivery company’s official app or website and never pay through an unsolicited link"
      },
      {
        "key": "C",
        "text": "Share your card CVV to verify identity"
      },
      {
        "key": "D",
        "text": "Install the tracking app in the message"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Fake delivery/customs messages often use real-looking tracking details to make the fraud seem credible."
  },
  {
    "id": 24,
    "number": 24,
    "categoryId": "cat-5",
    "categoryKey": "future-facing-ai",
    "categoryTitle": "Category 5 — Future-Facing AI Scams",
    "categoryShortTitle": "Future-Facing AI Scams",
    "categoryBadge": "NEXT-GEN RISKS",
    "question": "Which habit will become more important as AI makes fake calls, videos, and messages harder to detect?",
    "options": [
      {
        "key": "A",
        "text": "Trusting anything that appears in a video"
      },
      {
        "key": "B",
        "text": "Verifying unexpected requests through a separate, known channel"
      },
      {
        "key": "C",
        "text": "Sharing OTPs faster"
      },
      {
        "key": "D",
        "text": "Using the same password everywhere"
      }
    ],
    "correctAnswer": "B",
    "explanation": "Verification through a separate known channel is the core defence against AI-powered impersonation scams."
  }
];

export interface PerformanceTier {
  minScore: number;
  maxScore: number;
  level: string;
  headline: string;
  description: string;
  badgeVariant: "emerald" | "blue" | "amber" | "rose";
  accentColor: string;
}

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    minScore: 21,
    maxScore: 24,
    level: "Excellent Awareness",
    headline: "Exceptional Digital Vigilance and Forensic Acumen",
    description: "You demonstrate comprehensive mastery of emerging voice-cloning techniques, social engineering indicators, business email compromise, and next-generation deepfake verification protocols.",
    badgeVariant: "emerald",
    accentColor: "#10B981",
  },
  {
    minScore: 17,
    maxScore: 20,
    level: "Strong Awareness",
    headline: "High Scam Resilience with Minor Tactical Vulnerabilities",
    description: "You possess solid foundational and practical knowledge of digital threats, with keen awareness across most synthetic impersonation and financial fraud patterns.",
    badgeVariant: "blue",
    accentColor: "#477BFF",
  },
  {
    minScore: 12,
    maxScore: 16,
    level: "Developing Awareness",
    headline: "Moderate Intuition Requiring Systematic Verification Habits",
    description: "You recognize overt warning signs but remain susceptible to advanced urgency framing, cloned voice familiarity, or sophisticated multi-channel phishing.",
    badgeVariant: "amber",
    accentColor: "#F59E0B",
  },
  {
    minScore: 0,
    maxScore: 11,
    level: "Needs More Awareness",
    headline: "Elevated Vulnerability to Modern AI Manipulation",
    description: "Modern AI-generated voice and video attacks can readily bypass traditional intuition. Familiarizing yourself with out-of-band verification and zero-trust communication is strongly advised.",
    badgeVariant: "rose",
    accentColor: "#EF4444",
  },
];

export function getPerformanceTier(score: number): PerformanceTier {
  const tier = PERFORMANCE_TIERS.find(
    (t) => score >= t.minScore && score <= t.maxScore
  );
  return tier || PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
}

export interface CategoryResult {
  category: QuizCategory;
  score: number;
  total: number;
  percentage: number;
  status: "strong" | "moderate" | "needs-work";
}

export interface QuizEvaluationResult {
  totalQuestions: number;
  score: number;
  incorrectCount: number;
  percentage: number;
  tier: PerformanceTier;
  categoryResults: CategoryResult[];
  strongCategories: CategoryResult[];
  improvementCategories: CategoryResult[];
  answers: Record<number, OptionKey>;
  reviewedQuestions: Array<QuizQuestion & {
    userAnswer: OptionKey | undefined;
    isCorrect: boolean;
  }>;
}

export function evaluateQuiz(answers: Record<number, OptionKey>): QuizEvaluationResult {
  let score = 0;
  const reviewedQuestions = QUIZ_QUESTIONS.map((q) => {
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctAnswer;
    if (isCorrect) score += 1;
    return {
      ...q,
      userAnswer,
      isCorrect,
    };
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const incorrectCount = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);
  const tier = getPerformanceTier(score);

  const categoryResults: CategoryResult[] = QUIZ_CATEGORIES.map((cat) => {
    const catQuestions = reviewedQuestions.filter((q) => q.categoryId === cat.id);
    const catTotal = catQuestions.length;
    const catScore = catQuestions.filter((q) => q.isCorrect).length;
    const catPct = catTotal > 0 ? Math.round((catScore / catTotal) * 100) : 0;
    
    let status: "strong" | "moderate" | "needs-work" = "needs-work";
    if (catPct >= 80) status = "strong";
    else if (catPct >= 50) status = "moderate";

    return {
      category: cat,
      score: catScore,
      total: catTotal,
      percentage: catPct,
      status,
    };
  });

  const strongCategories = categoryResults.filter((c) => c.status === "strong");
  const improvementCategories = categoryResults.filter((c) => c.status !== "strong");

  return {
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
  };
}
