import { useRef } from "react";
import { Card, CardRef } from "components/Card";
import { Card as CardType } from "models/cards";

interface BoardOptions {
    initialCards: CardType[],
    answerSize: number;
    isValidAnswer: (answer: number[]) => boolean,
    onGameFinished: () => void
}

export function CardBoard({ initialCards, isValidAnswer, answerSize, onGameFinished } : BoardOptions) {

    const correctCards: Set<number> = new Set();
    const selectedCards: Set<number> = new Set();
       
    const cardsElements = useRef<{ [key: string]: CardRef }>({});

    function onSelect (card: CardType): boolean {
        if (isCardCorrect(card.id) || isRoundFinished()) return false;
        
        if (selectedCards.has(card.id)) {
            selectedCards.delete(card.id);
            return false;
        }
        
        selectedCards.add(card.id);
        
        if (selectedCards.size === answerSize) {
            setTimeout(() => {
                if (isValidAnswer([...selectedCards])) {
                    selectedCards.forEach(cardId => {
                        correctCards.add(cardId);
                        cardsElements.current[cardId].handleSuccess();
                    });
        
                    selectedCards.clear();
        
                    if (correctCards.size === initialCards.length) {
                        onGameFinished();
                    }
        
                    return;
                }
        
                selectedCards.forEach(cardId => {
                    cardsElements.current[cardId].handleError();
                })
        
                selectedCards.clear();
            }, 200);
        }

        return true;
    }

    function isRoundFinished() {
        return selectedCards.size === answerSize;
    }

    function isCardCorrect (cardId: number) {
        return correctCards.has(cardId);
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
