import React, { useState, useEffect } from 'react';
import Board from '../board/board';
import Player from '../piece/player';
import EquipmentDeck from '../deck/equipment_deck';
import ItemItem from '../item/item_item';

export default function Game(props) {
    const [board, setBoard] = useState();
    const [players, setPlayers] = useState([]);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
    const [numActions, setNumActions] = useState(3);
    // const [items, setItems] = useState();
    const [searched, setSearched] = useState(false);
    const [equipmentDeck, setEquipmentDeck] = useState(new EquipmentDeck())

    // const { preset } = props;

    const currentPlayer = players[currentPlayerIdx];

    useEffect(() => {
        let ctx = document.getElementById('canvas').getContext('2d');

        const player1 = new Player(25, 227, 2, 0, ctx, 'slayer');
        const player2 = new Player(25, 257, 2, 0, ctx, 'amazon');
        const player3 = new Player(325, 35, 0, 3, ctx, 'rouge');
        const player4 = new Player(365, 25, 0, 3, ctx, 'mage');
        const player5 = new Player(325, 427, 4, 3, ctx, 'bard');
        const player6 = new Player(360, 437, 4, 3, ctx, 'warrior');
        let startingItemsArr = new EquipmentDeck().dealStartingItems();
        player1.addItem(startingItemsArr[0]);
        player2.addItem(startingItemsArr[1]);
        player3.addItem(startingItemsArr[2]);
        player4.addItem(startingItemsArr[3]);
        player5.addItem(startingItemsArr[4]);
        player6.addItem(startingItemsArr[5]);
        let playersArr = [player1, player2, player3, player4, player5, player6];
        setPlayers(playersArr);
        let canvas = new Board(2, playersArr, ctx);
        playersArr.forEach(player => player.addGrid(canvas.grid));
        canvas.animate();
        setBoard(canvas);

        document.getElementById('canvas').addEventListener('click', function (e) {
            let row = e.clientY;
            let col = e.clientX;
            console.log(col,row)
            // if (canvas.grid.layout[row]) console.log(canvas.grid.layout[row][col]);
            for (let i = 0; i < canvas.zombies.length; i++) {
                let zombie = canvas.zombies[i];
                console.log(zombie.contains(col,row))
            }
            // console.log(equipmentDeck.draw());
        })
    }, [equipmentDeck]);

    const moveUp = () => {
        currentPlayer.moveUp();
        setNumActions(currentPlayer.numActions);
    }
    const moveRight = () => {
        currentPlayer.moveRight();
        setNumActions(currentPlayer.numActions);
    }
    const moveDown = () => {
        currentPlayer.moveDown();
        setNumActions(currentPlayer.numActions);
    }
    const moveLeft = () => {
        currentPlayer.moveLeft();
        setNumActions(currentPlayer.numActions);
    }

    const moveZombies = () => {
        board.moveZombies();
        board.nextTurn();
    }

    const nextTurn = () => {
        currentPlayer.reset();
        setSearched(false);
        setNumActions(players[(currentPlayerIdx + 1) % players.length].numActions);
        setCurrentPlayerIdx((currentPlayerIdx + 1) % players.length);
    }

    const openDoor = (direction) => {
        return () => {
            setNumActions(--currentPlayer.numActions);
            let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
            cell[direction] = 'doorOpen';
            switch (direction) {
                case 'up':
                    board.grid.layout[currentPlayer.row-1][currentPlayer.col].down = 'doorOpen' 
                    break;
                case 'right':
                    board.grid.layout[currentPlayer.row][currentPlayer.col+1].left = 'doorOpen' 
                    break;
                case 'down':
                    board.grid.layout[currentPlayer.row+1][currentPlayer.col].up = 'doorOpen' 
                    break;
                case 'left':
                    board.grid.layout[currentPlayer.row][currentPlayer.col - 1].right = 'doorOpen'
                    break;
                default:
                    break;
            }
        }
    }

    const search = () => {
        let item = equipmentDeck.draw();
        setEquipmentDeck(equipmentDeck);
        currentPlayer.addItem(item);
        setNumActions(--currentPlayer.numActions);
        setSearched(true);
    }

    const displaySearchBtn = () => {
        if (!board || searched) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (cell.type !== 'room') return;

        return (
            <button onClick={search}>Search</button>
        )
    }

    const displayDirectionBtn = (direction) => {
        if (!board) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (cell[direction] === false || cell[direction] === 'doorClose') return;
        switch (direction) {
            case 'up':
                return <button onClick={moveUp}>Move Up</button>;
            case 'right':
                return <button onClick={moveRight}>Move Right</button>;
            case 'down':
                return <button onClick={moveDown}>Move Down</button>;
            case 'left':
                return <button onClick={moveLeft}>Move Left</button>;
            default:
                break;
        }
    }

    const displayDirectionBtns = () => {
        return (
            <React.Fragment>
                {displayDirectionBtn('up')}
                {displayDirectionBtn('right')}
                {displayDirectionBtn('down')}
                {displayDirectionBtn('left')}
            </React.Fragment>
        )
    }

    const displayDoorBtn = () => {
        if (!board) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (!Object.values(cell).some(value => value === 'doorClose')) return;
        let direction;
        
        if (cell.up === 'doorClose') {
            direction = 'up'
        } else if (cell.right === 'doorClose') {
            direction = 'right'
        } else if (cell.down === 'doorClose') {
            direction = 'down'
        } else if (cell.left === 'doorClose') {
            direction = 'left'
        }

        return (
            <React.Fragment>
                <button onClick={openDoor(direction)}>Open Door</button>
            </React.Fragment>
        )
    }

    const displayItems = () => {
        if (!currentPlayer) return;
        return currentPlayer.items.map((item, i) => {
            return (
                <ItemItem
                    key={i}
                    item={item}
                />
            )
        })
    }

    const displayToolbar = () => {
        if (numActions > 0) return (
            <div className="toolbar">
                {displayDirectionBtns()}
                {displaySearchBtn()}
                {displayDoorBtn()}
                <button onClick={moveZombies}>Move Zombies</button>
                <button onClick={nextTurn}>End Turn</button>
            </div>
        );
        return (
            <div className="toolbar">
                <button onClick={nextTurn}>End Turn</button>
            </div>
        )
    }

    return (
        <div id='game'>
            <div>
                <header>{currentPlayer ? currentPlayer.name : null}</header>
                <header>{numActions}</header>
                {displayToolbar()}
            </div>
            <div>
                {displayItems()}
            </div>
        </div>
    )
}