import React, { useEffect } from 'react';
import Board from '../board/canvas';

export default function Game() {
    useEffect(() => {
        const board = new Board(1);
        board.spawnZombie(0, 0)
        document.getElementById('root').addEventListener('click', function (e) {
            board.spawnZombie(e.clientX, e.clientY)
        })
    }, [])

    return (
        <div id='game'>

        </div>
    )
}