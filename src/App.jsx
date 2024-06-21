import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Salesman from './Components/Salesman/Salesman';
import Manager from './Components/Manager/Manager';
import { SalesProvider } from './Components/Salesman/SalesContext';

function App() {
  return (
    <SalesProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/salesman' element={<Salesman/>}/>
          <Route path='/manager' element={<Manager/>}/>
        </Routes>
      </BrowserRouter>
    </SalesProvider>
  )
}

export default App;