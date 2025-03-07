// let questionsNumber = document.querySelector(".number");
let question = document.querySelector(".question");
let quizAppContainer = document.querySelector(".quiz-app-container");
let questionMain = document.querySelector(".question-main");
let nextBTn = document.createElement("button");
let results = document.querySelector(".results");
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

// console.log(question);

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

      // console.log(questionsArray[currentIndex]);

      nextBTn.addEventListener("click", function handleClick() {
        let theRight = questionsArray[currentIndex].correctAnswer;

        currentIndex++;
        checkAnswer(theRight, qCount);
        // increase index

        // Remove old question

        questionMain.innerHTML = "";

        createElements(questionsArray[currentIndex], qCount);

        showBullets(currentIndex);

        finalResult();
      });
    }
  };

  // questionsArray[currentIndex].question
  myReq.open("GET", "qustions.json", true);
  myReq.send();
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

function createElements(count, obj) {
  // Create quiz title

  let quizTitle = document.createElement("p");
  quizTitle.classList.add("quiz-title");

  // Create Title

  let title = document.createElement("span");
  title.classList.add("title");
  title.innerHTML = "Frontend Development Quiz";

  // append title to quizTitle

  quizTitle.appendChild(title);

  // Create question number

  let questionsNumber = document.createElement("span");
  questionsNumber.classList.add("question-number");
  questionsNumber.innerHTML = "Question number: ";

  // append question number to quiz title

  quizTitle.appendChild(questionsNumber);

  // append title to quizTitle

  let number = document.createElement("span");
  number.classList.add("number");

  // append number to question number

  questionsNumber.appendChild(number);

  // Create Question section

  let question = document.createElement("div");

  question.classList.add("question");

  // create question name

  let questionName = document.createElement("p");

  questionName.classList.add("question-name");

  questionName.innerHTML = count.question;
  //

  // append questionName to question

  question.appendChild(questionName);

  // create options

  let options = document.createElement("ul");
  options.classList.add("options");

  // create answers

  for (let i = 0; i < 4; i++) {
    // create main answer div

    let answerDiv = document.createElement("div");

    answerDiv.classList.add("answer");

    // create input radio

    let input = document.createElement("input");
    input.type = "radio";
    input.id = `answer_${i + 1}`;
    input.name = "question";
    input.setAttribute(`data-answer`, count.options[i]);

    if (i === 0) {
      input.checked = true;
    }

    // create input label

    let label = document.createElement("label");

    label.setAttribute("for", `answer_${i + 1}`);

    // count.options[i]
    label.innerHTML = count.options[i];
    // append answer to answer div

    answerDiv.appendChild(input);
    answerDiv.appendChild(label);

    // append answer div to question
    options.appendChild(answerDiv);
    question.appendChild(options);
  }

  questionMain.appendChild(nextBTn);
  questionMain.appendChild(questionsCount);

  questionMain.prepend(question);
  questionMain.prepend(quizTitle);
}

function checkAnswer(rAnswer, count) {
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

function finalResult(count) {
  let theResult;

  if (currentIndex === count) {
    questionMain.remove();

    console.log("55555555");

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResult = `<span class="good">Good ${rightAnswers} from ${count}</span>`;
    } else if (rightAnswers === count) {
      theResult = `<span class="perfect">Perfect</span> All answers is good `;
    } else {
      theResult = `<span class="bad"> bad ${rightAnswers} from ${count}</span>`;
    }

    results.innerHTML = theResult;
  }
}
