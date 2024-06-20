import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password, role: selectedRole });

    if (selectedRole === "salesman") {
      navigate("/salesman");
    } else if (selectedRole === "manager") {
      navigate("/manager");
    } else {
      alert("Por favor, selecione um cargo.");
    }
  };

  const selectButton = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="option-container">
          <div className="option-button" onClick={() => selectButton('salesman')}>
            <div className={`circle ${selectedRole === 'salesman' && 'selected'}`} id="salesman"></div>
            <span>&nbsp;Vendedor</span>
          </div>
          
          <div className="option-button" onClick={() => selectButton('manager')}>
            <div className={`circle ${selectedRole === 'manager' && 'selected'}`} id="manager"></div>
            <span>&nbsp;Gerente</span>
          </div>
        </div>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;