// src/pages/ModifierCours.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../context/AuthContext';
import { FaSave, FaArrowLeft, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaTrash } from 'react-icons/fa';
import api from '../api';

const ModifierCours = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const editorRef = useRef(null);
  
  const [coursInitial, setCoursInitial] = useState(null);
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
  
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [imageChanged, setImageChanged] = useState(false);
  
  // URL de base de l'API
  const API_URL = 'http://127.0.0.1:8000/api';
  
  // Charger les données du cours
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        
        // Récupérer le token d'authentification
        const token = localStorage.getItem('token');
        
        const response = await api.get(`/cours/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const courseData = response.data;
        setCoursInitial(courseData);
        
        // Préparer les données du formulaire
        setFormData({
          titre: courseData.titre || '',
          description: courseData.description || '',
          contenu: courseData.contenu || '',
          image_couverture: null, // On ne charge pas directement l'image, juste la preview
          video_url: courseData.video_url || '',
          categorie: courseData.categorie || '',
          niveau: courseData.niveau || 'debutant',
          duree_estimee: courseData.duree_estimee || '',
          tags: courseData.tags || '',
          statut: courseData.statut || 'brouillon'
        });
        
        // Si le cours a une image, on définit la preview
        if (courseData.image_couverture) {
          setPreviewImage(`http://127.0.0.1:8000/storage/${courseData.image_couverture}`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors du chargement du cours:', err);
        setError('Impossible de charger les données du cours. Veuillez réessayer.');
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);
  
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
      
      // Limiter la taille à 5MB
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          image_couverture: 'L\'image ne doit pas dépasser 5MB'
        }));
        return;
      }
      
      // Mettre à jour l'état avec le fichier
      setFormData(prev => ({
        ...prev,
        image_couverture: file
      }));
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Indiquer que l'image a été changée
      setImageChanged(true);
      
      // Effacer l'erreur de validation si présente
      if (validationErrors.image_couverture) {
        setValidationErrors(prev => ({
          ...prev,
          image_couverture: undefined
        }));
      }
    }
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation avant envoi
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      // Si on a un éditeur, on récupère le contenu
      if (editorRef.current) {
        setFormData(prev => ({
          ...prev,
          contenu: editorRef.current.getContent()
        }));
      }
      
      // Créer un FormData pour l'envoi des fichiers
      const formDataToSend = new FormData();
      
      // Méthode PUT pour Laravel
      formDataToSend.append('_method', 'PUT');
      
      // Ajouter les champs textuels
      formDataToSend.append('titre', formData.titre);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('contenu', editorRef.current ? editorRef.current.getContent() : '');
      if (formData.video_url) formDataToSend.append('video_url', formData.video_url);
      formDataToSend.append('categorie', formData.categorie);
      formDataToSend.append('niveau', formData.niveau);
      formDataToSend.append('duree_estimee', formData.duree_estimee);
      if (formData.tags) formDataToSend.append('tags', formData.tags);
      formDataToSend.append('statut', formData.statut);
      
      // Ajouter l'image seulement si elle a été changée
      if (imageChanged && formData.image_couverture instanceof File) {
        formDataToSend.append('image_couverture', formData.image_couverture);
      }
      
      // Récupérer le token d'authentification
      const token = localStorage.getItem('token');
      
      // Envoyer la requête de mise à jour
      const response = await api.post(`/cours/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log('Réponse du serveur:', response.data);
      
      // Afficher un message de succès
      setSuccess('Cours mis à jour avec succès!');
      
      // Rediriger après 2 secondes
      setTimeout(() => {
        navigate('/dashboard/formateur/mes-cours');
      }, 2000);
      
    } catch (err) {
      console.error('Erreur lors de la mise à jour du cours:', err);
      
      const errorMsg = err.response && err.response.data && err.response.data.message 
        ? err.response.data.message 
        : 'Une erreur est survenue lors de la mise à jour du cours.';
        
      setError(errorMsg);
      
      // Si l'erreur est liée à l'authentification (401), afficher un message spécifique
      if (err.response && err.response.status === 401) {
        setError('Erreur d\'authentification. Veuillez vous reconnecter et réessayer.');
      }
      
      // Scroll vers le haut pour montrer l'erreur
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
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
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#a52a2a]" />
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="mb-6 flex justify-between items-center">
          <button 
            onClick={() => navigate('/dashboard/formateur/mes-cours')}
            className="flex items-center text-gray-600 hover:text-[#a52a2a]"
          >
            <FaArrowLeft className="mr-2" />
            Retour à la liste
          </button>
          <h1 className="text-2xl font-bold text-[#a52a2a]">Modifier le cours</h1>
        </div>
        
        {/* Messages d'erreur et de succès */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
            <FaExclamationTriangle className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Une erreur est survenue</p>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-start">
            <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
            <div>
              <p className="font-medium">Succès!</p>
              <p>{success}</p>
            </div>
          </div>
        )}
        
        {/* Formulaire de modification */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            {/* Titre du cours */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre du cours *
              </label>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                required
              />
              {validationErrors.titre && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.titre}</p>
              )}
            </div>
            
            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description courte *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                required
              ></textarea>
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>
            
            {/* Image de couverture */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image de couverture
              </label>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {previewImage ? (
                    <div className="relative">
                      <img 
                        src={previewImage} 
                        alt="Aperçu de l'image" 
                        className="w-32 h-32 object-cover rounded-md" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(null);
                          setFormData(prev => ({...prev, image_couverture: null}));
                          setImageChanged(true);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                      <span className="text-gray-400 text-sm">Pas d'image</span>
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#a52a2a] file:text-white
                    hover:file:bg-[#cc7722]"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Formats acceptés: JPG, PNG, GIF. Max 5MB
                  </p>
                  {validationErrors.image_couverture && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.image_couverture}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Groupe de deux champs: Catégorie et Niveau */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie *
                </label>
                <input
                  type="text"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  placeholder="Ex: Développement Web"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                  required
                />
                {validationErrors.categorie && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.categorie}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Niveau *
                </label>
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
              </div>
            </div>
            
            {/* Groupe de deux champs: Durée estimée et Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durée estimée (heures) *
                </label>
                <input
                  type="number"
                  name="duree_estimee"
                  value={formData.duree_estimee}
                  onChange={handleChange}
                  min="1"
                  step="0.5"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                  required
                />
                {validationErrors.duree_estimee && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.duree_estimee}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Ex: html,css,javascript"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                />
              </div>
            </div>
            
            {/* Groupe de deux champs: Statut et URL de vidéo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut *
                </label>
                <select
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#cc7722] focus:border-[#cc7722]"
                >
                  <option value="brouillon">Brouillon</option>
                  <option value="publie">Publié</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de vidéo (optionnel)
                </label>
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
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                type="button" 
                onClick={() => navigate('/dashboard/formateur/mes-cours')}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Annuler
              </button>
              
              <button 
                type="submit" 
                disabled={saving}
                className="px-6 py-3 bg-[#a52a2a] text-white rounded-md hover:bg-[#a52a2a]/90 flex items-center"
              >
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifierCours;
