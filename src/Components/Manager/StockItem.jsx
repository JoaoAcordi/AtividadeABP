import React from 'react';

const StockItem = ({ item }) => {
    return (
        <div className="stock-item">
            <h3>{item.name}</h3>
            <p>-Quantidade: {item.quantity}</p>
        </div>
    );
};

export default StockItem;
