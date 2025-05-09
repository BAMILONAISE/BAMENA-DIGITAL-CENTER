// src/echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_KEY || 'votre_app_key',
    cluster: process.env.REACT_APP_PUSHER_CLUSTER || 'eu',
    forceTLS: true
});

export default window.Echo;