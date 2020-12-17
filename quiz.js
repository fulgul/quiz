let startButton = document.querySelector(".start-button button");
let infoBox = document.querySelector(".info-box");
let exitButton = infoBox.querySelector(".buttons .quit");
let continueButton = infoBox.querySelector(".buttons .restart");
let quizBox = document.querySelector(".quiz-box");
let resultBox = document.querySelector(".result-box");
let optionList = document.querySelector(".option-list");
let restartQuiz = resultBox.querySelector(".buttons .restart");
let quitQuiz = resultBox.querySelector(".buttons .quit");
let nextButton = document.querySelector("footer .next-button");
let bottomQuestionCounter = document.querySelector("footer .total-questions")
let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


let questions = [
    {
    number: 1,
    question: "What does HTML stand for?",
    answer: " Hyper Text Markup Language",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language"
    ]
  },
    {
    number: 2,
    question: "What does CSS stand for?",
    answer: " Cascading Style Sheet",
    options: [
      "Common Style Sheet",
      "Colorful Style Sheet",
      "Computer Style Sheet",
      "Cascading Style Sheet"
    ]
  },
    {
    number: 3,
    question: "What does PHP stand for?",
    answer: " Hypertext Preprocessor",
    options: [
      "Hypertext Preprocessor",
      "Hypertext Programming",
      "Hypertext Preprogramming",
      "Hometext Preprocessor"
    ]
  },
    {
    number: 4,
    question: "What does SQL stand for?",
    answer: " Structured Query Language",
    options: [
      "Stylish Question Language",
      "Stylesheet Query Language",
      "Statement Question Language",
      "Structured Query Language"
    ]
  },
    {
    number: 5,
    question: "What does XML stand for?",
    answer: " eXtensible Markup Language",
    options: [
      "eXtensible Markup Language",
      "eXecutable Multiple Language",
      "eXTra Multi-Program Language",
      "eXamine Multiple Language"
    ]
  },
];

startButton.onclick = ()=>{
    infoBox.classList.add("activeInfo");
}

exitButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
}

continueButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
}

restartQuiz.onclick = ()=>{
    debugger
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    questionCount = 0;
    questionNumber = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumber);
    nextButton.classList.remove("show");
}

quitQuiz.onclick = ()=>{    
    window.location.reload();
}

nextButton.onclick = () =>{
    debugger
    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        nextButton.classList.remove("show");
    }
    else{
        showResult();
    }
}

function showQuestions(index) {
    let questionText = document.querySelector(".question-text");
    let questionTag = '<span>' + questions[index].number +  "." + questions[index].question + '</span>';
    let optionTag = '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[0] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[1] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[2] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[3] + '</span></div>';
    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correcAns = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if(userAns === correcAns){
        userScore += 1;
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(optionList.children[i].textContent == correcAns){
                optionList.children[i].classList.add("correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
        console.log("Auto selected correct answer.");
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled");
    }
    nextButton.classList.add("show");
}

function showResult(){
    infoBox.classList.remove("activeInfo")
    quizBox.classList.remove("activeQuiz")
    resultBox.classList.add("activeResult")
    let scoreText = resultBox.querySelector(".score-text")
    if (userScore > 3){ 
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function questionCounter(index){
    let totalQuestionCountTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottomQuestionCounter.innerHTML = totalQuestionCountTag; 
}