import { useState } from "react";
import { PostUsers } from "../services/PostUsers";
import { GetUsers } from "../services/GetUsers";
import "../styles/Registro.css";
import { useNavigate } from "react-router-dom";
import AlertaModal from "./AlertaModal";

function FormRegister() {

  const Navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado del AlertModal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });

  function guardarUsuario(event) {
    setUsername(event.target.value);
  }

  function guardarEmail(event) {
    setEmail(event.target.value);
  }

  function guardarPassword(event) {
    setPassword(event.target.value);
  }

  const cargar = async (event) => {
    event.preventDefault();

    let listUsers = await GetUsers();
    let userRegister = listUsers.find((user) => user.email === email);
    if (userRegister) {
      setModalMessage({ title: 'Error', content: 'Ya hay un Email registrado' });
      setModalOpen(true);
      return
    }

    if (password.length < 8) {
      setModalMessage({ title: 'Error', content: 'La contraseña debe tener mas de 8 dijitos' });
      setModalOpen(true);
      return
    }

    await PostUsers({ name: username, email: email, password: password });

    Navigate("/Login")
  };

  return (
    <div className="register-container">
      
      <form id="register-form" onSubmit={cargar}>
        <h2 className="register-form-title">Registro</h2>
        <label htmlFor="name" className="register-form-label">Nombre</label>
        <input
          type="text"
          placeholder="Ingrese su Nombre"
          id="name"
          className="register-form-input"
          value={username}
          onChange={guardarUsuario}
          required
        />
        <label htmlFor="email" className="register-form-label">Email</label>
        <input
          type="email"
          placeholder="Ingrese un email"
          id="email"
          className="register-form-input"
          value={email}
          onChange={guardarEmail}
          required
        />
        <label htmlFor="password" className="register-form-label">Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese una contraseña"
          id="password"
          className="register-form-input"
          value={password}
          onChange={guardarPassword}
          required
        />
        <input
          type="submit"
          value="Registrar"
          className="register-form-submit"
        />
        <p className="register-form-info">¿Ya tienes una cuenta? <a href="/Login" className="register-form-link">Iniciar sesión</a></p>
      </form>
      {/* Modal */}
      <AlertaModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default FormRegister;

