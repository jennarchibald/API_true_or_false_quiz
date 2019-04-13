const PubSub = require('../helpers/pub_sub.js');
const QuestionView = require('./question_view.js');
const ScoreView = require('./score_view.js');
const ErrorView = require('./error_view.js');

const QuizView = function(container) {
  this.container = container;
  this.questions = null;
};

QuizView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:questions-ready', (evt) => {
    this.questions = evt.detail;
    this.number = 0;
    this.render();
  });

  PubSub.subscribe('Quiz:error', (evt) => {
    const errorView = new ErrorView(this.container);
    errorView.render();
  });

  PubSub.subscribe('Quiz:current-question', (evt) => {
    this.renderQuestion(evt.detail);
  });

  PubSub.subscribe('Quiz:quiz-finished', (evt) => {
    this.clearQuestions();
  });
};

QuizView.prototype.render = function () {
  this.container.innerHTML = '';
  const score = new ScoreView(this.container, this.questions.length);
  score.bindEvents();
  score.render(0);
};

QuizView.prototype.renderQuestion = function (index) {
  const questionView = new QuestionView(this.container, this.questions[index]);
  questionView.render();
};

QuizView.prototype.clearQuestions = function () {
  for (let i = 0; i < this.questions.length; i++){
    const questionContainer = document.querySelector(`.question-${i}`);
    this.container.removeChild(questionContainer);
  };
};

module.exports = QuizView;
