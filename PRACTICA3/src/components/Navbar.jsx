import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import"../styles/Navbar.css"
import logo from '../img/logo.png'; 
import ModalBuscador from './ModalBuscador';


function Navbar() {
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem("Autenticado");
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Home">
          <img src={logo} alt="Logo" className="navbar-logo" /> 
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Inicio</Link>
            </li>
            <li className="nav-item dropdown">
              <Link 
                className="nav-link dropdown-toggle" 
                to="#" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Colección
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/BlusasYCamisas">Blusas y Camisas</Link></li>
                <li><Link className="dropdown-item" to="/Faldas">Faldas</Link></li>
                <li><Link className="dropdown-item" to="/Vestidos">Vestidos</Link></li>
                <li><Link className="dropdown-item" to="/Shorts">Shorts</Link></li>
                <li><Link className="dropdown-item" to="/TrajesBaño">Trajes de baño</Link></li>
                <li><div className="dropdown-divider"></div></li>
                <li><Link className="dropdown-item" to="/Conjuntos">Conjuntos</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/AgregarProductos">Agregar Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Contactanos">Contáctanos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/AcercaDeNosotros">Acerca de nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Tareas">Tareas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" onClick={cerrarSesion} to="/">Salir</Link>
            </li>
          </ul>
           <ModalBuscador />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


