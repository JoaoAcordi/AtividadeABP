import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Vendedor from './Components/Vendedor/Vendedor'
import Gerente from './Components/Gerente/Gerente'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/vendedor' element={<Vendedor/>}/>
        <Route path='/gerente' element={<Gerente/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
