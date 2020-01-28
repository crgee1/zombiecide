import React from 'react';
import './item.css';

export default function ItemItem(props) {
    const { item } = props;
    return (
        <div className="item-container">
            <div className="item">
                {item.name}
            </div>
        </div>
    )
}