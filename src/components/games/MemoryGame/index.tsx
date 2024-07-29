import { Statistics } from "components/Statistics";
import { CardBoard } from "components/boards/CardBoard"
import { FlippingCard } from "components/cards/FlippingCard";
import { Card, CardValue, Round, Types } from "models/cards";
import { useMemo, useState } from "react";
import { randomize } from "utils/random";

interface MemoryGameOptions {
   values: CardValue[]
}

export function MemoryGame({ values }: MemoryGameOptions) {

    const [rounds, setRounds] = useState<Round[]>([]);
    const [showStatistics, setShowStatistics] = useState<boolean>(false);

    const cardMapping: Map<number, Card> = useMemo(() => {
        let id = 0;

        const cards: Map<number, Card> = values.reduce((arr: Map<number, Card>, curr) => {
            id += 1;
            const firstCard: Card = {
                id,
                value: curr,
                type: Types.STRING
            };
            id += 1;
            const secondCard: Card = {
                id,
                value: curr,
                type: Types.STRING
            };

            arr.set(firstCard.id, firstCard);
            arr.set(secondCard.id, secondCard);

            return arr;
        }, new Map());

        return cards;
    }, []);
    const cardList: Card[] = useMemo(() => randomize(Array.from(cardMapping.values())), [values]);

    function pairMatch (answer: number[]) {
        const [firstCardId, secondCardId] = answer;

        const firstValue = cardMapping.get(firstCardId)?.value;
        const secondValue = cardMapping.get(secondCardId)?.value;

        return firstValue === secondValue;
    }

    function handleGameFinished (rounds: Round[]) {
        setRounds(rounds);
        setShowStatistics(true);
    }

    return (
        <div className="h-full w-full grid items-center py-4">
            <CardBoard
                initialCards={cardList}
                answerSize={2}
                answerChecker={pairMatch}
                onGameFinished={handleGameFinished}
                CustomCardElement={FlippingCard}
            />
            <Statistics
                rounds={rounds}
                isVisible={showStatistics}
                message={`Nice! You solved the memory game with ${rounds.length} attempts!`} />
        </div>
    )
}