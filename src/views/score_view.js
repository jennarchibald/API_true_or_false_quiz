const PubSub = require('../helpers/pub_sub.js');

const ScoreView = function(div){
  this.div = div;
  this.score = 0;
};

ScoreView.prototype.bindEvents = function (){
  PubSub.subscribe('Quiz:question-answer-made', (evt)=> {
    if (evt.detail.value) {
    this.score ++;
    this.updateScore();
  }});
};

ScoreView.prototype.render = function () {
  const scoreContainer = document.createElement('div');
  scoreContainer.classList.add('score-container');
  this.div.appendChild(scoreContainer);

  const score = document.createElement('p');
  score.textContent = `Current Score: ${this.score}/10`;
  score.classList.add('score');
  scoreContainer.appendChild(score);
};

ScoreView.prototype.updateScore = function () {
  const score = document.querySelector('p.score');
  score.textContent = `Current Score: ${this.score}/10`;
};

module.exports = ScoreView;
