import { Modal } from "components/games/common/Modal";
import { Answer, Round } from "models/cards";
import { ReactNode, useCallback } from "react";

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

interface StatisticsOptions {
    rounds: Round[],
    isVisible: boolean,
    message: String
}

export function Statistics ({ rounds, isVisible, message } : StatisticsOptions) {
    
    const RoundsList = useCallback(() => (
        rounds.map(round => {
            const Component = SquareByType[round.answerType];

            return (
                <Component key={round.id} />
            );
        })
    ), [rounds]);
    
    return (
        <Modal isVisible={isVisible}>
            <div className="p-6 flex flex-col items-center gap-4">
                <h1 className="text-xl font-bold">Well Done!</h1>

                <p>{message}</p>

                <div className="grid grid-cols-[repeat(4,auto)] gap-2 mx-auto">
                    <RoundsList />
                </div>
            </div>
        </Modal>
    );
}