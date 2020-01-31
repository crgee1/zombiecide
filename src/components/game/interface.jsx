import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemItem from "../card/item_item";
import Toolbar from "./toolbar";

export default function Interface(props) {
    const [dice, setDice] = useState([]);
    const [numActions, setNumActions] = useState(3);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

    const { board, players, setPlayers, equipmentDeck, setEquipmentDeck, targeted, setTargeted } = props;

    const currentPlayer = players[currentPlayerIdx];

    useEffect(() => {
        if (board) board.playerIdx = currentPlayerIdx;
    }, [currentPlayerIdx, board]);

    const handleDrop = result => {
        if (!result.destination) return;
        const { source, destination } = result;
        let playerArr = [...players];
        if (source.droppableId === destination.droppableId) {
            let [item] = currentPlayer.items.splice(source.index,1);
            currentPlayer.addItem(item, destination.index);
        } else {
            let otherIdx = String(currentPlayerIdx) === destination.droppableId ? source.droppableId : destination.droppableId
            let otherPlayer = players[otherIdx];
            if (String(currentPlayerIdx) === destination.droppableId) {
                let [item] = otherPlayer.items.splice(source.index, 1);
                currentPlayer.items.splice(destination.index, 0, item);
            } else {
                let [item] = currentPlayer.items.splice(source.index, 1);
                otherPlayer.items.splice(destination.index, 0, item);
            }
            playerArr.splice(otherIdx, 1, otherPlayer);
        }
        playerArr.splice(currentPlayerIdx, 1, currentPlayer);
        setPlayers(playerArr);
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

    const displayItems = (player, idx) => {
        if (!player) return;
        let displayArr = player.items.map((item, i) => {
            return (
                <Draggable key={`${item.id}`} draggableId={`${item.id}`} index={i}>
                    {(provided, snapshot) => {
                        return (
                            <div 
                                ref={provided.innerRef} 
                                {...provided.draggableProps} 
                                {...provided.dragHandleProps}
                            >
                                <ItemItem
                                    item={item}
                                />
                            </div>
                        )
                    }}
                </Draggable>
            )
        });
        // let length = displayArr.length
        // let slots = 5 - length
        // if (slots > 0) {
        //     for (let i = slots; i > 0; i--) {

        //         let text = i === 5 || i === 4 ? 'In Hand' : 'Reserve'
        //         displayArr.push(
        //             <Draggable key={String(i+length)} draggableId={String(i+length)} index={i+length-1}>
        //                 {(provided, snapshot) => {
        //                     return (
        //                         <div
        //                             ref={provided.innerRef}
        //                             {...provided.draggableProps}
        //                             {...provided.dragHandleProps}
        //                         >
        //                             <ItemItem
        //                                 item={{name: text}}
        //                             />
        //                         </div>
        //                     )
        //                 }}
        //             </Draggable>
        //         );
        //     }
        // }
        return (
            <div className="item-card" key={idx}>
                
                <span className="title">On Hand</span> <span>On Reserve</span>
                    <Droppable droppableId={`${idx}`} key={`${idx}`} direction="horizontal"> 
                    {(provided, snapshot) => {
                        return (
                            <div 
                                className="item-drop-area"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{minHeight: 275}}
                            >
                                {displayArr}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                    </Droppable>
                
            </div>
            );
    }

    const displayOtherPlayers = () => {
        return players.map((player, i) => {
            return displayItems(player, i);
        }).filter((player, idx) => idx !== currentPlayerIdx);
    }

    return (
        <React.Fragment>
            <DragDropContext onDragEnd={handleDrop}>

            <div className="other-players-container">
                {displayOtherPlayers()}
            </div>
            <div className="playing-container">
                <Toolbar
                    currentPlayer={currentPlayer}
                    currentPlayerIdx={currentPlayerIdx}
                    setCurrentPlayerIdx={setCurrentPlayerIdx}
                    setNumActions={setNumActions}
                    numActions={numActions}
                    setDice={setDice}
                    players={players}
                    setPlayers={setPlayers}
                    board={board}
                    equipmentDeck={equipmentDeck}
                    setEquipmentDeck={setEquipmentDeck}
                    targeted={targeted}
                    setTargeted={setTargeted}
                />
                <header>{currentPlayer ? currentPlayer.name : null}</header>
                <header>{numActions}</header>
                <div className="playing-cards">
                    {displayItems(currentPlayer, currentPlayerIdx)}
                    <div className="dice-container">
                        {displayDice()}
                    </div>
                </div>
            </div>
            </DragDropContext>
        </React.Fragment>
    )
}