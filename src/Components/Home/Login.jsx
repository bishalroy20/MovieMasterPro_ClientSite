import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    signInUser(formData.email, formData.password)
      .then(result => {
        console.log('Logged in:', result.user);
        setLoading(false);
      })
      .catch(err => {
        setError('Invalid credentials');
        setLoading(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
      <h1 className="text-4xl font-bold text-center mt-4">Login</h1>
      <form onSubmit={handleLogin} className="card-body space-y-2">
        <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="btn btn-neutral mt-2" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;