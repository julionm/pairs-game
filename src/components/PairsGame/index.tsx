import Board from "components/Board";
import { Card } from "../../models/cards";
import { useState } from "react";

interface PairsGameOptions {
    pairs: Card[][]
}

function PairsGame({ pairs }: PairsGameOptions) {

    const cards = pairs.reduce((acc, [val1, val2]) => {
        acc.push(val1);
        acc.push(val2);
        return acc;
    }, []);
    const [pairsSet] = useState(new Set(
        pairs.map(([val1, val2]) => val1.id + "" + val2.id)
    ));

    function isPair (answer: number[]) {
        const [firstId, secondId] = answer;
        return pairsSet.has(firstId + "" + secondId) || pairsSet.has(secondId + "" + firstId);
    }

    return (
        <div className="h-full w-full grid items-center">
            <Board
                initialCards={cards}
                isValidAnswer={isPair}
                answerSize={2} />
        </div>
    )
}

export default PairsGame;