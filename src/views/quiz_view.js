const PubSub = require('../helpers/pub_sub.js');
const QuestionView = require('./question_view.js');
const ScoreView = require('./score_view.js');

const QuizView = function(container) {
  this.container = container;
  this.questions = null;
};

QuizView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:questions-ready', (evt) => {
    this.questions = evt.detail;
    this.render();
  });
};

QuizView.prototype.render = function () {
  const score = new ScoreView(this.container);
  score.bindEvents();
  score.render();
  this.questions.forEach((question) => {
    const questionView = new QuestionView(this.container, question);
    questionView.render();
  });
};


module.exports = QuizView;
