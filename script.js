const numbers = [1,2,3,4,5,6,7,8];
const cards = numbers.concat(numbers).sort(function() {
  return Math.random() - 0.5;
});

const board = document.getElementById('gameBoard');
let first = null;
let second = null;
let lock = false;

for (let i = 0; i < cards.length; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.num = cards[i];
  card.innerHTML = '';

  card.onclick = function() {
    flip(card);
  };

  board.appendChild(card);
}

function flip(card) {
  if (lock) return;
  if (card.className.indexOf('flipped') !== -1) return;
  if (card === first) return;

  card.className += ' flipped';
  card.innerHTML = card.dataset.num;

  if (first === null) {
    first = card;
  } else {
    second = card;
    lock = true;

    if (first.dataset.num === second.dataset.num) {
      first.className += ' matched';
      second.className += ' matched';
      reset();
    } else {
      setTimeout(function() {
        first.className = 'card';
        second.className = 'card';
        first.innerHTML = '';
        second.innerHTML = '';
        reset();
      }, 800);
    }
  }
}

function reset() {
  first = null;
  second = null;
  lock = false;
}
