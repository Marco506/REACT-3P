//import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Login from '../pages/Login';

const Routing = () => {
  return (
    <Router>
     <Routes>
       <Route path="/" element={<Register/>} />
       <Route path="/Home" element={<Home/>} />
       <Route path="/Login" element={<Login />} />
     </Routes>
    </Router>
   );
};
export default Routing;