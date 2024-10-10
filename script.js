let score = 0;
let qCount = 1;

let correctSound = new Audio("check-mark_oPG7Xo5.mp3");
let incorrectSound = new Audio("negative-effect.mp3");

function generateQuiz() {
    const body = document.querySelector('body');
    body.innerHTML = "";
    const main = document.createElement("main");

    const score = document.createElement('div');
    score.className = "score"
    const scoreText = document.createElement('h1');
    scoreText.textContent = "Score:";
    scoreText.id = "points";
    score.appendChild(scoreText);

    const count = document.createElement('div');
    count.className = "count";
    const countText = document.createElement('h1');
    countText.textContent = "/10";
    countText.id = "questionCount";
    count.appendChild(countText);

    const quizContainer = document.createElement('div');
    quizContainer.className = "quiz-container";
    const quizText = document.createElement('h1');
    quizText.className = "question";
    quizContainer.appendChild(quizText);

    const answers = document.createElement('div');
    answers.className = "answer-container";

    const btn1 = document.createElement('button');
    btn1.classList.add("btn");
    btn1.id ="1"
    answers.appendChild(btn1);

    const btn2 = document.createElement('button');
    btn2.classList.add("btn");
    btn2.id = "2";
    answers.appendChild(btn2);


    const btn3 = document.createElement('button');
    btn3.classList.add("btn");
    btn3.id = "3";
    answers.appendChild(btn3);


    const btn4 = document.createElement('button');
    btn4.classList.add("btn");
    btn4.id = "4"
    answers.appendChild(btn4);

    const next = document.createElement('div');
    next.className = 'next-container';
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('next');
    nextBtn.textContent = "next";
    next.appendChild(nextBtn);

    main.appendChild(score);
    main.appendChild(count);
    main.appendChild(quizContainer);
    main.appendChild(answers);
    main.appendChild(next);

    body.appendChild(main);
}

function shuffle() {
    const array = [1, 2, 3, 4];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
}

function answerHandler(corId, incId1, incId2, incId3) {
    document.querySelector('.next-container').style.display = "block"; // Show next button

    const correct = document.getElementById(corId);
    correct.style.backgroundColor = "green";

    const inc1 = document.getElementById(incId1)
    inc1.style.backgroundColor = "red";

    const inc2 = document.getElementById(incId2)
    inc2.style.backgroundColor = "red";

    const inc3 = document.getElementById(incId3)
    inc3.style.backgroundColor = "red";
}

function correctAnswerHandler(corId, incId1, incId2, incId3) {
    correctSound.play();
    score += 10;
    qCount += 1;
    let scoreCount = document.getElementById('points');
    scoreCount.textContent = `Score: ${score}`
    answerHandler(corId, incId1, incId2, incId3);
    document.getElementById(corId).classList.remove('HoverClass1');
    document.getElementById(incId1).classList.remove('HoverClass1');
    document.getElementById(incId2).classList.remove('HoverClass1');
    document.getElementById(incId3).classList.remove('HoverClass1');
}

function incorrectAnswerHandler(corId, incId1, incId2, incId3) {
    incorrectSound.play();
    qCount += 1;
    answerHandler(corId, incId1, incId2, incId3);
    document.getElementById(corId).classList.remove('HoverClass1');
    document.getElementById(incId1).classList.remove('HoverClass1');
    document.getElementById(incId2).classList.remove('HoverClass1');
    document.getElementById(incId3).classList.remove('HoverClass1');
}


let currentQuestionIndex = 0;
let quizData = [];

function generateQnA(target) {
    fetch("https://the-trivia-api.com/v2/questions")
    .then(res => {
        if (!res.ok) {
            console.log("error");
            return;
        } else {
            return res.json();
        }
    })
    .then(data => {
        quizData = data;
        displayQuestion();
    })
}

function displayQuestion() {
    let arr = shuffle();
    const currentQ = quizData[currentQuestionIndex];

    let questionCount= document.getElementById('questionCount');
    questionCount.textContent = `${qCount}/10`

    document.querySelector('.question').textContent = currentQ.question.text;

    let correct = document.getElementById(arr[0].toString());
    correct.style.backgroundColor = "#E5D4ED";
    correct.classList.add('HoverClass1');
    correct.textContent = currentQ.correctAnswer;
    correct.onclick = () => correctAnswerHandler(correct.id, arr[1], arr[2], arr[3]);

    let inc1 = document.getElementById(arr[1].toString());
    inc1.style.backgroundColor = "#E5D4ED";
    inc1.classList.add('HoverClass1');
    inc1.textContent = currentQ.incorrectAnswers[0];
    inc1.onclick = () => incorrectAnswerHandler(correct.id, arr[1], arr[2], arr[3]);

    let inc2 = document.getElementById(arr[2].toString());
    inc2.style.backgroundColor = "#E5D4ED";
    inc2.classList.add('HoverClass1');
    inc2.textContent = currentQ.incorrectAnswers[1];
    inc2.onclick = () => incorrectAnswerHandler(correct.id, arr[1], arr[2], arr[3]);

    let inc3 = document.getElementById(arr[3].toString());
    inc3.style.backgroundColor = "#E5D4ED";
    inc3.classList.add('HoverClass1');
    inc3.textContent = currentQ.incorrectAnswers[2];
    inc3.onclick = () => incorrectAnswerHandler(correct.id, arr[1], arr[2], arr[3])

    document.querySelector('.next-container').style.display = "none"; // Initially hide next button

}

function endScreen() {
    const body = document.querySelector('body')
    body.innerHTML = "";
    const main = document.createElement('main');
    const info = document.createElement('div');
    info.classList.add('info');

    const finalScore = document.createElement('h1'); 
    finalScore.id = "final-score";
    finalScore.textContent = `Your final score: ${score}`; 
    info.appendChild(finalScore); 


    const btn2 = document.createElement('button');
    btn2.id = 'home';
    btn2.textContent = "HOME";
    info.appendChild(btn2);

    main.appendChild(info);
    body.appendChild(main);

    const homeBtn = document.getElementById('home');
    homeBtn.onclick = () => window.location.reload();

    const start = document.getElementById('start');
    start.addEventListener('click', () => {
        generateQuiz();
        generateQnA();
    });

}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        displayQuestion();
    } else {
        endScreen();
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('next')) {
        nextQuestion();
    }
})

const start = document.getElementById('start');
start.addEventListener('click', () => {
    generateQuiz();
    generateQnA();
});


