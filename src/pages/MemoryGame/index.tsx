import { MemoryGame } from "components/games/MemoryGame";
import { CardValue } from "models/cards";
import { Icons } from "models/icons";

const VALUES: CardValue[] = [
    Icons.APPLE,
    Icons.COFFEE,
    Icons.CROWN,
    Icons.FISH,
    Icons.HEART,
    Icons.KEY,
    Icons.ORANGE,
    Icons.PLANET,
    Icons.SUNNY,
    Icons.TREE
]

export function MemoryGamePage () {
    
    return (
        <div className="">
            <MemoryGame values={VALUES}/>
        </div>
    )
}