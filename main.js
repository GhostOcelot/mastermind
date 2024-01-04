import {
  guessList,
  guessOne,
  guessTwo,
  guessThree,
  guessFour,
  guessFive,
  guessButton,
  modalContainer,
  playAgainBtn,
  winMessage,
} from './selectors.js';
import { variables } from './variables.js';
import { generateSequence, guessSequence, checkIfWin } from './utils.js';

const run = () => {
  variables.sequence = generateSequence();

  playAgainBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    guessList.textContent = '';
    variables.allGuesses = [];
    variables.sequence = generateSequence();
    winMessage.innerHTML = '';
  });

  guessButton.addEventListener('click', () => {
    const result = guessSequence([
      guessOne.value,
      guessTwo.value,
      guessThree.value,
      guessFour.value,
      guessFive.value,
    ]);
    checkIfWin(result);
  });
};

run();
