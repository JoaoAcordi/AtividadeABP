// SalesContext.js
import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const SalesContext = createContext();

// Cria o provider
export const SalesProvider = ({ children }) => {
    const [totalSales, setTotalSales] = useState(0);
    const [soldItems, setSoldItems] = useState([]); // Novos itens vendidos

    const addToTotalSales = (amount, item) => {
        setTotalSales(prevTotal => prevTotal + parseFloat(amount));
        setSoldItems(prevItems => [...prevItems, item]); // Adiciona item à lista
    };

    return (
        <SalesContext.Provider value={{ totalSales, soldItems, addToTotalSales }}>
            {children}
        </SalesContext.Provider>
    );
};

// Hook personalizado para usar o contexto de vendas
export const useSales = () => {
    return useContext(SalesContext);
};
