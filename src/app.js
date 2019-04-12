const Quiz = require('./models/quiz.js');
const QuizView = require('./views/quiz_view.js');
const QuizFormView = require('./views/quiz_form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript Loaded.');

  const quizForm = document.querySelector('#quiz-form');
  const quizFormView = new QuizFormView(quizForm);
  quizFormView.bindEvents();

  const quizContainer = document.querySelector('#quiz-container');
  const quizView = new QuizView(quizContainer);
  quizView.bindEvents();

  const quiz = new Quiz();
  quiz.bindEvents();

});
