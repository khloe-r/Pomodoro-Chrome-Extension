var minute = document.getElementById("minute");
var second = document.getElementById("second");
var trigger = document.getElementById("trigger");
var pomo = 25;
var counter = 0;

var i = 0; 

// Start Button
function start() {
  if (trigger.innerHTML === "Start") {
    i = setInterval(decreaseTime, 1000)
    trigger.innerHTML = "Pause"
  }
  else {
    clearInterval(i)
    trigger.innerHTML = "Start"
  }
} 

function study() {
  pomo = 25
  setTime()
}

function shortbreak() {
  pomo = 5
  setTime()
}

function longbreak() {
  pomo = 15
  setTime()
}

function setTime() {
  minute.innerHTML = pomo
  second.innerHTML = "00"
}

function decreaseTime() {
  var s = parseInt(second.innerHTML) - 1
  if (s !== -1) {
    if (s <= 9) {
      second.innerHTML = "0" + s
    }
    else {
      second.innerHTML = s
    }
  }
  else {
    var m = parseInt(minute.innerHTML) - 1
    if (m !== -1) {
      second.innerHTML = "59"
      minute.innerHTML = parseInt(minute.innerHTML) - 1
    }
    else {
      second.innerHTML = "00"
      if (pomo === 25) {
        counter += 1
        if (counter === 3) {
          pomo = 15
          counter = 0
          minute.innerHTML = pomo
        }
        else {
          pomo = 5
          minute.innerHTML = pomo
        }
      }
      else {
        pomo = 25
        minute.innerHTML = pomo
      }
      clearInterval(i)
    }
  }
}

function reset() {
  second.innerHTML = "00"
  minute.innerHTML = "25"
  clearInterval(i)
}