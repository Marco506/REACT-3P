//import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Tareas from "../pages/Tareas"
import ProtectedRoute from '../ProtectedRoute';
import Contactanos from '../pages/Contactanos';
import AgregarProductos from '../pages/AgregarProductos';



const Routing = () => {
  return (
    <Router>
     <Routes>
       <Route path="/" element={<Register/>} />
       <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
       <Route path="/Login" element={<Login />} />
       <Route path='Tareas' element={<ProtectedRoute><Tareas /></ProtectedRoute>} />
       <Route path='/Contactanos' element={<ProtectedRoute><Contactanos /></ProtectedRoute>} />
       <Route path='/AgregarProductos' element={<AgregarProductos />} />
     
       
       
     </Routes>
    </Router>
   );
};
export default Routing;