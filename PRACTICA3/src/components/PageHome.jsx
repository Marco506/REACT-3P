import React from 'react';
import "../styles/PageHome.css";
import { Link } from 'react-router-dom'; 
import PagePromociones from './PagePromociones';

function PageHome() {
  return (
    <div className="page-home__container">
      <header className="page-home__header">
        <div className="page-home__main-image-container">
          <img
            src="https://image.slidesdocs.com/responsive-images/background/3d-clothing-store-featuring-personal-accessories-and-glowing-neon-lights-powerpoint-background_ec97253b8e__960_540.jpg"
            alt="Imagen principal de Juli_Seams"
            className="page-home__main-image"
          />
          <div className="page-home__main-image-text">
            <h1 className="page-home__title">¡Bienvenido a Juli_Seams!</h1>
            <p className="page-home__subtitle">Tu destino para moda única y estilizada.</p>
          </div>
        </div>
      </header>
      <section className="page-home__intro">
        <p className="page-home__intro-text">
          Nos alegra que estés aquí. En Juli_Seams, te ofrecemos una experiencia de compra única con una amplia variedad de colecciones de ropa. Explora nuestras elegantes y modernas opciones para hombres, mujeres y niños, diseñadas para adaptarse a todos los estilos y ocasiones.
        </p>
      </section>
      <PagePromociones />
      
      <section className="page-home__explore">
        <h2 className="page-home__section-title">Descubre toda la colección</h2>
        <div className="page-home__explore-container">
          <div className="page-home__explore-item">
            <h3 className="page-home__explore-title">Colección de blusas</h3>
            <p className="page-home__explore-description">Descubre nuestra nueva colección de blusas, diseñadas para ofrecerte calidez y estilo en cada ocasión. Con cortes modernos y materiales de alta calidad, cada blusa es perfecta para mantenerte elegante y cómoda, sin importar el clima. ¡Explora nuestra variedad y encuentra tu favorita!.</p>
            <Link to="/BlusasYCamisas" className="page-home__explore-cta">Explorar</Link>
          </div>
          <div className="page-home__explore-item">
            <h3 className="page-home__explore-title">Colección de vestidos</h3>
            <p className="page-home__explore-description">Descubre nuestra nueva colección de vestidos, diseñados para realzar tu estilo y brindarte comodidad en cada ocasión. Con tejidos suaves y cortes elegantes, cada pieza está pensada para acompañarte en tus momentos más especiales. ¡Atrévete a lucir espectacular! .</p>
            <Link to="/Vestidos" className="page-home__explore-cta">Explorar</Link>
          </div>
        </div>
      </section>
      <footer className="page-home__footer">
        <p className="page-home__details-text">
          Desde atuendos casuales y cómodos hasta prendas sofisticadas para eventos especiales, cada pieza en nuestra tienda ha sido cuidadosamente seleccionada para ofrecerte la mejor calidad y confort. Nuestro objetivo es ayudarte a expresar tu estilo personal y sentirte seguro y cómodo en cada momento.
        </p>
        <p className="page-home__cta-text">
          Navega por nuestras colecciones y descubre las últimas tendencias en moda. ¡Estamos seguros de que encontrarás algo que te encantará y que te hará destacar con confianza!
        </p>
      </footer>
    </div>
  );
}

export default PageHome;

