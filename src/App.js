import React from 'react';
import './App.css';
import Game from './components/game/game';

function App() {
  return (
    <div className="App">
      <div className="app-container">
        <canvas id='canvas' height="700" width="700">
        </canvas>
        <Game/>
      </div>
    </div>
  );
}

export default App;
