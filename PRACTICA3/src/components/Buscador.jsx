import React, { useState } from 'react'
import { GetProductos } from '../services/ProductosAgregados/GetProductos';

function Buscador() {
    const [buscador, setBuscador] = useState("");
    const [productos, setProducto] = useState([]);

    const buscarProducto = async (e) => {
        e.preventDefault();

        const datos = await GetProductos()
        const lista =Array.from(datos);

        setProducto(lista)
        console.log(lista);
        
        
    }
  return (
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
            <ul>
                {productos.map((producto, index) => (
                    <div key={index}>{producto.nameProduct}</div> 
                ))}
            </ul>
    </div>  
  )
}

export default Buscador