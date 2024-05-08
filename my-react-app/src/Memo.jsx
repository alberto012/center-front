import React, { useState, useEffect } from 'react';
import back_card from '../images/Memorama/image-back.jpeg';
import card_01 from '../images/Memorama/image_01.jpeg';
import card_02 from '../images/Memorama/image_02.jpeg';
import card_03 from '../images/Memorama/image_03.jpeg';
import card_04 from '../images/Memorama/image_04.jpeg';
import card_05 from '../images/Memorama/image_05.jpeg';
import card_06 from '../images/Memorama/image_06.jpeg';
import card_07 from '../images/Memorama/image_07.jpeg';
import card_08 from '../images/Memorama/image_08.jpeg';
import './styles.css';

const Memo = ({ show, onClose, onSubmit }) => {
    const [cards, setCards] = useState([]);
    const [hasFlippedCard, setHasFlippedCard] = useState(false);
    const [lockBoard, setLockBoard] = useState(false);
    const [firstCard, setFirstCard] = useState(null);
    const [firstCardImage, setFirstCardImage] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [secondCardImage, setSecondCardImage] = useState(null);
    const [flippedCards, setFlippedCards] = useState(Array(16).fill(false));

    const images = [
        card_01,
        card_02,
        card_03,
        card_04,
        card_05,
        card_06,
        card_07,
        card_08,
    ];

    const flipCard = function(event) {
        const card = event.currentTarget;
        const image = card.querySelector('.front-face').src;
        const cardIndex = Number(event.currentTarget.dataset.index);

        if (lockBoard) return;
        //if (card === firstCard) return;
        if (cardIndex === firstCard) return;
        
        //card.classList.add('flip');

        setFlippedCards((prev) => {
            const copy = [...prev];
            copy[cardIndex] = true;
            return copy;
        });
        
        if (!hasFlippedCard) {
            setHasFlippedCard(true);
            setFirstCard(cardIndex);
            setFirstCardImage(image);
            return;
        }
        
        setSecondCard(cardIndex);
        setSecondCardImage(image);
        //checkForMatch();
    };

    const checkForMatch = function() {
        //let isMatch = firstCard.dataset.image === secondCard.dataset.image;
        console.log(firstCardImage);
        console.log(secondCardImage);
        let isMatch = firstCardImage === secondCardImage;
        console.log(isMatch);
        isMatch ? disableCards() : unflipCards();
    };

    const disableCards = function() {
        // firstCard.removeEventListener('click', flipCard);
        // secondCard.removeEventListener('click', flipCard);

        // firstCard.classList.add('card-with-border');
        // secondCard.classList.add('card-with-border');

        // firstCard.classList.add('card-match');
        // secondCard.classList.add('card-match');

        // setTimeout(() => {
        //     firstCard.classList.remove('card-match');
        //     secondCard.classList.remove('card-match');
        //     firstCard.classList.remove('card-with-border');
        //     secondCard.classList.remove('card-with-border');

        //     resetBoard();
        // }, 2000);

        setFlippedCards((prev) => {
            const copy = [...prev];
            copy[firstCard] = true;
            copy[secondCard] = true;
            return copy;
        });

        resetBoard();
    };

    const unflipCards = function() {
        setLockBoard(true);

        // setTimeout(() => {
        //     //firstCard.classList.remove('flip');
        //     //secondCard.classList.remove('flip');

        //     setFlippedCards((prev) => {
        //         const copy = [...prev];
        //         copy[firstCard] = false;
        //         copy[secondCard] = false;
        //         return copy;
        //     });

        //     resetBoard();
        // }, 1500);
    };

    const resetBoard = function() {
        setHasFlippedCard(false);
        setLockBoard(false);
        setFirstCard(null);
        setFirstCardImage(null);
        setSecondCard(null);
        setSecondCardImage(null);
    };

    //const cards = [...images, ...images];

    //cards.sort(() => Math.random() - 0.5);

    useEffect(() => {
        const initialCards = [...images, ...images];
        initialCards.sort(() => Math.random() - 0.5);
        setCards(initialCards);
    }, []);

    useEffect(() => {
        if (secondCard !== null) {
            checkForMatch();
        }
    }, [secondCard]);

    useEffect(() => {
        if (lockBoard && secondCard !== null) {
            setTimeout(() => {
                console.log("flipping cards");
                setFlippedCards((prev) => {
                    const copy = [...prev];
                    copy[firstCard] = false;
                    copy[secondCard] = false;
                    return copy;
                });
    
                resetBoard();
            }, 1500);
        }
    }, [lockBoard, firstCard, secondCard]);
    
    useEffect(() => {
        // Verifica si todas las tarjetas están volteadas
        const allCardsFlipped = flippedCards.every((card) => card);
    
        if (allCardsFlipped) {
            // Si todas las tarjetas están volteadas, llama a onClose
            onClose();
        }
    }, [flippedCards]);    

    return (
        show && (
            // <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 bg-opacity-75 z-50">
            //     <div className="bg-white p-8 rounded-lg">
            //         <section className="memory-game">
            //         </section>
            //         <script src="/src/script.js"></script>
            //     </div>
            // </div>
            <div className="memory-game">
                {cards.map((card, index) => (
                    <div key={index} className={`memory-card ${flippedCards[index] ? 'flip' : ''}`} data-index={index} data-image={card} onClick={(event) => flipCard(event)}>
                        <img src={card} alt="Memory Card" className="front-face" />
                        <img src={back_card} alt="Memory Card Back" className="back-face" />
                    </div>
                ))}
            </div>
        )
    );
};

export default Memo;