var minute = document.getElementById("minute");
var second = document.getElementById("second");
var trigger = document.getElementById("trigger");
var card = document.getElementById("timer");
var settingpanel = document.getElementById("setting-panel");
var settingbtn = document.getElementById("setting-btn");
var pomo = 25;
var status = 0; // 0 - study, 1 - shortbreak, 2 - longbreak
var counter = 0;

var st = 25;
var sb = 5;
var lb = 15;

var tasks = [];
var tasknum = 0;

var i = 0; 
settingpanel.style.display = "none"

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

trigger.addEventListener("click", start);

function study() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = st
  status = 0
  setTime()
  card.classList.toggle('pomo-red', true)
  card.classList.toggle('pomo-teal', false)
  card.classList.toggle('pomo-green', false)
}

function shortbreak() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = sb
  status = 1
  setTime()
  card.classList.toggle('pomo-red', false)
  card.classList.toggle('pomo-teal', true)
  card.classList.toggle('pomo-green', false)
}

function longbreak() {
  clearInterval(i)
  trigger.innerHTML = "Start"
  pomo = lb
  status = 2
  setTime()
  card.classList.toggle('pomo-red', false)
  card.classList.toggle('pomo-teal', false)
  card.classList.toggle('pomo-green', true)
}

document.getElementById("study").addEventListener("click", study);
document.getElementById("shortbreak").addEventListener("click", shortbreak);
document.getElementById("longbreak").addEventListener("click", longbreak);

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
      if (pomo === st && status === 0) {
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

document.getElementById("reset").addEventListener("click", reset);

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

settingbtn.addEventListener("click", setting);

function submit() {
  st = document.getElementById("studycust").value
  sb = document.getElementById("shortbreakcust").value
  lb = document.getElementById("longbreakcust").value
  settingbtn.innerHTML = "Open Settings"
  settingpanel.style.display = "none"
  if (status === '0') {
    study()
  }
  else if (status === '1') {
    shortbreak()
  }
  else if (status === '2') {
    longbreak()
  }
}

document.getElementById("submit").addEventListener("click", submit);

function name() {
  window.location.assign("https://github.com/khloe-r")
}

document.getElementById("name").addEventListener("click", name);

function addTask() {
  var t = String(document.getElementById("floatingTask").value).trim()
  if (t != "") {
    document.getElementById("floatingTask").value = ""
    tasks.push(t)
    document.getElementById("tasklist").innerHTML += `<li class="list-group-item btn-pomo mb-2 d-flex justify-content-between" id="${t}-${tasknum}"> <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">${t}<span id="${t}-${tasknum}-close" class="badge pomo-red rounded-pill">X</span></li>`
    tasknum += 1
  }
}

document.getElementById("add-task").addEventListener("click", addTask);

function removeTask(event) {
  if (event.target.id.endsWith("-close")) {
    var idname = String(event.target.id) 
    idname = idname.substring(0, idname.length-6)
    document.getElementById(idname).remove()
  } 
  console.log(event.target.id)  
}

document.getElementById("tasklist").addEventListener("click", removeTask)
