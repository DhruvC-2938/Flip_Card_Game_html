const cards = document.querySelectorAll(".card");
const timeDisplay = document.getElementById("time");
let time = 0;
let timerInterval = setInterval(updateTime, 1000);

function updateTime() {
  time++;
  timeDisplay.textContent = time;
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

/* Shuffle once on load */
shuffleCards();

cards.forEach(card => {
  card.addEventListener("click", () => {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;
    checkMatch();
  });
});

function checkMatch() {
  const isMatch =
    firstCard.dataset.value === secondCard.dataset.value;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    checkGameOver(); // 👈 ADD THIS
    resetTurn();
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 800);
  }
}


function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function shuffleCards() {
  cards.forEach(card => {
    card.style.order = Math.floor(Math.random() * 100);
  });
}

function checkGameOver() {
  const matchedCards = document.querySelectorAll(".card.matched");

  if (matchedCards.length === cards.length) {
    clearInterval(timerInterval);
  }
}

