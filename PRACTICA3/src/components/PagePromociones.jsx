import React, { useEffect, useState } from 'react';
import { GetProductos } from '../services/ProductosAgregados/GetProductos';
import '../styles/Blusas.css';
import ModalCorreo from './ModalCorreo';

function PagePromociones() {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const datos = await GetProductos();
                setProductos(datos.filter(producto => producto.categoria === "Promociones"));
            } catch (err) {
                setError('Error al cargar los productos');
                console.error(err);
            }
        };
        cargarProductos();
    }, []);

    return (
        <div className='blusas-container'>
            <h1 className='blusas-title'>Bienvenido a la sección de promociones, donde podrás encontrar lo más destacado en vestimenta de Juli-Seams</h1> 
            {error && <p className='error-message'>{error}</p>}
            <div className='blusas-card-container'>
                {productos.map(producto => (
                    <div className='blusas-card' key={producto.id}>
                        {Array.isArray(producto.img) && producto.img.map((src, index) => (
                            <img key={index} src={src} alt={producto.nameProduct} className='blusas-product-image' />
                        ))}
                        <div className='blusas-card-content'>
                            <h4 className="blusas-product-nombre">{producto.nameProduct}</h4>
                            <p className='blusas-product-description'>{producto.descripcion}</p>
                            <p className='blusas-product-price'>Precio:  ₡{producto.precio}</p>
                            <p>{producto.categoria}</p>
                            <ModalCorreo />
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default PagePromociones;
