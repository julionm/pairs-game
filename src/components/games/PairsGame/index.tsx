import { ReactNode, useCallback, useMemo, useState } from "react";
import { CardBoard } from "components/cards/CardBoard";
import { Answer, Card, Round } from "models/cards";
import { Modal } from "components/Modal";
import { randomize } from "utils/random";

interface PairsGameOptions {
    pairs: Card[][]
}

type SquareCallback= () => ReactNode;

const CorrectSquare: SquareCallback = () => (
    <div className="h-8 aspect-square rounded-sm bg-correct"></div>
);

const WrongSquare: SquareCallback = () => (
    <div className="h-8 aspect-square rounded-sm bg-wrong"></div>
);

const SquareByType: Record<Answer, SquareCallback> = {
    [Answer.CORRECT]: CorrectSquare,
    [Answer.WRONG]: WrongSquare,
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

    const RoundsList = useCallback(() => (
        rounds.map(round => {
            const Component = SquareByType[round.answerType];

            return (
                <Component key={round.id} />
            );
        })
    ), [rounds]);

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
            <Modal isVisible={isModalVisible}>
                <div className="p-6 flex flex-col items-center gap-4">
                    <h1 className="text-xl font-bold">Well Done!</h1>

                    <p>You found all correct cards within {rounds.length} attempts!</p>

                    <div className="grid grid-cols-[repeat(4,auto)] gap-2 mx-auto">
                        <RoundsList />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
