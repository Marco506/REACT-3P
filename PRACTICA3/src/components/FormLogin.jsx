import { useState } from "react"
import { Get } from "../services/getUsers";

function FormLogin() {
  
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");

  function obtenerUsername(event) {
    event.preventDefault()
    setUsername(event.target.value)
    
  }

  function obtenerPassword(event) {
    event.preventDefault()
    setPassword(event.target.value)
  }
    
    
  const cargarLogin = async (event) =>{
      event.preventDefault()

      let userList = await Get();
      console.log(userList);    
    
      let validUser = userList.find((user) => user.name == username);

    
    
    if (validUser) {

      if(validUser.password == password){
        alert("Exitoso")
      }else{
        alert("Contra incorrecta")
      }

    }else{
       alert("User incorrecto")
    }


    

    // Si no se encuentra un usuario válido, muestra un mensaje de error y limpia el mensaje después de 2 segundos
    
    
     
     
      

  }


  
    return (
        <div>
          <h2>Iniciar sesion</h2>
          <div>
            <label htmlFor="username">Nombre</label>
            <input type="text"
            id="username"
            name="username"
            placeholder="Ingrese su nombre"
            value={username}
            onChange={obtenerUsername}
            required
            />
            </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña"
            value={password}
            onChange={obtenerPassword}
            required />
          </div>
          <button onClick={cargarLogin} >Iniciar</button>
          </div>
    )
}
export default FormLogin