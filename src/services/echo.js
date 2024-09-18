import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
    forceTLS: true,
    encrypted: true,
    authEndpoint: `${process.env.REACT_APP_API_URL}/broadcasting/auth`, // Ensure your API URL is correct
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // or however you handle auth
        }
    }
});

export default echo;
