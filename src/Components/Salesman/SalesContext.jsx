import { createContext, useState, useContext } from 'react';

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
    const [totalSales, setTotalSales] = useState(0);
    const [soldItems, setSoldItems] = useState([]);

    const addToTotalSales = (amount, item) => {
        setTotalSales(prevTotal => prevTotal + parseFloat(amount));
        setSoldItems(prevItems => [...prevItems, item]);
    };

    return (
        <SalesContext.Provider value={{ totalSales, soldItems, addToTotalSales }}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = () => {
    return useContext(SalesContext);
};