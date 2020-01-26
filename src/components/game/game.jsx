import React, { useState, useEffect } from 'react';
import Board from '../board/board';

export default function Game() {
    const [board, setBoard] = useState();
    useEffect(() => {
        let canvas = new Board(1);
        canvas.animate();
        setBoard(canvas);
    }, []);

    const move = () => {
        board.zombies.forEach(zombie => {
            zombie.moveDown();
        })

    }

    return (
        <div id='game'>
            <button onClick={move}>Move</button>
        </div>
    )
}