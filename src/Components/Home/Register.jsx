import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    photoURL: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const { email, password } = formData;
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

  const handleRegister = e => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    createUser(formData.email, formData.password)
      .then(result => {
        console.log('User created:', result.user);
        // Optionally update profile here
        setLoading(false);
      })
      .catch(err => {
        setErrors({ firebase: err.message });
        setLoading(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shadow-2xl">
      <h1 className="text-4xl font-bold text-center mt-4">Register</h1>
      <form onSubmit={handleRegister} className="card-body space-y-2">
        <input name="username" type="text" placeholder="Username" className="input" onChange={handleChange} required />
        <input name="photoURL" type="text" placeholder="Photo URL" className="input" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="input" onChange={handleChange} required />

        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        {errors.firebase && <p className="text-red-500 text-sm">{errors.firebase}</p>}

        <button type="submit" className="btn btn-neutral mt-2" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;