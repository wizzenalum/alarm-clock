/* this clock class is clock object which has
properties
    time differance:-  to set the time for the clock if needed
    angle differece:-  to give angel for clock by ofseting this angle if you time hands(min,sec,hour) are not align at 12
    alarm list:- to store all the alrm that set by user.
behaviours
    getTime:- to get the current time
    getAngles:- to get the current angle of the all the time hands in array like [hour,min,sec]
    setClock:- to set the time of the clock whatever you want.
    setAlarm:- you can add alarm to list
    removeAlarm:- to destroy the alarm
    setAngOffset:- to align the clock hands.

    
    
    
    
    
    */
class Clock {
  constructor(zoneName) {
    // here we storing the time difference from the utc time
    // create any time zone by just passing the current time.
    this.hourDiff = 0;
    this.minDiff = 0;
    this.secDiff = 0;
    this.zoneName = zoneName || "it's my Time";
    // here you give the current angle given to hand in css style
    // from the midnight at that point angle assumend as 0.
    this.hourAngDiff = 0;
    this.minAngDiff = 0;
    this.secAngDiff = 0;
    this.alarmList = [];
    this.alarmId = 0;
  }
  getTime() {
    let currentTime = new Date();
    let hour = currentTime.getHours() + this.hourDiff;
    let min = currentTime.getMinutes() + this.minDiff;
    let sec = currentTime.getSeconds() + this.secDiff;
    return [hour, min, sec];
  }
  getAngles() {
    let currentTime = new Date();
    let hour = currentTime.getHours() + this.hourDiff;
    let min = currentTime.getMinutes() + this.minDiff;
    let sec = currentTime.getSeconds() + this.secDiff;
    let hourAng = hour * 30 + min / 2 + sec / 120 - this.hourAngDiff;
    let minAng = 6 * min + sec / 10 - this.minAngDiff;
    let secAng = 6 * sec - this.secAngDiff;
    return [hourAng, minAng, secAng];
  }
  breakTheTime(time) {
    // this function convert the time to useable format
    function isUnitTime(time, limit) {
      // time ==== hour, sec or min
      // limit ==== can be 24 or 60 which tell what to check hour or min/sec
      // it will check the input is valid or not. as hour,min or sec
      try {
        if (time.constructor === String) {
          time = Number(time);
        }
        if (
          time.constructor === Number &&
          time < limit &&
          time >= 0 &&
          !(time % 1)
        ) {
          return time;
        }
      } catch (error) {
        return false;
      }
      return false;
    }
    if (time.constructor == Date) {
      return [time.getHours(), time.getMinutes(), time.getSeconds(), true];
    } else if (time.constructor === Array || time.constructor === String) {
      if (time.constructor === String) time = time.split(",");
      let hour = isUnitTime(time[0], 24),
        min = isUnitTime(time[1], 60),
        sec = isUnitTime(time[2], 60);
      if (
        time.length === 3 &&
        hour.constructor === Number &&
        min.constructor === Number &&
        sec.constructor === Number
      ) {
        return [hour, min, sec, true];
      }
    }
    return [0, 0, 0, false];
  }

  
  setClock(time) {
    // return boolean to tell is clock set or not
    // time ==== time to be set
    // time can be array seprated by comma, string or Date object

    const currentTime = new Date();
    const [hour, min, sec, check] = this.breakTheTime(time);
    const [utc_hour, utc_min, utc_sec, utc_check] =
      this.breakTheTime(currentTime);
    console.log(check, utc_check);
    if (check && utc_check) {
      this.hourDiff = hour - utc_hour;
      this.minDiff = min - utc_min;
      this.secDiff = sec - utc_sec;
      return true;
    }
    return false;
  }
  setAngOffset(hourAng, minAng, secAng) {
    this.hourAngDiff = Number(hourAng);
    this.minAngDiff = Number(minAng);
    this.secAngDiff = Number(secAng);
  }
  setAlarm(time) {
    // time in array string or Date.
    let [hour, min, sec, check] = this.breakTheTime(time);
    if (check) {
      let id = 0, len = this.alarmList.length;
      for(;id<len;id++){
        let [alarmHour,alarmMin,alarmSec] = this.alarmList[id]
        if(alarmHour>hour ||(alarmHour==hour && alarmMin>min) || (alarmHour==hour && alarmMin==min && alarmSec>=sec)){
          this.alarmList.splice(id,0,[hour,min,sec]);
          return true;
        }
      }
      if(id== len) this.alarmList.push([hour, min, sec]);
      return true;
    }
    return false;
  }
  removeAlarm(id) {
    if (this.alarmList.length <= id) return false;
    this.alarmList.splice(id, 1);
    return true;
  }
  checkAlarm(){
    let time = new Date()
    let hour = time.getHours()
    let min = time.getMinutes()
    let sec = time.getSeconds()
    for(let id=0;id< this.alarmList.length; id++){
      console.log(this.alarmList[id])
      let [alarmHour,alarmMin,alarmSec] = this.alarmList[id]
      if(alarmHour===hour && alarmMin === min && alarmSec === sec){
        return id;
      }
    }
    return false;
  }
}

export default Clock;
