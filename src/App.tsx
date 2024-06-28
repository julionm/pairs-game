import './App.css'
import PairsGame from 'components/PairsGame';

const PAIRS = [
  [
    { id: 1, value: "A" },
    { id: 2, value: "1" }
  ],
  [
    { id: 3, value: "B" },
    { id: 4, value: "2" }
  ],
  [
    { id: 5, value: "C" },
    { id: 6, value: "3" }
  ],
  [
    { id: 7, value: "D" },
    { id: 8, value: "4" }
  ],
  [
    { id: 9, value: "E" },
    { id: 10, value: "5" },
  ],
  [
    { id: 11, value: "F" },
    { id: 12, value: "6" },
  ],
  [
    { id: 13, value: "G" },
    { id: 14, value: "7" },
  ],
  [
    { id: 15, value: "H" },
    { id: 16, value: "8" },
  ],
  [
    { id: 17, value: "I" },
    { id: 18, value: "9" }
  ],
  [
    { id: 19, value: "J" },
    { id: 20, value: "10" }
  ]
];

function App() {
  return (
    <div id="container" className="h-screen w-full">
      <PairsGame pairs={PAIRS} />
    </div>
  )
}

export default App
