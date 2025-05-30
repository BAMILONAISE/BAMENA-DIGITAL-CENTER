 Bamena Digital Center (BDC)

Plateforme de gestion de cours en ligne pour le Bamena Digital Center.

 Description
Cette application est une solution complète de gestion de formation en ligne, composée d'un backend Laravel (API REST sécurisée) et d'un frontend React (interface moderne et responsive). Elle permet la gestion des utilisateurs (apprenants, formateurs, administrateurs), des cours, des inscriptions, et la visualisation des statistiques.

---

 Fonctionnalités principales

 Utilisateurs
- Inscription et connexion (apprenant, formateur, admin)
- Gestion du profil (modification des informations personnelles, changement de mot de passe)
- Déconnexion sécurisée

 Cours
- Création, modification, suppression de cours (formateur, admin)
- Ajout d'images de couverture et de vidéos
- Affichage dynamique des cours (liste, recherche, filtres)
- Aperçu public des cours
- Gestion des statuts (publié, brouillon, archivé)

 Tableau de bord
- Statistiques en temps réel (cours publiés, heures enseignées, apprenants formés)
- Tableau de bord formateur et apprenant personnalisés
- Affichage des cours récents et des images de preview

 Administration
- Gestion des utilisateurs (création, modification, suppression, rôles)
- Statistiques globales

 Sécurité & Authentification
- Authentification via Laravel Sanctum (API sécurisée, gestion des tokens)
- Protection des routes sensibles
- CORS configuré pour le frontend React

---

 Installation & Lancement

 Prérequis
- Node.js >= 16
- PHP >= 8.1
- Composer
- MySQL ou SQLite

 Backend (Laravel)
```bash
cd backend-bdc
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve
```

 Frontend (React)
```bash
cd projet-BDC
npm install
npm run dev
```

---

 Configuration
- .env Laravel : configurez la base de données, l'URL de l'application, les variables Sanctum, etc.
- CORS : déjà configuré pour accepter les requêtes du frontend React.
- Stockage des images : les images sont stockées dans `storage/app/public` et accessibles via `/storage`.

---

 Fonctionnement général
- Accès :
  - Frontend : http://localhost:5173
  - Backend API : http://127.0.0.1:8000/api
- Connexion : chaque utilisateur a un rôle (apprenant, formateur, admin) qui détermine ses droits.
- Gestion des cours : les formateurs créent et gèrent leurs cours, les apprenants consultent et s'inscrivent.
- Administration : l'admin gère tous les utilisateurs et les statistiques.

---

 Développement & Personnalisation
- Backend : routes dans `routes/api.php`, contrôleurs dans `app/Http/Controllers`.
- Frontend : composants React dans `src/components`, pages dans `src/pages`.
- API : toutes les routes protégées nécessitent un token d'authentification (Sanctum).

---

 Auteurs & Contact
- Bamena Digital Center
- Contact : info@bamenadigitalcenter.com

---

 Licence
Projet open-source pour la communauté Bamena.
