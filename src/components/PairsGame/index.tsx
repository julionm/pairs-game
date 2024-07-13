import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { CardBoard } from "components/Board";
import { Card } from "models/cards";
import { Modal } from "components/Modal";
import { randomize } from "utils/random";

interface PairsGameOptions {
    pairs: Card[][]
}

interface Event {
   answerType: Answer,
   id: string,
   triedValues: Card[] // value types
}

type SquareCallback= () => ReactNode;

enum Answer {
    CORRECT = "correct",
    WRONG = "wrong"
}

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

    const [isWinModalVisible, setIsWinModalVisible] = useState(false);

    const events = useRef<Event[]>([]);

    const cards: Map<number, Card> = useMemo(
        () =>
            pairs.reduce((acc, [val1, val2]) => {
                acc.set(val1.id, val1);
                acc.set(val2.id, val2);
                return acc;
            }, new Map())
    , []);
    const pairsSet = useMemo(
        () => new Set(
            pairs.map(([val1, val2]) => val1.id + "" + val2.id)
        )
    , []);
    const attempts = useMemo(() => events.current.length, [isWinModalVisible]);
    const randomCards = useMemo<Card[]>(() => randomize(Array.from(cards.values())), []);

    const EventsList = useCallback(() => (
        events.current.map(event => {
            const Component = SquareByType[event.answerType];

            return (
                <Component key={event.id} />
            );
        })
    ), [isWinModalVisible]);

    function isPair (answer: number[]) {
        const [firstId, secondId] = answer;
        const isCorrect = pairsSet.has(firstId + "" + secondId) || pairsSet.has(secondId + "" + firstId);
        
        const triedValues: Card[] = [];

        const firstCard = cards.get(firstId);
        const secondCard = cards.get(secondId);

        if (firstCard) {
            triedValues.push(firstCard);
        }

        if (secondCard) {
            triedValues.push(secondCard);
        }

        const answerType = isCorrect ? Answer.CORRECT : Answer.WRONG;
        const newEvent: Event = {
            id: String(Date.now()),
            answerType,
            triedValues
        }
        events.current.push(newEvent);

        return isCorrect;
    }

    return (
        <div className="h-full w-full grid items-center">
            <CardBoard
                initialCards={randomCards}
                isValidAnswer={isPair}
                onGameFinished={() => setIsWinModalVisible(true)}
                answerSize={2} />
            <Modal
                isVisible={isWinModalVisible}
                onClose={() => setIsWinModalVisible(false)}>
                <div className="p-6 flex flex-col items-center gap-4">
                    <h1 className="text-xl font-bold">Well Done!</h1>

                    <p>You found all correct cards within {attempts} attempts!</p>

                    <div className="grid grid-cols-[repeat(4,auto)] gap-2 mx-auto">
                        <EventsList />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
