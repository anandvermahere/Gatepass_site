import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  Navbar  from './components/Navbar.jsx';


import './App.css'
import './assets/styles/navbar.css'

import { Home } from './components/Home.jsx';
import InWard from './components/gate_pass/InWard.jsx';
import History from './components/history/History.jsx';
import VehicleVoucher from './components/vehicle_voucher/VehicleVoucher.jsx';
import CylinderList from './outward/Showdata.jsx';
import Cylinder from './components/gate_pass/Cylinder_info.jsx';

function App() {

  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Home/>}/>
          <Route path='/outward' element={<CylinderList/>} />
          <Route path='/inward' element={<InWard/>}/>
          <Route path='//inward/cylinder' element={<Cylinder />} />
          <Route path='/vehicle-voucher' element={<VehicleVoucher/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='*' element={<h1>Page Not Found</h1>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App
