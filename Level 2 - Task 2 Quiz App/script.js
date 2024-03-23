const quizData = [
    {
        question: 'What is the capital of India?',
        options: ['Paris', 'New Delhi', 'Berlin', 'Madrid'],
        answer: 'New Delhi',
    },
    {
        question: 'What is the name of the process by which plants convert sunlight into energy?',
        options: ['Photosynthesis', 'Respiration', 'Oxidation', 'Evolution'],
        answer: 'Photosynthesis',
    },
    {
        question: 'Which country won the ICC Cricket World Cup in 2011?',
        options: ['England', 'Australia', 'India', 'West Indies'],
        answer: 'India',
    },
    {
        question: 'What is the tallest mountain peak in the world?',
        options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
        answer: 'Mount Everest',
    },
    {
        question: 'Which is the largest ocean on Earth?',
        options: [
            'Pacific Ocean',
            'Indian Ocean',
            'Atlantic Ocean',
            'Arctic Ocean',
        ],
        answer: 'Pacific Ocean',
    },
    {
        question: 'What is the name of the largest country in the world by area?',
        options: ['Mangolia', 'Japan', 'Russia', 'Spain'],
        answer: 'Russia',
    },
    {
        question: 'Who painted the Mona Lisa?',
        options: [
            'Pablo Picasso',
            'Vincent van Gogh',
            'Leonardo da Vinci',
            'Michelangelo',
        ],
        answer: 'Leonardo da Vinci',
    },
    {
        question: 'Who has won the most total Academy Awards?',
        options: ['Edith Head', 'Dennis Muren', 'Walt Disney', 'Joseph Ruttenberg'],
        answer: 'Walt Disney',
    },
    {
        question: 'What character have both Robert Downey Jr. and Benedict Cumberbatch played',
        options: [
            'Doctor Strange',
            'Sherlock Holmes',
            'Iron Man',
            'Captain America',
        ],
        answer: 'Sherlock Holmes',
    },
    {
        question: "Who is the world's highest-paid athlete in 2021?",
        options: ['Conor McGregor', 'Cristiano Ronaldo', 'Virat Kohli', 'Harry Kane'],
        answer: 'Conor McGregor',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();