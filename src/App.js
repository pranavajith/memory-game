import './App.css';
import shuffleArray from './Components/shuffleArray';
import CardDisplay from './Components/Card';
import React, { useState, useEffect } from 'react';

const initialCards = [];
const values = [1, 1, 2, 2, 3, 3, 4, 4];
for (let i = 0; i < values.length; i++) {
  initialCards.push({
    id: i,
    value: values[i],
    isFlipped: false,
    isMatched: false,
  });
}

const shuffledCards = shuffleArray(initialCards);

function App() {
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [boardState, setBoardState] = useState([]);
  let text = null;

  useEffect(() => {
    let check = boardState.length > 0;
    for (let i = 0; i <boardState.length; i++) {
      // console.log(i + " " + boardState[i].isMatched);
      if (!boardState[i].isMatched) check = false;
    }
    if (check) console.log("Completed!");
  }, [boardState])

  useEffect(() => {
    setBoardState(shuffledCards);
  }, []); 

  const handleClick = (card) => {
    if (disabled) return;
    if (!firstCard) {
      setFirstCard(card);
      flipCard(card.id);
    }
    else if (!secondCard) {
      if (card.id === firstCard.id) return;
      setSecondCard(card);
      flipCard(card.id);
    }
  }

  const flipCard = (id) => {
    console.log("Flipping card: " + id);
    const newBoard = boardState.map(card => card.id === id ? {...card, isFlipped: !card.isFlipped} : card);
    setBoardState(newBoard);
  }

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.value === secondCard.value) {
        const newBoard = boardState.map(card => (card.id === firstCard.id || card.id === secondCard.id) ? 
      {...card, isFlipped: false, isMatched: true} : card);
        setBoardState(newBoard);
        reset();
      } else {
        setTimeout(() => {
          const newBoard = boardState.map(card =>
            (card.id === firstCard.id || card.id === secondCard.id)
              ? { ...card, isFlipped: false }
              : card
          );
          setBoardState(newBoard);
          reset();
        }, 1000);
      }
    }
  }, [secondCard]);

  const reset = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  }

  return (
    <div className="app-container">
      <div className="board">
        {boardState.map(card => (
          <CardDisplay key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
