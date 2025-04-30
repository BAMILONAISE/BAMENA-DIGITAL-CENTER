// src/pages/AjouterCours.jsx

import { useState } from 'react';
import api from '../api';

function AjouterCours() {
  const [titre, setTitre] = useState('');
  const [video, setVideo] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('video', video);

    try {
      await api.post('/cours', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('Cours ajouté avec succès !');
      setTitre('');
      setVideo(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l\'ajout.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau cours</h2>

      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Titre du cours"
          className="p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setVideo(e.target.files[0])}
          accept="video/*"
          className="p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default AjouterCours;


// import React, { useState } from 'react';
// import axios from 'axios';
// // import api from '../api'; // Ton fichier api.jsx

// const AjouterCours = () => {
//   const [titre, setTitre] = useState('');
//   const [description, setDescription] = useState('');
//   const [videoUrl, setVideoUrl] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccessMessage('');
//     setErrorMessage('');

//     try {
//       const response = await api.post('/cours', {
//         titre,
//         description,
//         video_url: videoUrl,
//       });

//       setSuccessMessage('Cours ajouté avec succès !');
//       setTitre('');
//       setDescription('');
//       setVideoUrl('');
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage('Erreur lors de l\'ajout du cours.');
//       }
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded shadow">
//       <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un cours</h2>

//       {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">{successMessage}</div>}
//       {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block mb-2 text-sm font-semibold">Titre du cours</label>
//           <input
//             type="text"
//             value={titre}
//             onChange={(e) => setTitre(e.target.value)}
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-semibold">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
//             rows="4"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 text-sm font-semibold">Lien de la vidéo</label>
//           <input
//             type="url"
//             value={videoUrl}
//             onChange={(e) => setVideoUrl(e.target.value)}
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-red-700 text-white py-3 rounded hover:bg-red-800 transition duration-300"
//         >
//           Ajouter le cours
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AjouterCours;
