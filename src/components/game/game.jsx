import React, { useState, useEffect } from 'react';
import Board from '../board/board';

export default function Game() {
    const [board, setBoard] = useState();
    useEffect(() => {
        let canvas = new Board(1);
        console.log(canvas.graph());
        canvas.animate();
        setBoard(canvas);
    }, []);

    const moveUp = () => {
        board.zombies[0].moveUp();
    }
    const moveRight = () => {
        board.zombies[0].moveRight();
    }
    const moveDown = () => {
        board.zombies[0].moveDown();
    }
    const moveLeft = () => {
        board.zombies[0].moveLeft();
    }

    return (
        <div id='game'>
            <button onClick={moveUp}>Move Up</button>
            <button onClick={moveRight}>Move Right</button>
            <button onClick={moveDown}>Move Down</button>
            <button onClick={moveLeft}>Move Left</button>
        </div>
    )
}