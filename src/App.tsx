import './App.css'
import PairsGame from 'components/PairsGame';

const PAIRS = [
  ["A", "1"],
  ["B", "2"],
  ["C", "3"],
  ["D", "4"],
  ["E", "5"],
  ["F", "6"],
  ["G", "7"],
  ["H", "8"],
  ["I", "9"],
  ["J", "10"]
];

function App() {
  return (
    <div id="container" className="h-screen w-full">
      <PairsGame pairs={PAIRS} />
    </div>
  )
}

export default App
