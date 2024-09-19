import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';

function ModalCorreo() {
  const [show, setShow] = useState(false);
  const [inputProducto, setInputProducto] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sendEmail = (event) => {
    event.preventDefault();
    emailjs.sendForm("service_dc8wd2j", "template_3wvszvh", event.target, "HzbKWKbh_CgF2RBKC")
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const cargarProducto = async () => {
      
        const productos = await GetProductos();
        // const productoSeleccionado = productos.find((producto) => producto.nameProduct);
          setInputProducto(productos);
        
     
    };
    cargarProducto();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Encargar a través de un correo electrónico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-mail-modal' onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name='name' required className='text-modal' />
            <hr />

            <label>Email</label>
            <input type="email" name='email' required className='text-modal'/>
            <hr />
            
            <label>Nombre de producto</label>
                {inputProducto.map((nombre) => (
                    <input
                        className='text-modal'
                        type="text"
                        value={nombre.nameProduct}
                        name='nameProduct'
                        readOnly 
                        key={nombre.id} // Para que el usuario no pueda editarlo
                    />
                ))}
            <hr />

            <label>Message</label>
            <textarea name="message" cols="30" rows="10" required className='text-modal'></textarea>
            <hr />
            <Button type="submit">Send</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCorreo;
