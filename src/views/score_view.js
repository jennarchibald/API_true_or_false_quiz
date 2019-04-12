const PubSub = require('../helpers/pub_sub.js');

const ScoreView = function(div, numberOfQuestions){
  this.div = div;
  this.numberOfQuestions = numberOfQuestions;
  this.score = 0;
};

ScoreView.prototype.bindEvents = function (){
  PubSub.subscribe('Quiz:score-updated', (evt)=> {
    this.score = evt.detail;
    this.updateScore();
  });
};

ScoreView.prototype.render = function () {
  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('score-container');
  this.div.appendChild(scoreContainer);

  const score = document.createElement('p');
  score.textContent = `Current Score: ${this.score}/${this.numberOfQuestions}`;
  score.classList.add('score');
  scoreContainer.appendChild(score);

  let counter = 0;

  const time = document.createElement('p');
  time.textContent = 'Time: ' + counter;
  scoreContainer.appendChild(time);
  window.setInterval(()=> {
    counter++;
    time.textContent = 'Time: ' + counter;
  }, 1000);
};

ScoreView.prototype.updateScore = function () {
  const score = document.querySelector('p.score');
  score.textContent = `Current Score: ${this.score}/${this.numberOfQuestions}`;
};

module.exports = ScoreView;
