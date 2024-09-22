import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import NavbarUsuarios from "../components/NavbarUsuario";
import PageHome from "../components/PageHome";


function HomeUsuarios() {
  return (
    <div>
        <NavbarUsuarios />
        <PageHome />
        <Carousel />
        <Footer />
        
    </div>
  )
}

export default HomeUsuarios