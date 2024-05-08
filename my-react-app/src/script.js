
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// Arreglo con las imágenes
const images = [
    "assets/Images/image_01.jpeg",
    "assets/Images/image_02.jpeg",
    "assets/Images/image_03.jpeg",
    "assets/Images/image_04.jpeg",
    "assets/Images/image_05.jpeg",
    "assets/Images/image_06.jpeg",
    "assets/Images/image_07.jpeg",
    "assets/Images/image_08.jpeg",
    // "Images/image_09.jpeg",
    // "Images/image_10.jpeg",
    // "Images/image_11.jpeg",
    // "Images/image_12.jpeg",
  // ... más imágenes ...
];

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  firstCard.classList.add('card-with-border');
  secondCard.classList.add('card-with-border');

  firstCard.classList.add('card-match');
  secondCard.classList.add('card-match');

  setTimeout(() => {
    firstCard.classList.remove('card-match');
    secondCard.classList.remove('card-match');
    firstCard.classList.remove('card-with-border');
    secondCard.classList.remove('card-with-border');

    resetBoard();
  }, 2000);
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Duplicamos las imágenes para formar los pares
const cards = [...images, ...images];

// Mezclamos las cartas
cards.sort(() => Math.random() - 0.5);

// Creamos las cartas en el DOM
const memoryGame = document.querySelector(".memory-game");
cards.forEach((card) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("memory-card");

  // Creamos un elemento img y lo adjuntamos al div .card
  const imgElement = document.createElement("img");
  imgElement.src = card;
  imgElement.alt = "Memory Card";
  imgElement.classList.add("front-face");
  cardElement.appendChild(imgElement);

  // Creamos otro elemento img para la parte trasera de la carta
  const backElement = document.createElement("img");
  backElement.src = "Images/image-back.jpeg";
  backElement.alt = "Memory Card Back";
  backElement.classList.add("back-face");
  cardElement.appendChild(backElement);

  // Agregamos el atributo data-image con el nombre de la imagen, para usarlo en la comparación
  cardElement.dataset.image = card;
  // Agregamos eventos de clic para voltear las cartas
  cardElement.addEventListener('click', flipCard);

  memoryGame.appendChild(cardElement);
});

// // Agregamos eventos de clic para voltear las cartas
// let flippedCards = [];
// memoryGame.addEventListener("click", (event) => {
//   const clickedCard = event.target;
//   if (clickedCard.classList.contains("memory-card") && flippedCards.length < 2) {
//     clickedCard.classList.add("flipped");
//     flippedCards.push(clickedCard);
//     if (flippedCards.length === 2) {
//       // Verificar si las cartas son iguales
//       const [card1, card2] = flippedCards;
//       if (card1.dataset.image === card2.dataset.image) {
//         // Son iguales, mantenerlas volteadas
//         flippedCards = [];
//       } else {
//         // No son iguales, voltearlas de nuevo después de un tiempo
//         setTimeout(() => {
//           card1.classList.remove("flipped");
//           card2.classList.remove("flipped");
//           flippedCards = [];
//         }, 1000);
//       }
//     }
//   }
// });