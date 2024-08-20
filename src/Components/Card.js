const CardDisplay = ({ card, onClick }) => {
    const cardClass = `card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`;
  
    return (
      <div className={cardClass} onClick={() => onClick(card)}>
        {card.isFlipped || card.isMatched ? card.value : 'X' /* Display the card value if flipped, otherwise a placeholder */}
      </div>
    );
  }
  
  export default CardDisplay;