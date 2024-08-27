import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/Logo_black.png';
import { login } from '../features/auth/authSlice';
import api from '../services/api';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/login', {
        email: formData.emailOrUsername,
        password: formData.password,
      });

      dispatch(login(response.data.user));
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex flex-column align-items-center bg-tint-5 border-round w-8">
      <ToastContainer />
      <div className="flex flex-column align-items-center w-10">
        <img
          src={logo}
          alt="PlantPulse"
          className="logo"
          onClick={() => navigate('/')}
        />
        <h2 className="text-center">Log in to PlantPulse</h2>
      </div>
      <form className="formgrid grid w-10" onSubmit={handleSubmit}>
        <div className="field col-12 flex p-0">
          <input
            type="text"
            name="emailOrUsername"
            placeholder="Email or Username"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col-12 flex p-0">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
            required
          />
        </div>
        <a href="/forgot-password">Forgot Password?</a>
        <button type="submit" className="p-button w-full">
          {isLoading ? (
            <Loading type="spin" color="#fff" height={20} width={20} />
          ) : (
            'Login'
          )}
        </button>
        <p>
          Don’t have an account? <a href="/register">Sign up for PlantPulse</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
