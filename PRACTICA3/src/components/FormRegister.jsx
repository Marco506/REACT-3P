import  { useState } from "react"
import { Post } from "../services/PostUsers";
import { Get } from "../services/getUsers";
import { Navigate } from "react-router-dom";





function FormRegister() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  function guardarUsuario(event) {
    event.preventDefault()
    setUsername(event.target.value);
  };

  function guardarEmail(event) {
    event.preventDefault()
    setEmail(event.target.value);
  };

  function guardarPassword(event) {
    event.preventDefault()
    setPassword(event.target.value);
  };

  const  cargar = async (event) => {
    event.preventDefault()

    let listUsers = await Get();
    let userRegister = listUsers.find((user)=> user.email === email  
    )
    if (userRegister) {
     return alert("El correo ya existe")
    }

    if (password.length < 8) {
     return alert("Contraseña debe de contener mas de 8 dijitos")
    }


    await Post ({ name:username, email:email, password: password })
    
    if (Post) {
      alert ("Registro exitoso")
     Navigate("/Login")
    }
    

    
    console.log("usuario", username);
    console.log("email", email);
    console.log("password", password);
    
    
    
  }

  
    return(
        <div>
        <section>
            <h2>Register</h2>
            <form id="signUpForm">
            <label>Nombre</label>
            <input className="input"
            type="text"
            placeholder="Ingrese su Nombre"
            id="name"
            value={username}
            onChange={guardarUsuario}
            
            required
            
            />
          <label htmlFor="email">Email</label>
          <input className="input"
            type="email"
            name="email"
            placeholder="Ingrese un email"
            id="email"
            value={email}
            onChange={guardarEmail}
            required
          />
          <label>Contraseña</label>
          <input className="input"
            type="password"
            placeholder="Ingrese una contrasela"
            id="password"
            required
            onChange={guardarPassword}
            value={password}
            />
            <input onClick={cargar} className="input" type="submit" value="Registro" />
            </form>
            <p>Ya tienes una cuenta? <a href="http://localhost:5173/login">Login</a></p>
            <p id="texto"></p>
        </section>
        </div>
    )
}
export default FormRegister 