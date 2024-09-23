
import caro1 from "../img/caro1.jpg";
import caro2 from "../img/caro2.jpg";


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
          <img src="https://img.freepik.com/vector-gratis/fondo-tienda-moda-dibujado-mano_23-2150849915.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721606400&semt=ais_user"  className="d-block w-100" alt="Imagen de Muestra 3" style={{ height: '100%', objectFit: 'cover' }} />
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

