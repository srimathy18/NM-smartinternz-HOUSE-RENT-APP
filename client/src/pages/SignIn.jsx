import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='w-full max-w-xs mx-auto bg-[#FAFAFA] border border-[#E0E0E0] shadow-lg p-6 rounded-lg'>
      <h1 className='text-center text-3xl font-semibold mb-6 text-[#2C3E50] font-dancing-script'>
        Hello 👋, Sign in please
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Enter Your Email'
          className='border border-[#DADADA] bg-[#F9F9F9] text-base p-3 rounded focus:outline-none focus:border-[#B3B3B3] focus:ring-1 focus:ring-[#A0AEC0]'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Enter Your Password'
          className='border border-[#DADADA] bg-[#F9F9F9] text-base p-3 rounded focus:outline-none focus:border-[#B3B3B3] focus:ring-1 focus:ring-[#A0AEC0]'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-[#3B82F6] text-white text-base py-2 rounded hover:bg-[#F3F4F6] focus:outline-none transition duration-200 disabled:opacity-60'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex justify-center items-center gap-1 mt-6'>
        <p className='text-[#6B7280] text-sm'>Not a member yet?</p>
        <Link to={'/sign-up'}>
          <span className='text-[#4A90E2] text-sm font-medium hover:underline'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-sm text-center mt-4'>{error}</p>}
    </div>
  );
}
