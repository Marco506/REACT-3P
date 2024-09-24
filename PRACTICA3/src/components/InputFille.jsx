import React, { useEffect, useState } from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { PostProductos } from '../services/ProductosAgregados/PostProductos';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import { DeleteProductos } from '../services/ProductosAgregados/DeleteProductos';
import { PutProductos } from '../services/ProductosAgregados/PutProductos';
import "../styles/InputFille.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import AlertaModal from './AlertaModal';

function PageProductos() {
  const [inputNameProduct, setInputNameProduct] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [inputPrecio, setInputPrecio] = useState("");
  const [inputCategoria, setInputCategoria] = useState("");
  const [inputImages, setInputImages] = useState([]);
  const [productos, setProductos] = useState([]);
 // Estado del AlertModal
 const [modalOpen, setModalOpen] = useState(false);
 const [modalMessage, setModalMessage] = useState({ title: '', content: '' });
  //MODALES
  const [showModal, setShowModal] = useState(false);
  const [correctProduct, setCorrectProduct] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
        const data = await GetProductos();
        setProductos(data); 
    };
    fetchProductos(); 
  }, []);

//Base 64
  const imagenBase64 = (event) => {
    const files = Array.from(event.target.files);
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })))
    .then(images => setInputImages(images))
    .catch(error => console.error('Error al leer imágenes:', error));
  };


  const addProducto = async () => {
    if (!inputNameProduct || !inputDescripcion || !inputPrecio || !inputCategoria || inputImages.length === 0  ) {

      setModalMessage({ title: 'Error', content: 'Los espacios no pueden estar vacios' });
      setModalOpen(true);
      return
    }
  
    //Se guardan los productos
      await PostProductos({ nameProduct: inputNameProduct, descripcion: inputDescripcion, precio: inputPrecio, categoria: inputCategoria, img: inputImages });
      const updatedProductos = await GetProductos();      
      setProductos(updatedProductos);
      setInputNameProduct("");
      setInputDescripcion("");
      setInputPrecio("");
      setInputCategoria("");
      setInputImages([]);

      setModalMessage({ title: 'Exito', content: 'Se agrego un producto' });
      setModalOpen(true);

      setTimeout(() => {
        setModalOpen(false)
      }, 2000);
     
    
   
  };
 //ELIMINAR EL PRODUCTO
  const deleteProducto = async (id) => {
    try {
      await DeleteProductos(id);
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
//EDITAR PRODUCTO
  const editProducto = (producto) => {
    setCorrectProduct(producto);
    setInputNameProduct(producto.nameProduct);
    setInputDescripcion(producto.descripcion);
    setInputPrecio(producto.precio);
    setInputCategoria(producto.categoria);
    setInputImages(producto.img || []);
    
    setShowModal(true);
  };

  const editSubmit = async () => {
    if (!inputNameProduct || !inputDescripcion || !inputPrecio || !inputCategoria) {

      setModalMessage({ title: 'Error', content: 'Los espacios no pueden estar vacios' });
      setModalOpen(true);
      return
    }
    try {
      await PutProductos(correctProduct.id, {
        ...correctProduct, // Mantiene todas las propiedades de 'correctProduct'
        nameProduct: inputNameProduct,
        descripcion: inputDescripcion,
        precio: inputPrecio,
        categoria: inputCategoria,
        img: inputImages
      });
      const updatedProductos = await GetProductos();
      setProductos(updatedProductos);
      setShowModal(false);
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  return (
    <div className="product-form">
      <h1>Agregar Producto</h1>
      <div className="input-container">
        <label className="file-label">
          <input
            type="file"
            className="file-input"
            multiple
            onChange={imagenBase64}
          />
          <span>Agregar Imágenes</span>
        </label>

        <input
          type="text"
          placeholder="Nombre de producto"
          value={inputNameProduct}
          onChange={e => setInputNameProduct(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Descripción"
          value={inputDescripcion}
          onChange={e => setInputDescripcion(e.target.value)}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Precio"
          value={inputPrecio}
          onChange={e => setInputPrecio(e.target.value)}
          className="input-field"
        />
        <select
          value={inputCategoria}
          onChange={e => setInputCategoria(e.target.value)}
          className="input-field"
        >
          <option value="" disabled>Categoría</option>
          <option value="Vestido">Vestido</option>
          <option value="Camisas">Camisas</option>
          <option value="Faldas">Faldas</option>
          <option value="Shorts">Shorts</option>
          <option value="Trajes de baño">Trajes de baño</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Promociones">Promociones</option>
        </select>
        <button onClick={addProducto} className="submit-button">Agregar</button>

      </div>
      <div className="productos-container">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="producto-image-container">
              
              {producto.img && Array.isArray(producto.img) ? (
                producto.img.map((src, index) => (
                  <img key={index} src={src} alt={`Producto ${index}`} className="producto-image" />
                ))
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="producto-details">
              <h3>{producto.nameProduct}</h3>
              <h5>{producto.descripcion}</h5>
              <p>Precio:  ₡{producto.precio}</p>
              <p>Categoría: {producto.categoria}</p>
              <div className="button-container">
                <button className="delete-button" onClick={() => deleteProducto(producto.id)}>
                  <FaTrash />
                </button>
                <button className="edit-button" onClick={() => editProducto(producto)}>
                  <BiSolidEditAlt/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>




      
      {/* MODAL PARA EDITAR EL PRODUCTO */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nombre de producto"
            value={inputNameProduct}
            onChange={e => setInputNameProduct(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={inputDescripcion}
            onChange={e => setInputDescripcion(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Precio"
            value={inputPrecio}
            onChange={e => setInputPrecio(e.target.value)}
            className="input-field"
          />
          <select
            value={inputCategoria}
            onChange={e => setInputCategoria(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>Categoría</option>
            <option value="Vestido">Vestido</option>
          <option value="Camisas">Camisas</option>
          <option value="Faldas">Faldas</option>
          <option value="Shorts">Shorts</option>
          <option value="Trajes de baño">Trajes de baño</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Promociones">Promociones</option>
          </select>
          <label className="file-label">
            <input
              type="file"
              className="file-input"
              multiple
              onChange={imagenBase64}
            />
            <span>Agregar Imágenes</span>
          </label>
          <button className='submit-button' onClick={editSubmit}>Guardar Cambios</button>
         
        </Modal.Body>
      </Modal>
      {/* Modal */}
      <AlertaModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default PageProductos;



