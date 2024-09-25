import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import '../styles/ModalCorreo.css'; 

function ModalCorreo() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', producto: '', mensaje: '' });

  const manejarCerrar = () => setMostrarModal(false);
  const manejarMostrar = () => setMostrarModal(true);

  const enviarCorreo = (event) => {
    event.preventDefault();
   

    emailjs.sendForm("service_dc8wd2j", "template_3wvszvh", event.target, "HzbKWKbh_CgF2RBKC")
      .then(response => {
        console.log(response);

        alert("Correo enviado con éxito!");
        manejarCerrar();
        setFormData({ nombre: '', email: '', producto: '', mensaje: '' }); // Reinicia el formulario
      })
      .catch(error => {
        console.log(error);
        alert("Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.");
      }); 
  };

  

  return (
    <>
      <Button variant="primary" onClick={manejarMostrar}>
       Cotizar
      </Button>

      <Modal show={mostrarModal} onHide={manejarCerrar} className='cuerpo-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Encargar a través de un correo electrónico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-mail-modal' onSubmit={enviarCorreo}>
            <label>Nombre</label>
            <input type="text" name='name' required className='text-modal'
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
            <hr />

            <label>Correo Electrónico</label>
            <input type="email" name='email' required className='text-modal'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <hr />
            
            <label>Nombre de Producto</label>
            <input
              className='text-modal'
              type="text"
              name='nameProduct'
              required
              onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
            />
            <hr />

            <label>Mensaje</label>
            <textarea name="message" cols="30" rows="5" required className='text-modal'
            onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
            ></textarea>
            <hr />
            <Button type="submit" className='boton-enviar'>Enviar</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCorreo;


