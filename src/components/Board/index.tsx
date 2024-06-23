import { useRef, useState } from "react";
import Card from "../Card";
import { randomize } from "../../utils/random";

interface BoardOptions {
    cards: string[],
    isPair: (first: string, second: string) => boolean
}

function Board({ cards, isPair } : BoardOptions) {

    const randomCards = useRef(randomize(cards));

    const [foundCards, setFoundCards] = useState(new Set());
    const [firstCard, setFirstCard] = useState('');

    function isCorrect (value: string) {
        return foundCards.has(value);
    }

    function isSelected(value: string) {
        return firstCard === value;    
    }

    function clickCard (cardValue: string) {
        if (foundCards.has(cardValue)) return;
        
        if (!firstCard) {
            setFirstCard(cardValue);
        } else {
            if (isPair(firstCard, cardValue)) {
                const aux = new Set([...foundCards]);
                aux.add(firstCard);
                aux.add(cardValue);

                setFoundCards(aux);
                setFirstCard('');

                if (foundCards.size === cards.length) {
                    console.log('win!');
                }

                return;
            }
            
            setFirstCard('');
        }
    }

    return (
        <div id="board" className='max-w-screen-lg grid grid-cols-[repeat(5,auto)] justify-center gap-4 mx-auto'>
            {
                randomCards.current.map(value => (
                    <Card
                        key={value}
                        value={value}
                        callback={clickCard}
                        isCorrect={isCorrect(value)}
                        isSelected={isSelected(value)} />    
                ))
            }
        </div>
    );
}

export default Board;