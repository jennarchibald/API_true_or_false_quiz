const Timer = function(interval){
  this.interval = interval;
  this.id = null;
};

Timer.prototype.startTimer = function (callback) {
  let counter = 0;
  const id = window.setInterval(() => {
    counter++;
    callback(this.convertToMinutesAndSeconds(counter));
  }, this.interval);

  this.id = id;
};

Timer.prototype.stopTimer = function () {
  window.clearInterval(this.id);
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
