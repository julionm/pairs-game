import { useRef } from "react";
import { SimpleCard } from "components/cards/SimpleCard";
import { Answer, Card, CardRef, CardState, Round } from "models/cards";

interface CardBoardOptions {
    initialCards: Card[],
    answerSize: number;
    answerChecker: (answer: number[]) => boolean,
    onGameFinished: (rounds: Round[]) => void
}

export function CardBoard({
    initialCards,
    answerChecker,
    answerSize,
    onGameFinished,
} : CardBoardOptions) {
    
    const selectedCards: Set<number> = new Set();
    
    const rounds = useRef<Round[]>([]);
    const correctAnswers = useRef<number>(0);
    const cardsElements = useRef<Record<string, CardRef>>({});

    // TODO implement columns based on input size
    // const columns = useMemo(() => Math.ceil(Math.sqrt(initialCards.length)), [initialCards]);
    
    function onSelect (card: Card, cardState: CardState) {
        if (cardState === CardState.CORRECT || isRoundFinished()) return;
        
        const cardElement = cardsElements.current[card.id];

        if (cardState === CardState.DEFAULT) {
            selectedCards.add(card.id);
            cardElement.setCardState(CardState.SELECTED);

            if (isRoundFinished()) {
                const isAnswer = answerChecker([...selectedCards]);
                const newCardState = isAnswer ? CardState.CORRECT : CardState.ERROR;
                
                createRoundStatistics(Array.from(selectedCards), isAnswer);

                if (isAnswer) {
                    correctAnswers.current += answerSize;
                }

                setTimeout(() => {
                    selectedCards.forEach(cardId => {
                        cardsElements.current[cardId].setCardState(newCardState);
                    });

                    selectedCards.clear();

                    if (correctAnswers.current === initialCards.length) {
                        onGameFinished(rounds.current);
                    }
                }, 200);
            }

        } else if (cardState === CardState.SELECTED) {
            selectedCards.delete(card.id);
            cardElement.setCardState(CardState.DEFAULT);
        }
    }

    function isRoundFinished() {
        return selectedCards.size === answerSize;
    }

    function createRoundStatistics (cardsIds: number[], isCorrect: boolean) {
        const answerType = isCorrect ? Answer.CORRECT : Answer.WRONG;
        const newEvent: Round = {
            id: String(Date.now()),
            answerType,
            triedValues: cardsIds
        }
        rounds.current.push(newEvent);
    }

    return (
        <div
            id="board"
            className={`max-w-screen-lg flex flex-wrap sm:grid sm:grid-cols-[repeat(5,auto)] justify-center gap-4 mx-auto`}>
            {
                initialCards.map((card: Card) => (
                    <SimpleCard
                        key={card.id}
                        ref={(el: CardRef) => cardsElements.current[card.id] = el}
                        card={card}
                        onSelect={onSelect} />    
                ))
            }
        </div>
    );
}
