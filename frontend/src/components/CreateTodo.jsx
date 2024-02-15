import React from 'react';

export default function CreateTodo() {
  const styl = {
    padding: 10,
    margin: 10,
  };
  return (
    <>
      {/* <div className='relative py-3 sm:max-w-xl sm:mx-auto bg-slate-300'> */}
        {/* <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div> */}
        <div className='w-[600px] bg-zinc-300 relative px-4 py-10 border border-gray-300 text-black m-2 sm:rounded-xl sm:p-20'>
          <div className='max-w-md '>
            <div>
              <h1 className='text-2xl font-semibold'>
                Add new Todos
              </h1>
            </div>
            <div className='divide-y divide-gray-200'>
              <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
                <div className='relative border-2 border-x-0 border-t-0 border-gray-700'>
                  <input
                    autocomplete='off'
                    id='email'
                    name='email'
                    type='text'
                    className='peer placeholder-transparent bg-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Title'
                  />
                  <label
                    for='email'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                    Title
                  </label>
                </div>
                <div className='relative border-2 border-x-0 border-t-0 border-gray-700'>
                  <input
                    autocomplete='off'
                    id='password'
                    name='password'
                    type='password'
                    className='peer placeholder-transparent bg-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600'
                    placeholder='Description'
                  />
                  <label
                    for='password'
                    className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                    Description
                  </label>
                </div>
                <div className='relative'>
                  <button className='bg-blue-500 text-white rounded-md px-2 py-1'>
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
      
  );
}
