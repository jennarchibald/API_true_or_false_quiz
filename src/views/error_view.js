const ErrorView = function(container) {
  this.container = container;
};

ErrorView.prototype.render = function () {
  this.container.innerHTML = '';
  const errorImage = document.createElement('img');
  errorImage.src = 'images/technical_difficulties.jpg';
  this.container.appendChild(errorImage);
  
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Oh No.. Something went wrong..';
  errorMessage.classList.add('error');
  this.container.appendChild(errorMessage);
};

module.exports = ErrorView;
