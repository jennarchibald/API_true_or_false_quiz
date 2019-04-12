const PubSub = require('../helpers/pub_sub.js');
const AnswerView = require('./answer_view.js');
const he = require('he');

const QuestionView = function(container, question) {
  this.container = container;
  this.question = question;
};

QuestionView.prototype.render = function () {
  const div = document.createElement('div');
  div.classList.add(`question-${this.question.number}`);
  div.classList.add(`question`);
  this.container.appendChild(div);
  this.displayCategory(div);
  this.displayQuestion(div);
  this.displayAnswers(div);
};

QuestionView.prototype.displayCategory = function (div) {
  const categoryHeading = document.createElement('h2');
  categoryHeading.textContent = he.decode(this.question.category);
  div.appendChild(categoryHeading);
};

QuestionView.prototype.displayQuestion = function (div) {
  const questionParagraph = document.createElement('p');
  questionParagraph.textContent = he.decode(this.question.question);
  div.appendChild(questionParagraph);
};

QuestionView.prototype.displayAnswers = function (div) {
  const answers = this.getAnswers();

  const correctAnswer = new AnswerView(div, answers.correct_answer, 'correct');
  const wrongAnswer = new AnswerView(div, answers.wrong_answer, 'wrong');
  if (answers.correct_answer.option === "True"){
    correctAnswer.render();
    wrongAnswer.render();
  } else {
    wrongAnswer.render();
    correctAnswer.render();
  };
  wrongAnswer.bindEvents();
  correctAnswer.bindEvents();

};

QuestionView.prototype.getAnswers = function () {
  const answers = {}
  answers.correct_answer = {
    questionNumber: this.question.number,
    option: this.question.correct_answer,
    value: true
  };
  answers.wrong_answer = {
    questionNumber: this.question.number,
    option: this.question.incorrect_answers[0],
    value: false
  };

  return answers;
};


module.exports = QuestionView;
