import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ItemItem from "../card/item_item";
import Toolbar from "./toolbar";

export default function Interface(props) {
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
        let playerArr = [...players], item;
        if (destination.droppableId === 'discard') {
            let idx = Number(source.droppableId);
            let player = players[idx];
            item = player.splice(source.index, 1);
            equipmentDeck.discard(item);
        } else {
            let otherIdx = String(currentPlayerIdx) === destination.droppableId ? source.droppableId : destination.droppableId
            let otherPlayer = players[otherIdx];
            if (source.droppableId === destination.droppableId) {
                if (currentPlayerIdx === source.droppableId) {
                    item = currentPlayer.splice(source.index,1);
                    currentPlayer.addItem(item, destination.index);
                } else {
                    item = otherPlayer.splice(source.index, 1);
                    otherPlayer.addItem(item, destination.index);
                }
                // setNumActions(--currentPlayer.numActions);
            } else {
                if (String(currentPlayerIdx) === destination.droppableId) {
                    item = otherPlayer.splice(source.index, 1);
                    currentPlayer.addItem(item, destination.index);
                } else {
                    item = currentPlayer.splice(source.index, 1);
                    otherPlayer.addItem(item, destination.index);
                }
                playerArr.splice(otherIdx, 1, otherPlayer);
            }
            playerArr.splice(currentPlayerIdx, 1, currentPlayer);
        }
        setPlayers(playerArr);
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
        let style = idx === players.length - 1 ? 'darkred' : 'red' 
        return (
            <div className="item-card" key={idx} style={{backgroundColor: style}}>
                <span className="title">On Hand</span>
                <span className="name">{player.name[0].toUpperCase()+player.name.slice(1)}</span> 
                <span>Exp: {player.exp}</span>
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

    const displayDiscard = () => {
        return (
            <div className="discard">
                <header>Discard</header>
                <Droppable droppableId="discard" key="discard">
                    {(provided, snapshot) => {
                        return (
                            <div
                                className="item-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ minHeight: 275 }}
                            >
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
                    players={players}
                    setPlayers={setPlayers}
                    board={board}
                    equipmentDeck={equipmentDeck}
                    setEquipmentDeck={setEquipmentDeck}
                    targeted={targeted}
                    setTargeted={setTargeted}
                />
                <header>Number of Actions Left: {numActions}</header>
                <div className="playing-cards">
                    {displayItems(currentPlayer, currentPlayerIdx)}
                </div>
                {displayDiscard()}
            </div>
            </DragDropContext>
        </React.Fragment>
    )
}