import React, { useState } from "react";
import QuartierSelector from "../components/QuartierSelector";
import axios from "axios";

const Register = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [quartier, setQuartier] = useState("");
  const [quartierAutre, setQuartierAutre] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    const finalQuartier = quartier === "autre" ? quartierAutre : quartier;

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        prenom,
        nom,
        email,
        password,
        password_confirmation: passwordConfirmation,
        date_naissance: dateNaissance,
        quartier: finalQuartier,
      });

      console.log("Inscription réussie", response.data);
      // Rediriger ou informer l’utilisateur ici
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="  bg-[url('/dots-bg.png')] bg-cover  items-center justify-center  px-5 py-3  bg-white p-5 rounded-md shadow-md max-w-2xl mx-auto" style={{width:'40%'}}>
        {/* Avatar initials */}
        <div className="w-12 h-12 rounded-full bg-red-700 mx-auto flex items-center justify-center text-white font-bold text-xl mb-1">
          BD
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-red-700 mb-1">Créer un compte</h2>
        <p className="text-center text-sm text-gray-600 mb-8">
          Inscrivez-vous pour accéder à nos cours et formations
        </p>
      
      <form onSubmit={handleRegister}>
        <div className="flex justify-between">

        {/* Prénom */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1 ">Prénom</label>
          <input
            type="text"
            className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          {errors.prenom && <p className="text-red-500 text-sm">{errors.prenom[0]}</p>}
        </div>

        {/* Nom */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1">Nom</label>
          <input
            type="text"
            className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom[0]}</p>}
        </div>

        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1">Email</label>
          <input
            type="email"
            className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
        </div>




        {/* Quartier */}
        <QuartierSelector
          quartier={quartier}
          setQuartier={setQuartier}
          quartierAutre={quartierAutre}
          setQuartierAutre={setQuartierAutre}
        />
        {errors.quartier && <p className="text-red-500 text-sm">{errors.quartier[0]}</p>}

        {/* Date de naissance */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1">Date de naissance</label>
          <input
            type="date"
            className="w-full p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
          />
          {errors.date_naissance && <p className="text-red-500 text-sm">{errors.date_naissance[0]}</p>}
        </div>

        <div className="flex justify-between">

        {/* Mot de passe */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1">Mot de passe</label>
          <input
            type="password"
            className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
        </div>

        {/* Confirmation */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-black px-1">Confirmation mot de passe</label>
          <input
            type="password"
            className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        </div>
        {/* Bouton */}
        <button
          type="submit"
          className="w-full  font-medium bg-red-700 text-white py-1.5 rounded-md hover:bg-red-800 transition duration-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
