import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import { AuthProvider } from './Components/Login/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard';
import Sales from './Components/Sales/Sales';
import { SalesProvider } from './Components/Sales/SalesContext';
import Stock from './Components/Stock/Stock';
import { StockProvider } from './Components/Stock/StockContext';

function App() {
  return (
    <AuthProvider>
      <SalesProvider>
        <StockProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/sales' element={<Sales/>}/>
              <Route path='/stock' element={<Stock/>}/>
            </Routes>
          </BrowserRouter>
        </StockProvider>
      </SalesProvider>
    </AuthProvider>
  );
}

export default App;