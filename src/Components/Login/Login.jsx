import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password, role: selectedRole });

    if (selectedRole) {
      setUser({ email: username });
      navigate("/dashboard");
    } else {
      alert("Por favor, selecione um cargo.");
    }
  };

  const selectButton = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="body-login">
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="input-field">
            <input
              type="text"
              placeholder="E-mail"
              required value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="option-container">
            <div className="option-button" onClick={() => selectButton('sales')}>
              <div className={`circle ${selectedRole === 'sales' && 'selected'}`} id="sales"></div>
              <span>&nbsp;Vendedor</span>
            </div>
            
            <div className="option-button" onClick={() => selectButton('stock')}>
              <div className={`circle ${selectedRole === 'stock' && 'selected'}`} id="stock"></div>
              <span>&nbsp;Gerente</span>
            </div>
          </div>
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;