import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PageHome from "../components/PageHome";




function Home() {
  return (
    <div>
        <Navbar />
        <PageHome />
        <Carousel />
        <Footer />
        
    </div>
  )
}

export default Home