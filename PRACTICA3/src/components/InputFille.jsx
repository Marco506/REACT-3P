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

function PageProductos() {
  const [inputNameProduct, setInputNameProduct] = useState("");
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [inputPrecio, setInputPrecio] = useState("");
  const [inputCategoria, setInputCategoria] = useState("");
  const [inputImages, setInputImages] = useState([]);
  const [productos, setProductos] = useState([]);
  
  const [alertVisible, setAlertVisible] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [correctProduct, setCorrectProduct] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await GetProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos(); 
  }, []);

  const handleImageChange = (event) => {
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
    if (!inputNameProduct || !inputDescripcion || !inputPrecio || !inputCategoria || inputImages.length === 0) {
      alert("Todos los campos deben ser completados");
      return;
    }
    try {
      await PostProductos({ nameProduct: inputNameProduct, descripcion: inputDescripcion, precio: inputPrecio, categoria: inputCategoria, img: inputImages });
      const updatedProductos = await GetProductos();
      setProductos(updatedProductos);
      setInputNameProduct("");
      setInputDescripcion("");
      setInputPrecio("");
      setInputCategoria("");
      setInputImages([]);
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 3000);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const deleteProducto = async (id) => {
    try {
      await DeleteProductos(id);
      setProductos(prevProductos => prevProductos.filter(producto => producto.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

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
      alert("Todos los campos deben ser completados");
      return;
    }
    try {
      await PutProductos(correctProduct.id, {
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
            onChange={handleImageChange}
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
          <option value="Shorts">Shorts</option>
          <option value="Trajes de baño">Trajes de baño</option>
          <option value="Promociones">Promociones</option>
        </select>
        <button onClick={addProducto} className="submit-button">Agregar</button>
        {alertVisible && <div className="alert alert-secondary" role="alert">Se agregó un nuevo producto</div>}
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
              <p>Precio: ${producto.precio}</p>
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
      {/* Modal para editar producto */}
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
            <option value="Shorts">Shorts</option>
            <option value="Trajes de baño">Trajes de baño</option>
            <option value="Promociones">Promociones</option>
          </select>
          <label className="file-label">
            <input
              type="file"
              className="file-input"
              multiple
              onChange={handleImageChange}
            />
            <span>Agregar Imágenes</span>
          </label>
          <button onClick={editSubmit}>Guardar Cambios</button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PageProductos;



