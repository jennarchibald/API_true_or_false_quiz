const PubSub = require('../helpers/pub_sub.js');
const Timer = require('../helpers/timer.js');

const ScoreView = function(div, numberOfQuestions){
  this.div = div;
  this.numberOfQuestions = numberOfQuestions;
};

ScoreView.prototype.bindEvents = function (){
  PubSub.subscribe('Quiz:score-updated', (evt)=> {
    this.updateScore(evt.detail);
  });
};

ScoreView.prototype.render = function (currentScore) {
  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('score-container');
  this.div.appendChild(scoreContainer);

  const score = document.createElement('p');
  score.textContent = `Current Score: ${currentScore}/${this.numberOfQuestions}`;
  score.classList.add('score');
  scoreContainer.appendChild(score);

  const time = document.createElement('p');
  time.textContent = "0:00";
  scoreContainer.appendChild(time);

  PubSub.subscribe('Quiz:time-updated', (evt) => {
    time.textContent = evt.detail;

  });

  PubSub.subscribe('Quiz:quiz-finished', (evt) => {
    this.renderFinalScore(evt.detail);
  });

};

ScoreView.prototype.updateScore = function (currentScore) {
  const score = document.querySelector('p.score');
  score.textContent = `Current Score: ${currentScore}/${this.numberOfQuestions}`;
};

ScoreView.prototype.renderFinalScore = function (finalScore) {
  const score = document.querySelector('p.score');
  score.textContent = `Final Score: ${finalScore}/${this.numberOfQuestions}`;
  const scoreContainer = document.querySelector('.score-container')
  scoreContainer.id = 'final';
};

module.exports = ScoreView;
