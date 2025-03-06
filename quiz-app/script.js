let questionsNumber = document.querySelector(".number");
let bullets = document.querySelectorAll(".questions-count span");

function getQuestions() {
  let myReq = new XMLHttpRequest();

  myReq.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsData = JSON.parse(this.responseText);
      console.log(jsData);
    }
  };

  myReq.open("GET", "qustions.json", true);
  myReq.send();
}

getQuestions();

function bulletsOpen(num) {
  questionsNumber.innerHTML = num;

  for (let i = 0; i < num; i++) {
    bullets[i].classList = "on";
  }
}

bulletsOpen(0);
