import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Estilos padrão para as abas
import StockList from './StockList';
import AddStockItem from './AddStockItem';
import Modal from 'react-modal'; // Importe o modal
import { FaPlus } from 'react-icons/fa'; // Importe o ícone de adicionar
import './Manager.css'; // Importe os estilos

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '600px', // Largura máxima do modal
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
    },
};

const Manager = () => {
    const initialStock = [
        { id: 1, name: 'Item 1', quantity: 10, price: 5.99, status: 'not-sold' },
        { id: 2, name: 'Item 2', quantity: 15, price: 12.49, status: 'not-sold' },
        { id: 3, name: 'Item 3', quantity: 8, price: 7.99, status: 'sold' },
    ];

    const [stock, setStock] = useState(initialStock);
    const [showModal, setShowModal] = useState(false);

    const handleAddItem = (newItem) => {
        setStock([...stock, newItem]);
        setShowModal(false); // Fechar o modal após adicionar o item
    };

    const handleDeleteItem = (itemId) => {
        const updatedStock = stock.filter(item => item.id !== itemId);
        setStock(updatedStock);
    };

    // Calcula o total de itens de entrada
    const totalEntryItems = stock.reduce((acc, item) => {
        if (item.status === 'not-sold') {
            return acc + item.quantity;
        }
        return acc;
    }, 0);

    // Calcula o total de itens de saída
    const totalExitItems = stock.reduce((acc, item) => {
        if (item.status === 'sold') {
            return acc + item.quantity;
        }
        return acc;
    }, 0);

    // Calcula o total de itens
    const totalItems = stock.reduce((acc, item) => acc + item.quantity, 0);

    // Calcula o total de preços dos itens
    const totalPrice = stock.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    // Calcula o total de itens vendidos (lucro)
    const totalSoldItems = stock.reduce((acc, item) => {
        if (item.status === 'sold') {
            return acc + item.quantity;
        }
        return acc;
    }, 0);

    const totalnotSoldItems = stock.reduce((acc, item) => {
        if (item.status === 'not-sold') {
            return acc + item.quantity;
        }
        return acc;
    }, 0);

    // Calcula o total de itens que entraram (gastos)
    const totalEntryCost = stock.reduce((acc, item) => {
        if (item.status === 'not-sold') {
            return acc + (item.quantity * item.price);
        }
        return acc;
    }, 0);

    return (
        <div className="Manager">
            <Tabs>
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>Entrada de Itens</Tab>
                    <Tab>Saída de Itens</Tab>
                </TabList>

                <TabPanel>
                    <div className="dashboard-tab">
                        <h2>Dashboard</h2>
                        <div className="summary">
                            <div>
                                <strong>Total de Itens:</strong> {totalItems}
                            </div>
                            <div>
                                <strong>Total de Preço:</strong> R${totalPrice.toFixed(2)}
                            </div>
                            <div>
                                <strong>Total de Itens Vendidos:</strong> {totalSoldItems}
                            </div>
                            <div>
                                <strong>Total de Itens Comprados:</strong> {totalnotSoldItems}
                            </div>
                            <div>
                                <strong>Total de Lucro:</strong> R${(totalPrice - totalEntryCost).toFixed(2)}
                            </div>
                            <div>
                                <strong>Total de Gastos:</strong> R${totalEntryCost.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="entry-items-tab">
                        <h2>Itens de Entrada</h2>
                        <button onClick={() => setShowModal(true)} className="add-button">
                            <FaPlus />
                        </button>
                        <StockList stock={stock.filter(item => item.status === 'not-sold')} onDeleteItem={handleDeleteItem} />
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="exit-items-tab">
                        <h2>Itens de Saída</h2>
                        <button onClick={() => setShowModal(true)} className="add-button">
                            <FaPlus />
                        </button>
                        <StockList stock={stock.filter(item => item.status === 'sold')} onDeleteItem={handleDeleteItem} />
                    </div>
                </TabPanel>
            </Tabs>

            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={customModalStyles}
                contentLabel="Adicionar Item Modal"
            >
                <AddStockItem onAddItem={handleAddItem} />
            </Modal>
        </div>
    );
};

export default Manager;
