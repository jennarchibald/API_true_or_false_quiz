const PubSub = require('../helpers/pub_sub.js');


const QuizFormView = function(form){
  this.form = form;
};

QuizFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    PubSub.publish('QuizFormView:form-submitted', evt.target.number.value);
    this.form.classList.add('hidden');
  })

  PubSub.subscribe('ScoreView:play-again-clicked', (evt) => {
    this.form.classList.remove('hidden');
  });
};

module.exports = QuizFormView;
