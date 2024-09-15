import React, { useState, useEffect } from 'react';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import '../styles/Blusas.css';

function PageBlusasYCamisas() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      const datos = await GetProductos();
      setProductos(datos.filter(producto => 
        producto.categoria.toLowerCase() === "camisas"
      ));
    };

    cargarProductos();
  }, []);

  return (
    <div className="blusas-container">
      <h1 className="blusas-title">Bienvenidos a Blusas y Camisas juli-seams</h1>
      <div className="blusas-card-container">
        {productos.map(producto => (
          <div className="blusas-card" key={producto.id}>
            {producto.img.map((src, index) => (
              <img key={index} src={src} alt={producto.descripcion} className="blusas-product-image" />
            ))}
            <div className="blusas-card-content">
              <h2 className="blusas-product-description">{producto.descripcion}</h2>
              <p className="blusas-product-price">Precio: ${producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageBlusasYCamisas;





