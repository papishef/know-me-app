///////////////////THIS FILE CONTAIN ALL THE QUESTIONS////////////////////////////

const allQuestions = {
  one: {
    id: 1,
    q: "If a genie could grant your most important wish, what would it be?",
    category: "personal"
  },
  two: {
    id: 2,
    q: "What is your greatest fear?",
    category: "personal"
  },
  three: {
    id: 3,
    q: "If you were to die for someone, who would it be?",
    category: "personal"
  },
  four: {
    id: 4,
    q: "What do you do?",
    category: "Professional"
  },
  five: {
    id: "5",
    q: "Who is that one person you can tell anything?",
    category: "personal"
  },
  six: {
    id: "6",
    q: "What is your full name?",
    category: "personal"
  },
  seven: {
    id: "7",
    q: "Have you ever smoked?",
    category: "social"
  },
  eight: {
    id: "8",
    q: "Have you done oral sex before?",
    category: "sexual"
  },
  nine: {
    id: "9",
    q: "Do you love quickies?",
    category: "sexual"
  },
  ten: {
    id: "10",
    q: "What is your birth date?",
    category: "personal"
  },
  eleven: {
    id: "8",
    q: "What is your favorite sex position?",
    category: "sexual"
  },
  twelve: {
    id: "12",
    q: "If you had to travel far away for a long period, where would you rather go?",
    category: "casual"
  },
  thirteen: {
    id: "13",
    q: "What is your current relationship status?",
    category: "personal"
  },
  fourteen: {
    id: "8",
    q: "Do you think it is necessary to reveal your past to your current boyfriend/girlfriend?",
    category: "personal"
  },
  fifteen: {
    id: "15",
    q: "Do you prefer romance novels to adventures?",
    category: "casual"
  },
  sixteen: {
    id: "16",
    q: "Have you ever done hard drugs?",
    category: "personal"
  },
  seventeen: {
    id: "17",
    q: "When was the last time you cried?",
    category: "personal"
  },
  eighteen: {
    id: "18",
    q: "Do you have a female best friend or a male best friend?",
    category: "casual"
  },
  nineteen: {
    id: "19",
    q: "Are you bi-sexual or heterosexual?",
    category: "personal"
  },
  twenty: {
    id: "20",
    q: "What part of your body do you think mostly attracts the opposite sex to you?",
    category: "casual"
  },
  twentyOne: {
    id: "21",
    q: "Are you an introvert or an extrovert?",
    category: "social"
  },
  twentyTwo: {
    id: "22",
    q: "What is your longest sex duration?",
    category: "sexual"
  },
  twentyThree: {
    id: "23",
    q: "Between sex and romance, which do you enjoy most?",
    category: "sexual"
  },
  twentyFour: {
    id: "24",
    q: "If I asked politely, would you watch porn with me?",
    category: "sexual"
  },
  twentyFive: {
    id: "25",
    q: "What is your genre of music?",
    category: "casual"
  },
  twentySix: {
    id: "26",
    q: "Do you prefer having sex with condoms or raw (without)?",
    category: "sexual"
  },
  twentySeven: {
    id: "27",
    q: "What is your most embarrassing moment?",
    category: "social"
  },
  twentyEight: {
    id: "28",
    q: "If you had the opportunity to change anything about yourself, what would it be?",
    category: "personal"
  },
  twentyNine: {
    id: "29",
    q: "What is your worst mistake?",
    category: "personal"
  },
  thirty: {
    id: "30",
    q: "Are you a screamer or a moaner during sex?",
    category: "sexual"
  },
  thirtyOne: {
    id: "31",
    q: "What is that one thing you are very proud of?",
    category: "personal"
  },
  thirtyTwo: {
    id: "32",
    q: "What are you most grateful for?",
    category: "personal"
  },
  thirtyThree: {
    id: "33",
    q: "Which would you rather prefer for relaxation; a book or movie?",
    category: "casual"
  },
  thirtyFour: {
    id: "34",
    q: "Have you ever thought of committing suicide?",
    category: "personal"
  },
  thirtyFive: {
    id: "35",
    q: "What is your favorite Television show?",
    category: "casual"
  },
  thirtySix: {
    id: "36",
    q: "What are you putting on at the moment?",
    category: "sexual"
  },
  thirtySeven: {
    id: "37",
    q: "Have you ever survived a life-threatening disease?",
    category: "personal"
  },
  thirtyEight: {
    id: "38",
    q: "Do you prefer a light-skinned or a dark-skinned guy/girl?",
    category: "casual"
  },
  thirtyNine: {
    id: "39",
    q: "Can you reveal all of your sexual history to your boyfriend/girlfriend? ",
    category: "personal"
  },
  forty: {
    id: "40",
    q: "What is your major weakness?",
    category: "personal"
  },
  fortyOne: {
    id: "41",
    q: "Have you ever gone back to an ex?",
    category: "personal"
  },
  fortyTwo: {
    id: "42",
    q: "What is your G-spot?",
    category: "sexual"
  },
  fortyThree: {
    id: "43",
    q: "Has your heart ever been broken?",
    category: "personal"
  },
  fortyFour: {
    id: "44",
    q: "Can you give a blowjob if your boyfriend/girlfriend asks for it?",
    category: "sexual"
  },
  fortyFive: {
    id: "45",
    q: "What is your ideal man/woman?",
    category: "casual"
  },
  fortySix: {
    id: "46",
    q: "Have you ever asked a guy out?",
    category: "casual"
  },
  fortySeven: {
    id: "47",
    q: "How do you handle rejection?",
    category: "casual"
  },
  fortyEight: {
    id: "48",
    q: "What is your position on sex before marriage?",
    category: "casual"
  },
  fortyNine: {
    id: "49",
    q: "What is your deal breaker in a relationship?",
    category: "casual"
  },
  fifty: {
    id: "50",
    q: "Would you forgive a cheating partner?",
    category: "personal"
  },
  fiftyOne: {
    id: "51",
    q: "Where is the weirdest place you have ever had sex?",
    category: "casual"
  },
  fiftyTwo: {
    id: "52",
    q: "Have you ever had an abusive partner?",
    category: "casual"
  },
  fiftyThree: {
    id: "53",
    q: "What advice would you give to your younger self?",
    category: "personal"
  },
  fiftyFour: {
    id: "54",
    q: "Have you ever been sexually abused?",
    category: "personal"
  },
  fiftyFive: {
    id: "55",
    q: "Have your ever had a near-death experience?",
    category: "casual"
  },
  fiftySix: {
    id: "56",
    q: "What is your worst fear?",
    category: "personal"
  },
  fiftySeven: {
    id: "57",
    q: "What is your most memorable moment yet?",
    category: "casual"
  },
  fiftyEight: {
    id: "58",
    q: "If you had a pet, what would it be?",
    category: "casual"
  },
  fiftyNine: {
    id: "59",
    q: "Are you a virgin?",
    category: "personal"
  },
  sixty: {
    id: "60",
    q: "Between attention, sex and money, what do you crave most from a guy?",
    category: "casual"
  },
  sixtyOne: {
    id: "61",
    q: "At what age did you have your first sex?",
    category: "sexual"
  },
  sixtyTwo: {
    id: "62",
    q: "What are you fondly called?",
    category: "casual"
  },
  sixtyThree: {
    id: "63",
    q: "Does having sex on a first date make you loose?",
    category: "sexual"
  },
  sixtyFour: {
    id: "64",
    q: "Have you ever cheated on your boyfriend/girlfriend?",
    category: "personal"
  },
  sixtyFive: {
    id: "65",
    q: "Have you ever had a one-night stand?",
    category: "sexual"
  },
  sixtySix: {
    id: "66",
    q: "Are you good at playing games?",
    category: "casual"
  },
  sixtySeven: {
    id: "67",
    q: "Do you have a celebrity crush?",
    category: "casual"
  },
  sixtyEight: {
    id: "68",
    q: "Do you have a deep secret you can never ever let out?",
    category: "casual"
  },
  sixtyNine: {
    id: "69",
    q: "What is that one bad habit you are addicted to?",
    category: "personal"
  },
  seventy: {
    id: "70",
    q: "What is that one thing you cherish most in a guy/girl?",
    category: "casual"
  },
  seventyOne: {
    id: "71",
    q: "What is your zodiac sign?",
    category: "personal"
  },
  seventyTwo: {
    id: "72",
    q: "What is your bra size?",
    category: "sexual"
  },
  seventyThree: {
    id: "73",
    q: "If you were an animal, which would you rather be?",
    category: "casual"
  },
  seventyFour: {
    id: "74",
    q: "What is the duration of your longest relationship?",
    category: "personal"
  },
  seventyFive: {
    id: "75",
    q: "Have you ever ever dated a person you never loved?",
    category: "sexual"
  },
  seventySix: {
    id: "76",
    q: "What is the most daring thing you have ever done?",
    category: "casual"
  },
  seventySeven: {
    id: "77",
    q: "What is your favorite number?",
    category: "casual"
  },
  seventyFive: {
    id: "75",
    q: "Have you ever ever dated a person you never loved?",
    category: "sexual"
  },
  seventySix: {
    id: "76",
    q: "What is the most daring thing you have ever done?",
    category: "casual"
  },
  seventySeven: {
    id: "77",
    q: "What is your favorite number?",
    category: "casual"
  },
  seventyEight: {
    id: "78",
    q: "Have you ever crushed on your friend’s boyfriend/girlfriend?",
    category: "sexual"
  },
  seventyNine: {
    id: "79",
    q: "How long can you stay without having sex?",
    category: "personal"
  },
  eighty: {
    id: "80",
    q: "What is that one thing you can’t live without?",
    category: "casual"
  },
  eightyOne: {
    id: "81",
    q: "Can you stay in a room for a month with someone you love without sexually touching him/her?",
    category: "sexual"
  },
  eightyTwo: {
    id: "82",
    q: "If you were to live without sex or money for the rest of your life, which would you rather choose?",
    category: "casual"
  },
  eightyThree: {
    id: "83",
    q: "Money, power, fame and sex, pick two.",
    category: "casual"
  },
  eightyFour: {
    id: "84",
    q: "Would you date your friend’s ex?",
    category: "personal"
  },
  eightyFive: {
    id: "85",
    q: "How old are you?",
    category: "casual"
  },
  eightySix: {
    id: "86",
    q: "What is fulfillment for you?",
    category: "personal"
  },
  eightySeven: {
    id: "87",
    q: "Can you initiate sex?",
    category: "personal"
  },
  eightyEight: {
    id: "88",
    q: "What are your hobbies?",
    category: "casual"
  },
  eightyNine: {
    id: "89",
    q: "What is your fondest memory?",
    category: "casual"
  },
  ninety: {
    id: "90",
    q: "Do you watch porn?",
    category: "sexual"
  },
  ninetyOne: {
    id: "91",
    q: "Have you ever sent your nude picture?",
    category: "sexual"
  },
  ninetyTwo: {
    id: "92",
    q: "Are you dominant in bed?",
    category: "sexual"
  },
  ninetyThree: {
    id: "93",
    q: "What is your favourite food?",
    category: "casual"
  },
  ninetyFour: {
    id: "94",
    q: "What is your saddest moment?",
    category: "personal"
  },
  ninetyFive: {
    id: "95",
    q: "Do you like being explored sexually?",
    category: "sexual"
  },
  ninetySix: {
    id: "96",
    q: "What turns you on?",
    category: "sexual"
  },
  ninetySeven: {
    id: "97",
    q: "Are you a good kisser?",
    category: "sexual"
  },
  ninetyEight: {
    id: "98",
    q: "How many rounds of sex can you go?",
    category: "sexual"
  },
  ninetyNine: {
    id: "99",
    q: "What is your favourite spot to be kissed?",
    category: "sexual"
  },
  oneHundred: {
    id: "100",
    q: "Do you like PDA?",
    category: "sexual"
  },
  oneOone: {
    id: "101",
    q: "Have you ever masturbated?",
    category: "sexual"
  },
  oneOtwo: {
    id: "102",
    q: "Has a stranger seen your boobs/dick mistakenly?",
    category: "sexual"
  },
  oneOthree: {
    id: "103",
    q: "What is your sexual fantasy?",
    category: "sexual"
  },
  oneOfour: {
    id: "104",
    q: "Have you ever done friends with benefits?",
    category: "casual"
  },
  oneOfive: {
    id: "105",
    q: "If you could have sex with a celebrity, who would it be?",
    category: "sexual"
  },
  oneOsix: {
    id: "106",
    q: "What are your special talents?",
    category: "casual"
  },
  oneOseven: {
    id: "107",
    q: "Have you ever wished you could start life all over again?",
    category: "personal"
  },
  oneOeight: {
    id: "108",
    q: "What is your birth date?",
    category: "casual"
  },

}

module.exports = allQuestions;
