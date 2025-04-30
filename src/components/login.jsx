import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import useProductStore from '../zustand/store/productStore';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

function App() {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
  } = useAuth0();

  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm()

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
    }).catch(error => {
      console.error("Google login error:", error);
    });
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      setUser(user);
      navigate('/');
    } else if (localStorage.getItem("token")) {
      // If token is stored locally
      navigate('/');
    }
  }, [isAuthenticated, user, navigate, setUser]);

  const onSubmit = async (data) => {
    const url = `${process.env.REACT_APP_SERVER}/user/login`;
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
  
      localStorage.setItem("token", result.access_token);
      navigate('/');      
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              {...register("email", {required: "Email is required"})}
            />
            <p className='text-red-500 text-sm pt-1'>{errors.email && errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            <p className='text-red-500 text-sm pt-1'>{errors.password && errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {!isAuthenticated && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center"
            >
              <span className="mr-2">
                G
              </span>
              Continue with Google
            </button>
          </div>
        )}

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
