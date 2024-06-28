import { useNavigate } from "react-router-dom";
import { useAuth } from '../Login/AuthContext';
import { useSales } from '../Sales/SalesContext';
import { useStock } from '../Stock/StockContext';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { totalSales, soldItems } = useSales();
    const { totalExpenses, stockItems } = useStock();
    const balance = totalSales - totalExpenses;

    return (
        <div className="container-dash">
            <div className="header-dash">
                <div className="user-info">
                    <img src="https://via.placeholder.com/50" alt="User Photo"/>
                    <h1>Bem-vindo, {user ? user.email : '[Usuário]'}!</h1>
                </div>

                <div className="nav-buttons">
                    <button onClick={() => navigate('/sales')}>Sistema de Vendas</button>
                    <button onClick={() => navigate('/stock')}>Sistema de Estoque</button>
                </div>
            </div>

            <div className="content-dash">
                <div className="box-dash">
                    <h2>Balanço</h2>
                    <p>Receita: R$ {totalSales.toFixed(2)}</p>
                    <p>Despesa: R$ {totalExpenses.toFixed(2)}</p>
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
                        {stockItems.map((item, index) => (
                            <li key={index}>{item.name}: {item.quantity} unidades</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;