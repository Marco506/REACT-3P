
import { useState } from "react";
import { GetUsers } from "../services/GetUsers";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function FormLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //ALERTAS
  const [alerta1, setAlerta1] = useState (false);
  const [alerta2, setAlerta2] = useState (false);
  const [alerta3, setAlerta3] = useState (false);



  function obtenerUsername(event) {
    setUsername(event.target.value);
  }

  function obtenerPassword(event) {
    setPassword(event.target.value);
  }

  const cargarLogin = async (event) => {
    event.preventDefault();

    let userList = await GetUsers();
    let validUser = userList.find((user) => user.name === username);

    if (validUser) {
      if (validUser.password === password) {
        localStorage.setItem("Autenticado", "true")
        setAlerta1(true)
        setTimeout(() => {
          setAlerta1(false)
          navigate("/Home")
        }, 3000);
        
        
      } else {
        setAlerta2(true);
        setTimeout(() => setAlerta2(false), 3000);
      }
    } else {
      setAlerta3(true);
      setTimeout(() => setAlerta3(false), 3000);
    }
  };

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={cargarLogin}>

       {alerta1 && <div className="alert alert-success" role="alert">Bienvenido a juli-seams</div>}
       {alerta2 && <div className="alert alert-danger" role="alert">Contraseña incorrecta</div>}
       {alerta3 && <div className="alert alert-danger" role="alert">El usuario no esta registrado</div>} 
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

