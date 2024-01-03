const guessList = document.querySelector('.guess-list');

const guessOne = document.querySelector('#guess-dropdown-one');
const guessTwo = document.querySelector('#guess-dropdown-two');
const guessThree = document.querySelector('#guess-dropdown-three');
const guessFour = document.querySelector('#guess-dropdown-four');
const guessFive = document.querySelector('#guess-dropdown-five');
const guessButton = document.querySelector('.guess-button');

const modalContainer = document.querySelector('.modal-container');
const playAgainBtn = document.querySelector('.play-again-btn');

playAgainBtn.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
});

const colors = [
  'red',
  'green',
  'blue',
  'white',
  'black',
  'orange',
  'brown',
  'purple',
  'aqua',
  'yellow',
];

let allGuesses = [];

const generateSequence = () => {
  const sequence = [];

  for (let i = 0; i < 5; i++) {
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
  }
  return sequence;
};

let sequence = generateSequence();

const guessSequence = (guess) => {
  const result = [];

  const sequenceCopy = [...sequence];

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

  allGuesses.push(result);

  guessList.textContent = '';

  allGuesses.forEach((guess) => {
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

const checkIfWin = (result) => {
  if (result.every((item) => item === 'yes')) {
    modalContainer.classList.remove('hidden');
    guessList.textContent = '';
    sequence = generateSequence();
    allGuesses = [];
  }
};
