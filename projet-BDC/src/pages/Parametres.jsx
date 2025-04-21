import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { div } from 'framer-motion/client';


export default function Parametres() {
  const [image, setImage] = useState(null);
  const [nom, setNom] = useState("Kouam Nguiffo");
  const [email, setEmail] = useState("kouam@example.com");
  const [langue, setLangue] = useState("Français");
  const [theme, setTheme] = useState("Clair");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Informations mises à jour !");
    // ici tu peux gérer la soumission vers ton backend
  };


  return (
   

    <div className="min-h-screen bg-[#f9f8f6] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-green-800 mb-6">Paramètres du compte</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image de profil */}
          <div className="flex items-center space-x-5">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
              {image ? (
                <img src={image} alt="profil" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">Photo</div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Changer la photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring focus:ring-green-200"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse e-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring focus:ring-green-200"
              required
            />
          </div>

          {/* Langue & Thème */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
              <select
                value={langue}
                onChange={(e) => setLangue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="Français">Français</option>
                <option value="Anglais">Anglais</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thème</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              >
                <option value="Clair">Clair</option>
                <option value="Sombre">Sombre</option>
              </select>
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 transition text-white text-sm px-5 py-2 rounded"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </motion.div>
      
    </div>

  );

}
