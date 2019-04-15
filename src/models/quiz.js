const PubSub = require('../helpers/pub_sub.js');
const Timer = require('./timer.js');
const RequestHelper = require('../helpers/request_helper.js');

const Quiz = function () {
  this.questions = null;
  this.score = 0;
  this.timer = null;
  this.currentQuestion = 0;
};

Quiz.prototype.bindEvents = function () {
  PubSub.subscribe('QuizFormView:form-submitted', (evt) => {
    this.score = 0;
    this.timer = null;
    this.currentQuestion = 0;
    this.getQuestions(evt.detail);
  })


  PubSub.subscribe('Answer:answer-made', (evt) => {

    const question = this.questions[evt.detail.questionNumber]

    if (!question.answered){
      PubSub.publish('Quiz:question-answer-made', evt.detail);
      this.markQuestionAnswered(evt.detail.questionNumber);
    };

    if (evt.detail.value){
      this.score++;
      PubSub.publish('Quiz:score-updated', this.score);
    };

    this.currentQuestion++;

    if (!this.questions[this.currentQuestion] ){
      this.timer.stopTimer();
      window.setTimeout(()=> {
        PubSub.publish('Quiz:quiz-finished', this.score);
      }, 800)
      return;
    };

    PubSub.publish('Quiz:current-question', this.currentQuestion);

  });

};

Quiz.prototype.getQuestions = function (number) {
  const helper = new RequestHelper(`https://opentdb.com/api.php?amount=${number}&difficulty=medium&type=boolean`);

  helper.get()
  .then((data)=> {
    this.questions = data.results;
    this.prepareQuestions();
    PubSub.publish('Quiz:questions-ready', this.questions);

    PubSub.publish('Quiz:current-question', this.currentQuestion);

    this.timer = new Timer(1000);

    this.timer.startTimer((currentTime) => {
      PubSub.publish('Quiz:time-updated', currentTime);
    });
  })
  .catch((err) => {
    console.log(err);
    PubSub.publish('Quiz:error', err);
  });


};

Quiz.prototype.prepareQuestions = function() {
  this.questions.forEach((question, index) => {
    question.number = index;
    question.answered = false;
  });
};

Quiz.prototype.markQuestionAnswered = function (questionNumber) {
  this.questions[questionNumber].answered = true;
};

module.exports = Quiz;
