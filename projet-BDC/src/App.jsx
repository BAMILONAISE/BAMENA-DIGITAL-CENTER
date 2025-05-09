/**
 * Application principale de gestion de cours
 * Cette application permet la gestion de cours avec différents rôles :
 * - Admin : Gestion complète des utilisateurs et des cours
 * - Formateur : Création et gestion de ses cours
 * - Apprenant : Accès aux cours et suivi de formation
 */

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Parametres from './pages/Parametres';
import Register from './pages/Register';
import Login from './pages/Login';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardFormateur from './components/DashboardFormateur';
import DashboardApprenant from './components/DashboardApprenant';
import './index.css';
import DashboardLayout from './components/DashboardLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserEdit from './pages/admin/AdminUserEdit';
import AdminCours from './pages/admin/AdminCours';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AjoutCours from './pages/AjoutCours';
import MesCours from './pages/formateur/MesCours';
import CoursList from './pages/apprenant/CoursList';
import CourseDetail from './pages/CourseDetail';
import CoursesSection from './components/CoursesSection';

function App() {

  return (
    // AuthProvider permet de gérer l'état d'authentification global
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques accessibles sans authentification */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/courses' element={<CoursesSection />} />
          <Route path='/cours/:id' element={<CourseDetail />} />

          {/* Routes protégées nécessitant une authentification */}
          <Route element={<PrivateRoute />}>
            {/* Layout commun pour toutes les pages du dashboard */}
            <Route path='/dashboard' element={<DashboardLayout />}>
              {/* Redirection par défaut vers le dashboard apprenant */}
              <Route index element={<Navigate to="/dashboard/apprenant" />} />
              
              {/* Routes spécifiques pour chaque rôle */}
              <Route path='admin' element={<DashboardAdmin />} />
              <Route path='formateur' element={<DashboardFormateur />} />
              <Route path='apprenant' element={<DashboardApprenant />} />
              
              {/* Routes de gestion des utilisateurs (admin) */}
              <Route path='users' element={<AdminUsers />} />
              <Route path='users/:id/edit' element={<AdminUserEdit />} />
              
              {/* Routes de gestion des cours */}
              <Route path='ajoutcours' element={<AjoutCours />} />
              <Route path='parametres' element={<Parametres />} />
              <Route path='admin/cours' element={<AdminCours />} />
              <Route path='formateur/mes-cours' element={<MesCours />} />
              <Route path='apprenant/cours' element={<CoursList />} />
              <Route path='cours/:id' element={<CourseDetail />} />
              <Route path='cours/:id/edit' element={<AjoutCours />} />
            </Route>
          </Route>
          
          {/* Routes de redirection pour la compatibilité avec les anciens liens */}
          <Route path="/dashboard-admin" element={<Navigate to="/dashboard/admin" />} />
          <Route path="/dashboard-formateur" element={<Navigate to="/dashboard/formateur" />} />
          <Route path="/dashboard-apprenant" element={<Navigate to="/dashboard/apprenant" />} />
          <Route path="/cours" element={<Navigate to="/courses" />} />
        </Routes>
      </Router>
    </AuthProvider>
  
  )
}

export default App
