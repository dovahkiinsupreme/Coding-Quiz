//application elements for javascript manipulation

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const highScore = document.getElementById("endGame")
const highScoreContainer = document.getElementById("highScoreContainer")
const replayButton = document.getElementById("replay")

var timer = document.getElementById("timer")
var highscoreInputName = document.getElementById("init")
var timerInterval
var timeLeft = 30

let shuffledQuestions, currentQuestionIndex

//event listeners for function init on click
startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


//starts game and game timer on "start button" click, adds hide class to the start button once game has started
function startGame() {
    startButton.classList.add("hide") 
    
    timerInterval = setInterval(function() {
        timeLeft--
        timer.textContent = "Time Remaining: " + timeLeft
        if (timeLeft === 0) {
            clearInterval(timerInterval)
            alert("Sorry, your time is up!")
        }
    },1000)
    

//randomizes questions so they're not always in the same order
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
//removes hide class from questions container to allow it to be displayed after start is clicked
    questionContainerElement.classList.remove("hide")
    setNextQuestion();
}


//after "next" button is clicked, queues up the next question in random order by calling the shuffle questions function
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//displays question text from questions array inside button text
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")

//checks question boolean true/false from questions array
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }

//event listener for a click on each respective answer
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//resets background color change from correct/incorrect when next button is pressed
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}
//checks answer selection using boolean true/false from questions array
function selectAnswer(b) {
    const selectedButton = b.target;
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
//checks question index. if no questions remain, restart button appears and hides question options
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        //startButton.innerText = "Restart"
        //startButton.classList.remove("hide")
        highScore.classList.remove("hide")
        questionContainerElement.classList.add("hide")
        highScoreContainer.classList.remove("hide")
    }
}

//if selection is correct, background and button change to green, if incorrect, background and button change to red
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct")
        } else {
        element.classList.add("incorrect")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
}

function restart() {
    window.location.reload()
}

var score = 0

if (correct = true) score++


enterScore.addEventListener("click", function highscore(){

    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };

        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }

});


//Quiz questions array
const questions = [
    {
    question: "How do you create a function?",
    answers: [
        {text: "function:myFunction()", correct: false},
        {text: "function=myFunction()", correct: false},
        {text: "function myFunction()", correct: true},
        {text: "myFunction():Function", correct: false}
    ]
}, 
    {
    question: "How do you call a function named myFunction?",
    answers: [
        {text: "call myFunction()", correct: false},
        {text: "myFunction()", correct: true},
        {text: "call function myFunction", correct: false},
        {text: "call.myFunction()", correct: false}
    ]
},
    {
    question: "Inside which HTML element to we put the JavaScript?",
    answers: [
        {text: "<script>", correct: true},
        {text: "<js>", correct: false},
        {text: "<src>", correct: false},
        {text: "<javascript>", correct: false}
    ]
},
{
    question: "How do you write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: [
        {text: "if i <> 5", correct: false},
        {text: "if (i <> 5)", correct: false},
        {text: "if i =! 5 then", correct: false},
        {text: "if (i != 5)", correct: true}
    ]
},
{
    question: "What is the correct way to write a JavaScript array?",
    answers: [
        {text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false},
        {text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false},
        {text: "var colors = ['red', 'green', 'blue'] ", correct: true},
        {text: "var colors = 'red', 'green', 'blue'", correct: false}
    ]
},

{
    question: "Which operator is used to assign a value to a variable?",
    answers: [
        {text: "=", correct: true},
        {text: "x", correct: false},
        {text: "*", correct: false},
        {text: "--", correct: false}
    ]
}
]