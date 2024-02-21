import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  let navigate = useNavigate();
  // const notify = () => toast.error('This is notification.', { theme: 'dark' });
  // const url = 'https://justdoit-x194.onrender.com/user/signup';
  const url = 'https://justdoit-x194.onrender.com/user/signup';
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Signup logic
  const onSignup = async (e) => {
    e.preventDefault();

    if (
      !formValues.email ||
      !formValues.password ||
      formValues.password !== formValues.confirmPassword
    ) {
      toast.error('Please check your input fields');
      return;
    }

    const id = toast.loading('Please wait...');

    try {
      const response = await axios.post(url, {
        email: formValues.email,
        password: formValues.password,
      });

      if (response.status === 200) {
        toast.update(id, {
          render: response.data.msg,
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
        localStorage.setItem('token', response.data.token);
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
        toast.update(id, {
          render: 'Surver is not responding',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.update(id, {
          render: 'Error setting up the request.', // Assuming your server returns an error message
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
  };

  // function to set input feilds
  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues)
  };

  return (
    <section className='bg-gray-50 text-black'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link
          to='/signup'
          className='flex items-center gap-3 mb-6 text-2xl font-semibold text-gray-900'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className=' text-blue-600'
            x='0px'
            y='0px'
            width='40'
            height='40'
            fill='currentColor'
            viewBox='0 0 64 64'>
            <path d='M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29,42L18,31l2-3l9,6 l13.957-12L46,25L29,42z'></path>
          </svg>
          <span>Sign up to MustDoIt</span>
        </Link>
        <div className='w-full bg-white rounded-lg shadow-lg shadow-gray-400 md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Create New Account
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Your email
                </label>
                <input
                  autoComplete='on'
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
              <div>
                <label
                  htmlFor='confirm-password'
                  className='block mb-2 text-sm font-medium text-gray-900'>
                  Confirm password
                </label>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirm-password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required=''
                  onChange={handleChange}
                  value={formValues.confirmPassword}
                />
              </div>
              <button
                onClick={onSignup}
                className='w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none bg-blue-600 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Create an account
              </button>

              <p className='text-sm font-light text-gray-500'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='font-medium text-primary-600 hover:underline'>
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
