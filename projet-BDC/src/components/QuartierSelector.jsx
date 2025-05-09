// components/QuartierSelector.jsx

import React from "react";

const QuartierSelector = ({ quartier, setQuartier, quartierAutre, setQuartierAutre }) => {
  const options = [
    "Ntap",
    "Fopleup",
    "Louh",
    "Po'ozouh",
    "Langweuh",
    "Mbangweuh",
   
  ];

  return (
    <div className="mb-4">
      <label htmlFor="quartier" className="block text-sm font-medium text-black px-1 ">
      </label>
      <select
        id="quartier"
        name="quartier"
        value={quartier}
        onChange={(e) => setQuartier(e.target.value)}
        className="w-full  p-1 rounded border border-gray-400 hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="">Sélectionnez un quartier</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>{option}</option>
        ))}
        <option value="autre">Autre</option>
      </select>

      {quartier === "autre" && (
        <div className="mt-4">
          <label htmlFor="quartierAutre" className="block text-gray-700 font-semibold mb-2">
            Saisir un autre quartier
          </label>
          <input
            type="text"
            id="quartierAutre"
            value={quartierAutre}
            onChange={(e) => setQuartierAutre(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Entrez le nom de votre quartier"
          />
        </div>
      )}
    </div>
  );
};

export default QuartierSelector;
