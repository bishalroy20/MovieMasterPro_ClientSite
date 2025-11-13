import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { createUser , signInWithGoogle} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    photoURL: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  const validate = () => {
    const { password } = formData;
    const newErrors = {};

    if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Must include an uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      newErrors.password = 'Must include a lowercase letter';
    }
    if (password.length < 6) {
      newErrors.password = 'Must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const result = await createUser(formData.email, formData.password);


      await updateProfile(result.user, {
        displayName: formData.username,
        photoURL: formData.photoURL
      });

      toast.success('Profile created successfully!');
      setFormData({ username: '', photoURL: '', email: '', password: '' }); 
      setLoading(false);
    
      navigate('/profile'); 
    } catch (err) {
      toast.error(err.message);
      setErrors({ firebase: err.message });
      setLoading(false);
    }
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
      <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="input w-full"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="photoURL"
          type="text"
          placeholder="Photo URL"
          className="input w-full"
          value={formData.photoURL}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input w-full"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        {errors.firebase && <p className="text-red-500 text-sm">{errors.firebase}</p>}

        <button type="submit" className="btn btn-neutral w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full"
        disabled={loading}
      >
        Login with Google
      </button>


      <p className="text-sm text-center mt-4">
        Already have an account?{' '}
        <Link to="/login" className="link link-hover text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;