import { useNavigate } from "react-router-dom";
import { useSales } from '../Salesman/SalesContext';
import './Dashboard.css'

function Dashboard() {
    const navigate = useNavigate();
    const { totalSales, soldItems } = useSales(); // Usa o contexto de vendas
    const expense = 10.00; // Valor fictício para a despesa
    const balance = totalSales - expense;

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
                <h2>Balança</h2>
                <p>Receita: R$ {totalSales.toFixed(2)}</p>
                <p>Despesa: R$ {expense.toFixed(2)}</p>
                <p>Lucro: R$ {balance.toFixed(2)}</p>
            </div>
            <div className="box-dash">
                    <h2>Últimos Itens Vendidos</h2>
                    <ul>
                        {soldItems.map((item, index) => (
                            <li key={index}>{item.name}: {item.quantity} unidades</li>
                        ))}
                    </ul>
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