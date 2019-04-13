const Timer = function(interval){
  this.interval = interval;
};

Timer.prototype.startTimer = function (callback) {
  let counter = 0;
  const id = window.setInterval(() => {
    counter++;
    callback(this.convertToMinutesAndSeconds(counter));
  }, this.interval);

  return id;
};

Timer.prototype.stopTimer = function (id) {
  window.clearInterval(id);
};


Timer.prototype.convertToMinutesAndSeconds = function (secondsInt){
  if (secondsInt< 60 && secondsInt > 10){
    return `0:${secondsInt}`;
  } else if (secondsInt< 60 && secondsInt < 10){
    return `0:0${secondsInt}`;
  }

  let seconds = secondsInt % 60;
  const minutes = (secondsInt - seconds) /60;

  if (seconds <10){
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;

};

module.exports = Timer;
