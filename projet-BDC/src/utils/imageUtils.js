/**
 * Utilitaires pour la gestion des images
 */

// URL de base de l'API
const API_URL = 'http://127.0.0.1:8000';

/**
 * Obtient l'URL complète d'une image
 * @param {string} imagePath - Chemin de l'image
 * @returns {string} URL complète de l'image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si l'image est déjà une URL complète
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Si l'image est stockée localement
  if (imagePath.startsWith('/storage/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // Si l'image est stockée dans le dossier public
  if (imagePath.startsWith('/images/')) {
    return `${API_URL}${imagePath}`;
  }
  
  // Par défaut, on suppose que l'image est dans le dossier storage
  return `${API_URL}/storage/${imagePath}`;
};

/**
 * Image par défaut à afficher en cas d'erreur
 */
export const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5BdWN1bmUgaW1hZ2U8L3RleHQ+PC9zdmc+';

/**
 * Gestionnaire d'erreur pour les images
 * @param {Event} e - Événement d'erreur
 */
export const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = DEFAULT_IMAGE;
}; 