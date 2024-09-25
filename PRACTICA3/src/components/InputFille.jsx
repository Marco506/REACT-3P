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
  // Definición de estados para manejar los datos de los productos y formularios
  const [inputNameProduct, setInputNameProduct] = useState(""); 
  const [inputDescripcion, setInputDescripcion] = useState(""); 
  const [inputPrecio, setInputPrecio] = useState(""); 
  const [inputCategoria, setInputCategoria] = useState(""); 
  const [inputImages, setInputImages] = useState([]);
  const [productos, setProductos] = useState([]); // Lista de productos

  // Estado para el modal de alertas
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: '', content: '' });

  // Estados para el modal de edición de productos
  const [showModal, setShowModal] = useState(false);
  const [correctProduct, setCorrectProduct] = useState(null);

  // Efecto que se ejecuta al cargar el componente para obtener productos
  useEffect(() => {
    const fetchProductos = async () => {
      const data = await GetProductos(); // Obtención de productos
      setProductos(data); // Almacenamiento en el estado
    };
    fetchProductos(); // Llamada a la función
  }, []);

  // Función para convertir imágenes a Base64
  const imagenBase64 = (event) => {
    const files = Array.from(event.target.files); // Conversión de FileList a array
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      const reader = new FileReader(); // Lectura de archivos
      reader.onloadend = () => resolve(reader.result); // Resuelve con el resultado
      reader.onerror = reject; // Rechaza en caso de error
      reader.readAsDataURL(file); // Lectura del archivo
    })))
    .then(images => setInputImages(images)) // Almacena las imágenes en el estado
    .catch(error => console.error('Error al leer imágenes:', error)); // Manejo de errores
  };

  // Función para agregar un nuevo producto
  const addProducto = async () => {
    // Validación de campos
    if (!inputNameProduct || !inputDescripcion || !inputPrecio || !inputCategoria || inputImages.length === 0) {
      setModalMessage({ title: 'Error', content: 'Los espacios no pueden estar vacios' });
      setModalOpen(true);
      return; // Sale si hay campos vacíos
    }
    
    // Llamada para guardar el producto
    await PostProductos({ nameProduct: inputNameProduct, descripcion: inputDescripcion, precio: inputPrecio, categoria: inputCategoria, img: inputImages });
    const updatedProductos = await GetProductos(); // Obtención de la lista actualizada
    setProductos(updatedProductos); // Actualiza la lista de productos
    // Resetea los campos del formulario
    setInputNameProduct("");
    setInputDescripcion("");
    setInputPrecio("");
    setInputCategoria("");
    setInputImages([]);
    
    // Mensaje de éxito
    setModalMessage({ title: 'Exito', content: 'Se agrego un producto' });
    setModalOpen(true);

    // Cierre automático del modal tras 2 segundos
    setTimeout(() => {
      setModalOpen(false);
    }, 2000);
  };

  // Función para eliminar un producto
  const deleteProducto = async (id) => {
    try {
      await DeleteProductos(id); // Llama al servicio para eliminar el producto
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id)); // Actualiza la lista eliminando el producto
    } catch (error) {
      console.error('Error al eliminar producto:', error); // Manejo de errores
    }
  };

  // Función para preparar la edición de un producto
  const editProducto = (producto) => {
    // Establece el producto que se va a editar
    setCorrectProduct(producto);
    setInputNameProduct(producto.nameProduct);
    setInputDescripcion(producto.descripcion);
    setInputPrecio(producto.precio);
    setInputCategoria(producto.categoria);
    setInputImages(producto.img); 
    setShowModal(true); // Abre el modal de edición
  };

  // Función para guardar cambios en un producto editado
  const editSubmit = async () => {
    // Validación de campos
    if (!inputNameProduct || !inputDescripcion || !inputPrecio || !inputCategoria) {
      setModalMessage({ title: 'Error', content: 'Los espacios no pueden estar vacios' });
      setModalOpen(true);
      return; // Sale si hay campos vacíos
    }
   
      await PutProductos(correctProduct.id, {
        ...correctProduct, // Mantiene todas las propiedades de 'correctProduct'
        nameProduct: inputNameProduct,
        descripcion: inputDescripcion,
        precio: inputPrecio,
        categoria: inputCategoria,
        img: inputImages
      });
      const updatedProductos = await GetProductos(); // Obtiene la lista actualizada
      setProductos(updatedProductos); // Actualiza la lista de productos
      setShowModal(false); // Cierra el modal

      setModalMessage({ title: 'Exito', content: 'Se edito con exito' });
      setModalOpen(true);
      
      setTimeout(() => {
        setModalOpen(false);
      }, 2000);
        // Resetea los campos del formulario
        setInputNameProduct("");
        setInputDescripcion("");
        setInputPrecio("");
        setInputCategoria("");
        setInputImages([]);

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
            onChange={imagenBase64} // Llama a la función para manejar las imágenes
          />
          <span>Agregar Imágenes</span>
        </label>

        <input
          type="text"
          placeholder="Nombre de producto"
          value={inputNameProduct}
          onChange={e => setInputNameProduct(e.target.value)} // Actualiza el estado
          className="input-field"
        />

        <input
          type="text"
          placeholder="Descripción"
          value={inputDescripcion}
          onChange={e => setInputDescripcion(e.target.value)} // Actualiza el estado
          className="input-field"
        />
        <input
          type="number"
          placeholder="Precio"
          value={inputPrecio}
          onChange={e => setInputPrecio(e.target.value)} // Actualiza el estado
          className="input-field"
        />
        <select
          value={inputCategoria}
          onChange={e => setInputCategoria(e.target.value)} // Actualiza el estado
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
        <button onClick={addProducto} className="submit-button">Agregar</button> {/* Botón para agregar producto */}

      </div>
      <div className="productos-container">
        {productos.map(producto => ( // Mapea y muestra cada producto
          <div key={producto.id} className="producto-card">
            <div className="producto-image-container">
              {producto.img ? (
                producto.img.map((src, index) => ( // Muestra las imágenes del producto
                  <img key={index} src={src} className="producto-image" />
                ))
              ) : (
                <div className="no-image">No hay Productos</div> 
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
                  <BiSolidEditAlt /> 
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
            onChange={e => setInputNameProduct(e.target.value)} // Actualiza el estado
            className="input-field"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={inputDescripcion}
            onChange={e => setInputDescripcion(e.target.value)} // Actualiza el estado
            className="input-field"
          />
          <input
            type="number"
            placeholder="Precio"
            value={inputPrecio}
            onChange={e => setInputPrecio(e.target.value)} // Actualiza el estado
            className="input-field"
          />
          <select
            value={inputCategoria}
            onChange={e => setInputCategoria(e.target.value)} // Actualiza el estado
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
              onChange={imagenBase64} // Llama a la función para manejar las imágenes
            />
            <span>Agregar Imágenes</span>
          </label>
          <button className='submit-button' onClick={editSubmit}>Guardar Cambios</button>
        </Modal.Body>
      </Modal>

      {/* Modal de alertas */}
      <AlertaModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default PageProductos; 



