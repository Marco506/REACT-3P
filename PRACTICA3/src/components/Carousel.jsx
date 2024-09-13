
import caro1 from "../img/caro1.jpg";
import caro2 from "../img/caro2.jpg";
import IMG3 from "../img/IMG3.jpg";

function Carousel() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ width: '100%' }}>
      <div className="carousel-inner" style={{ height: '400px' }}>
        <div className="carousel-item active">
          <img src={caro1} className="d-block w-100" alt="Imagen de Muestra 1" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
         
          <img src={caro2} className="d-block w-100" alt="Imagen de Muestra 2" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="carousel-item">
          <img src={IMG3}  className="d-block w-100" alt="Imagen de Muestra 3" style={{ height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
}

export default Carousel;

