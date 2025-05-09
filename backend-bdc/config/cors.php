<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */



 // On autorise les appels aux routes API + route csrf-cookie de Sanctum 
 'paths' => [
    'api/*',
    'sanctum/csrf-cookie',
    'update-profile',
],

 // Autorise toutes les méthodes HTTP (GET, POST, etc.)
 'allowed_methods' => ['*'],

 // Le front React autorisé (le port 3000 est utilisé)
 'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
 ],

'allowed_origins_patterns' => [],

// Autorise tous les en-têtes (headers)
'allowed_headers' => ['*'],

'exposed_headers' => ['*'],

'max_age' => 0,

 // Nécessaire pour permettre l'envoi des cookies (Sanctum fonctionne avec des cookies)
 'supports_credentials' => true,  // << OBLIGATOIREMENT true

];
