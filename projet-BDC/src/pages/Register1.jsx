import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';

const SignupPage = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('');
  const [otherQuarter, setOtherQuarter] = useState('');

  const handleQuarterChange = (e) => {
    setSelectedQuarter(e.target.value);
    if (e.target.value !== 'autre') {
      setOtherQuarter('');
    }
  };

  return (
    <div className="min-h-screen bg-[url('/dots-bg.png')] bg-cover flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Avatar initials */}
        <div className="w-16 h-16 rounded-full bg-red-700 mx-auto flex items-center justify-center text-white font-bold text-xl mb-4">
          BD
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-red-700 mb-1">Créer un compte</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Inscrivez-vous pour accéder à nos cours et formations
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black">Prénom</label>
            <input type="text" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Prénom" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Nom</label>
            <input type="text" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Nom" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input type="email" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="exemple@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Mot de passe</label>
            <input type="password" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Confirmer le mot de passe</label>
            <input type="password" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Date de naissance</label>
            <input type="date" className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black">Quartier à Bamena</label>
            <select
              value={selectedQuarter}
              onChange={handleQuarterChange}
              className="w-full  p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" className='text-gray-500 text-sm'>-- Choisissez un quartier --</option>
              <option value="Batsengla">NTAP</option>
              <option value="Tsinfem">LOUH</option>
              <option value="Lefock">PO'OZOUH</option>
              <option value="Foumbouh">FOPLEUP</option>
              <option value="Kouoptamo">LANGWEUH</option>
              <option value="Koptamo Nord">BANGWEUH</option>
              <option value="autre">Autre</option>
            </select>
            {selectedQuarter === 'autre' && (
              <input
                type="text"
                value={otherQuarter}
                onChange={(e) => setOtherQuarter(e.target.value)}
                placeholder="Entrez le nom du quartier"
                className="w-full mt-2 p-1 rounded border border-gray-300 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            )}
          </div>

          {/* Conditions*/}
          {/* <div className="flex items-center space-x-2">
            <input type="checkbox" className="text-red-700" />
            <label className="text-sm text-gray-700">
              J’accepte les <span className="text-red-700 underline cursor-pointer">conditions d'utilisation</span> et la <span className="text-red-700 underline cursor-pointer">politique de confidentialité</span>
            </label>
          </div> */} 

          {/* Submit button */}
          <button type="submit" className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition duration-300">
            S'inscrire
          </button>

          {/* Ou */}
          {/* <div className="text-center text-gray-500 my-3">OU</div> */}

          {/* Social buttons */}
          {/* <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-3 hover:bg-gray-100 transition duration-300">
            <FcGoogle size={20} />
            S’inscrire avec Google
          </button> */}
          {/* <button type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded py-3 hover:bg-gray-100 transition duration-300">
            <FaFacebookF size={18} className="text-blue-600" />
            S’inscrire avec Facebook
          </button> */}

          {/* Already have an account */}
          <p className="text-center text-sm mt-4">
            Vous avez déjà un compte ? <span className="text-red-700 font-medium cursor-pointer">Se connecter</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
