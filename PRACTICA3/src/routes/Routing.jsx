//import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Tareas from "../pages/Tareas"
import ProtectedRoute from '../ProtectedRoute';
import Contactanos from '../pages/Contactanos';
import AgregarProductos from '../pages/AgregarProductos';
import BlusasYCamisas from '../pages/BlusasYCamisas';
import Vestidos from '../pages/Vestidos';
import TrajesBaño from '../pages/TrajesBaño';
import AcercaDeNosotros from '../pages/AcercaDeNosotros';
import HomeUsuarios from '../pages/HomeUsuarios';
import Faldas from '../pages/Faldas';
import Shorts from '../pages/Shorts';
import Conjuntos from '../pages/Conjuntos';



const Routing = () => {
  return (
    <Router>
     <Routes>
       <Route path="/" element={<Register/>} />
       <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
       <Route path="/Login" element={<Login />} />
       <Route path='Tareas' element={<Tareas />} />
       <Route path='/Contactanos' element={<Contactanos />} />
       <Route path='/AgregarProductos' element={<AgregarProductos />} />
       <Route path='/BlusasYCamisas' element={<BlusasYCamisas />} />
       <Route path='/Vestidos' element={<Vestidos />} />
       <Route path='/TrajesBaño' element={<TrajesBaño />} />
       <Route path='/AcercaDeNosotros'element={<AcercaDeNosotros />} />
       <Route path='/HomeUsuarios'element={<ProtectedRoute><HomeUsuarios /></ProtectedRoute>} />
       <Route path='/Faldas' element={<Faldas />} />
       <Route path='/Shorts' element={<Shorts />} />
       <Route path='/Conjuntos' element={<Conjuntos />} />
     
       
       
     </Routes>
    </Router>
   );
};
export default Routing;