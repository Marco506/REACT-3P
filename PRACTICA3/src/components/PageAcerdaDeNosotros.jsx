import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/AcercaDeNosotros.css";

function PageAcercaDeNosotros() {
  return (
    <Container className="pagina-acerca my-5" id="pagina-acerca">
      <div className="encabezado-acerca text-center">
        <h1 className="titulo-acerca">Acerca de juli_ seams</h1>
        <p className="subtitulo-acerca">Conoce mi historia y mi pasión por la moda.</p>
      </div>

      <section className="historia-acerca" id="historia-acerca">
        <h2 className="titulo-seccion-acerca">Mi Historia</h2>
        <p className="descripcion-historia-acerca">
          Hola, soy Juli_Seams, una joven apasionada por la moda y la creatividad. Desde pequeña, he soñado con crear mis propias prendas y compartir mi estilo con el mundo. Cada diseño que realizo refleja mi amor por la estética, la comodidad y la originalidad.
        </p>
      </section>

      <section className="mision-acerca mt-4" id="mision-acerca">
        <h2 className="titulo-seccion-acerca">Mi Misión</h2>
        <p className="descripcion-mision-acerca">
          Mi misión es ofrecer ropa única y de calidad que inspire a las personas a expresarse a través de la moda. Quiero que cada prenda cuente una historia y haga que quien la use se sienta especial y auténtico.
        </p>
      </section>

      <section className="valores-acerca mt-4" id="valores-acerca">
        <h2 className="titulo-seccion-acerca">Mis Valores</h2>
        <Row>
          <Col md={4}>
            <Card className="text-center mb-4 tarjeta-valor-acerca">
              <Card.Body>
                <Card.Title className="titulo-valor-acerca">Creatividad</Card.Title>
                <Card.Text className="descripcion-valor-acerca">
                  Cada prenda es un reflejo de mi creatividad y de mi visión única del estilo.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4 tarjeta-valor-acerca">
              <Card.Body>
                <Card.Title className="titulo-valor-acerca">Sostenibilidad</Card.Title>
                <Card.Text className="descripcion-valor-acerca">
                  Me comprometo a utilizar materiales sostenibles y a crear de manera responsable, cuidando nuestro planeta.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center mb-4 tarjeta-valor-acerca">
              <Card.Body>
                <Card.Title className="titulo-valor-acerca">Atención Personalizada</Card.Title>
                <Card.Text className="descripcion-valor-acerca">
                  Cada cliente es especial. Estoy aquí para ofrecerte una experiencia de compra única y personalizada.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="futuro-acerca mt-4" id="futuro-acerca">
        <h2 className="titulo-seccion-acerca">El Futuro</h2>
        <p className="descripcion-futuro-acerca">
          Estoy emocionada por seguir creciendo y creando nuevas colecciones que reflejen las tendencias actuales y las necesidades de mis clientes. Mi objetivo es construir una comunidad de amantes de la moda que valoren la originalidad y la calidad.
        </p>
      </section>

      <footer className="pie-pagina-acerca text-center mt-5" id="pie-pagina-acerca">
        <p className="texto-pie-pagina-acerca">
          Gracias por ser parte de este viaje. Espero que encuentres algo especial en cada prenda que diseño.
        </p>
      </footer>
    </Container>
  );
}

export default PageAcercaDeNosotros;



