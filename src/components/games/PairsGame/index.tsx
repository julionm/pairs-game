import { useMemo, useState } from "react";
import { CardBoard } from "components/cards/CardBoard";
import { Card, Round } from "models/cards";
import { randomize } from "utils/random";
import { Statistics } from "components/Statistics";

interface PairsGameOptions {
    pairs: Card[][]
}

export function PairsGame({ pairs }: PairsGameOptions) {

    const [rounds, setRounds] = useState<Round[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const cards: Map<number, Card> = useMemo(
        () =>
            pairs.reduce((acc, [val1, val2]) => {
                acc.set(val1.id, val1);
                acc.set(val2.id, val2);
                return acc;
            }, new Map())
    , []);
    const pairsSet: Set<string> = useMemo(
        () => new Set(
            pairs.map(([val1, val2]) => val1.id + "" + val2.id)
        )
    , []);
    const randomCards = useMemo<Card[]>(() => randomize(Array.from(cards.values())), []);

    function isPair (answer: number[]) {
        const [firstId, secondId] = answer;
        const isCorrect = pairsSet.has(firstId + "" + secondId) || pairsSet.has(secondId + "" + firstId);

        return isCorrect;
    }

    function onGameFinished (rounds: Round[]) {
        setRounds(rounds);
        setIsModalVisible(true);
    }

    return (
        <div className="h-full w-full grid items-center py-4">
            <CardBoard
                initialCards={randomCards}
                answerChecker={isPair}
                answerSize={2}
                onGameFinished={onGameFinished} />
            <Statistics
                rounds={rounds}
                isVisible={isModalVisible}
                message={`You found all correct cards within ${rounds.length} attempts!`}
            />
        </div>
    )
}
