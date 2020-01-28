import React, { useState, useEffect } from 'react';
import Board from '../board/board';
import Player from '../piece/player';

export default function Game(props) {
    const [board, setBoard] = useState();
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);

    const { preset } = props;

    useEffect(() => {
        let ctx = document.getElementById('canvas').getContext('2d');
        const player1 = new Player(25, 207, 2, 0, ctx, 'slayer');
        const player2 = new Player(25, 237, 2, 0, ctx, 'amazon');
        const player3 = new Player(300, 7, 0, 3, ctx, 'rouge');
        const player4 = new Player(345, 25, 0, 3, ctx, 'mage');
        const player5 = new Player(325, 427, 4, 3, ctx, 'bard');
        const player6 = new Player(360, 417, 4, 3, ctx, 'warrior');
        let playersArr = [player1, player2, player3, player4, player5, player6];
        setPlayers(playersArr);
        let canvas = new Board(2, playersArr, ctx);
        playersArr.forEach(player => player.addGrid(canvas.grid));
        canvas.animate();
        setBoard(canvas);

        document.getElementById('canvas').addEventListener('click', function (e) {
            let row = Math.floor(e.clientY / 100);
            let col = Math.floor(e.clientX / 100);
            console.log(canvas.grid.layout[row][col]);
        })
    }, []);

    const moveUp = () => {
        players[currentPlayer].moveUp();
    }
    const moveRight = () => {
        players[currentPlayer].moveRight();
    }
    const moveDown = () => {
        players[currentPlayer].moveDown();
    }
    const moveLeft = () => {
        players[currentPlayer].moveLeft();
    }

    const moveZombies = () => {
        board.moveZombies();
        board.nextTurn();
    }

    const nextTurn = () => {
        players[currentPlayer].reset();
        setCurrentPlayer((currentPlayer + 1) % players.length);
    }

    const displayDirectionBtns = () => {
        return (
            <React.Fragment>
                <button onClick={moveUp}>Move Up</button>
                <button onClick={moveRight}>Move Right</button>
                <button onClick={moveDown}>Move Down</button>
                <button onClick={moveLeft}>Move Left</button>
            </React.Fragment>
        )
    }

    const displayToolbar = () => {
        return (
            <div className="toolbar">
                {displayDirectionBtns()}
                <button onClick={moveZombies}>Move Zombies</button>
                <button onClick={nextTurn}>End Turn</button>
            </div>
        )
    }

    return (
        <div id='game'>
            <header>{players[currentPlayer] ? players[currentPlayer].name : null}</header>
            {displayToolbar()}
        </div>
    )
}