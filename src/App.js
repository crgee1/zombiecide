import React from 'react';
import './App.css';
import Player from './components/piece/player';
import Board from './components/board/board';

function App() {
  let player = new Player(0,0,3, 'Phil');
  let board = new Board(1);
  console.log(board);
  return (
    <div className="App">
      <div id='canvas'>
        
      </div>
    </div>
  );
}

export default App;
