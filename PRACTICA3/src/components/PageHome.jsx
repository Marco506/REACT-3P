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
      <section className="page-home__values">
        <h2 className="page-home__section-title">Nuestros Valores</h2>
        <div className="page-home__values-container">
          <div className="page-home__value">
            <h3 className="page-home__value-title">Calidad</h3>
            <p className="page-home__value-description">Cada prenda está confeccionada con los mejores materiales para garantizar durabilidad y confort.</p>
          </div>
          <div className="page-home__value">
            <h3 className="page-home__value-title">Sostenibilidad</h3>
            <p className="page-home__value-description">Nos comprometemos a prácticas sostenibles para proteger nuestro planeta.</p>
          </div>
          <div className="page-home__value">
            <h3 className="page-home__value-title">Atención al Cliente</h3>
            <p className="page-home__value-description">Nuestro equipo está aquí para ayudarte y asegurarse de que tengas la mejor experiencia de compra.</p>
          </div>
        </div>
      </section>
      
      <section className="page-home__explore">
        <h2 className="page-home__section-title">Explora Más</h2>
        <div className="page-home__explore-container">
          <div className="page-home__explore-item">
            <h3 className="page-home__explore-title">Colección de Invierno</h3>
            <p className="page-home__explore-description">Descubre nuestra nueva colección de ropa de invierno, diseñada para mantenerte cálido y elegante.</p>
            <Link to="/colecciones/invierno" className="page-home__explore-cta">Explorar</Link>
          </div>
          <div className="page-home__explore-item">
            <h3 className="page-home__explore-title">Ofertas Especiales</h3>
            <p className="page-home__explore-description">Aprovecha nuestras ofertas especiales y encuentra grandes descuentos en tus productos favoritos.</p>
            <Link to="/ofertas" className="page-home__explore-cta">Ver Ofertas</Link>
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

