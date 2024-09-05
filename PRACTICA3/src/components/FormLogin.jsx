import { useState } from "react";
import { Get } from "../services/getUsers";
import "../styles/Registro.css";

function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function obtenerUsername(event) {
    event.preventDefault();
    setUsername(event.target.value);
  }

  function obtenerPassword(event) {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const cargarLogin = async (event) => {
    event.preventDefault();

    let userList = await Get();
    console.log(userList);

    let validUser = userList.find((user) => user.name === username);

    if (validUser) {
      if (validUser.password === password) {
        alert("Inicio de sesión exitoso");
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario incorrecto");
    }
  };

  return (
    <form>
      <h2>Iniciar sesión</h2>
      <label htmlFor="username">Nombre</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Ingrese su nombre"
        value={username}
        onChange={obtenerUsername}
        required
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Ingrese su contraseña"
        value={password}
        onChange={obtenerPassword}
        required
      />
      <button onClick={cargarLogin}>Iniciar</button>
      <p>¿No tienes una cuenta? <a href="/">Registrarse</a></p>
    </form>
  );
}

export default FormLogin;
