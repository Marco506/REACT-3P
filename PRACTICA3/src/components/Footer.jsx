import React from 'react';
import '../styles/Footer.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Email: <a href="juli_seams@gmail.com">juli_seams@gmail.com</a></p>
          <p>Teléfono: +506 85105125</p>
          <p>Dirección:Roble, Puntarenas, Costa Rica</p>
        </div>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
            <li><a href="https://www.instagram.com/juli_seams/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
            <li><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Acceso</h3>
          <p>
            En juli_seams, nos enorgullecemos de ofrecer una experiencia de compra única que combina estilo, calidad y atención personalizada. 
            siempre con la mejor atención.  
            ¡Gracias por ser parte de nuestra comunidad y confiar en nosotros para embellecer tu vida!
          </p>
          <p><a href="/Login">Iniciar Sesión</a></p>
          <p><a href="/">Registrarse</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tu Tienda de Ropa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;

