import { useState } from 'react';
import { login, fetchMe } from '../api'; // ⬅️ On importe bien login ET fetchMe
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ⬅️ pour le chargement

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // On commence le chargement

    try {
      // 1. Connexion
      await login({ email, password });

      // 2. Si connexion OK, récupérer l'utilisateur connecté
      const user = await fetchMe();

      // 3. Redirection selon le rôle
      if (user.role === 'admin') {
        navigate('/dashboard-admin');
      } else if (user.role === 'formateur') {
        navigate('/dashboard-formateur');
      } else {
        navigate('/dashboard-apprenant');
      }
    } catch (err) {
      console.error('Erreur Axios:', err.response ? err.response.data : err.message);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Affiche le vrai message d'erreur du back
      } else {
        setError('Erreur de connexion.');
      }
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center font-bold">Connexion</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

export default Login;
