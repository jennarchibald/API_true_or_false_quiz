const PubSub = require('../helpers/pub_sub.js');
const AnswerView = require('./answer_view.js');
const he = require('he');

const QuestionView = function(container, question) {
  this.container = container;
  this.question = question;
  this.div = null;
};

QuestionView.prototype.render = function () {
  const div = document.createElement('div');
  this.div = div;
  div.classList.add(`question-${this.question.number}`);
  div.classList.add(`question`);
  this.container.appendChild(div);
  this.displayCategory();
  this.displayQuestion();
  this.displayAnswers();
};

QuestionView.prototype.displayCategory = function () {
  const categoryHeading = document.createElement('h2');
  categoryHeading.textContent = he.decode(this.question.category);
  this.div.appendChild(categoryHeading);
};

QuestionView.prototype.displayQuestion = function () {
  const questionParagraph = document.createElement('p');
  questionParagraph.textContent = he.decode(this.question.question);
  this.div.appendChild(questionParagraph);
};

QuestionView.prototype.displayAnswers = function () {
  const answers = this.getAnswers();

  const answerDiv = document.createElement('div');
  answerDiv.classList.add('answer');
  this.div.appendChild(answerDiv);

  const correctAnswer = new AnswerView(answerDiv, answers.correct_answer, 'correct');
  const wrongAnswer = new AnswerView(answerDiv, answers.wrong_answer, 'wrong');
  if (answers.correct_answer.option === "True"){
    correctAnswer.render();
    wrongAnswer.render();
  } else {
    wrongAnswer.render();
    correctAnswer.render();
  };
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
