import Board from "components/Board";

interface PairsGameOptions {
    pairs: string[][]
}

function PairsGame({ pairs }: PairsGameOptions) {

    const cards = pairs.reduce((acc, [val1, val2]) => {
        acc.push(val1);
        acc.push(val2);
        return acc;
    }, []);
    const pairsSet = new Set(
        pairs.map(([val1, val2]) => val1 + val2)
    );

    function isPair (answer: string[]) {
        const [first, second] = answer;
        return pairsSet.has(first + second) || pairsSet.has(second + first);
    }

    return (
        <div className="h-full w-full grid items-center">
            <Board
                cards={cards}
                isValidAnswer={isPair}
                answerSize={2} />
        </div>
    )
}

export default PairsGame;