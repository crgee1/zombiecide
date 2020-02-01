import React, { useState, useEffect } from 'react';
import Board from '../board/board';
import Player from '../piece/player';
import EquipmentDeck from '../deck/equipment_deck';

import './game.css';
import Interface from './interface';
import Weapon from '../card/weapon';

export default function Game() {
    const [board, setBoard] = useState();
    const [players, setPlayers] = useState([]);
    const [equipmentDeck, setEquipmentDeck] = useState(new EquipmentDeck())
    const [zombieTargets, setZombieTargets] = useState([]);
    
    useEffect(() => {
        let ctx = document.getElementById('canvas').getContext('2d');

        const player1 = new Player(315, 330, 3, 3, ctx, 'slayer');
        const player2 = new Player(350, 330, 3, 3, ctx, 'amazon');
        const player3 = new Player(385, 330, 3, 3, ctx, 'mage');
        const player4 = new Player(320, 380, 3, 3, ctx, 'bard');
        const player5 = new Player(360, 380, 3, 3, ctx, 'rouge');
        const player6 = new Player(390, 380, 3, 3, ctx, 'warrior');
        const equipment = new EquipmentDeck();
        let startingItemsArr = equipment.dealStartingItems();
        setEquipmentDeck(equipment);
        player1.addItem(startingItemsArr[0]);
        player2.addItem(startingItemsArr[1]);
        player3.addItem(startingItemsArr[2]);
        player4.addItem(startingItemsArr[3]);
        player5.addItem(startingItemsArr[4]);
        player6.addItem(startingItemsArr[5]);
        let playersArr = [player1, player2, player3, player4, player5, player6];
        setPlayers(playersArr);
        let canvas = new Board(3, playersArr, ctx);
        playersArr.forEach(player => player.addGrid(canvas.grid));
        canvas.animate();
        setBoard(canvas);
    }, []);

    const handleCanvasClick = () => {
        return e => {
            let y = e.clientY + window.scrollY;
            let x = e.clientX + window.scrollX;
            let row = Math.floor(y / 100);
            let col = Math.floor(x / 100);
            let player = board.activePlayer();
            let weapon = player.items[0];
            if (!(weapon instanceof Weapon)) return;
            let rangeArr = board.withinRange(weapon.minRange, weapon.maxRange, player.row, player.col);
            let targetCell = board.grid.layout[row][col];
            let scopedRifle = weapon.name === 'rifle' && player.items.some(item => item.name === 'scope');
            if (rangeArr.includes(targetCell)) {
                if (weapon.maxRange !== 0 && !scopedRifle) {
                    if (targetCell.targeted) {
                        targetCell.targeted = false
                        setZombieTargets([])
                    } else {
                        if (zombieTargets.length <= 0) {
                            targetCell.targeted = true
                            setZombieTargets(targetCell.zombies)
                        }
                    }
                } else {
                    for (let i = 0; i < targetCell.zombies.length; i++) {
                        let zombie = targetCell.zombies[i];
                        if (zombie.contains(x, y, weapon.damage)) {
                            let zombieArr = [...zombieTargets];
                            if (zombie.targeted) {
                                zombieArr.forEach((target, i) => {
                                    if (zombie === target) {
                                        zombieArr.splice(i,1);
                                    }
                                })
                                zombie.targeted = false;
                            } else {
                                zombie.targeted = true;
                                zombieArr.push(zombie);
                            }
                            setZombieTargets(zombieArr);
                            break;
                        }
                    }
                }
            }
        }
    }

    return (
        <div className="game">
            <div className="plane" onClick={handleCanvasClick()}></div>
            <Interface 
                equipmentDeck={equipmentDeck}
                setEquipmentDeck={setEquipmentDeck}
                board={board}
                players={players}
                setPlayers={setPlayers}
                zombieTargets={zombieTargets}
                setZombieTargets={setZombieTargets}
            />
        </div>
    )
}