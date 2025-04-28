import React, { useState, useEffect } from 'react'; // <-- add useEffect
import { useAuth0 } from "@auth0/auth0-react";
import useProductStore from '../zustand/store/productStore';
import { useNavigate } from 'react-router-dom';
function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    isLoading,
  } = useAuth0();

  const navigate = useNavigate();
  const { setUser } = useProductStore();
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    loginWithRedirect({
      connection: 'google-oauth2',
      prompt: 'select_account',
      max_age: 0,
      ui_locales: 'en',
    });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      setUser(user);
      navigate('/'); // Redirect to home after login
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Google Sign-in Button */}
        {!isAuthenticated && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center"
            >
              <span className="mr-2">
                {/* Simple Google logo placeholder */}
                G
              </span>
              Continue with Google
            </button>
          </div>
        )}

        {/* Toggle between login and signup */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-sm text-blue-500 hover:text-blue-700 font-medium"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
