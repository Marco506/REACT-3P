

// Lista de imágenes y otros datos
const cardData = [
  { id: 1, imgSrc: 'url-to-image1.jpg', title: 'Card 1', text: 'Some quick example text.' },
  { id: 2, imgSrc: 'url-to-image2.jpg', title: 'Card 2', text: 'Some quick example text.' },
  { id: 3, imgSrc: 'url-to-image3.jpg', title: 'Card 3', text: 'Some quick example text.' },
  { id: 4, imgSrc: 'url-to-image4.jpg', title: 'Card 4', text: 'Some quick example text.' },
  { id: 5, imgSrc: 'url-to-image5.jpg', title: 'Card 5', text: 'Some quick example text.' },
  { id: 6, imgSrc: 'url-to-image6.jpg', title: 'Card 6', text: 'Some quick example text.' },
  { id: 7, imgSrc: 'url-to-image7.jpg', title: 'Card 7', text: 'Some quick example text.' },
  { id: 8, imgSrc: 'url-to-image8.jpg', title: 'Card 8', text: 'Some quick example text.' },
  { id: 9, imgSrc: 'url-to-image9.jpg', title: 'Card 9', text: 'Some quick example text.' },
  { id: 10, imgSrc: 'url-to-image10.jpg', title: 'Card 10', text: 'Some quick example text.' },
];

function Home() {
  return (
    <div className="container">
      <div className="row">
        {cardData.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src={card.imgSrc} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">An item</li>
               
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


