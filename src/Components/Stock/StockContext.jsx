import { createContext, useContext, useState } from 'react';

const StockContext = createContext();

export const useStock = () => {
    return useContext(StockContext);
};

export const StockProvider = ({ children }) => {
    const [stockItems, setStockItems] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);

    const addStockItem = (item) => {
        setStockItems([...stockItems, item]);
        setTotalExpenses(totalExpenses + item.price * item.quantity);
    };

    const updateStockItem = (updatedItem) => {
        setStockItems(stockItems.map(item => item.id === updatedItem.id ? updatedItem : item));
        const newTotal = stockItems.reduce((total, item) => {
            return total + (item.id === updatedItem.id ? updatedItem.price * updatedItem.quantity : item.price * item.quantity);
        }, 0);
        setTotalExpenses(newTotal);
    };

    const deleteStockItem = (id) => {
        const itemToDelete = stockItems.find(item => item.id === id);
        setStockItems(stockItems.filter(item => item.id !== id));
        setTotalExpenses(totalExpenses - itemToDelete.price * itemToDelete.quantity);
    };

    return (
        <StockContext.Provider value={{ stockItems, addStockItem, updateStockItem, deleteStockItem, totalExpenses }}>
            {children}
        </StockContext.Provider>
    );
}