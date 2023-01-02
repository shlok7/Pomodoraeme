let workTime = 25;
let breakTime = 5;
let timer;
let timeREMAIN;
let workMode = true;

document.addEventListener("DOMContentLoaded", function() {
  let startButton = document.getElementById("start-button");
  let stopButton = document.getElementById("stop-button");
  let resetButton = document.getElementById("reset-button");
  let timeDisplay = document.getElementById("time-display");
  let modeDisplay = document.getElementById("mode-display");
  let workTimeInput = document.getElementById("work-time");
  let breakTimeInput = document.getElementById("break-time");

  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
  workTimeInput.addEventListener("change", updateWorkTime);
  breakTimeInput.addEventListener("change", updateBreakTime);

  function startTimer() {
    if (!timer) {
      timer = setInterval(function() {
        timeREMAIN--;

        // If time is up
        if (timeREMAIN === 0) {
          let beep = new Audio("beep.mp3");
          beep.play();

          // If in work mode
          if (workMode) {
            // Switch to break mode
            workMode = false;
            timeREMAIN = breakTime * 60;
            modeDisplay.textContent = "Break Mode";
          }
          // If in break mode
          else {
            // Switch to work mode
            workMode = true;
            timeREMAIN = workTime * 60;
            modeDisplay.textContent = "Work Mode";
          }
        }

        // Update time display
        let minutes = Math.floor(timeREMAIN / 60);
        let seconds = timeREMAIN % 60;
        timeDisplay.textContent = `${minutes}:${seconds}`;
      }, 1000);
    }
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function resetTimer() {
    stopTimer();
    workMode = true;
    timeREMAIN = workTime * 60;
    timeDisplay.textContent = `${workTime}:00`;
    modeDisplay.textContent = "Work Mode";
  }

  function updateWorkTime() {
    stopTimer();
    workTime = this.value;
    timeREMAIN = workTime * 60;
    timeDisplay.textContent = `${workTime}:00`;
  }

  function updateBreakTime() {
    stopTimer();
    breakTime = this.value;
  }
});
