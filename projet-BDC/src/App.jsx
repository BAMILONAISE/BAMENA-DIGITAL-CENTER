// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Parametres from './pages/Parametres';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

import DashboardAdmin from './pages/admin/DashboardAdmin';
import DashboardFormateur from './pages/DashboardFormateur';
import DashboardApprenant from './pages/DashboardApprenant';

import Register1 from './pages/Register1';
import './index.css';
import AjoutUtilisateur from './pages/admin/AjoutUtilisateur';
import PageAjoutCours from './pages/admin/AjoutCours';







function App() {


  return (
    
     <Router>
      <Routes>
        <Route path='/about' element={<About/> }/>
        <Route path='/' element={<Home/> }/>
        <Route path='/contact' element={<Contact/> }/>
        {/* <Route path='/dashboard' element={<Dashboard/> }/> */}
        <Route path="/parametres" element={<Parametres/>} />

        <Route path="/register" element={<Register/>} />
        <Route path="/register1" element={<Register1/>} />
        <Route path="/register1" element={<Register1/>} />
        <Route path="/admin/ajouteruser" element={<AjoutUtilisateur />} />    
        <Route path="/admin/ajoutcours" element={<PageAjoutCours />} />  

         {/* Page de connexion */}
        <Route path="/login" element={<Login />} />

         {/* Dashboards */}
         <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-formateur" element={<DashboardFormateur />} />
        <Route path="/apprenant-dashboard" element={<DashboardApprenant />} />

      </Routes>
     </Router>
  
  )
}




export default App
export const fetchMe = () => API.get('/me');

