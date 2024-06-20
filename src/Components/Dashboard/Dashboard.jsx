import './Dashboard.css'
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

  return (
    <div className="container-dash">
        <div className="header-dash">
            <div className="user-info">
                <img src="https://via.placeholder.com/50" alt="User Photo"/>
                <h1>Bem-vindo, [Usuário]!</h1>
            </div>
            <div className="nav-buttons">
                <button onClick={() => navigate('/salesman')}>Sistema de Vendas</button>
                <button onClick={() => navigate('/manager')}>Sistema de Estoque</button>
            </div>
        </div>
        <div className="content-dash">
            <div className="box-dash">
                <h2>Total de Vendas</h2>
                <p>R$ 50,000.00</p>
            </div>
            <div className="box-dash">
                <h2>Estoque Atual</h2>
                <ul>
                    <li>Maçãs: 100 unidades</li>
                    <li>Arroz: 200 kg</li>
                    <li>Feijão: 150 kg</li>
                    <li>Carne: 50 kg</li>
                    <li>Leite: 300 litros</li>
                </ul>
            </div>
        </div>
      </div>
  );
}

export default Dashboard;