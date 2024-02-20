import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  // const url = 'https://justdoit-x194.onrender.com/user/login';

  const navigate = useNavigate();

  const url = 'http://localhost:3000/user/login';
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  
  // login logic------------------------------------
  const onLogin = async (e) => {
    e.preventDefault();
    
  
    if (!formValues.email || !formValues.password) {
      toast.error('Please enter email and password.');
      return;
    }
  
    const id = toast.loading('Please wait...');
  
    try {
      const response = await axios.post(url, {
        email: formValues.email,
        password: formValues.password
      });
      // console.log(response);
      if (response.status == 200) {
        toast.update(id, {
          render: response.data.msg,
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
        localStorage.setItem("token", response.data.token);
        // console.log(localStorage);
        
        navigate('/');

      } else {
        toast.update(id, {
          render: response.data.msg, 
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        toast.update(id, {
          render: error.response.data.msg, 
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else if (error.request) {
        toast.error('No response received from the server.');
      } else {
        toast.error('Error setting up the request.');
      }
    }
  };
  return (
    <section className='bg-gray-50 text-black'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a
          href='#'
          className='flex items-center mb-6 text-2xl font-semibold text-gray-900'>
          <img
            className='w-8 h-8 mr-2'
            src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
            alt='logo'
          />
        </a>
        <div className='w-full bg-white rounded-lg shadow-lg shadow-gray-400 md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Login to your account
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  required=''
                  onChange={handleChange}
                  value={formValues.email}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required=''
                  onChange={handleChange}
                  value={formValues.password}
                />
              </div>
              <button
                onClick={onLogin}
                className='w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none bg-blue-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Login
              </button>

              <p className='text-sm font-light text-gray-500'>
                New here?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline'>
                  Creater account
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
