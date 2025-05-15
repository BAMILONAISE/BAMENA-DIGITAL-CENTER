-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 15 mai 2025 à 22:21
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `backendbdc`
--

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contenu` text COLLATE utf8mb4_unicode_ci,
  `image_couverture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categorie` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `niveau` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'debutant',
  `duree_estimee` int DEFAULT NULL,
  `tags` json DEFAULT NULL,
  `statut` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'brouillon',
  `user_id` bigint UNSIGNED NOT NULL,
  `titre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `video_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cours_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `created_at`, `updated_at`, `contenu`, `image_couverture`, `categorie`, `niveau`, `duree_estimee`, `tags`, `statut`, `user_id`, `titre`, `description`, `video_url`) VALUES
(14, '2025-05-09 14:23:58', '2025-05-09 14:23:58', '<p>Commencez &agrave; r&eacute;diger votre cours ici... SHJHSDSF</p>', 'cours/images/TPPtiXMpafBaJAHMTteshmoFyfiDhHE2KZbYIDI4.png', 'langues', 'debutant', 1, '\"[\\\"[\\\\\\\"SOUTENAANCE\\\\\\\"]\\\"]\"', 'brouillon', 3, 'SOUTENANCE', 'BREVE DESCRIPTION', 'http://localhost:5173/place.mp4'),
(2, '2025-05-05 20:45:27', '2025-05-05 20:45:27', '<p>donc cest de l\'art</p>', 'cours/images/JIlJ4ndEa7CbW2PetrDb9ZbI6WjPIWTiJrseauL3.png', 'art', 'debutant', 3, '\"[\\\"programmation\\\"]\"', 'publie', 2, 'Cours 1', 'ici cest de l\'art', 'http://localhost:5173/marc.mp4'),
(3, '2025-05-05 20:52:19', '2025-05-05 20:52:19', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/yKiaUumda6oSepIGIkRMK72Bda1o9pEwdotB70Z2.png', 'digital', 'debutant', 4, '\"[\\\"vente\\\",\\\"gestion\\\",\\\"service\\\"]\"', 'brouillon', 2, 'ce cours', 'breve description sur le cous de marketing digital', 'http://localhost:5173/marc.mp4'),
(4, '2025-05-05 21:07:03', '2025-05-05 21:07:03', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/rgPzn394hsqLL5R7AkAUKHwMG8C50m4kSSsdm53v.png', 'langue', 'intermediaire', 5, '\"[\\\"introduction\\\",\\\"langage\\\"]\"', 'brouillon', 1, 'Cours de NDA\'A NDA\'A', 'Breve description', 'http://localhost:5173/marc.mp4'),
(5, '2025-05-05 21:16:09', '2025-05-05 21:16:09', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/Ui2WhfdljFOdUUEgBvJ0WHM49gVdjb0leqKXKrY4.png', 'sante', 'debutant', 2, '\"[\\\"sante\\\"]\"', 'brouillon', 2, 'titrenn', 'breve description du cours', 'http://localhost:5173/marc.mp4'),
(6, '2025-05-05 22:23:38', '2025-05-05 22:23:38', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/hcbIObxrknJivudkRoY97ALBephZaM0r5ZGN509D.png', 'informatique', 'debutant', 1, '\"[\\\"introduction\\\",\\\"langage\\\"]\"', 'brouillon', 1, 'yoyo', 'ngoh menoh', 'http://localhost:5173/marc.mp4'),
(8, '2025-05-06 22:20:31', '2025-05-06 22:20:31', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/0PBa4ZOhMVSggcJayD8hm2Q9n0Jx4DFIYxteOdBQ.png', 'langues', 'debutant', 3, '\"[\\\"html\\\",\\\"css\\\"]\"', 'brouillon', 3, 'INTRODUCTION AU DEVELOPPEMENT', 'Il s\'agira ici de comprendre les bases du developpement web', NULL),
(9, '2025-05-07 09:43:18', '2025-05-07 09:43:18', '<p>Commencez &agrave; r&eacute;diger votre cours ici... DONC&nbsp;</p>', 'cours/images/v9hSXNWSP8VZLo6SkYaUTwQedym4cz8Z3PY12ak3.png', 'langues', 'intermediaire', 2, '\"[\\\"html\\\",\\\"css\\\",\\\"tout\\\"]\"', 'publie', 3, 'INTRODUCTION AU DEVELOPPEMENT WEB', 'Breve', 'http://localhost:5173/marc.mp4'),
(10, '2025-05-07 10:00:40', '2025-05-07 10:00:40', '<p>Commencez &agrave; r&eacute;diger votre cours ici...kkjgdddfcvcghgfvcv</p>', 'cours/images/AVtwdSi9FeQN2hYI7nltXBIKhAhtzr4kXfxbKwcM.png', 'informatique', 'debutant', 11, '\"[\\\"html\\\",\\\"css\\\"]\"', 'brouillon', 1, 'ddd', 'ddd', 'http://localhost:5173/marc.mp4'),
(12, '2025-05-08 22:18:52', '2025-05-08 22:18:52', '<p>Ma&icirc;trisez les outils de cr&eacute;ation multim&eacute;dia pour produire des contenus professionnels.</p>', 'cours/images/LmH23i9F1mpEMmOm0vLEuuEw2aLENAzMOYRPiOJE.png', 'informatique', 'debutant', 2, '\"[\\\"Montage\\\",\\\"vid\\\\u00e9o Animation 2D\\\\/3D\\\",\\\"Production audio\\\"]\"', 'brouillon', 1, 'MULTIMEDIA', 'Maîtrisez les outils de création multimédia pour produire des contenus professionnels.', 'http://localhost:5173/marc.mp4'),
(13, '2025-05-09 09:42:45', '2025-05-09 09:42:45', '<p>Commencez &agrave; r&eacute;diger votre cours ici...</p>', 'cours/images/TAa8pILQDBIvMUP4YoYEzdWkoVnbBC7pd6Lq16xq.png', 'design', 'debutant', 2, '\"[\\\"[\\\\\\\"Design\\\\\\\"]\\\"]\"', 'publie', 3, 'DESIGN WEB', 'Apprenez les principes du design afin de concevoir des supports attrayants et professionnels', 'http://localhost:5173/place.mp4');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscriptions`
--

