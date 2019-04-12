const PubSub = require('../helpers/pub_sub.js');
const QuestionView = require('./question_view.js');
const ScoreView = require('./score_view.js');
const ErrorView = require('./error_view.js');

const QuizView = function(container) {
  this.container = container;
  this.questions = null;
  this.number = 0;
};

QuizView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:questions-ready', (evt) => {
    this.questions = evt.detail;
    this.render();
  });

  PubSub.subscribe('Quiz:error', (evt) => {
    const errorView = new ErrorView(this.container);
    errorView.render();
  });


  PubSub.subscribe('Answer:answer-made', (evt) => {
    this.renderQuestion(this.number);
    this.number++;
  });
};

QuizView.prototype.render = function () {
  this.container.innerHTML = '';
  const score = new ScoreView(this.container, this.questions.length);
  score.bindEvents();
  score.render();
  this.renderQuestion(this.number);
  this.number++;
  // this.questions.forEach((question) => {
  //   const questionView = new QuestionView(this.container, question);
  //   questionView.bindEvents();
  //   questionView.render();
  // });
};

QuizView.prototype.renderQuestion = function (index) {
  const questionView = new QuestionView(this.container, this.questions[index]);
  questionView.bindEvents();
  questionView.render();
};


module.exports = QuizView;
