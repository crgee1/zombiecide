import React, { useState } from 'react';

export default function Toolbar(props) {
    const [searched, setSearched] = useState(false);
    const [dice, setDice] = useState([]);

    const { currentPlayer, setNumActions, players, setPlayers, board, currentPlayerIdx, setTargeted, setCurrentPlayerIdx, equipmentDeck, setEquipmentDeck, targeted, numActions } = props;

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
        setTargeted(false);
        setDice([]);
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

        // let playerArr = [...players];
        // playerArr.splice(currentPlayerIdx, 1, currentPlayer);
        // setPlayers(playerArr);
    }

    const attack = () => {
        setNumActions(--currentPlayer.numActions);
        let diceArr = currentPlayer.attack();
        let result = diceArr.pop();
        setDice(diceArr);
        if (result) {
            board.killZombies();
            setTargeted(false);
        }
    }

    const makeNoise = () => {
        setNumActions(--currentPlayer.numActions);
        board.grid.layout[currentPlayer.row][currentPlayer.col].noise++;
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
        if (!targeted) return;
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
        if (currentPlayer.openDoorQuiet() === null) return
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

    const displayToolbar = () => {
        if (numActions > 0) return (
            <React.Fragment>
                {displayDirectionBtns()}
                {displaySearchBtn()}
                {displayDoorBtns()}
                {displayAttack()}
                <button onClick={makeNoise}>Make Noise</button>
                <button onClick={nextTurn}>End Turn</button>
            </React.Fragment>
        );
        return (
            <React.Fragment>
                <button onClick={nextTurn}>End Turn</button>
            </React.Fragment>
        )
    }

    return (<div className="toolbar">
        {displayToolbar()}
        <div className="dice-container">
            {displayDice()}
        </div>
    </div>);
}