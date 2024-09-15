import React, { useEffect, useState } from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { PostProductos } from '../services/ProductosAgregados/PostProductos';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import { DeleteProductos } from '../services/ProductosAgregados/DeleteProductos';
import { PutProductos } from '../services/ProductosAgregados/PutProductos';
import "../styles/InputFille.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function PageProductos() {
  const [inputDescripcion, setInputDescripcion] = useState("");
  const [inputPrecio, setInputPrecio] = useState("");
  const [inputCategoria, setInputCategoria] = useState("");
  const [inputImages, setInputImages] = useState([]);
  const [productos, setProductos] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await GetProductos();
      setProductos(data);
    })();
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
    if (!inputDescripcion || !inputPrecio || !inputCategoria || inputImages.length === 0) {
      alert("Todos los campos deben ser completados");
      return;
    }
    await PostProductos({ descripcion: inputDescripcion, precio: inputPrecio, categoria: inputCategoria, img: inputImages });
    const updatedProductos = await GetProductos();
    setProductos(updatedProductos);
    setInputDescripcion("");
    setInputPrecio("");
    setInputCategoria("");
    setInputImages([]);

    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000);
  };

  const deleteProducto = async (id) => {
    await DeleteProductos(id);
    setProductos(productos.filter(producto => producto.id !== id));
  };

  const editProducto = async (id, descripcion, precio, categoria) => {
    const newDescripcion = prompt("Nueva descripción", descripcion);
    const newPrecio = prompt("Nuevo precio", precio);
    const newCategoria = prompt("Nueva categoría", categoria);

    if (newDescripcion && newPrecio && newCategoria) {
      await PutProductos(id, { descripcion: newDescripcion, precio: newPrecio, categoria: newCategoria });
      const updatedProductos = await GetProductos();
      setProductos(updatedProductos);
    } else {
      alert("Todos los campos deben ser completados");
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
              <h3>{producto.descripcion}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Categoría: {producto.categoria}</p>
              <div className="button-container">
                <button className="delete-button" onClick={() => deleteProducto(producto.id)}>
                  <FaTrash />
                </button>
                <button className="edit-button" onClick={() => editProducto(producto.id, producto.descripcion, producto.precio, producto.categoria)}>
                  <BiSolidEditAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageProductos;



