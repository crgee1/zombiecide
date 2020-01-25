import React from 'react';
import './App.css';
import Player from './components/piece/player';
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <canvas id='canvas' height="1000" width="1000">
      </canvas>
      <Game/>
    </div>
  );
}

export default App;
