import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Login() {
  const url = 'https://justdoit-x194.onrender.com/user/login';
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues)
  };



  // login logic
  const onLogin = async (e) => {
    e.preventDefault();

    if ( !formValues.email || !formValues.password ) {
      toast.error('Please check your input fields.');
      return;
    }

    const id = toast.loading('Please wait...');

    try {
      const response = await axios.post(url, {
        email: formValues.email,
        password: formValues.password,
      });

      // Assuming your server returns a status and a message
      if (response.status === 200) {
        toast.update(id, {
          render: response.data.msg, // Make sure your server returns the correct structure
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
        return;
      } else {
        toast.error('Error while creating account');
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        toast.update(id, {
          render: error.response.data.msg, // Assuming your server returns an error message
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
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
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
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
                Create an account
              </button>

              <p className='text-sm font-light text-gray-500'>
                Already have an account?{' '}
                <a
                  href='#'
                  className='font-medium text-primary-600 hover:underline'>
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
