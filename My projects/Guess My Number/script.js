'use strict';
// we great the secret number
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let heighScore = 0;
const dispalyMessage = function (message) {
  document.querySelector('.message').textContent = message;
};
// document.querySelector('.number').textContent = secretNumber;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);
  if (!guess) {
    dispalyMessage('no number !');
  }
  //if the number match the secret number
  else if (guess === secretNumber) {
    dispalyMessage('correct number !');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    // save the score
    if (score > heighScore) {
      heighScore = score;
      document.querySelector('.highscore').textContent = heighScore;
    }
  } else if (guess != secretNumber) {
    if (score > 0) {
      dispalyMessage(guess > secretNumber ? 'too heigh !' : 'too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      dispalyMessage('you loose :(');
    }
  }
});
// reset the game when we click on again
document.querySelector('.again').addEventListener('click', function () {
  dispalyMessage('starting guessing');
  score = 20;
  // recreate a secret number
  const secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
