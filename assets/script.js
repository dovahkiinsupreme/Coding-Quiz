//application elements for javascript manipulation

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
var timer = document.getElementById("timer");
var timerInterval
var timeLeft = 10

let shuffledQuestions, currentQuestionIndex

//event listeners for function init on click
startButton.addEventListener("click", startGame) 
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
})


//starts game on "start button" click, adds hide class to the start button once game has started
function startGame() {
    startButton.classList.add("hide")
    
//randomizes questions so they're not always in the same order
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
//removes hide class from questions container to allow it to be displayed after start is clicked
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}

//game timer
timerInterval = setInterval(function(){
    timeLeft--
    timer.textContent = "Time Remaining: " + timeLeft
    if (timeLeft <= 0) {
        clearInterval(timerInterval)
    }
},1000)


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
    const selectedButton = b.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
//checks question index. if no questions remain, restart button appears
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }
}
//if selection is correct, background and button change to green, if incorrect, background and button change to red
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
        element.classList.add("correct"), alert("Correct!")
        } else {
        element.classList.add("incorrect", alert("Incorrect!"))
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("incorrect")
}
//Quiz questions array
const questions = [
    {
    question: "What is 2 + 2?",
    answers: [
        {text: "4", correct: true},
        {text: "22", correct: false},
        {text: "null", correct: false},
        {text: "null", correct: false}
    ]
}, 
    {
    question: "What is the square root of 4?",
    answers: [
        {text: "4", correct: false},
        {text: "2", correct: true},
        {text: "8", correct: false},
        {text: "t", correct: false}
    ]
    }





]