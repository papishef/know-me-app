///////////////////THIS FILE CONTAIN ALL THE QUESTIONS////////////////////////////
//jshint esversion: 6
const allQuestions = [
   {
    id: "1",
    q: "If a genie could grant your most important wish, what would it be?",
    category: "personal"
  },
  {
    id: "2",
    q: "What is your greatest fear?",
    category: "personal"
  },
  {
    id: "3",
    q: "If you were to die for someone, who would it be?",
    category: "personal"
  },
  {
    id: "4",
    q: "What do you do?",
    category: "Professional"
  },
  {
    id: "5",
    q: "Who is that one person you can tell anything?",
    category: "personal"
  },
  {
    id: "6",
    q: "What is your full name?",
    category: "personal"
  },
  {
    id: "7",
    q: "Have you ever smoked?",
    category: "social"
  },
  {
    id: "8",
    q: "Have you done oral sex before?",
    category: "sexual"
  },
  {
    id: "9",
    q: "Do you love quickies?",
    category: "sexual"
  },
  {
    id: "10",
    q: "What is your birth date?",
    category: "personal"
  },
  {
    id: "11",
    q: "What is your favorite sex position?",
    category: "sexual"
  },
  {
    id: "12",
    q: "If you had to travel far away for a long period, where would you rather go?",
    category: "casual"
  },
  {
    id: "13",
    q: "What is your current relationship status?",
    category: "personal"
  },
  {
    id: "14",
    q: "Do you think it is necessary to reveal your past to your current boyfriend/girlfriend?",
    category: "personal"
  },
  {
    id: "15",
    q: "Do you prefer romance novels to adventures?",
    category: "casual"
  },
  {
    id: "16",
    q: "Have you ever done hard drugs?",
    category: "personal"
  },
  {
    id: "17",
    q: "When was the last time you cried?",
    category: "personal"
  },
  {
    id: "18",
    q: "Do you have a female best friend or a male best friend?",
    category: "casual"
  },
  {
    id: "19",
    q: "Are you bi-sexual or heterosexual?",
    category: "personal"
  },
  {
    id: "20",
    q: "What part of your body do you think mostly attracts the opposite sex to you?",
    category: "casual"
  },
  {
    id: "21",
    q: "Are you an introvert or an extrovert?",
    category: "social"
  },
  {
    id: "22",
    q: "What is your longest sex duration?",
    category: "sexual"
  },
  {
    id: "23",
    q: "Between sex and romance, which do you enjoy most?",
    category: "sexual"
  },
  {
    id: "24",
    q: "If I asked politely, would you watch porn with me?",
    category: "sexual"
  },
  {
    id: "25",
    q: "What is your genre of music?",
    category: "casual"
  },
  {
    id: "26",
    q: "Do you prefer having sex with condoms or raw (without)?",
    category: "sexual"
  },
  {
    id: "27",
    q: "What is your most embarrassing moment?",
    category: "social"
  },
  {
    id: "28",
    q: "If you had the opportunity to change anything about yourself, what would it be?",
    category: "personal"
  },
  {
    id: "29",
    q: "What is your worst mistake?",
    category: "personal"
  },
  {
    id: "30",
    q: "Are you a screamer or a moaner during sex?",
    category: "sexual"
  },
  {
    id: "31",
    q: "What is that one thing you are very proud of?",
    category: "personal"
  },
  {
    id: "32",
    q: "What are you most grateful for?",
    category: "personal"
  },
  {
    id: "33",
    q: "Which would you rather prefer for relaxation; a book or movie?",
    category: "casual"
  },
  {
    id: "34",
    q: "Have you ever thought of committing suicide?",
    category: "personal"
  },
  {
    id: "35",
    q: "What is your favorite Television show?",
    category: "casual"
  },
  {
    id: "36",
    q: "What are you putting on at the moment?",
    category: "sexual"
  },
  {
    id: "37",
    q: "Have you ever survived a life-threatening disease?",
    category: "personal"
  },
  {
    id: "38",
    q: "Do you prefer a light-skinned or a dark-skinned guy/girl?",
    category: "casual"
  },
  {
    id: "39",
    q: "Can you reveal all of your sexual history to your boyfriend/girlfriend? ",
    category: "personal"
  },
  {
    id: "40",
    q: "What is your major weakness?",
    category: "personal"
  },
  {
    id: "41",
    q: "Have you ever gone back to an ex?",
    category: "personal"
  },
  {
    id: "42",
    q: "What is your G-spot?",
    category: "sexual"
  },
  {
    id: "43",
    q: "Has your heart ever been broken?",
    category: "personal"
  },
  {
    id: "44",
    q: "Can you give a blowjob if your boyfriend/girlfriend asks for it?",
    category: "sexual"
  },
  {
    id: "45",
    q: "What is your ideal man/woman?",
    category: "casual"
  },
  {
    id: "46",
    q: "Have you ever asked a guy out?",
    category: "casual"
  },
  {
    id: "47",
    q: "How do you handle rejection?",
    category: "casual"
  },
  {
    id: "48",
    q: "What is your position on sex before marriage?",
    category: "casual"
  },
  {
    id: "49",
    q: "What is your deal breaker in a relationship?",
    category: "casual"
  },
  {
    id: "50",
    q: "Would you forgive a cheating partner?",
    category: "personal"
  },
  {
    id: "51",
    q: "Where is the weirdest place you have ever had sex?",
    category: "casual"
  },
  {
    id: "52",
    q: "Have you ever had an abusive partner?",
    category: "casual"
  },
  {
    id: "53",
    q: "What advice would you give to your younger self?",
    category: "personal"
  },
  {
    id: "54",
    q: "Have you ever been sexually abused?",
    category: "personal"
  },
  {
    id: "55",
    q: "Have your ever had a near-death experience?",
    category: "casual"
  },
  {
    id: "56",
    q: "What is your worst fear?",
    category: "personal"
  },
  {
    id: "57",
    q: "What is your most memorable moment yet?",
    category: "casual"
  },
  {
    id: "58",
    q: "If you had a pet, what would it be?",
    category: "casual"
  },
  {
    id: "59",
    q: "Are you a virgin?",
    category: "personal"
  },
  {
    id: "60",
    q: "Between attention, sex and money, what do you crave most from a guy?",
    category: "casual"
  },
  {
    id: "61",
    q: "At what age did you have your first sex?",
    category: "sexual"
  },
  {
    id: "62",
    q: "What are you fondly called?",
    category: "casual"
  },
  {
    id: "63",
    q: "Does having sex on a first date make you loose?",
    category: "sexual"
  },
  {
    id: "64",
    q: "Have you ever cheated on your boyfriend/girlfriend?",
    category: "personal"
  },
  {
    id: "65",
    q: "Have you ever had a one-night stand?",
    category: "sexual"
  },
  {
    id: "66",
    q: "Are you good at playing games?",
    category: "casual"
  },
  {
    id: "67",
    q: "Do you have a celebrity crush?",
    category: "casual"
  },
  {
    id: "68",
    q: "Do you have a deep secret you can never ever let out?",
    category: "casual"
  },
  {
    id: "69",
    q: "What is that one bad habit you are addicted to?",
    category: "personal"
  },
  {
    id: "70",
    q: "What is that one thing you cherish most in a guy/girl?",
    category: "casual"
  },
  {
    id: "71",
    q: "What is your zodiac sign?",
    category: "personal"
  },
  {
    id: "72",
    q: "What is your bra size?",
    category: "sexual"
  },
  {
    id: "73",
    q: "If you were an animal, which would you rather be?",
    category: "casual"
  },
  {
    id: "74",
    q: "What is the duration of your longest relationship?",
    category: "personal"
  },
  {
    id: "75",
    q: "Have you ever ever dated a person you never loved?",
    category: "sexual"
  },
  {
    id: "76",
    q: "What is the most daring thing you have ever done?",
    category: "casual"
  },
  {
    id: "77",
    q: "What is your favorite number?",
    category: "casual"
  },
  {
    id: "78",
    q: "Have you ever ever dated a person you never loved?",
    category: "sexual"
  },
  {
    id: "79",
    q: "What is the most daring thing you have ever done?",
    category: "casual"
  },
  {
    id: "80",
    q: "What is your favorite number?",
    category: "casual"
  },
  {
    id: "81",
    q: "Have you ever crushed on your friend’s boyfriend/girlfriend?",
    category: "sexual"
  },
  {
    id: "82",
    q: "How long can you stay without having sex?",
    category: "personal"
  },
  {
    id: "83",
    q: "What is that one thing you can’t live without?",
    category: "casual"
  },
  {
    id: "84",
    q: "Can you stay in a room for a month with someone you love without sexually touching him/her?",
    category: "sexual"
  },
  {
    id: "85",
    q: "If you were to live without sex or money for the rest of your life, which would you rather choose?",
    category: "casual"
  },
  {
    id: "86",
    q: "Money, power, fame and sex, pick two.",
    category: "casual"
  },
  {
    id: "87",
    q: "Would you date your friend’s ex?",
    category: "personal"
  },
  {
    id: "88",
    q: "How old are you?",
    category: "casual"
  },
  {
    id: "89",
    q: "What is fulfillment for you?",
    category: "personal"
  },
  {
    id: "90",
    q: "Can you initiate sex?",
    category: "personal"
  },
  {
    id: "91",
    q: "What are your hobbies?",
    category: "casual"
  },
  {
    id: "92",
    q: "What is your fondest memory?",
    category: "casual"
  },
  {
    id: "93",
    q: "Do you watch porn?",
    category: "sexual"
  },
  {
    id: "94",
    q: "Have you ever sent your nude picture?",
    category: "sexual"
  },
  {
    id: "95",
    q: "Are you dominant in bed?",
    category: "sexual"
  },
  {
    id: "96",
    q: "What is your favourite food?",
    category: "casual"
  },
  {
    id: "97",
    q: "What is your saddest moment?",
    category: "personal"
  },
  {
    id: "98",
    q: "Do you like being explored sexually?",
    category: "sexual"
  },
  {
    id: "99",
    q: "What turns you on?",
    category: "sexual"
  },
  {
    id: "100",
    q: "Are you a good kisser?",
    category: "sexual"
  },
  {
    id: "101",
    q: "How many rounds of sex can you go?",
    category: "sexual"
  },
  {
    id: "102",
    q: "What is your favourite spot to be kissed?",
    category: "sexual"
  },
  {
    id: "103",
    q: "Do you like PDA?",
    category: "sexual"
  },
  {
    id: "104",
    q: "Have you ever masturbated?",
    category: "sexual"
  },
  {
    id: "105",
    q: "Has a stranger seen your boobs/dick mistakenly?",
    category: "sexual"
  },
  {
    id: "106",
    q: "What is your sexual fantasy?",
    category: "sexual"
  },
  {
    id: "107",
    q: "Have you ever done friends with benefits?",
    category: "casual"
  },
  {
    id: "108",
    q: "If you could have sex with a celebrity, who would it be?",
    category: "sexual"
  },
  {
    id: "109",
    q: "What are your special talents?",
    category: "casual"
  },
  {
    id: "110",
    q: "Have you ever wished you could start life all over again?",
    category: "personal"
  },
  {
    id: "111",
    q: "What is your birth date?",
    category: "casual"
  },

];

module.exports = allQuestions;