DROP TABLE IF EXISTS `inscriptions`;
CREATE TABLE IF NOT EXISTS `inscriptions` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `cours_id` bigint UNSIGNED NOT NULL,
  `statut` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_cours',
  `date_inscription` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `inscriptions_user_id_foreign` (`user_id`),
  KEY `inscriptions_cours_id_foreign` (`cours_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_04_26_125226_create_cours_table', 1),
(6, '2025_05_03_144924_add_fields_to_cours_table', 1),
(7, '2025_05_05_220000_add_missing_fields_to_cours', 2),
(8, '2025_05_06_172608_add_contact_to_users_table', 3),
(9, '2025_05_06_172905_add_contact_to_users_table', 3),
(10, '2025_05_08_231019_create_inscriptions_table', 4);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', 'aed9e175710ea912e7c25407c1a9a6ac9d5e70983c1db9a343f5933166f2aa05', '[\"*\"]', NULL, NULL, '2025-05-05 13:37:27', '2025-05-05 13:37:27'),
(2, 'App\\Models\\User', 1, 'auth_token', 'f6a60215f74ea8af79a2934a182919e0d5b0488056d965cd6e012f56726b71bd', '[\"*\"]', NULL, NULL, '2025-05-05 13:38:18', '2025-05-05 13:38:18'),
(3, 'App\\Models\\User', 1, 'auth_token', '0872277d75f02430e5c1bdae8419c73b22fbb6ef43c42f2a9397cbf19043b337', '[\"*\"]', '2025-05-05 13:47:02', NULL, '2025-05-05 13:42:57', '2025-05-05 13:47:02'),
(22, 'App\\Models\\User', 1, 'auth_token', 'd4c099750e962da7ac36a1fdb0f78b35507af14ad768e1003d3979de14a97b71', '[\"*\"]', '2025-05-06 17:22:26', NULL, '2025-05-06 16:45:27', '2025-05-06 17:22:26'),
(29, 'App\\Models\\User', 1, 'auth_token', '75108edaaf965a7063433bb5cbc043cbd476bb45c3958d28dba57e88e4851645', '[\"*\"]', '2025-05-07 14:41:40', NULL, '2025-05-07 10:19:05', '2025-05-07 14:41:40'),
(30, 'App\\Models\\User', 1, 'auth_token', '89c0244f3845114797764ca75698e61346d0bacc0fe9a5265b30bec58b1d0a4d', '[\"*\"]', '2025-05-08 20:17:27', NULL, '2025-05-07 14:41:52', '2025-05-08 20:17:27'),
(31, 'App\\Models\\User', 1, 'auth_token', '209c0241daf1e149e07ccc0f413f6d87477ee74d9a656eeaff535bc8973b51d5', '[\"*\"]', '2025-05-08 22:34:21', NULL, '2025-05-08 21:54:30', '2025-05-08 22:34:21'),
(32, 'App\\Models\\User', 1, 'auth_token', 'f7a20abd16eff42a875617cb417cde4824b3e8981d836e1d1a44d85955e137f8', '[\"*\"]', '2025-05-09 06:33:05', NULL, '2025-05-09 06:32:00', '2025-05-09 06:33:05'),
(36, 'App\\Models\\User', 2, 'auth_token', 'c99a380a01f2860ca4d72096967feeb30cbb5a8095b5753020b63c1e10284580', '[\"*\"]', '2025-05-09 08:23:40', NULL, '2025-05-09 08:23:39', '2025-05-09 08:23:40'),
(48, 'App\\Models\\User', 1, 'auth_token', '87a69bcb6ba27242708b7da18c9dbd61dd717b7ca87d1cb6a48c2490753049aa', '[\"*\"]', '2025-05-11 19:34:25', NULL, '2025-05-09 14:44:46', '2025-05-11 19:34:25');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `prenom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nom` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `quartier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_naissance` date NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('apprenant','formateur','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'apprenant',
  `statut` enum('actif','inactif') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'actif',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `prenom`, `nom`, `email`, `email_verified_at`, `quartier`, `date_naissance`, `password`, `role`, `statut`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Melvine', 'Possi', 'melvine@gmail.com', NULL, 'Louh', '2000-03-03', '$2y$10$B2pdC9FaCpcUIS.EymGweOS7bTf1RD8pjIXascW1APNjyrN1yXS16', 'admin', 'actif', NULL, '2025-05-05 13:37:27', '2025-05-09 10:08:00'),
(2, 'Franck', 'Vetubo', 'franck@gmail.com', NULL, 'Louh', '1994-04-08', '$2y$10$coPLosM8bdtcsTWOoQKlPO8rHGD7BZV9RDn.NHpidQ1stvwlQBq5K', 'formateur', 'actif', NULL, '2025-05-05 19:15:09', '2025-05-05 22:45:42'),
(3, 'Kevin', 'Kevin', 'kevin@gmail.com', NULL, 'Ntap', '2000-02-10', '$2y$10$HNVjGx3FelJtl/nLIY7.Duo2A8QrFqBfZEtbUSiNY420Cvmjz4R62', 'formateur', 'actif', NULL, '2025-05-05 21:09:13', '2025-05-06 14:31:56'),
(4, 'kiki', 'kiki', 'kiki@gmail.com', NULL, 'Po\'ozouh', '1999-06-09', '$2y$10$J7PATQkGiEwowSe.QFUqVuoCfkJo5bVh.7jgg01jUhSSuVxmPb9cO', 'formateur', 'actif', NULL, '2025-05-06 15:59:20', '2025-05-09 08:38:07'),
(5, 'Melvinaa', 'YIMGA POSSI', 'labamilonaise@gmail.com', NULL, 'Louh', '2000-03-02', '$2y$10$1yS1sG9VetMjR7ZzXPvyaOxQ0XQ6QA36yboAFUoUNBkoDDbEahK1e', 'admin', 'actif', NULL, '2025-05-08 19:45:07', '2025-05-08 19:45:07'),
(6, 'Matio', 'Elisabeth', 'elisabeth@gmail.com', NULL, 'FOPLEUP', '1965-07-01', '$2y$10$YmGul33t0GFlGYuPlsqk..1d6sNmEN3ojne5xP74o64j9pPIP2iDC', 'formateur', 'actif', NULL, '2025-05-08 22:15:03', '2025-05-09 08:37:33'),
(7, 'Posiiii', 'Mel YIMGA', 'mel@gmail.com', NULL, 'Ntap', '1994-03-02', '$2y$10$Kzhz/uZKV/5pmQ1vvknwd.sbBOqI3vIsKWF6vWcXc9It2E54lFoRK', 'formateur', 'actif', NULL, '2025-05-09 08:10:33', '2025-05-09 08:10:33'),
(8, 'Daniellaaaaaaaa', 'NGUEMDJO', 'danielle@gmail.com', NULL, 'Langweuh', '1999-06-22', '$2y$10$JMCARiNQOpRdnUDCcLlGa.U2Iw/7P6NnKMP6s82LYZtn6gPg.7TY6', 'apprenant', 'actif', NULL, '2025-05-09 08:37:05', '2025-05-09 14:22:05');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
