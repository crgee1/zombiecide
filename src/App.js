import React from 'react';
import './App.css';
import Player from './components/piece/player';
import Game from './components/game/game';

function App() {
  let player = new Player(0,0,3, 'Phil');
  return (
    <div className="App">
      <canvas id='canvas' height="600" width="300" style={{backgroundColor: "lightGray"}}>
      </canvas>
      <Game/>
    </div>
  );
}

export default App;
