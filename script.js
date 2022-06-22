const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const images = document.querySelector('.photo');
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


// API Vibration
window.navigator = window.navigator || {};



let questions = [

    {
        question: 'Как переводится слово Олюдениз?',
        image: 'img/01.jpg',
        choice1: 'Мёртвое море',
        choice2: 'Живое море',
        choice3: 'Голубая Лагуна',
        choice4: 'Глубокое море',
        answer: 1
    },
    {
        question: 'Название деервни, где была построена гробница Аминтаса?',
        image: 'img/1.jpg',
        choice1: 'Фетхие',
        choice2: 'Олюдениз',
        choice3: 'Каунос',
        choice4: 'Телмессос ',
        answer: 4
    },
    {
        question: 'Название места на фото?',
        image: 'img/3.jpg',
        choice1: 'Саклемент',
        choice2: 'Чалыш',
        choice3: 'Гёчек',
        choice4: 'Кидрак',
        answer: 3
    },
    {
        question: 'Название города-призкрака?',
        image: 'img/4.jpg',
        choice1: 'Каякёй',
        choice2: 'Летоон',
        choice3: 'Каяк',
        choice4: 'Ялыкёй',
        answer: 1
    },
    {
        question: 'Кличка кота на фото?',
        image: 'img/6.jpg',
        choice1: 'Беляш',
        choice2: 'Пушок',
        choice3: 'Брат Два',
        choice4: 'Злобный брат-близнец',
        answer: 3
    },
    {
        question: 'Кличка кота на фото?',
        image: 'img/5.jpg',
        choice1: 'Снежок',
        choice2: 'Брат Один',
        choice3: 'Брат Два',
        choice4: 'Пират',
        answer: 4
    },
    {
        question: 'Название пляжа на фото?',
        image: 'img/7.jpg',
        choice1: 'Кирдык',
        choice2: 'Кидрак',
        choice3: 'Галечный пляж',
        choice4: 'Гёчек',
        answer: 2
    },
    {
        question: 'Название горы с двумя пиками?',
        image: 'img/111.jpg',
        choice1: 'Бабадук',
        choice2: 'Бабадаг',
        choice3: 'Твин Пикс',
        choice4: 'Бешпармак',
        answer: 2
    },
    {
        question: 'Город, где растут гранаты и есть амфитеатр?',
        image: 'img/9.jpg',
        choice1: 'Ксанф',
        choice2: 'Летоон',
        choice3: 'Каунос',
        choice4: 'Тлос',
        answer: 4
    },
    {
        question: 'Руины древнего религиозного комплекса?',
        image: 'img/10.jpg',
        choice1: 'Летоон',
        choice2: 'Патара',
        choice3: 'Ксанф',
        choice4: 'Фетхие',
        answer: 3
    },
    {
        question: 'Город, где дул сильный ветер?',
        image: 'img/11.jpg',
        choice1: 'Летоон',
        choice2: 'Саклекент',
        choice3: 'Хисароню',
        choice4: 'Тлос',
        answer: 1
    },
    {
        question: 'В каком городе мы жили?',
        image: 'img/12.jpg',
        choice1: 'Олюдениз',
        choice2: 'Фетхие',
        choice3: 'Саклекент',
        choice4: 'Хисароню',
        answer: 4
    },
    {
        question: 'Вид на что открывается со скалы?',
        image: 'img/13.jpg',
        choice1: 'На Голубую Лагуну',
        choice2: 'На ущелье Саклекент',
        choice3: 'На море',
        choice4: 'На Долину Бабочек',
        answer: 4
    },
    {
        question: 'Название занменитой тропы побережья?',
        image: 'img/14.jpg',
        choice1: 'Тропа Великанов',
        choice2: 'Ликийская тропа',
        choice3: 'Дорога из кирпича',
        choice4: 'Тропа Хошимина',
        answer: 2
    },
    {
        question: 'Что за место на фото?',
        image: 'img/15jpg.jpg',
        choice1: 'Олюдениз',
        choice2: 'Голубая Лагуна',
        choice3: 'о. Майорка',
        choice4: 'Пляж Кидрак',
        answer: 3
    }

];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 15;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++;
    progressText.innerText = `Вопрос ${questionCounter} из ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    images.src = `${currentQuestion.image}`;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return

        function vibration() {
            navigator.vibrate(1000);
          };
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();