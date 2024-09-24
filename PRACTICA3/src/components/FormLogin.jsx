import { useState } from "react";
import { GetUsers } from "../services/GetUsers";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertaModal from "./AlertaModal";


function FormLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Estado del AlertModal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });

  const obtenerUsername = (event) => setUsername(event.target.value);
  const obtenerPassword = (event) => setPassword(event.target.value);

  const cargarLogin = async (event) => {
    event.preventDefault();

    const userList = await GetUsers();
    const validUser = userList.find((user) => user.name === username);

    // Validación de usuario
    if (!validUser) {
      setModalMessage({ title: 'Error', content: 'El usuario no está registrado' });
      setModalOpen(true);
      return;
    }

    // Validación de contraseña
    if (validUser.password === password) {
      localStorage.setItem("Autenticado", "true");
      setModalMessage({ title: 'Bienvenido', content: 'Bienvenido a juli-seams' });
      setModalOpen(true);
      const adminOUsuario = validUser.password.includes("juli-seams") ? "/Home" : "/HomeUsuarios";
      setTimeout(() => {
        setModalOpen(false);
        navigate(adminOUsuario);
      }, 2000);
    } else {
      setModalMessage({ title: 'Error', content: 'Contraseña incorrecta' });
      setModalOpen(true);
    }
  };

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={cargarLogin}>
        <h2 className="login-form-title">Iniciar sesión</h2>
        
        <label htmlFor="username" className="login-form-label">Nombre</label>
        <input
          type="text"
          id="username"
          className="login-form-input"
          placeholder="Ingrese su nombre"
          value={username}
          onChange={obtenerUsername}
          required
        />
        
        <label htmlFor="password" className="login-form-label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="login-form-input"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={obtenerPassword}
          required
        />
        
        <button type="submit" className="login-form-submit">Iniciar</button>
        <p className="login-form-info">¿No tienes una cuenta? <a href="/" className="login-form-link">Registrarse</a></p>
      </form>

      {/* Modal */}
      <AlertaModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default FormLogin;



