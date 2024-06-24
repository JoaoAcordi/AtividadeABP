import { useState } from 'react';
import { useStock } from './StockContext'; 
import './Stock.css';

function Stock() {
    const { stockItems, addStockItem, updateStockItem, deleteStockItem } = useStock();
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [editId, setEditId] = useState(null);

    const handleAddOrUpdate = () => {
        if (itemName && itemQuantity && itemPrice) {
            const newItem = { 
                id: editId ? editId : Date.now(), 
                name: itemName, 
                quantity: parseInt(itemQuantity, 10),
                price: parseFloat(itemPrice).toFixed(2)
            };

            if (editId) {
                updateStockItem(newItem);
                setEditId(null);
            } else {
                addStockItem(newItem);
            }

            setItemName('');
            setItemQuantity('');
            setItemPrice('');
        }
    };

    const handleEdit = id => {
        const item = stockItems.find(item => item.id === id);
        setItemName(item.name);
        setItemQuantity(item.quantity);
        setItemPrice(item.price);
        setEditId(id);
    };

    const handleDelete = id => {
        deleteStockItem(id);
    };

    return (
        <div className="container-stock">
            <div className="header-stock">
                <h1>Estoque</h1>
            </div>
            <div className="content-stock">
                <div className="form-group-container-stock">
                    <div className="form-group-stock">
                        <label htmlFor="item-name">Nome do Item</label>
                        <input 
                            type="text" 
                            id="item-name" 
                            placeholder="Nome do Item" 
                            value={itemName} 
                            onChange={(e) => {
                                const value = e.target.value;
                                const filteredValue = value.replace(/[^a-zA-Z\u00C0-\u017F\s]/g, '');
                                setItemName(filteredValue);
                            }}
                        />
                    </div>
                    <div className="form-group-stock">
                        <label htmlFor="item-quantity">Quantidade do Item</label>
                        <input 
                            type="number" 
                            id="item-quantity" 
                            placeholder="Quantidade do Item" 
                            value={itemQuantity} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value < 0) {
                                    setItemQuantity(0);
                                } else {
                                    setItemQuantity(value);
                                }
                            }}
                        />
                    </div>
                    <div className="form-group-stock">
                        <label htmlFor="item-price">Preço do Item</label>
                        <input 
                            type="number" 
                            id="item-price" 
                            placeholder="Preço do Item" 
                            value={itemPrice} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value < 0) {
                                    setItemPrice(0);
                                } else {
                                    setItemPrice(value);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="form-group-stock">
                    <button onClick={handleAddOrUpdate}>
                        {editId ? 'Atualizar Item' : 'Adicionar Item'}
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>R$ {item.price}</td>
                                <td className="action-buttons-stock">
                                    <button className="edit" onClick={() => handleEdit(item.id)}>Editar</button>
                                    <button className="delete" onClick={() => handleDelete(item.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Stock;
