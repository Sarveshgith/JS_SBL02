const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const startScreen = document.getElementById('startScreen')
const quizScreen = document.getElementById('quizScreen')
const resultScreen = document.getElementById('resultScreen')
const progressBar = document.getElementById('progressBar')
const questionBar = document.getElementById('questionBar')
const options = document.getElementById('options')
const resultText = document.getElementById('resultText')

let currentQuestionNo = 0
let score = 0
let questions = []

const showScreen = (screen) => {
    startScreen.classList.remove('active')
    quizScreen.classList.remove('active')
    resultScreen.classList.remove('active')
    screen.classList.add('active')
}

const loadQuestion = () => {
    if (currentQuestionNo >= questions.length) {
        showResult()
        return
    }

    const currentQuestion = questions[currentQuestionNo]
    progressBar.textContent = `Question ${currentQuestionNo + 1} of ${questions.length}`
    questionBar.textContent = currentQuestion.question
    options.innerHTML = ''

    currentQuestion.options.forEach((optionText) => {
        const optionBtn = document.createElement('button')
        optionBtn.textContent = optionText

        optionBtn.addEventListener('click', () => {
            verifyAnswer(optionText, optionBtn)
        })

        options.appendChild(optionBtn)
    })
}

const verifyAnswer = (selectedOption, selectedBtn) => {
    const currentQuestion = questions[currentQuestionNo]
    const allOptionButtons = options.querySelectorAll('button')

    allOptionButtons.forEach((btn) => {
        btn.disabled = true
    })

    if (selectedOption === currentQuestion.answer) {
        score += 1
        selectedBtn.classList.add('correct')
    } else {
        selectedBtn.classList.add('wrong')

        const correctBtn = [...allOptionButtons].find(
            (btn) => btn.textContent === currentQuestion.answer
        )

        if (correctBtn) {
            correctBtn.classList.add('correct')
        }
    }

    setTimeout(() => {
        currentQuestionNo += 1
        loadQuestion()
    }, 800)
}

const showResult = () => {
    showScreen(resultScreen)
    resultText.textContent = `You scored ${score} out of ${questions.length}`
}

const startQuiz = async () => {
    try {
        const response = await fetch('questions.json')

        if (!response.ok) {
            throw new Error('Failed to load questions')
        }

        questions = await response.json()

        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error('No questions found')
        }

        currentQuestionNo = 0
        score = 0
        showScreen(quizScreen)
        loadQuestion()
    } catch (error) {
        showScreen(startScreen)
        questionBar.textContent = ''
        options.innerHTML = ''
        alert('Unable to load questions. Please check questions.json')
    }
}

startBtn.addEventListener('click', startQuiz)
restartBtn.addEventListener('click', startQuiz)