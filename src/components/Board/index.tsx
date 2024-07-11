import { useRef, useState } from "react";
import Card, { CardRef } from "components/Card";
import { Card as CardType } from "../../models/cards";

interface BoardOptions {
    initialCards: CardType[],
    answerSize: number;
    isValidAnswer: (answer: number[]) => boolean,
    onGameFinished: () => void
}

function Board({ initialCards, isValidAnswer, answerSize, onGameFinished } : BoardOptions) {

    const [correctCards, setCorrectCards] = useState<Set<number>>(new Set());
    const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
       
    const cardsElements = useRef<{ [key: string]: CardRef }>({});

    function onSelect (card: CardType) {
        if (isCardCorrect(card) || isRoundFinished()) return;
        
        const newSelectedCards = new Set([...selectedCards]);

        if (selectedCards.has(card.id)) {
            newSelectedCards.delete(card.id);
            setSelectedCards(newSelectedCards);
            return;
        }
        
        newSelectedCards.add(card.id);
        updateCards(newSelectedCards);
    }

    function updateCards (newSelectedCards: Set<number>) {
        setSelectedCards(newSelectedCards);
        
        if (newSelectedCards.size === answerSize) {
            setTimeout(() => handleRoundFinish(newSelectedCards), 200);
            return;
        }
    }

    function handleRoundFinish (cards: Set<number>) {
        if (isValidAnswer([...cards])) {
            const newCorrectCards = new Set([...correctCards]);
            cards.forEach(cardId => {
                newCorrectCards.add(cardId);
                cardsElements.current[cardId].handleSuccess();
            });

            setCorrectCards(newCorrectCards);
            setSelectedCards(new Set());

            if (newCorrectCards.size === initialCards.length) {
                onGameFinished();
            }

            return;
        }

        cards.forEach(cardId => {
            cardsElements.current[cardId].handleError(() => setSelectedCards(new Set()));
        })
    }

    function isRoundFinished() {
        return selectedCards.size === answerSize;
    }

    function isCardCorrect (card: CardType) {
        return correctCards.has(card.id);
    }

    return (
        <div
            id="board"
            className={`max-w-screen-lg grid grid-cols-[repeat(4,auto)] sm:grid-cols-[repeat(5,auto)] justify-center gap-4 mx-auto`}>
            {
                initialCards.map((card: CardType) => (
                    <Card
                        key={card.id}
                        ref={(el: CardRef) => cardsElements.current[card.id] = el}
                        card={card}
                        onSelect={onSelect} />    
                ))
            }
        </div>
    );
}

export default Board;