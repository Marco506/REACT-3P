import { useState } from "react";
import { Get } from "../services/getUsers";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

function FormLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function obtenerUsername(event) {
    setUsername(event.target.value);
  }

  function obtenerPassword(event) {
    setPassword(event.target.value);
  }

  const cargarLogin = async (event) => {
    event.preventDefault();

    let userList = await Get();
    let validUser = userList.find((user) => user.name === username);

    if (validUser) {
      if (validUser.password === password) {
        alert("Inicio de sesión exitoso");
        navigate("/home");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario incorrecto");
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
    </div>
  );
}

export default FormLogin;

