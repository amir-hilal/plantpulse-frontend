import React, { useState } from 'react';
import Loading from 'react-loading';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/images/Logo_black.png';
import { login } from '../features/auth/authSlice';
import api from '../services/api';
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      dispatch(login(response.data.user));
      toast.success('Registration successful!');
      navigate('/home');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
        <h2 className='text-center'>Create New Account</h2>
      </div>
      <form className="formgrid grid w-10" onSubmit={handleSubmit}>
        <div className=" field col-12 md:col-6 flex p-0 md:pr-1">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>

        <div class="field col-12 md:col-6 flex p-0 md:pl-1">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col-12 flex p-0">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col-12 flex p-0">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col-12 flex p-0" >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>
        <div class="field col-12 flex p-0">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
          />
        </div>

        <button type="submit" className="p-button w-full">
          {isLoading ? (
            <Loading type="spin" color="#fff" height={20} width={20} />
          ) : (
            'Sign Up'
          )}
        </button>
        <p>
          Already have an account? <a href="/login">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
