// Constitutional reference data
const constitution = {
  billOfRights: {
    title: "CHAPTER 4 - BILL OF RIGHTS",
    articles: [
      {
        article: "19",
        title: "Rights and Fundamental Freedoms",
        text: "The Bill of Rights is an integral part of Kenya's democratic state."
      },
      // ... 30+ more articles
    ]
  },
  // ... other chapters
};

// Game questions by level
const questions = {
  easy: [...], // Basic civic questions (existing)
  
  medium: [
    {
      type: "multiple",
      chapter: "CHAPTER 4",
      article: "33",
      question: "What does Article 33 guarantee?",
      options: [
        "Right to clean water",
        "Freedom of expression",
        "Right to housing", 
        "Gender equality"
      ],
      correct: 1,
      explanation: "Article 33 guarantees freedom of expression, including media freedom."
    },
    // ... 15+ medium questions
  ],
  
  hard: [
    {
      type: "scenario",
      chapter: "CHAPTER 6",
      article: "73",
      question: "A governor uses county funds for personal travel. Which constitutional principle is violated?",
      options: [
        "Public participation",
        "Leadership and integrity",
        "Devolved government",
        "Representative democracy"
      ],
      correct: 1,
      explanation: "Article 73(2)(a) requires leaders to avoid abuse of office."
    },
    // ... 15+ hard questions
  ],
  
  voterPrep: [
    {
      type: "practical",
      question: "Where can you verify your voter registration status?",
      options: [
        "IEBC website via ID number",
        "By calling your MP",
        "At any supermarket", 
        "Through SMS to 1500"
      ],
      correct: 0,
      explanation: "Verify registration at www.iebc.or.ke using your ID number."
    }
    // ... 5+ practical questions
  ]
};