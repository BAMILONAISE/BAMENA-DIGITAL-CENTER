// src/components/AjouterCours.jsx

import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaSave, FaUpload, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaTrash } from 'react-icons/fa';
import axios from 'axios'; // Import de axios
import { useNavigate, useParams } from 'react-router-dom'; // Ajout de useParams

// Définir l'URL de base de l'API pour le stockage des images uniquement
const API_URL = 'http://127.0.0.1:8000/api';

function AjouterCours({ onSuccess }) {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const { id } = useParams(); // Récupération de l'ID du cours si en mode édition
  const isEditMode = !!id; // Détermine si on est en mode édition
  const editorRef = useRef(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    contenu: '',
    image_couverture: null,
    video_url: '',
    categorie: '',
    niveau: 'debutant',
    duree_estimee: '',
    tags: '',
    statut: 'brouillon'
  });
  
  // États pour le formulaire et les feedbacks
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [saveToLocalStorage, setSaveToLocalStorage] = useState(false);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showLocalStorageModal, setShowLocalStorageModal] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // Charger les données du localStorage si elles existent
  useEffect(() => {
    // Si on est en mode édition, charger les données du cours
    if (isEditMode) {
      fetchCourseData();
    } else {
      // Sinon, vérifier s'il y a des données dans le localStorage
      const savedData = localStorage.getItem('coursFormData');
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setLocalStorageData(parsedData);
          
          // Afficher la modal si des données sauvegardées existent
          if (parsedData && Object.keys(parsedData).length > 0) {
            setShowLocalStorageModal(true);
          }
        } catch (e) {
          console.error('Erreur lors de la lecture des données du localStorage:', e);
        }
      }
    }
  }, [isEditMode, id]);

  // Fonction pour récupérer les données d'un cours existant
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_URL}/cours/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Données du cours récupérées:', response.data);
      
      // Traitement des tags pour les convertir de JSON en chaîne
      let tagsString = '';
      if (response.data.tags) {
        // Si les tags sont déjà une chaîne, les utiliser directement
        if (typeof response.data.tags === 'string') {
          try {
            // Vérifier si c'est une chaîne JSON
            const parsedTags = JSON.parse(response.data.tags);
            tagsString = Array.isArray(parsedTags) ? parsedTags.join(', ') : response.data.tags;
          } catch (e) {
            // Si ce n'est pas du JSON valide, utiliser tel quel
            tagsString = response.data.tags;
          }
        } else if (Array.isArray(response.data.tags)) {
          // Si c'est déjà un tableau, le convertir en chaîne
          tagsString = response.data.tags.join(', ');
        }
      }
      
      // Préparer l'URL complète pour l'image de prévisualisation si elle existe
      let previewUrl = null;
      if (response.data.image_couverture) {
        previewUrl = response.data.image_couverture.startsWith('http') 
          ? response.data.image_couverture 
          : `http://127.0.0.1:8000/storage/${response.data.image_couverture}`;
        setPreviewImage(previewUrl);
      }
      
      // Mettre à jour le formulaire avec les données du cours
      setFormData({
        titre: response.data.titre || '',
        description: response.data.description || '',
        contenu: response.data.contenu || '',
        image_couverture: null, // On ne peut pas remettre un fichier, juste l'URL
        image_url: previewUrl, // On garde l'URL pour l'affichage
        video_url: response.data.video_url || '',
        categorie: response.data.categorie || '',
        niveau: response.data.niveau || 'debutant',
        duree_estimee: response.data.duree_estimee ? response.data.duree_estimee.toString() : '',
        tags: tagsString,
        statut: response.data.statut || 'brouillon'
      });
      
      // Mettre à jour le contenu de l'éditeur si disponible
      if (editorRef.current && response.data.contenu) {
        editorRef.current.setContent(response.data.contenu);
      }
      
    } catch (error) {
      console.error('Erreur lors de la récupération des données du cours:', error);
      setError('Impossible de récupérer les données du cours. Vérifiez votre connexion et réessayez.');
    } finally {
      setLoading(false);
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const errors = {};
    
    if (!formData.titre.trim()) {
      errors.titre = 'Le titre est requis';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'La description est requise';
    }
    
    if (editorRef.current && editorRef.current.getContent().trim() === '') {
      errors.contenu = 'Le contenu du cours est requis';
    }
    
    if (!formData.categorie.trim()) {
      errors.categorie = 'La catégorie est requise';
    }
    
    if (!formData.duree_estimee.trim()) {
      errors.duree_estimee = 'La durée estimée est requise';
    } else if (isNaN(formData.duree_estimee) || parseInt(formData.duree_estimee) <= 0) {
      errors.duree_estimee = 'La durée doit être un nombre positif';
    }
    
    if (formData.video_url && !isValidUrl(formData.video_url)) {
      errors.video_url = 'L\'URL de la vidéo n\'est pas valide';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Vérifier si une URL est valide
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur de validation pour ce champ
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifier le type et la taille de l'image
      if (!file.type.match('image.*')) {
        setValidationErrors(prev => ({
          ...prev,
          image_couverture: 'Le fichier doit être une image'
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setValidationErrors(prev => ({
          ...prev,
          image_couverture: 'L\'image ne doit pas dépasser 5MB'
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        image_couverture: file
      }));

      // Créer une URL pour la prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        
        // Effacer l'erreur de validation
        if (validationErrors.image_couverture) {
          setValidationErrors(prev => ({
            ...prev,
            image_couverture: undefined
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
    setLoading(true);
    setError('');
    setSuccess('');
    
      // Préparer les données du formulaire
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'tags' && formData[key]) {
          // Convertir les tags en tableau JSON
          const tagsArray = formData[key].split(',').map(tag => tag.trim()).filter(tag => tag);
          formDataToSend.append(key, JSON.stringify(tagsArray));
        } else if (key === 'image_couverture' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Ajouter le contenu de l'éditeur
      if (editorRef.current) {
        formDataToSend.append('contenu', editorRef.current.getContent());
      }

      let response;
      if (isEditMode) {
        response = await axios.put(`${API_URL}/cours/${id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post(`${API_URL}/cours`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          },
      });
      }

      console.log('Réponse du serveur:', response.data);
      
      // Effacer les données du localStorage si elles existent
      localStorage.removeItem('coursFormData');
      
      // Afficher le message de succès
      setSuccess(isEditMode ? 'Cours mis à jour avec succès !' : 'Cours créé avec succès !');
      
      // Rediriger après un court délai
      setTimeout(() => {
        if (isEditMode) {
          navigate(`/cours/${id}`);
        } else {
          navigate('/dashboard/formateur/mes-cours');
        }
      }, 2000);
      
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
      setError(err.response?.data?.message || 'Une erreur est survenue lors de la création du cours.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les données sauvegardées dans le formulaire
  const loadSavedData = () => {
    if (localStorageData) {
      setFormData({
        titre: localStorageData.titre || '',
        description: localStorageData.description || '',
        contenu: localStorageData.contenu || '',
        image_couverture: null, // On ne peut pas restaurer le File object
        video_url: localStorageData.video_url || '',
        categorie: localStorageData.categorie || '',
        niveau: localStorageData.niveau || 'debutant',
        duree_estimee: localStorageData.duree_estimee || '',
        tags: localStorageData.tags || '',
        statut: localStorageData.statut || 'brouillon'
      });
      
      if (localStorageData.image_preview) {
        setPreviewImage(localStorageData.image_preview);
      }
      
      if (editorRef.current && localStorageData.contenu) {
        editorRef.current.setContent(localStorageData.contenu);
      }
      
      setSuccess('Données chargées depuis le localStorage!');
    } else {
      setError('Aucune donnée sauvegardée trouvée.');
    }
  };

  // Effacer les données du localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('coursFormData');
    setLocalStorageData(null);
    setSuccess('Données du localStorage effacées!');
  };

  // Pour TinyMCE - Gestion de l'upload d'images
  const images_upload_handler = (blobInfo, progress) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      
      formData.append('file', blobInfo.blob(), blobInfo.filename());
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      // Requête pour uploader l'image
      fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          resolve(result.location);
        })
        .catch(error => {
          reject(`Échec de l'upload d'image: ${error}`);
        });
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#a52a2a] mb-6">Ajouter un nouveau cours</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
              <FaCheckCircle className="mr-2" />
              {success}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
              <FaExclamationTriangle className="mr-2" />
              {error}
            </div>
          )}

          {/* Options de localStorage */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-[#a52a2a]">Options de sauvegarde locale</h3>
            
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                id="saveToLocalStorage"
                checked={saveToLocalStorage}
                onChange={() => setSaveToLocalStorage(!saveToLocalStorage)}
                className="mr-2 accent-[#a52a2a]"
              />
              <label htmlFor="saveToLocalStorage">Sauvegarder uniquement dans le localStorage</label>
            </div>
            
            <div className="flex space-x-3">
              <button 
                type="button" 
                onClick={loadSavedData}
                disabled={!localStorageData}
                className={`px-4 py-2 rounded-md ${!localStorageData ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#cc7722] text-white hover:bg-[#cc7722]/90'}`}
              >
                Charger les données sauvegardées
              </button>
              
              <button 
                type="button" 
                onClick={clearLocalStorage}
                disabled={!localStorageData}
                className={`px-4 py-2 rounded-md ${!localStorageData ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                Effacer les données sauvegardées
              </button>
            </div>
            
            {localStorageData && (
              <div className="mt-3 text-sm text-gray-600">
                Dernière sauvegarde: {new Date(localStorageData.date_sauvegarde).toLocaleString()}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre du cours *</label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  placeholder="Titre du cours"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                  required
                />
                {validationErrors.titre && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.titre}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="informatique">Multimedia</option>
                  <option value="langues">Développement Web</option>
                  <option value="design">Design Web & UX/UI</option>
                  <option value="art">Art et Culture</option>
                  <option value="sante">Santé et Bien-être</option>
                  <option value="digital">Digital & Marketing</option>
                  <option value="langue">Langue Nda'a Nda'a</option>
                </select>
                {validationErrors.categorie && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.categorie}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description courte</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brève description du cours"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                rows="3"
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                <select
                  name="niveau"
                  value={formData.niveau}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                >
                  <option value="debutant">Débutant</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="avance">Avancé</option>
                </select>
                {validationErrors.niveau && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.niveau}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Durée estimée (heures)</label>
                <input
                  type="number"
                  name="duree_estimee"
                  value={formData.duree_estimee}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                  min="1"
                />
                {validationErrors.duree_estimee && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.duree_estimee}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (séparés par des virgules)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Ex: programmation, web, javascript"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                />
                {validationErrors.tags && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.tags}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                />
                {validationErrors.image_couverture && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.image_couverture}</p>
                )}
                {previewImage && (
                  <div className="mt-2">
                    <img src={previewImage} alt="Prévisualisation" className="h-40 object-cover rounded-md" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la vidéo d'introduction</label>
                <input
                  type="url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  placeholder="https://example.com/video.mp4"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                />
                {validationErrors.video_url && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.video_url}</p>
                )}
              </div>
            </div>
            
            {/* Éditeur TinyMCE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenu du cours *</label>
              <Editor
                apiKey="uuz4mhuhz96kabksx4m3nrifnqxanr3j9lf8pbjs42xwifwu"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={formData.contenu || "<p>Commencez à rédiger votre cours ici...</p>"}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help | image media link | table | code',
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  images_upload_handler: images_upload_handler
                }}
              />
              {validationErrors.contenu && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.contenu}</p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => {
                  setFormData({
                    titre: '',
                    description: '',
                    contenu: '',
                    image_couverture: null,
                    video_url: '',
                    categorie: '',
                    niveau: 'debutant',
                    duree_estimee: '',
                    tags: '',
                    statut: 'brouillon'
                  });
                  setPreviewImage(null);
                  if (editorRef.current) {
                    editorRef.current.setContent('');
                  }
                }}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Réinitialiser
              </button>
              
              <button 
                type="submit" 
                disabled={loading}
                className="px-6 py-3 bg-[#a52a2a] text-white rounded-md hover:bg-[#a52a2a]/90 flex items-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    {saveToLocalStorage ? (
                      <>
                        <FaSave className="mr-2" />
                        Sauvegarder localement
                      </>
                    ) : (
                      <>
                        <FaUpload className="mr-2" />
                        Ajouter le cours
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AjouterCours;
