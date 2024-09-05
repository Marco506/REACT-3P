import { useState } from "react";
import { Post } from "../services/PostUsers";
import { Get } from "../services/getUsers";
import "../styles/Registro.css";




function FormRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function guardarUsuario(event) {
    event.preventDefault();
    setUsername(event.target.value);
  }

  function guardarEmail(event) {
    event.preventDefault();
    setEmail(event.target.value);
  }

  function guardarPassword(event) {
    event.preventDefault();
    setPassword(event.target.value);
  }

  const cargar = async (event) => {
    event.preventDefault();

    let listUsers = await Get();
    let userRegister = listUsers.find((user) => user.email === email);
    if (userRegister) {
      return alert("El correo ya existe");
    }

    if (password.length < 8) {
      return alert("La contraseña debe contener más de 8 dígitos");
    }

    await Post({ name: username, email: email, password: password });

    alert("Registro exitoso");
    
  };

  return (
    <form>
      <h2>Registro</h2>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        placeholder="Ingrese su Nombre"
        id="name"
        value={username}
        onChange={guardarUsuario}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Ingrese un email"
        id="email"
        value={email}
        onChange={guardarEmail}
        required
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        placeholder="Ingrese una contraseña"
        id="password"
        required
        onChange={guardarPassword}
        value={password}
      />
      <input
        type="submit"
        value="Registrar"
        onClick={cargar}
      />
      <p>¿Ya tienes una cuenta? <a href="/login">Iniciar sesión</a></p>
    </form>
  );
}

export default FormRegister;
