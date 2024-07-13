import { PairsGame } from "components/PairsGame";
import { Card, CardValueType } from "models/cards";

const PAIRS: Card[][] = [
    [
      { id: 1, value: "か", type: CardValueType.JAPANESE },
      { id: 2, value: "KA", type: CardValueType.STRING }
    ],
    [
      { id: 3, value: "あ", type: CardValueType.JAPANESE },
      { id: 4, value: "A", type: CardValueType.STRING }
    ],
    [
      { id: 5, value: "い", type: CardValueType.JAPANESE },
      { id: 6, value: "I", type: CardValueType.STRING }
    ],
    [
      { id: 7, value: "う", type: CardValueType.JAPANESE },
      { id: 8, value: "U", type: CardValueType.STRING }
    ],
    [
      { id: 9, value: "え", type: CardValueType.JAPANESE },
      { id: 10, value: "E", type: CardValueType.STRING },
    ],
    [
      { id: 11, value: "お", type: CardValueType.JAPANESE },
      { id: 12, value: "O", type: CardValueType.STRING },
    ],
    [
      { id: 13, value: "き", type: CardValueType.JAPANESE },
      { id: 14, value: "KI", type: CardValueType.STRING },
    ],
    [
      { id: 15, value: "く", type: CardValueType.JAPANESE },
      { id: 16, value: "KU", type: CardValueType.STRING },
    ],
    [
      { id: 17, value: "け", type: CardValueType.JAPANESE },
      { id: 18, value: "KE", type: CardValueType.STRING }
    ],
    [
      { id: 19, value: "こ", type: CardValueType.JAPANESE },
      { id: 20, value: "KO", type: CardValueType.STRING }
    ]
  ];

export function PairsGamePage() {
   return (
        <div id="container" className="h-screen w-full">
            <PairsGame pairs={PAIRS} />
        </div>
   );
}
