const cards = document.querySelectorAll(".card");


let firstCard = null;
let secondCard = null;
let lockBoard = false;


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
