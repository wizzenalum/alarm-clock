import Clock from "./clockTime.js";

// creating a clock that is object and do everything whatever  i need from a clock.
const clock = new Clock("hello");
clock.setAngOffset(103, 14, 14); // setting the angle of hands if they are mis-aligned.

// getting all the hands elements that will rotate with the time
const hourHand = document.getElementById("hour-hand");
const minHand = document.getElementById("min-hand");
const secHand = document.getElementById("sec-hand");

// input from user to set the alarm
const [hour, min,sec] = document.querySelectorAll(".number-input>input");

// container where list will be shown on the web.
let alarmList = document.getElementById("alarm-list");


// this function will create list list of all the alarms that stored in clock object
const createList = function (list) {
  let content = ``;
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();

  let alreadyAlarmed = []
  for (let i = 0; i < list.length; i++) {
    let [alarmHour,alarmMin,alarmSec] = list[i]
    if(alarmHour*3600+alarmMin*60+alarmSec<=hour*3600+min*60+sec){
      alreadyAlarmed.push(i)
    }

    // first line showing the time of third line showing the option to delete alarm.
    content += `<div class="alarm">
          <span>${list[i][0]}</span><span>${list[i][1]}</span>   
          <span>${list[i][2]}</span>
          <span id="${"listid-" + i}" class=" delete fas fa-trash"></span>
        </div>`;
  }
  return [content,alreadyAlarmed];
};
const addDeleteEventListeners = function(){
  const deleteBtn = document.querySelectorAll(".alarm>span:last-child");

for (let btn of deleteBtn) {
  btn.addEventListener("click", handleDelete);
}
}


// adding the alarm to the application
let handleAlarmBtn = function (event) {
  clock.setAlarm([hour.value, min.value,sec.value]);
  render();
  addDeleteEventListeners();
};


// remove alarm from the allarm list
let handleDelete = function (event) {
  let id = event.target.id.substr(7);
  clock.removeAlarm(parseInt(id));
  render();
  addDeleteEventListeners();
};

const render = function(){
  let [content,alreadyAlarmed] = createList(clock.alarmList);
    alarmList.innerHTML = content;
  let alarmTags = document.querySelectorAll('.alarm');
  for(let id of alreadyAlarmed){
    alarmTags[id].classList.add('alarmed')
  }
}
// *** INITIALIZING the view by adding the eventlistners and saved list.
render();

    // user actionabl Butoon of alarm
const alarmBtn = document.getElementById("alarm-btn");
addDeleteEventListeners();
alarmBtn.addEventListener("click", handleAlarmBtn);


// updating the time every second.
let id = setInterval(() => {
  let angles = clock.getAngles();
  // console.log(angles, clock.getTime());

  // all hands angle is set here every second
  hourHand.style.transform = `rotate(${angles[0]}deg)`;
  minHand.style.transform = `rotate(${angles[1]}deg)`;
  secHand.style.transform = `rotate(${angles[2]}deg)`;
  let id = clock.checkAlarm();
  if(id.constructor==Number){
    alert(`alarm for ${clock.alarmList[id][0]}:${clock.alarmList[id][1]}`);
    render();
  }
}, 1000);


