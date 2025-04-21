// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Parametres from './pages/Parametres';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import './index.css';


// import TrainerProfile from './pages/TrainerProfile';


function App() {


  return (
    
     <Router>
      <Routes>
        <Route path='/about' element={<About/> }/>
        <Route path='/' element={<Home/> }/>
        <Route path='/contact' element={<Contact/> }/>
        <Route path='/dashboard' element={<Dashboard/> }/>
        <Route path="/parametres" element={<Parametres/>} />
        <Route path="/register" element={<Register/>} />



      </Routes>
     </Router>
        
  
  )
}

export default App
