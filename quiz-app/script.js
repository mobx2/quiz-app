let questionMain = document.querySelector(".question-main");
let quizApp = document.querySelector(".quiz-app-container");
console.log(quizApp);

let results = document.querySelector(".results");

let timerDiv = document.createElement("div");
timerDiv.classList.add("timer");
timerDiv.innerHTML = 'Time left: <span id="countdown">10</span> seconds';
questionMain.prepend(timerDiv);

let nextBTn = document.createElement("button");
nextBTn.classList.add("next");

let questionsCount = document.createElement("div");
questionsCount.classList.add("questions-count");

for (let i = 0; i < 10; i++) {
  let span = document.createElement("span");
  questionsCount.appendChild(span);
}

nextBTn.innerHTML = "Next Question";

questionMain.appendChild(nextBTn);
questionMain.appendChild(questionsCount);

let currentIndex = 0;
let rightAnswers = 0;
let wrongAnswers = 0;

function getQuestions() {
  let myReq = new XMLHttpRequest();

  myReq.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsData = JSON.parse(this.responseText);

      let questionsArray = jsData.questions;

      let qCount = questionsArray.length;

      createElements(questionsArray[currentIndex], qCount);

      startTimer();

      nextBTn.addEventListener("click", function handleClick() {
        let theRight = questionsArray[currentIndex]?.correctAnswer;

        checkAnswer(theRight, qCount);

        currentIndex++;

        if (currentIndex < qCount) {
          questionMain.innerHTML = "";
          createElements(questionsArray[currentIndex], qCount);
          showBullets(currentIndex);
        } else {
          finalResult(qCount);
        }
      });
    }
  };

  myReq.open("GET", "qustions.json", true);
  myReq.send();
}

let countdownElement;
let timeLeft = 10;
let interval;

function startTimer() {
  clearInterval(interval);

  countdownElement = document.getElementById("countdown");
  timeLeft = 10;

  interval = setInterval(() => {
    countdownElement.textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(interval);
      nextBTn.click();
    }
  }, 1000);
}

getQuestions();

function showBullets(num) {
  let questionsNumber = document.querySelector(".number");
  questionsNumber.innerHTML = num;

  let bullets = document.querySelectorAll(".questions-count span");

  for (let i = 0; i < num; i++) {
    bullets[i].classList.add("on");
  }
}

function createElements(c, obj) {
  questionMain.innerHTML = "";

  // Reset timer
  clearInterval(interval);
  timeLeft = 10;

  // Create Timer
  let timerDiv = document.createElement("div");
  timerDiv.classList.add("timer");
  timerDiv.innerHTML = 'Time left: <span id="countdown">10</span> seconds';

  // Create quiz title
  let quizTitle = document.createElement("p");
  quizTitle.classList.add("quiz-title");

  let title = document.createElement("span");
  title.classList.add("title");
  title.innerHTML = "Frontend Development Quiz";

  quizTitle.appendChild(title);

  let questionsNumber = document.createElement("span");
  questionsNumber.classList.add("question-number");
  questionsNumber.innerHTML = "Question number: ";

  quizTitle.appendChild(questionsNumber);

  let number = document.createElement("span");
  number.classList.add("number");
  questionsNumber.appendChild(number);

  // Create Question section
  let question = document.createElement("div");
  question.classList.add("question");

  let questionName = document.createElement("p");
  questionName.classList.add("question-name");
  questionName.innerHTML = c.question;
  question.appendChild(questionName);

  // Create options
  let options = document.createElement("ul");
  options.classList.add("options");

  for (let i = 0; i < 4; i++) {
    let answerDiv = document.createElement("div");
    answerDiv.classList.add("answer");

    let input = document.createElement("input");
    input.type = "radio";
    input.id = `answer_${i + 1}`;
    input.name = "question";
    input.setAttribute(`data-answer`, c.options[i]);

    if (i === 0) {
      input.checked = true;
    }

    let label = document.createElement("label");
    label.setAttribute("for", `answer_${i + 1}`);
    label.innerHTML = c.options[i];

    answerDiv.appendChild(input);
    answerDiv.appendChild(label);

    options.appendChild(answerDiv);
    question.appendChild(options);
  }

  // Add elemnts to questionMain
  questionMain.appendChild(timerDiv);
  questionMain.appendChild(quizTitle);
  questionMain.appendChild(question);
  questionMain.appendChild(nextBTn);
  questionMain.appendChild(questionsCount);

  startTimer(); // Start timer for each question
}

function checkAnswer(rAnswer, c) {
  let answers = document.getElementsByName("question");

  let theChosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAnswer = answers[i].dataset.answer;
    }
  }

  if (theChosenAnswer === rAnswer) {
    rightAnswers++;

    console.log(`Good Answer`);
  } else {
    wrongAnswers++;
    console.log(`Bad answer`);
  }
}

function finalResult(c) {
  let theResult;

  if (currentIndex === c) {
    // questionMain.remove();

    // console.log("ALOOOOOOOOOOOOOOOOOOOO");

    if (rightAnswers > c / 2 && rightAnswers < c) {
      theResult = `<span class="good">Good ${rightAnswers} from ${count}</span>`;
    } else if (rightAnswers === c) {
      theResult = `<span class="perfect">Perfect</span> All answers is good `;
    } else {
      theResult = `<span class="bad"> bad ${rightAnswers} from ${c}</span>`;
    }

    questionMain.innerHTML = "";
    let resultDiv = document.createElement("div");
    resultDiv.classList.add("result");
    resultDiv.innerHTML = theResult;

    questionMain.appendChild(resultDiv);
  }
}
