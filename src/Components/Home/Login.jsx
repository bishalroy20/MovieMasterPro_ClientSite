import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    signInUser(formData.email, formData.password)
      .then(result => {
        
        toast.success('Login successful!');
        setLoading(false);
        navigate('/profile');
      })
      .catch(err => {
        toast.error('Invalid Email and Password. Please try again.');
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(result => {
        
        toast.success('Logged in with Google!');
        setLoading(false);
        navigate('/profile');
      })
      .catch(err => {
        toast.error('Google login failed.');
        setLoading(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl py-6 px-4">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input w-full"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full"
          onChange={handleChange}
          required
        />
        <div className="flex justify-between text-sm">
          <Link to="/forgot-password" className="link link-hover text-blue-500">Forgot Password?</Link>
          {/* <Link to="/register" className="link link-hover text-blue-500">Register</Link> */}
        </div>
        <button type="submit" className="btn btn-neutral w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full"
        disabled={loading}
      >
        Login with Google
      </button>


      <p className="text-sm text-center mt-4">
        Don’t have an account?{' '}
        <Link to="/register" className="link link-hover text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;