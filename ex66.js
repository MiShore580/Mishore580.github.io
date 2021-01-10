var minute = document.querySelector("#min1");
var seconds = document.querySelector("#sec1");
var time = document.querySelector("#timeSpan");
var stopSet = document.querySelector("#sec2");
var startSet = document.querySelector("#min2");
var pauseSet = document.querySelector("#pause");
var img = document.querySelector("#img");
var heart = document.querySelector(".lds-heart");

startSet.onclick = function () {
  var timeSecond = +seconds.value + +minute.value * 60;

  displayTime(timeSecond);
  var countDown = setInterval(() => {
    timeSecond--;
    displayTime(timeSecond);
    if (timeSecond <= 0 || timeSecond < 1) {
      endTime();
      clearInterval(countDown);
    } else {
      stopSet.onclick = function () {
        clearInterval(countDown);
      };
    }
    pauseSet.onclick = function () {
      if (clearInterval(countDown)) {
        timeSecond--;
      } else {
        clearInterval(countDown);
      }
    };
  }, 1000);
};

function displayTime(second) {
  var min = Math.floor(second / 60);
  var sec = second % 60;
  time.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function endTime() {
  time.innerHTML = "";
  heart.style = "display: block";
  fetch("https://aws.random.cat/meow")
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      img.src = json.file;
      img.onload = function () {
        img.style = "display: inline";
        heart.style = "display: none";
      };
    });
}

// else if
//       (pauseSet.onclick = function(){)
//         {clearInterval(countDown);
//       }
