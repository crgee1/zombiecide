import React, { useState, useEffect } from 'react';
import ItemItem from '../item/item_item';

export default function Interface(props) {
    const [dice, setDice] = useState([]);
    const [numActions, setNumActions] = useState(3);
    const [searched, setSearched] = useState(false);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

    const { board, players, setPlayers, equipmentDeck, setEquipmentDeck } = props;

    const currentPlayer = players[currentPlayerIdx];

    useEffect(() => {
        if (board) board.playerIdx = currentPlayerIdx;
    }, [currentPlayerIdx, board]);

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
        let playerArr = [...players];
        let firstPlayer = playerArr.shift();
        setPlayers([...playerArr, firstPlayer])
        board.moveZombies();
        setTimeout(() => {
            board.moveZombies();
            board.nextTurn();
        }, 1200)
    }

    const nextTurn = () => {
        if (currentPlayerIdx === players.length - 1) moveZombies();
        currentPlayer.reset();
        setSearched(false);
        board.resetTargeted();
        // setWeapon(players[(currentPlayerIdx + 1) % players.length].items[0]);
        setNumActions(players[(currentPlayerIdx + 1) % players.length].numActions);
        setCurrentPlayerIdx(prevState => (prevState + 1) % players.length);
    }

    const openDoor = (direction) => {
        return () => {
            setNumActions(--currentPlayer.numActions);
            let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
            cell[direction] = 'doorOpen';
            switch (direction) {
                case 'up':
                    board.grid.layout[currentPlayer.row - 1][currentPlayer.col].down = 'doorOpen'
                    break;
                case 'right':
                    board.grid.layout[currentPlayer.row][currentPlayer.col + 1].left = 'doorOpen'
                    break;
                case 'down':
                    board.grid.layout[currentPlayer.row + 1][currentPlayer.col].up = 'doorOpen'
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

    const attack = () => {
        setNumActions(--currentPlayer.numActions);
        let diceArr = currentPlayer.attack();
        let result = diceArr.pop();
        setDice(diceArr);
        if (result) board.killZombies();
    }

    const makeNoise = () => {
        setNumActions(--currentPlayer.numActions);
        board.grid.layout[currentPlayer.row][currentPlayer.col].noise++;
    }

    const displayDice = () => {
        if (dice.length === 0) return;
        return dice.map((die, i) => displayDie(die, i));
    }

    const displayDie = (die, i) => {
        switch (die) {
            case 1:
                return <i key={i} className="fas fa-dice-one die"></i>;
            case 2:
                return <i key={i} className="fas fa-dice-two die"></i>
            case 3:
                return <i key={i} className="fas fa-dice-three die"></i>
            case 4:
                return <i key={i} className="fas fa-dice-four die"></i>
            case 5:
                return <i key={i} className="fas fa-dice-five die"></i>
            case 6:
                return <i key={i} className="fas fa-dice-six die"></i>
            default:
                break;
        }
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

    const displayAttack = () => {
        return (
            <button onClick={attack}>Attack</button>
        )
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
        let displayArr = currentPlayer.items.map((item, i) => {
            return (
                <ItemItem
                    key={i}
                    item={item}
                />
            )
        })
        return displayArr;
    }

    const displayToolbar = () => {
        if (numActions > 0) return (
            <div className="toolbar">
                {displayDirectionBtns()}
                {displaySearchBtn()}
                {displayDoorBtn()}
                {displayAttack()}
                <button onClick={makeNoise}>Make Noise</button>
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
        <React.Fragment>
            <div>
                <header>{currentPlayer ? currentPlayer.name : null}</header>
                <header>{numActions}</header>
                {displayToolbar()}
            </div>
            <div>
                {displayItems()}
                <div className="dice-container">
                    {displayDice()}
                </div>
            </div>
        </React.Fragment>
    )
}