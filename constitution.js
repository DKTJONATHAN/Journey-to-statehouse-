// Constitution-related questions
const constitutionQuestions = [
    {
        question: "In which year was the current Kenyan Constitution promulgated?",
        options: ["2005", "2010", "2015", "2020"],
        correctIndex: 1,
        level: "easy",
        funFact: "The 2010 Constitution was approved by 67% of Kenyan voters in a referendum."
    },
    {
        question: "How many chapters does the Kenyan Constitution have?",
        options: ["12", "18", "21", "25"],
        correctIndex: 1,
        level: "medium"
    },
    {
        question: "Which article of the Constitution establishes the Judiciary?",
        answer: "160",
        type: "fill",
        level: "hard"
    },
    {
        question: "The Kenyan Constitution establishes how many arms of government?",
        options: ["2", "3", "4", "5"],
        correctIndex: 1,
        level: "easy",
        funFact: "The three arms are the Legislature (Parliament), Executive (President), and Judiciary."
    },
    {
        question: "What is the minimum age requirement to be elected as President of Kenya?",
        answer: "35",
        type: "fill",
        level: "medium"
    },
    {
        question: "Which chapter of the Constitution contains the Bill of Rights?",
        options: ["Chapter Two", "Chapter Four", "Chapter Six", "Chapter Eight"],
        correctIndex: 1,
        level: "easy"
    },
    {
        question: "The Senate represents which interest according to the Constitution?",
        options: ["National government", "Political parties", "Counties", "Civil society"],
        correctIndex: 2,
        level: "medium",
        timer: 15
    },
    {
        question: "How many basic values are listed in Article 10 of the Constitution?",
        answer: "12",
        type: "fill",
        level: "hard",
        timer: 20
    },
    {
        question: "Which commission is responsible for implementing the Constitution?",
        options: ["IEBC", "CIC", "EACC", "DCC"],
        correctIndex: 1,
        level: "hard",
        funFact: "The Commission for the Implementation of the Constitution (CIC) was established in 2011 but completed its mandate in 2015."
    },
    {
        question: "The right to privacy is protected under which Article?",
        answer: "31",
        type: "fill",
        level: "medium"
    }
];

// Election-related questions
const electionQuestions = [
    {
        question: "How often are general elections held in Kenya?",
        options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
        correctIndex: 2,
        level: "easy"
    },
    {
        question: "Which body is responsible for conducting elections in Kenya?",
        options: ["ECK", "IEBC", "EACC", "DCC"],
        correctIndex: 1,
        level: "easy",
        funFact: "IEBC stands for Independent Electoral and Boundaries Commission."
    },
    {
        question: "What is the minimum voting age in Kenya?",
        answer: "18",
        type: "fill",
        level: "easy"
    },
    {
        question: "How many days before elections should voter registration close?",
        options: ["30", "60", "90", "120"],
        correctIndex: 1,
        level: "medium"
    },
    {
        question: "Which article of the Constitution guarantees the right to free and fair elections?",
        answer: "38",
        type: "fill",
        level: "hard"
    },
    {
        question: "What percentage is required for a presidential candidate to win in the first round?",
        options: ["25%", "50%+1", "75%", "Simple majority"],
        correctIndex: 1,
        level: "medium",
        timer: 15
    },
    {
        question: "How many ballot papers are used in a Kenyan presidential election?",
        answer: "6",
        type: "fill",
        level: "hard"
    },
    {
        question: "Which of these is NOT a requirement for presidential candidates?",
        options: ["University degree", "Nominated by a party", "Supported by voters", "No criminal record"],
        correctIndex: 0,
        level: "medium",
        funFact: "The university degree requirement was removed by the Supreme Court in 2017."
    },
    {
        question: "What is the maximum campaign period before elections?",
        options: ["30 days", "60 days", "90 days", "120 days"],
        correctIndex: 3,
        level: "hard"
    },
    {
        question: "Which court has final authority in presidential election disputes?",
        options: ["High Court", "Court of Appeal", "Supreme Court", "IEBC Tribunal"],
        correctIndex: 2,
        level: "medium"
    }
];

// Finance Bill related questions
const financeBillQuestions = [
    {
        question: "Which house of Parliament originates money bills?",
        options: ["National Assembly", "Senate", "Both houses", "National Treasury"],
        correctIndex: 0,
        level: "medium"
    },
    {
        question: "How many days does the President have to assent to a finance bill?",
        answer: "14",
        type: "fill",
        level: "hard"
    },
    {
        question: "What happens if the President refuses to sign a finance bill?",
        options: ["It's returned to Parliament", "It's automatically passed", "It's withdrawn", "It goes to referendum"],
        correctIndex: 1,
        level: "hard",
        funFact: "This provision was tested during the 2018 Finance Bill standoff."
    },
    {
        question: "Which article requires public participation in financial matters?",
        answer: "201",
        type: "fill",
        level: "hard"
    },
    {
        question: "The Finance Bill 2023 introduced tax on which basic commodity?",
        options: ["Bread", "Sugar", "Fuel", "Electricity"],
        correctIndex: 2,
        level: "easy",
        timer: 10
    },
    {
        question: "Which tax was proposed in Finance Bill 2023 but later removed after public outcry?",
        options: ["Digital tax", "Housing levy", "Fuel tax", "Income tax"],
        correctIndex: 1,
        level: "medium"
    },
    {
        question: "What percentage of GDP is Kenya's tax target according to recent finance bills?",
        options: ["15%", "18%", "22%", "25%"],
        correctIndex: 2,
        level: "hard"
    },
    {
        question: "Which institution advises Parliament on finance bills?",
        options: ["CRA", "KRA", "National Treasury", "Parliamentary Budget Office"],
        correctIndex: 3,
        level: "medium"
    },
    {
        question: "The Finance Act must be passed by which date each year?",
        options: ["March 31", "June 30", "September 30", "December 31"],
        correctIndex: 1,
        level: "hard"
    },
    {
        question: "Which constitutional principle guides taxation in Kenya?",
        options: ["Equity", "Popularity", "Necessity", "Uniformity"],
        correctIndex: 0,
        level: "medium",
        funFact: "Article 201 requires the tax system to be fair and equitable."
    }
];