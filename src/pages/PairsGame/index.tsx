import { PairsGame } from "components/PairsGame";
import { Card, Types } from "models/cards";

const PAIRS: Card[][] = [
    [
      { id: 1, value: "か", type: Types.JAPANESE },
      { id: 2, value: "KA", type: Types.STRING }
    ],
    [
      { id: 3, value: "あ", type: Types.JAPANESE },
      { id: 4, value: "A", type: Types.STRING }
    ],
    [
      { id: 5, value: "い", type: Types.JAPANESE },
      { id: 6, value: "I", type: Types.STRING }
    ],
    [
      { id: 7, value: "う", type: Types.JAPANESE },
      { id: 8, value: "U", type: Types.STRING }
    ],
    [
      { id: 9, value: "え", type: Types.JAPANESE },
      { id: 10, value: "E", type: Types.STRING },
    ],
    [
      { id: 11, value: "お", type: Types.JAPANESE },
      { id: 12, value: "O", type: Types.STRING },
    ],
    [
      { id: 13, value: "き", type: Types.JAPANESE },
      { id: 14, value: "KI", type: Types.STRING },
    ],
    [
      { id: 15, value: "く", type: Types.JAPANESE },
      { id: 16, value: "KU", type: Types.STRING },
    ],
    [
      { id: 17, value: "け", type: Types.JAPANESE },
      { id: 18, value: "KE", type: Types.STRING }
    ],
    [
      { id: 19, value: "こ", type: Types.JAPANESE },
      { id: 20, value: "KO", type: Types.STRING }
    ]
  ];

export function PairsGamePage() {
   return (
        <div id="container" className="min-h-screen w-full">
            <PairsGame pairs={PAIRS} />
        </div>
   );
}
