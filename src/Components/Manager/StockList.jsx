import React from 'react';
import './StockList.css'; // Importe os estilos

const StockList = ({ stock, onDeleteItem }) => {
    return (
        <div>
            {stock.length > 0 ? (
                <ul className="stock-list">
                    {stock.map(item => (
                        <li key={item.id} className="stock-item">
                            <div>
                                <strong>{item.name}</strong> - Quantidade: {item.quantity}, Preço: R${item.price.toFixed(2)}
                            </div>
                            <button onClick={() => onDeleteItem(item.id)} className="delete-button">Excluir</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum item encontrado.</p>
            )}
        </div>
    );
};

export default StockList;
