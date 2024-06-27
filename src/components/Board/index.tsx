import { useState } from "react";
import Card from "components/Card";
import { randomize } from "utils/random";

interface BoardOptions {
    cards: string[],
    answerSize: number;
    isValidAnswer: (answer: string[]) => boolean
}

function Board({ cards, isValidAnswer, answerSize } : BoardOptions) {

    const [randomCards, _] = useState(randomize(cards));
    const [correctCards, setCorrectCards] = useState(new Set());
    const [selectedCards, setSelectedCards] = useState<string[]>([]);

    function isCorrect (value: string) {
        return correctCards.has(value);
    }

    function isSelected(value: string) {
        return selectedCards.some(card => card === value);    
    }

    function clickCard (cardValue: string) {
        if (isCorrect(cardValue) || selectedCards.length === answerSize) return;
        
        const indexOfExistingCard = selectedCards.findIndex(card => card === cardValue);
        if (indexOfExistingCard > -1) {
            const newSelectedCards = [...selectedCards];
            newSelectedCards.splice(indexOfExistingCard, 1);
            setSelectedCards(newSelectedCards);
            return;
        }

        const newSelectedCards = [...selectedCards, cardValue];
        setSelectedCards([...selectedCards, cardValue]);
        
        if (newSelectedCards.length === answerSize) {
            setTimeout(() => handleValidation(newSelectedCards), 200);
        }
    }

    function handleValidation(newSelectedCards: string[]) {
        if (isValidAnswer(newSelectedCards)) {
            const newCorrectCards = new Set([...correctCards]);
            newSelectedCards.forEach(card => newCorrectCards.add(card));

            setCorrectCards(newCorrectCards);
            setSelectedCards([]);

            if (newCorrectCards.size === cards.length) {
                // TODO win message
            }

            return;
        }

        newSelectedCards.forEach(card => {
            const element = document.getElementById(card);
            element?.classList.add('animate-[wrong_0.3s_linear_infinite]');
        })

        // Deal with errors
        setTimeout(() => setSelectedCards([]), 300);    
    }

    function getClassByStatus(value: string) {
        if (isCorrect(value)) {
            return 'bg-blue-400';
        } else if (isSelected(value)) {
            return 'bg-orange-500';
        }

        return '';
    }

    return (
        <div id="board" className='max-w-screen-lg grid grid-cols-[repeat(5,auto)] justify-center gap-4 mx-auto'>
            {
                randomCards.map(value => (
                    <Card
                        key={value}
                        value={value}
                        callback={clickCard}
                        customClass={getClassByStatus(value)} />    
                ))
            }
        </div>
    );
}

export default Board;