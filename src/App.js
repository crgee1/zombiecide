import React, {useEffect, useState} from 'react';
import './App.css';
import Game from './components/game/game';

function App() {
  const [start, setStart] = useState();
  useEffect(() => {
    setStart(document.getElementById('canvas'));
  }, [])
  return (
    <div className="App">
      <canvas id='canvas' height="700" width="700">
      </canvas>
      <Game start={start}/>
    </div>
  );
}

export default App;
