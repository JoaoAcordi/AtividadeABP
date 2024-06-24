import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa'; // Importe o ícone do pacote react-icons
import './AddStockItem.css'; // Importe os estilos

const AddStockItem = ({ onAddItem }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !quantity || !price) {
            alert('Por favor, preencha todos os campos');
            return;
        }
        const newItem = {
            id: Math.floor(Math.random() * 1000) + 1,
            name,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            status: 'not-sold', // Definir status como não vendido por padrão
        };
        onAddItem(newItem);
        setName('');
        setQuantity('');
        setPrice('');
    };

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h2>Adicionar Novo Item</h2>
            <div className="form-control">
                <label>Nome do Item</label>
                <input
                    type="text"
                    placeholder="Digite o nome do item"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Quantidade</label>
                <input
                    type="number"
                    placeholder="Digite a quantidade"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Preço por Unidade</label>
                <input
                    type="number"
                    placeholder="Digite o preço"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button type="submit" className="btn">
                 Adicionar Item
            </button>
        </form>
    );
};

export default AddStockItem;
