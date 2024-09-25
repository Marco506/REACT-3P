import React, { useState } from 'react';
import '../styles/Contactanos.css';
import emailjs from '@emailjs/browser';

function PageContactanos() {
  const [formData, setFormData] = useState({ user_name: '', user_email: '', user_message: '' });
  

  const sendEmail = (event) => {
    event.preventDefault();
   
    emailjs.sendForm("service_dc8wd2j", "template_wi74xoh", event.target, "HzbKWKbh_CgF2RBKC")
      .then(response => {
        console.log(response);
        alert("Correo enviado con éxito!");
        
        setFormData({ user_name: '', user_email: '', user_message: '' });
      })
      .catch(error => console.log(error));
  };

  

  return ( 
    <div className='cuerpo-contactanos'>
      <div className='formulario-container'>
        <h1 className='titulo-formulario'>Contáctanos</h1>
        <p className='subtitulo-formulario'>Estamos aquí para ayudarte. ¡Déjanos un mensaje!</p>
        <form className='formulario-correo' onSubmit={sendEmail}>
          <label>Nombre</label>
          <input type="text" name='user_name' required 
            onChange={(e) => setFormData({ ...formData, user_name: e.target.value })} />
          
          <label>Correo Electrónico</label>
          <input type="email" name='user_email' required 
            onChange={(e) => setFormData({ ...formData, user_email: e.target.value })} />
          
          <label>Mensaje</label>
          <textarea name="user_message" cols="30" rows="10" required 
            onChange={(e) => setFormData({ ...formData, user_message: e.target.value })}></textarea>
        
          <button type="submit" className='boton-enviar'>Enviar</button>
        </form>
        <footer className="pie-pagina-contactanos text-center mt-5">
          <p className="texto-pie-pagina-contactanos">
            Gracias por tu interés. Responderemos a tu mensaje lo más pronto posible.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default PageContactanos;



