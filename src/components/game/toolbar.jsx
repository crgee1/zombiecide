import React, { useState } from 'react';
import Weapon from '../card/weapon';

export default function Toolbar(props) {
    const [searched, setSearched] = useState(false);
    const [dice, setDice] = useState([]);

    const { currentPlayer, setNumActions, players, setPlayers, board, currentPlayerIdx, setCurrentPlayerIdx, equipmentDeck, setEquipmentDeck, numActions, setZombieTargets, zombieTargets } = props;

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
        board.moveZombies();
        setTimeout(() => {
            board.moveZombies();
            board.oneRevolution();
            let playerArr = [...players];
            let firstPlayer = playerArr.shift();
            board.players = [...playerArr, firstPlayer];
            setPlayers([...playerArr, firstPlayer]);
        }, 500)
    }

    const nextTurn = () => {
        if (currentPlayerIdx === players.length - 1) oneRevolution();
        currentPlayer.reset();
        setSearched(false);
        setZombieTargets([]);
        setDice([]);
        board.resetTargeted();
        if (currentPlayer.woundedEnough()) {
            currentPlayer.removeFromCell();
            board.players.splice(currentPlayerIdx, 1);
            if (currentPlayerIdx === players.length-1) {
                setCurrentPlayerIdx(prevState => (prevState - 1) % players.length);
            }
            setPlayers(board.players);
        } else {
            setNumActions(players[(currentPlayerIdx + 1) % players.length].numActions);
            setCurrentPlayerIdx(prevState => (prevState + 1) % players.length);
        }
    }

    const openDoor = (direction) => {
        return () => {
            setNumActions(--currentPlayer.numActions);
            if (!currentPlayer.openDoorQuietly()) currentPlayer.makeNoise();
            let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
            cell[direction] = 'doorOpen';
            switch (direction) {
                case 'up':
                    board.grid.layout[currentPlayer.row - 1][currentPlayer.col].down = 'doorOpen';
                    board.roomSpawns(board.grid.layout[currentPlayer.row - 1][currentPlayer.col]);
                    break;
                case 'right':
                    board.grid.layout[currentPlayer.row][currentPlayer.col + 1].left = 'doorOpen';
                    board.roomSpawns(board.grid.layout[currentPlayer.row][currentPlayer.col + 1]);
                    break;
                case 'down':
                    board.grid.layout[currentPlayer.row + 1][currentPlayer.col].up = 'doorOpen';
                    board.roomSpawns(board.grid.layout[currentPlayer.row + 1][currentPlayer.col]);
                    break;
                case 'left':
                    board.grid.layout[currentPlayer.row][currentPlayer.col - 1].right = 'doorOpen';
                    board.roomSpawns(board.grid.layout[currentPlayer.row][currentPlayer.col - 1]);
                    break;
                default:
                    break;
            }
        }
    }

    const search = () => {
        let item = equipmentDeck.draw();
        if (item.name === 'aaahh') board.spawnZombie(currentPlayer.row, currentPlayer.col);
        if (currentPlayer.items.some(item => item.name === 'flashlight')) {
            let item2 = equipmentDeck.draw();
            if (item2.name === 'aaahh') board.spawnZombie(currentPlayer.row, currentPlayer.col);
            currentPlayer.addItem(item2);
        }
        currentPlayer.addItem(item);
        setEquipmentDeck(equipmentDeck);
        setNumActions(--currentPlayer.numActions);
        setSearched(true);
    }

    const attack = () => {
        if (!currentPlayer.items[0].silentKill) currentPlayer.makeNoise();
        let diceArr = currentPlayer.attack();
        let result = diceArr.pop();
        setDice(diceArr);
        if (result > 0) {
            let zombieArr = [...zombieTargets];
            if (currentPlayer.items[0].maxRange > 0) {
                zombieArr.sort((a,b) => {
                    return (a.type === 'walker') ? -1 : a.type === 'fatty' || a.type === 'abomination' ? -1 : 1;
                });
            }
            for (let i = 0; i < zombieArr.length; i++) {
                let zombie = zombieArr[i];
                if (zombie.health > currentPlayer.items[0].damage) break;
                if (result > 0) {
                    zombie.targeted = true;
                    currentPlayer.gainExp(1);
                    result--;
                } else {
                    zombie.targeted = false;
                }
            }
            board.killZombies();
        }
        setNumActions(--currentPlayer.numActions);
        board.resetTargeted();
        if (currentPlayer.items[0].name === 'molotov') currentPlayer.splice(0,1);
        setZombieTargets([]);
    }

    const makeNoise = () => {
        setNumActions(--currentPlayer.numActions);
        currentPlayer.makeNoise()    
    }

    const makeMolotov = () => {
        let gasolineIdx, bottleIdx;
        currentPlayer.addItem(new Weapon(Math.random()*100, 'molotov', 0, 1, 0, 0, 3, false, false));
        currentPlayer.items.forEach((item, i) => {if (item.name === 'glass bottle') bottleIdx = i});
        equipmentDeck.discard(currentPlayer.splice(bottleIdx, 1));
        currentPlayer.items.forEach((item, i) => {if (item.name === 'gasoline') gasolineIdx = i});
        equipmentDeck.discard(currentPlayer.splice(gasolineIdx, 1));
        let playersArr = [...players];
        setPlayers(playersArr);
    }

    const takeObjective = () => {
        let row = currentPlayer.row;
        let col = currentPlayer.col
        setNumActions(--currentPlayer.numActions);
        currentPlayer.gainExp(5);
        board.objectives.forEach((objective, i) => {
            if (objective.row === row && objective.col === col) {
                board.objectives.splice(i,1);
                board.grid.layout[row][col].remove(objective);
            }
        });
    }

    const displayMakeMolotov = () => {
        if (!board || !currentPlayer.canMakeMolotov()) return;
        return (
            <button onClick={makeMolotov}>Make Molotov</button>
        )
    }

    const displaySearchBtn = () => {
        if (!board || searched) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (cell.type !== 'room') return;

        return (
            <button onClick={search}>Search</button>
        )
    }

    const displayObjective = () => {
        if (!board) return;
        if (board.grid.layout[currentPlayer.row][currentPlayer.col].objectives.length <= 0) return;

        return (
            <button onClick={takeObjective}>Take Objective</button>
        )
    }

    const displayDirectionBtn = (direction) => {
        if (!board || zombieTargets.length > 0) return;
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
        if (!zombieTargets || zombieTargets.length <= 0) return;
        return (
            <button onClick={attack}>Attack</button>
        )
    }

    const displayDirectionBtns = () => {
        return (
            <React.Fragment>
                {displayDirectionBtn('up')}
                {displayDirectionBtn('left')}
                {displayDirectionBtn('right')}
                {displayDirectionBtn('down')}
            </React.Fragment>
        )
    }

    const displayDoorBtns = () => {
        if (!board) return;
        let cell = board.grid.layout[currentPlayer.row][currentPlayer.col];
        if (currentPlayer.openDoorQuietly() === null) return
        if (!Object.values(cell).some(value => value === 'doorClose')) return;
        let direction;
        let text;
        let doorArr = [];

        if (cell.up === 'doorClose') {
            direction = 'up';
            text = 'Open Top Door';
            doorArr.push(<button key={1} onClick={openDoor(direction)}>{text}</button>)
        }
        if (cell.left === 'doorClose') {
            direction = 'left';
            text = 'Open Left Door';
            doorArr.push(<button key={4} onClick={openDoor(direction)}>{text}</button>)
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
                {displayAttack()}
                {displaySearchBtn()}
                {displayObjective()}
                {displayMakeMolotov()}
                {displayDirectionBtns()}
                {displayDoorBtns()}
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

    return (
        <div className="toolbar">
            {displayToolbar()}
            <div className="dice-container">
                {displayDice()}
            </div>
        </div>
    );
}