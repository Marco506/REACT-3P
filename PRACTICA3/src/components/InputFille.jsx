import React, { useEffect, useState } from 'react';
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { PostProductos } from '../services/ProductosAgregados/PostProductos';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import { DeleteProductos } from '../services/ProductosAgregados/DeleteProductos';
import { PutProductos } from '../services/ProductosAgregados/PutProductos';
import "../styles/InputFille.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./Footer";

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
    await PostProductos({ img: inputImages, descripcion: inputDescripcion, precio: inputPrecio, categoria: inputCategoria });
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
    <div>
      <div className="ProductForm">
        <h1>Agregar Producto</h1>
        <div className="inputContainer">
          <label>
            <input
              type="file"
              hidden
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
            className="inputField"
          />
          <input
            type="number"
            placeholder="Precio"
            value={inputPrecio}
            onChange={e => setInputPrecio(e.target.value)}
            className="inputField"
          />
          <select
            value={inputCategoria}
            onChange={e => setInputCategoria(e.target.value)}
            className="inputField"
          >
            <option value="" disabled>Categoría</option>
            <option value="Vestido">Vestido</option>
            <option value="Camisas">Camisas</option>
            <option value="Shorts">Shorts</option>
          </select>
          <button onClick={addProducto} className="submitButton">Agregar</button>
          {alertVisible && <div className="alert alert-secondary" role="alert">Se agregó un nuevo producto</div>}
        </div>
        <div className="productosContainer">
          <ul>
            {productos.map(producto => (
              <li key={producto.id} className="productoItem">
                {producto.img && Array.isArray(producto.img) ? (
                  producto.img.map((src, index) => <img key={index} src={src} alt={`Producto ${index}`} className="productImage" />)
                ) : <div>No Image</div>}
                <div>{producto.descripcion}</div>
                <div>{producto.precio}</div>
                <div>{producto.categoria}</div>
                <div className="buttonContainer">
                  <button className="botonEliminar" onClick={() => deleteProducto(producto.id)}>
                    <FaTrash />
                  </button>
                  <button className="botonEditar" onClick={() => editProducto(producto.id, producto.descripcion, producto.precio, producto.categoria)}>
                    <BiSolidEditAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <footer><Footer /></footer>
    </div>
  );
}

export default PageProductos;
