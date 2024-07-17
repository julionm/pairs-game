import { MemoryGame } from "components/games/MemoryGame";

const VALUES = [
    'arvore',
    'banana',
    'maçã',
    'laranja',
    'raio',
    'morais',
    'abacaxi',
    'morango',
    'bolo',
    'cacau',
]

export function MemoryGamePage () {
    
    return (
        <div className="">
            <MemoryGame values={VALUES}/>
        </div>
    )
}