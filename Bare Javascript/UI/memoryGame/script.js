const imagesArray = [
  "https://images.unsplash.com/photo-1756649627237-d367a3e3a311?q=80&w=870&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1756550120927-dede81d8b2bb?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1756474215990-a18a9a0521d5?w=900&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1756680967174-c0e19cf94f49?w=900&auto=format&fit=crop&q=60",
];

const board = document.getElementById("gameBoard");
const resetBtn = document.getElementById("resetBtn");

let cards = [];
let lockBoard = false;



function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function initGame() {
  board.innerHTML = "";
  lockBoard = false;

  const duplicated = [...imagesArray, ...imagesArray];

  cards = shuffle(
    duplicated.map((img, index) => ({
      id: index,
      image: img,
      isFlipped: false,
      isMatched: false,
    }))
  );

  renderBoard();
}

function renderBoard() {
  cards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "mini_box hide";
    div.dataset.index = index;

    div.addEventListener("click", () => flipCard(index));

    board.appendChild(div);
  });
}



function flipCard(index) {
  if (lockBoard) return;

  const card = cards[index];
  if (card.isFlipped || card.isMatched) return;

  card.isFlipped = true;
  updateCardUI(index);

  const flippedUnmatched = cards.filter(c => c.isFlipped && !c.isMatched);

  if (flippedUnmatched.length === 2) {
    checkMatch(flippedUnmatched);
  }
}

function checkMatch(flippedCards) {
  lockBoard = true;

  if (flippedCards[0].image === flippedCards[1].image) {
    cards = cards.map(card =>
      card.isFlipped && !card.isMatched ? { ...card, isMatched: true } : card
    );
    lockBoard = false;
  } else {
    setTimeout(() => {
      cards = cards.map(card =>
        !card.isMatched ? { ...card, isFlipped: false } : card
      );
      renderState();
      lockBoard = false;
    }, 300);
  }
}

function updateCardUI(index) {
  const div = board.children[index];
  div.classList.remove("hide");
  div.innerHTML = `<img src="${cards[index].image}" />`;
}

function renderState() {
  [...board.children].forEach((div, index) => {
    const card = cards[index];
    if (!card.isFlipped) {
      div.classList.add("hide");
      div.innerHTML = "";
    }
  });
}


resetBtn.addEventListener("click", initGame);

initGame();
