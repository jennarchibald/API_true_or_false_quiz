const PubSub = require('../helpers/pub_sub.js');

const AnswerView = function(div, answer, result) {
  this.div = div;
  this.answer = answer;
  this.result = result;
  this.button = null;
};

AnswerView.prototype.bindEvents = function () {
  PubSub.subscribe('Quiz:question-answer-made', (evt) => {
    if (evt.detail.questionNumber === this.answer.questionNumber){
    this.answer.made = true;
    this.addClickedButtonClass();
  };
  });

};


AnswerView.prototype.render = function () {
  const button = document.createElement('button');
  this.button = button;
  button.textContent = this.answer.option;

  button.classList.add(`button-${this.answer.questionNumber}`)

  button.addEventListener('click', (evt) => {
    if (!this.answer.made){

      this.button.classList.add('clicked');
      PubSub.publish('Answer:answer-made', this.answer);
    }
  });

  this.div.appendChild(button);
};

AnswerView.prototype.addClickedButtonClass = function () {
  if (this.answer.value){
    this.button.classList.add('green');
  } else {
    this.button.classList.add('red');
  };
};



module.exports = AnswerView;
