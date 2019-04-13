const PubSub = require('../helpers/pub_sub.js');
const Timer = require('../helpers/timer.js');

const ScoreView = function(div, numberOfQuestions){
  this.div = div;
  this.container = null;
  this.numberOfQuestions = numberOfQuestions;
};

ScoreView.prototype.bindEvents = function (){
  PubSub.subscribe('Quiz:score-updated', (evt)=> {
    this.updateScore(evt.detail);
  });
};

ScoreView.prototype.render = function (currentScore) {
  this.container = document.createElement('div');
  this.container.classList.add('score-container');
  this.div.appendChild(this.container);

  const score = document.createElement('p');
  score.textContent = `Current Score: ${currentScore}/${this.numberOfQuestions}`;
  score.classList.add('score');
  this.container.appendChild(score);

  const time = document.createElement('p');
  time.textContent = "0:00";
  this.container.appendChild(time);

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
  this.container.id = 'final';

  const playAgainParagraph = document.createElement('p');
  playAgainParagraph.textContent = 'Click Here to Play Again';
  playAgainParagraph.classList.add('play-again');

  playAgainParagraph.addEventListener('click', (evt) => {
    PubSub.publish('ScoreView:play-again-clicked', evt.target);
    this.container.innerHTML = '';
  });

  this.container.appendChild(playAgainParagraph);
};

module.exports = ScoreView;
