import { useState } from "react";
import { Post } from "../services/PostUsers";
import { Get } from "../services/getUsers";
import "../styles/Registro.css";

function FormRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="body">
      <form>
        <h2 className="form-title">Registro</h2>
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          type="text"
          placeholder="Ingrese su Nombre"
          id="name"
          className="form-input"
          value={username}
          onChange={guardarUsuario}
          required
        />
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          placeholder="Ingrese un email"
          id="email"
          className="form-input"
          value={email}
          onChange={guardarEmail}
          required
        />
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese una contraseña"
          id="password"
          className="form-input"
          value={password}
          onChange={guardarPassword}
          required
        />
        <input
          type="submit"
          value="Registrar"
          className="form-submit"
          onClick={cargar}
        />
        <p className="form-info">¿Ya tienes una cuenta? <a href="/login" className="form-link">Iniciar sesión</a></p>
      </form>
    </div>
  );
}

export default FormRegister;
