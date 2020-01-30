import React, { useState, useEffect } from 'react';
import ItemItem from '../card/item_item';

export default function Interface(props) {
    const [dice, setDice] = useState([]);
    const [numActions, setNumActions] = useState(3);
    const [searched, setSearched] = useState(false);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

    const { board, players, setPlayers, equipmentDeck, setEquipmentDeck, targets } = props;

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

    const oneRevolution = () => {
        let playerArr = [...players];
        let firstPlayer = playerArr.shift();
        board.players = [...playerArr, firstPlayer];
        setPlayers([...playerArr, firstPlayer])
        board.moveZombies();
        setTimeout(() => {
            board.moveZombies();
            board.nextTurn();
        }, 1200)
    }

    const nextTurn = () => {
        if (currentPlayerIdx === players.length - 1) oneRevolution();
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
        if (targets < 1) return;
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

    const displayDoorBtns = () => {
        if (!board) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (!Object.values(cell).some(value => value === 'doorClose')) return;
        let direction;
        let text;
        let doorArr = [];

        if (cell.up === 'doorClose') {
            direction = 'up';
            text = 'Open Top Door';
            doorArr.push(<button key={1} onClick={openDoor(direction)}>{text}</button>)
        } 
        if (cell.right === 'doorClose') {
            direction = 'right';
            text = 'Open Right Door';
            doorArr.push(<button key={2} onClick={openDoor(direction)}>{text}</button>)
        } 
        if (cell.down === 'doorClose') {
            direction = 'down';
            text = 'Open Bottom Door';
            doorArr.push(<button key={3} onClick={openDoor(direction)}>{text}</button>)
        } 
        if (cell.left === 'doorClose') {
            direction = 'left';
            text = 'Open Left Door';
            doorArr.push(<button key={4} onClick={openDoor(direction)}>{text}</button>)
        }

        return (
            <React.Fragment>
                {doorArr}
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
        });
        let slots = 5 - displayArr.length
        if (slots > 0) {
            for (let i = slots; i > 0; i--) {

                let text = i === 5 || i === 4 ? 'In Hand' : 'Reserve'
                displayArr.push(
                    <div className="item-container" key={i+5}>
                        {text}
                    </div>
                );
            }
        }
        return displayArr;
    }

    const displayToolbar = () => {
        if (numActions > 0) return (
            <div className="toolbar">
                {displayDirectionBtns()}
                {displaySearchBtn()}
                {displayDoorBtns()}
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