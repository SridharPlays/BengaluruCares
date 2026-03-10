import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import backgroundImage from '../assets/login-background.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password) {
      setValidationError('Please enter both email and password.');
      return;
    }

    try {
      await login(email, password);
      console.log('Login attempt completed');
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="flex min-h-screen flex-row-reverse w-full font-sans">
      {/* 40% Form Section */}
      <div className="flex-none w-[40%] min-w-[350px] flex flex-col justify-center items-center bg-white p-8 box-border border-r border-gray-200">
        <div className="w-full max-w-[320px]">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-8 text-sm">Please enter your details to sign in.</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 rounded-md border border-gray-300 text-base outline-none transition-colors duration-200 w-full focus:border-indigo-500 box-border"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 rounded-md border border-gray-300 text-base outline-none transition-colors duration-200 w-full focus:border-indigo-500 box-border"
                disabled={isLoading}
              />
            </div>

            {/* Error Display */}
            {(error || validationError) && (
              <div className="text-red-500 text-sm -mt-2">
                {validationError || error?.message || 'Failed to login'}
              </div>
            )}

            <button 
              type="submit" 
              className={`bg-indigo-600 text-white p-3 rounded-md border-none text-base font-medium cursor-pointer mt-2 transition-colors duration-200 w-full hover:bg-indigo-700 ${isLoading ? 'opacity-70' : 'opacity-100'}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-indigo-600 no-underline font-medium">Sign up</Link>
          </p>
        </div>
      </div>

      {/* 70% Branding/Image Section */}
      <div className="flex-1 --bg-slate-900 flex flex-col justify-center items-center p-12 text-slate-950" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-[600px] text-center">
            <h1 className="text-6xl font-bold mb-4 m-0"><span className='font-normal tracking-tighter'>ಬೆಂಗಳೂರು</span> Cares</h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;