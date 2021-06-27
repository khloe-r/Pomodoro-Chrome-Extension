var minute = document.getElementById("minute");
var second = document.getElementById("second");
var trigger = document.getElementById("trigger");
var card = document.getElementById("timer");
var settingpanel = document.getElementById("setting-panel");
var settingbtn = document.getElementById("setting-btn");
var pomo = 25;
var counter = 0;

var i = 0; 
settingpanel.style.display = "none"

// Start Button
function start() {
  if (trigger.innerHTML === "Start") {
    i = setInterval(decreaseTime, 2)
    trigger.innerHTML = "Pause"
  }
  else {
    clearInterval(i)
    trigger.innerHTML = "Start"
  }
} 

function study() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = 25
  setTime()
  card.classList.toggle('pomo-red', true)
  card.classList.toggle('pomo-teal', false)
  card.classList.toggle('pomo-green', false)
}

function shortbreak() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = 5
  setTime()
  card.classList.toggle('pomo-red', false)
  card.classList.toggle('pomo-teal', true)
  card.classList.toggle('pomo-green', false)
}

function longbreak() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = 15
  setTime()
  card.classList.toggle('pomo-red', false)
  card.classList.toggle('pomo-teal', false)
  card.classList.toggle('pomo-green', true)
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
          counter = 0
          longbreak()
        }
        else {
          shortbreak()
        }
      }
      else {
        study()
      }
      clearInterval(i)
    }
  }
}

function reset() {
  study()
}

function setting() {
  if (settingbtn.innerHTML === "Open Settings")
  {
    settingbtn.innerHTML = "Close Settings"
    settingpanel.style.display = "block"
  }
  else {
    settingbtn.innerHTML = "Open Settings"
    settingpanel.style.display = "none"
  }
}