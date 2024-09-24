import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import '../styles/ModalCorreo.css'; 

function ModalCorreo() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [inputProducto, setInputProducto] = useState({});

  const manejarCerrar = () => setMostrarModal(false);
  const manejarMostrar = () => setMostrarModal(true);


  const enviarCorreo = (event) => {
    event.preventDefault();
    emailjs.sendForm("service_dc8wd2j", "template_3wvszvh", event.target, "HzbKWKbh_CgF2RBKC")
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const cargarProducto = async () => {
     
      
        setInputProducto(); 
      
    };
    cargarProducto();
  }, []);

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
            <input type="text" name='name' required className='text-modal' />
            <hr />

            <label>Correo Electrónico</label>
            <input type="email" name='email' required className='text-modal' />
            <hr />
            
            <label>Nombre de Producto</label>
              <input
                className='text-modal'
                type="text"
                value={inputProducto}
                name='nameProduct'
              />
            <hr />

            <label>Mensaje</label>
            <textarea name="message" cols="30" rows="5" required className='text-modal'></textarea>
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

