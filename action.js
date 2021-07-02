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

// Load Local Storage
if (localStorage.getItem("tasks") !== null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
renderTasks()

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

// Changes to study period
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

//Changes for short break period
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

//Changes for long break period
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

//Resets the current time
function setTime() {
  minute.innerHTML = pomo
  second.innerHTML = "00"
}

//Implements timer logic
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

document.getElementById("reset").addEventListener("click", study);

// Opens Setting Panel
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

// Updates Time preferences
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
  chrome.tabs.create({ url: 'https://github.com/khloe-r'});
}

document.getElementById("name").addEventListener("click", name);

// Adds task to list
function addTask() {
  var t = String(document.getElementById("floatingTask").value).trim()
  if (t != "") {
    document.getElementById("floatingTask").value = ""
    tasks.push(t)
    renderTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

// Displays tasks from array
function renderTasks() {
  var taskList = tasks.map((tsk, num) => {
    return `<li class="list-group-item btn-pomo mb-2 d-flex justify-content-between" id="${num}"> <input class="form-check-input me-1" type="checkbox" value="" aria-label="...">${tsk}<span id="${num}-close" class="badge pomo-red rounded-pill">x</span></li>`
  })
  document.getElementById("tasklist").innerHTML = taskList.join('');
}

document.getElementById("add-task").addEventListener("click", addTask);

//Removes task from list
function removeTask(event) {
  if (event.target.id.endsWith("-close")) {
    var idname = String(event.target.id) 
    idname = idname.substring(0, idname.length-6)
    tasks.splice(idname, 1)
    renderTasks()
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  } 
}

document.getElementById("tasklist").addEventListener("click", removeTask)
