const Quiz = require('./models/quiz.js');
const QuizView = require('./views/quiz_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('Javascript Loaded.');

  const quizContainer = document.querySelector('#quiz-container');
  const quizView = new QuizView(quizContainer);
  quizView.bindEvents();

  const quiz = new Quiz();
  quiz.getQuestions();
  quiz.bindEvents();
});
