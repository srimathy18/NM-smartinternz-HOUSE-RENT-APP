import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      setError((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long',
      }));
      return;
    }

    const specialCharCount = password.replace(/[^!@#$%^&*()_+]/g, '').length;
    const uppercaseCount = password.replace(/[^A-Z]/g, '').length;

    if (specialCharCount < 2 || uppercaseCount < 1) {
      setError((prevErrors) => ({
        ...prevErrors,
        password: 'Password should contain 2 special characters and 1 uppercase letter',
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!value.match(emailPattern)) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: 'Email must contain "@" and "."',
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        email: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'email') {
      validateEmail(value);
    }
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.username) {
      setError({
        email: 'Username, Email, and Password are required to sign up',
        password: 'Username, Email, and Password are required to sign up',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        setError({ email: data.message, password: data.message });
        return;
      }

      setLoading(false);
      setError({ email: '', password: '' });
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError({ email: 'All fields are required', password: '' });
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto bg-[#FAFAFA] border border-[#E0E0E0] shadow-lg p-6 rounded-lg'>
      <h1 className='text-center text-3xl font-semibold mb-6 text-[#2C3E50] font-dancing-script'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Enter Your Username'
          className='border border-[#DADADA] bg-[#F9F9F9] text-base p-3 rounded focus:outline-none focus:border-[#B3B3B3] focus:ring-1 focus:ring-[#A0AEC0]'
          name='username'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Enter Your Email'
          className='border border-[#DADADA] bg-[#F9F9F9] text-base p-3 rounded focus:outline-none focus:border-[#B3B3B3] focus:ring-1 focus:ring-[#A0AEC0]'
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          className='border border-[#DADADA] bg-[#F9F9F9] text-base p-3 rounded focus:outline-none focus:border-[#B3B3B3] focus:ring-1 focus:ring-[#A0AEC0]'
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-[#3B82F6] text-white text-base py-2 rounded hover:bg-[#357ABD] focus:outline-none transition duration-200 disabled:opacity-60'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex justify-center items-center gap-1 mt-6'>
        <p className='text-[#6B7280] text-sm'>Already have an account?</p>
        <Link to='/sign-in'>
          <span className='text-[#4A90E2] text-sm font-medium hover:underline'>Sign in</span>
        </Link>
      </div>
      {error.email && <p className='text-red-500 text-sm text-center mt-4'>{error.email}</p>}
      {error.password && <p className='text-red-500 text-sm text-center mt-4'>{error.password}</p>}
    </div>
  );
}
