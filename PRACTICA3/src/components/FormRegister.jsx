import { useState } from "react";
import { PostUsers } from "../services/PostUsers";
import { GetUsers } from "../services/GetUsers";
import "../styles/Registro.css";
import { useNavigate } from "react-router-dom";

function FormRegister() {

  const Navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alerta1, setAlerta1] = useState(false);
  const [alerta2, setAlerta2] = useState(false);

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
      setAlerta1(true)

      setTimeout(() => {
        setAlerta1(false)
      }, 2000);
    }

    if (password.length < 8) {
     setAlerta2(true)

      setTimeout(() => {
        setAlerta2(false)
      }, 2000);
    }

    await PostUsers({ name: username, email: email, password: password });

    alert("Registro exitoso");
    Navigate("/Login")
  };

  return (
    <div className="register-container">
      {alerta1 && <div className="alert alert-success" role="alert">El correo ya existe</div>}
      {alerta2 && <div className="alert alert-success" role="alert">La contraseña debe contener más de 8 dígitos</div>}
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
        <p className="register-form-info">¿Ya tienes una cuenta? <a href="/login" className="register-form-link">Iniciar sesión</a></p>
      </form>
    </div>
  );
}

export default FormRegister;

