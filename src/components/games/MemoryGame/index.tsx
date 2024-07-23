import { CardBoard } from "components/cards/CardBoard"
import { FlippingCard } from "components/cards/FlippingCard";
import { Card, CardValue, Round, Types } from "models/cards";
import { useMemo } from "react";
import { randomize } from "utils/random";

interface MemoryGameOptions {
   values: CardValue[]
}

export function MemoryGame({ values }: MemoryGameOptions) {

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
        console.log(rounds);
    }

    return (
        <CardBoard
            initialCards={cardList}
            answerSize={2}
            answerChecker={pairMatch}
            onGameFinished={handleGameFinished}
            CustomCardElement={FlippingCard}
        />
    )
}