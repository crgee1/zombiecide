import React, { useEffect } from 'react';
import Board from '../board/canvas';

export default function Game() {
    useEffect(() => {
        const board = new Board(2);
    }, [])

    return (
        <div>

        </div>
    )
}