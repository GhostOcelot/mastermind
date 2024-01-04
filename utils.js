import { variables } from './variables.js';
import { guessList, modalContainer, winMessage } from './selectors.js';

export const generateSequence = () => {
  const sequence = [];

  for (let i = 0; i < 5; i++) {
    sequence.push(variables.colors[Math.floor(Math.random() * variables.colors.length)]);
  }
  return sequence;
};

export const guessSequence = (guess) => {
  const result = [];

  const sequenceCopy = [...variables.sequence];

  guess.forEach((item, index) => {
    if (sequenceCopy.includes(item) && item === sequenceCopy[index]) {
      result.push('yes');
      sequenceCopy[index] = 'checked';
      guess[index] = null;
    } else {
      result.push('no');
    }
  });

  guess.forEach((item, index) => {
    if (sequenceCopy.includes(item) && item !== sequenceCopy[index]) {
      result[index] = 'x';
      const FoundElementIndex = sequenceCopy.findIndex((element) => element === item);
      sequenceCopy[FoundElementIndex] = 'checked';
    }
  });

  variables.allGuesses.push(result);

  guessList.textContent = '';

  variables.allGuesses.forEach((guess) => {
    const guessContainer = document.createElement('li');
    guess.forEach((element) => {
      const guessItem = document.createElement('span');
      guessItem.innerText = element;
      guessItem.classList.add('guess-item');
      guessContainer.append(guessItem);
      guessList.append(guessContainer);
    });
  });

  return result;
};

export const checkIfWin = (result) => {
  if (result.every((item) => item === 'yes')) {
    modalContainer.classList.remove('hidden');
    winMessage.innerHTML = `<p style="text-align: center; margin-top: 0">It took you ${variables.allGuesses.length} turns to complete the challenge.</p>`;
  }
};
