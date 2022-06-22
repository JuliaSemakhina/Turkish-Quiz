const username = document.querySelector('#username');
const resultText = document.querySelector('#result-text');
const resultPhoto = document.querySelector('#result-photo');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;
console.log(finalScore);


const loader = document.querySelector('.loader');
const main = document.querySelector('.main');

function init(){
    setTimeout(()=>{
        loader.style.opacity = 0;
        loader.style.display = 'none';

        main.style.display = "block";
        setTimeout(()=> main.style.opacity = 1, 50);
    }, 4000);
}

init();

finalScore.innerText = mostRecentScore;
if(finalScore.innerText >= 1200 && finalScore.innerText <= 1500 ){
    resultText.innerHTML = "Вы местный житель!";
    resultPhoto.src = 'img/Local.jpg';
} else if(finalScore.innerText >=600  && finalScore.innerText <= 1200){
    resultText.innerHTML = "Вы настоящий турист!";
    resultPhoto.src = 'img/touristas.jpg';
}
else {
    resultText.innerHTML = "Вы домосед!";
    resultPhoto.src = 'img/barsik.jpg';
}

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;

})

saveHighScore = e => {
    e.preventDefault();
    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('highscores.html');
}