import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalCorreo from './ModalCorreo';


function ModalBuscador() {
  const [show, setShow] = useState(false);
  const [buscador, setBuscador] = useState("");

  const [productos, setProductos] = useState([]);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const buscarProducto = async (e) => {
    e.preventDefault();

    const datos = await GetProductos();
    setTodosLosProductos(datos)
    setProductos(datos);
  }

  useEffect(()=>{
    if (todosLosProductos.length) {
      const productosFiltrados = todosLosProductos.filter(producto=>
        producto.nameProduct.toLowerCase().includes(buscador.toLocaleLowerCase())||
        producto.descripcion.toLocaleLowerCase().includes(buscador.toLocaleLowerCase())
      )
      // Actualiza la lista de productos a mostrar
      setProductos(productosFiltrados)
    }
  }, [buscador, todosLosProductos])// Se ejecuta cada vez que cambian 'buscador' o 'todosLosProductos'
    
 

  return (
    <>
      <Button className="me-2 mb-2" onClick={handleShow}>
        Buscar
      </Button>
      <Modal show={show} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <div>
        <form className="d-flex" role="search" onSubmit={buscarProducto}>
            <input className="form-control me-2" 
            type="search" 
            placeholder="Search" 
            aria-label="Search"
            value={buscador}
            onChange={e => setBuscador(e.target.value)}
             />

            <button className="btn btn-outline-success" 
            type="submit"
            >Search</button>
          </form>
           
    </div>  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <div className='blusas-card-container'>
          {productos.map(producto => (
            <div className='blusas-card' key={producto.id}>
              {producto.img.map((src, index) => (
                <img key={index} src={src}  className='blusas-product-image'/>
              ))}
              <div className='blusas-card-content'>
                <h2 className="blusas-product-description">{producto.nameProduct}</h2>
                <h2 className='blusas-product-description'>{producto.descripcion}</h2>
                <p className='blusas-product-price'>Precio:  ₡{producto.precio}</p>
                <ModalCorreo />
              </div>
            </div>
          ))}
        </div>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalBuscador;
