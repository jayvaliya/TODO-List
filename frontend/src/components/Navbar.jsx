import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='px-4 py-2 bg-gray-950 text-white w-screen'>
      <div className='flex items-center justify-between'>
        <div className='flex shrink-0'>
          <Link aria-current='page' className='flex items-center' to='home'>
            logo
            <p className='sr-only'>Website Title</p>
          </Link>
        </div>
        <div className='hidden md:flex md:items-center md:justify-center md:gap-5'>
          <Link
            aria-current='page'
            className='inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200'
            to='home'>
            Home
          </Link>
          <Link
            className='inline-block rounded-lg px-2 py-1 text-sm font-medium transition-all duration-200'
            to ='about'>
            About
          </Link>
        </div>
        <div className='flex items-center justify-end gap-3'>
          <Link
            className='hidden items-center justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 sm:inline-flex'
            to='signup'>
            Sign Up
          </Link>
          <Link
            className='inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            to='login'>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
