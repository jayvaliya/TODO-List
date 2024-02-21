import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Contact Dev', to: '/contact' },
    // Add more navigation items as needed
  ];

  return (
    <header className='bg-white shadow-lg'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='md:flex md:items-center md:gap-12'>
            <Link className='block text-blue-600' to='#'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                width='40'
                height='40'
                fill='currentColor'
                viewBox='0 0 64 64'>
                <path d='M32,6C17.641,6,6,17.641,6,32c0,14.359,11.641,26,26,26s26-11.641,26-26C58,17.641,46.359,6,32,6z M29,42L18,31l2-3l9,6 l13.957-12L46,25L29,42z'></path>
              </svg>
            </Link>
          </div>

          <div className='hidden md:block'>
            <nav aria-label='Global'>
              <ul className='flex items-center gap-6 text-base font-medium '>
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      className='text-gray-800 transition hover:text-gray-500'
                      to={item.to}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4 text-base'>
              <Link
                className='rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white shadow'
                to='/login'>
                Log in
              </Link>

              <div className='hidden sm:flex'>
                <Link
                  className='rounded-md bg-zinc-300 px-5 py-2.5 font-medium text-blue-600'
                  to='/signup'>
                  Sign up
                </Link>
              </div>
            </div>

            <div className='block md:hidden'>
              <button
                className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'
                onClick={toggleMobileMenu}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='md:hidden'>
          <nav aria-label='Global'>
            <ul className='flex flex-col items-center gap-6 text-base font-medium'>
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link
                    className='text-gray-500 transition hover:text-gray-500/75'
                    to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
