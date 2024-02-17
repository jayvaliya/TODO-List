import React from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  // const notify = () => toast.error('This is notification.', { theme: 'dark' });
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSignup = async () => {
    if(formValues.email==''){
      toast.error("Plese enter email");
      return;
    }
    if (formValues.password=='' || formValues.password != formValues.confirmPassword ) {
      toast.error("Password dosen't match");
      return;
    }
    const id = toast.info('Please wait...');

    // const responce = axios.get('/users', {
    //   headers: formValues,
    // });

    toast.update(id, {
      render: 'Account created successfully',
      type: 'success',
      isLoading: false,
    });
  };



  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues)
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
              Create and account
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
                type='submit'
                onClick={onSignup}
                className='w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none bg-sky-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
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
