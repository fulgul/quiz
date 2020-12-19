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

let startAudio = new Audio('./audiofiles/Asian-mood.mp3')
let endAudio = new Audio("./audiofiles/End-music.mp3")
let audio;

let questions = [
    {
    number: 1,
    question: "Vad heter den som blir intervjuad?",
    answer: " Elnour",
    options: [
      "Elnuur",
      "Elnoor",
      "Gustav II Adolf",
      "Elnour"
    ],
    filepath: "./audiofiles/Question1.mp3"
  },
    {
    number: 2,
    question: "Vem är det som heter Anton?",
    answer: " Den korta killen",
    answer2: " Vet inte men jag vill också va en kyckling pej",
    options: [
      "Vet inte men jag vill också va en kyckling pej",
      "Han med mustasch",
      "Den korta killen",
      "Kameramannen"
    ],
    filepath: "./audiofiles/Question2.mp3"
  },
    {
    number: 3,
    question: "Vilket land kommer dansarna ifrån?",
    answer: " Ghana",
    options: [
      "Ghana",
      "USA",
      "Sydafrika",
      "Mongoliet"
    ],
    filepath:"./audiofiles/Question3.mp3"
  },
    {
    number: 4,
    question: "Do you know da way?",
    answer: " Yes",
    answer2: " It's right here aint it ⬊",
    options: [
      "Yes",
      "No, could you show me?",
      "Two blocks straight ahead and then a right turn",
      "It's right here aint it ⬊"
    ],
    filepath:"./audiofiles/Question4.mp3"
  },
    {
    number: 5,
    question: "Vad heter mannen i bakgrunden?",
    answer: " Jimmy Barnes",
    options: [
      "Mark Zuckerberg",
      "Jimmy Barnes",
      "Du menar min farfar?",
      "Jim Barne"
    ],
    filepath:"./audiofiles/Question5.mp3"
  },
];

startButton.onclick = ()=>{
    infoBox.classList.add("activeInfo");
    startAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
    startAudio.play();
    startButton.classList.add("hide")

}

exitButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
    startAudio.pause();
    startAudio.currentTime = 0;
    startButton.classList.remove("hide")
}

continueButton.onclick = ()=>{
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    fadeOut(startAudio);

}

restartQuiz.onclick = ()=>{
    debugger
    fadeOut(endAudio);
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
    if (questionCount === 0){
        document.querySelector(".quiz-box").classList.remove("quiz-box-first")
    }

    if(questionCount < questions.length - 1){
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        questionCounter(questionNumber);
        nextButton.classList.remove("show");
    }
    else{
        showResult();
        endAudio.play();

    }


}

function showQuestions(index) {
    debugger
    if (index === 0){
        document.querySelector(".quiz-box").classList.add("quiz-box-first")
        optionList.classList.add("non-clickable")
        setTimeout(function() {
            audio = new Audio (questions[index].filepath);
            audio.play();
            optionList.classList.remove("non-clickable")
          }, 2000);
    }
    else{
        audio = new Audio (questions[index].filepath);
        audio.play();
    }
    let questionText = document.querySelector(".question-text");
    let questionTag = '<span>' + questions[index].number +  "." + questions[index].question + '</span>';
    let optionTag = '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[0] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[1] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[2] + '</span></div>' + '<div class="option" onclick="optionSelected(this)"> <span>' + questions[index].options[3] + '</span></div>';
    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
}

function optionSelected(answer){
    debugger
    let userAns = answer.textContent;
    let correcAns = questions[questionCount].answer;
    let correct2 = questions[questionCount].answer2;
    let allOptions = optionList.children.length;

    if(userAns === correcAns || userAns === correct2){
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
    }
    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled");
    }
    nextButton.classList.add("show");
    audio.pause();
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

function fadeOut(sound) {
    debugger
    if(sound.volume > 0.05) {
      setTimeout(function() {
        sound.volume -= 0.05;
        fadeOut(sound);
      }, 300);
    }
    else if(sound.volume > 0.005) {
        setTimeout(function() {
          sound.volume -= 0.005;
          fadeOut(sound);
        }, 300);
      }

    else{
        sound.volume = 0;
        sound.pause();
        sound.currentTime = 0;
    }

    


  }