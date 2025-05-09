import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaBook, FaUsers, FaPlus, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Effet pour détecter le scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu du profil lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileMenuOpen &&
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileMenuOpen]);

  // Fermer les menus lors d'un changement de route
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  // Extraire les initiales pour l'avatar
  const getInitials = (name) => {
    if (!name) return 'BDC'; // Valeur par défaut
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Obtenir le prénom de l'utilisateur
  const getUserFirstName = () => {
    if (user && user.prenom) return user.prenom;
    if (user && user.name) {
      const nameParts = user.name.split(' ');
      return nameParts[0];
    }
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    return 'Utilisateur';
  };

  const userInitials = user && user.prenom ? getInitials(user.prenom) : 
                       user && user.name ? getInitials(user.name) : 
                       user && user.email ? getInitials(user.email) : 'BDC';
  
  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };
  
  // Déterminer le lien du tableau de bord en fonction du rôle de l'utilisateur
  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'formateur':
        return '/dashboard/formateur';
      case 'apprenant':
      default:
        return '/dashboard/apprenant';
    }
  };

  // Vérifier si le lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Liens de navigation personnalisés selon le rôle
  const getNavLinks = () => {
    const commonLinks = [
      { name: 'Accueil', path: '/' },
      { name: 'À propos', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];

    if (!user) return commonLinks;

    // Liens spécifiques au rôle
    switch(user.role) {
      case 'admin':
        return [
          ...commonLinks,
          { name: 'Tableau de bord', path: '/dashboard/admin' },
          { name: 'Utilisateurs', path: '/dashboard/users' },
          { name: 'Cours', path: '/dashboard/admin?tab=courses' },
        ];
      case 'formateur':
        return [
          ...commonLinks,
          { name: 'Tableau de bord', path: '/dashboard/formateur' },
          { name: 'Mes cours', path: '/dashboard/formateur?tab=courses' },
        ];
      case 'apprenant':
      default:
        return [
          ...commonLinks,
          { name: 'Tableau de bord', path: '/dashboard/apprenant' },
          { name: 'Mes cours', path: '/dashboard/apprenant?tab=my-courses' },
        ];
    }
  };

  // Liens pour le menu déroulant du profil
  const getProfileLinks = () => {
    const commonLinks = [
      { name: 'Paramètres', path: '/dashboard/parametres', icon: <FaCog className="mr-2" /> },
    ];

    if (!user) return commonLinks;

    // Liens spécifiques au rôle
    switch(user.role) {
      case 'admin':
        return [
          { name: 'Profil Admin', path: '/dashboard/admin', icon: <FaUserShield className="mr-2" /> },
          { name: 'Gérer les utilisateurs', path: '/dashboard/users', icon: <FaUsers className="mr-2" /> },
          ...commonLinks,
        ];
      case 'formateur':
        return [
          { name: 'Profil Formateur', path: '/dashboard/formateur', icon: <FaChalkboardTeacher className="mr-2" /> },
          { name: 'Ajouter un cours', path: '/dashboard/ajoutcours', icon: <FaPlus className="mr-2" /> },
          ...commonLinks,
        ];
      case 'apprenant':
      default:
        return [
          { name: 'Profil Apprenant', path: '/dashboard/apprenant', icon: <FaUserGraduate className="mr-2" /> },
          ...commonLinks,
        ];
    }
  };

  const navLinks = getNavLinks();
  const profileLinks = getProfileLinks();
  const userFirstName = getUserFirstName();

  return (
    <nav className={`bg-white shadow-sm ${scrolled ? 'sticky top-0 z-50 shadow-md' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et liens de navigation */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-10 w-10 bg-gradient-to-r from-[#a52a2a] to-[#cc7722] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  BDC
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-800 hidden sm:inline">Bamena Digital Center</span>
                <span className="ml-2 text-xl font-semibold text-gray-800 sm:hidden">BDC</span>
              </Link>
            </div>
            
            {/* Liens de navigation - version desktop */}
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(link.path)
                      ? 'border-[#a52a2a] text-[#a52a2a]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Boutons de droite */}
          <div className="flex items-center">
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    ref={profileButtonRef}
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a52a2a]"
                    id="user-menu"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-white flex items-center justify-center font-semibold">
                        {userInitials}
                      </div>
                      <span className="ml-2 text-gray-700 font-medium hidden md:block">{userFirstName}</span>
                    </div>
                  </button>
                </div>
                
                {/* Menu déroulant du profil */}
                {isProfileMenuOpen && (
                  <div
                    ref={profileMenuRef}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    {profileLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.path}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        {link.icon}
                        {link.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <FaSignOutAlt className="mr-2" />
                      Se déconnecter
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-[#a52a2a] text-sm font-medium rounded-md text-[#a52a2a] bg-white hover:bg-[#a52a2a] hover:text-white transition-colors duration-200"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-[#a52a2a] to-[#cc7722] hover:opacity-90 transition-opacity duration-200 shadow-sm"
                >
                  S'inscrire
                </Link>
              </div>
            )}
            
            {/* Boutons de connexion et inscription pour petits écrans */}
            {!user && (
              <div className="sm:hidden flex items-center">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center p-1.5 border border-[#a52a2a] text-xs font-medium rounded-md text-[#a52a2a] bg-white mr-1"
                >
                  Connexion
                </Link>
              </div>
            )}
            
            {/* Bouton menu mobile */}
            <div className="-mr-2 flex md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a52a2a]"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Ouvrir le menu principal</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-[#a52a2a] bg-gray-50'
                    : 'text-gray-700 hover:text-[#a52a2a] hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Section profil pour mobile */}
            {user ? (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center px-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#a52a2a] to-[#cc7722] text-white flex items-center justify-center font-semibold">
                      {userInitials}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">{userFirstName}</p>
                    </div>
                  </div>
                  
                  {profileLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#a52a2a] hover:bg-gray-50 flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 flex items-center mt-2"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Se déconnecter
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 flex flex-col space-y-3 px-3">
                <Link
                  to="/login"
                  className="block text-center px-4 py-2.5 rounded-md text-base font-medium text-[#a52a2a] border border-[#a52a2a] hover:bg-[#a52a2a] hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="block text-center px-4 py-2.5 rounded-md text-base font-medium text-white bg-gradient-to-r from-[#a52a2a] to-[#cc7722] hover:opacity-90 transition-opacity duration-200 shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;