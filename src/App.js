import React from 'react';
import './App.css';
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <canvas id='canvas' height="600" width="600">
      </canvas>
      <Game/>
    </div>
  );
}

export default App;
