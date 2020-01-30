import React, { useState, useEffect } from 'react';
import Board from '../board/board';
import Player from '../piece/player';
import EquipmentDeck from '../deck/equipment_deck';

import './game.css';
import Interface from './interface';

export default function Game(props) {
    const [board, setBoard] = useState();
    const [players, setPlayers] = useState([]);
    // const [items, setItems] = useState();
    const [equipmentDeck, setEquipmentDeck] = useState(new EquipmentDeck())
    const [targets, setTargets] = useState(0);
    
    const { start } = props;

    useEffect(() => {
        
        let ctx = document.getElementById('canvas').getContext('2d');

        const player1 = new Player(350, 330, 3, 3, ctx, 'slayer');
        const player2 = new Player(320, 330, 3, 3, ctx, 'amazon');
        const player3 = new Player(360, 380, 3, 3, ctx, 'rouge');
        const player4 = new Player(385, 330, 3, 3, ctx, 'mage');
        const player5 = new Player(320, 380, 3, 3, ctx, 'bard');
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
        // setWeapon(player1.items[0]);
        let playersArr = [player1, player2, player3, player4, player5, player6];
        setPlayers(playersArr);
        let canvas = new Board(3, playersArr, ctx);
        playersArr.forEach(player => player.addGrid(canvas.grid));
        canvas.animate();
        setBoard(canvas);

        document.getElementById('canvas').addEventListener('click', function (e) {
            let y = e.clientY + window.scrollY;
            let x = e.clientX + window.scrollX;
            let row = Math.floor(y/100);
            let col = Math.floor(x/100);
            let player = canvas.activePlayer();
            let weapon = player.items[0];
            console.log(targets)
            let rangeArr = canvas.withinRange(weapon.minRange, weapon.maxRange, player.row, player.col);
            let targetCell = canvas.grid.layout[row][col];
            if (rangeArr.includes(targetCell)) {
                for (let i = 0; i < targetCell.zombies.length; i++) {
                    let zombie = targetCell.zombies[i];
                    if (zombie.contains(x,y)) {
                        zombie.targeted = !zombie.targeted;
                        if (zombie.targeted) {
                            setTargets(prevState => prevState+1);
                        } else {
                            setTargets(prevState => prevState-1);
                        }
                        break
                    }
                }
            }
        })
    }, []);

    return (
        <div id='game'>
            <div style={{ position: "absolute", width: 700, height: 700, top: 0 }} onClick={() => console.log(start)}></div>
            <Interface 
            equipmentDeck={equipmentDeck}
            setEquipmentDeck={setEquipmentDeck}
            board={board}
            players={players}
            setPlayers={setPlayers}
            targets={targets}
            />
            <canvas width='100' height='100' style={{backgroundColor: 'black'}} onClick={() => console.log(targets)}></canvas>
        </div>
    )
}