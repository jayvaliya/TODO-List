import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateTodo(props) {
  const { fetchTodos, setTodos } = props;
  const url = 'http://localhost:3000/user/todo';
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
  });

  const onAdd = async (e) => {
    e.preventDefault();
    if (!formValues.title || !formValues.description) {
      toast.error('Please enter title and description');
      return;
    }

    // const id = toast.loading('Please wait...');

    try {
      const responce = await axios.post(
        url,
        {
          title: formValues.title,
          description: formValues.description,
        },
        {
          headers: {
            authorization: localStorage.getItem('token'),
          },
        }
      );
      if (responce.status==200) {
        setFormValues({
          title: '',
          description: '',
        });
      }
      // console.log(responce);
      // toast.update(id, {
      //   render: responce.data.msg,
      //   type: responce.status == 200 ? 'success' : 'error',
      //   isLoading: false,
      //   autoClose: 800,
      // });
    } catch (error) {
      console.error(error);

      if (error.responce) {
        toast.update(id, {
          render: error.responce.data.msg,
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else if (error.request) {
        // toast.error('No responce received from the server.');
        toast.update(id, {
          render: 'No responce received from the server',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        // toast.error('Error setting up the request');
        toast.update(id, {
          render: 'Error setting up the request',
          type: 'error',
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
    fetchTodos();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  return (
    <>
      <div className=' max-w-xl md:min-w-[500px] bg-white shadow-lg my-7 shadow-gray-400 relative px-7 py-10 border border-gray-300 text-black m-2 rounded-xl sm:p-16 overflow-hidden'>
        <div>
          <h1 className='text-2xl font-semibold whitespace-nowrap'>Add new Todos</h1>
        </div>
        <div className='divide-y divide-gray-200'>
          <div className='py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7'>
            <div className='relative border-2 border-x-0 border-t-0 border-gray-700'>
              <input
                autoComplete='off'
                id='title'
                name='title'
                type='text'
                className='peer placeholder-transparent bg-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600'
                placeholder='Title'
                onChange={handleChange}
                value={formValues.title}
              />
              <label
                htmlFor='title'
                className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                Title
              </label>
            </div>
            <div className='relative border-2 border-x-0 border-t-0 border-gray-700'>
              <input
                autoComplete='off'
                id='description'
                name='description'
                type='description'
                className='peer placeholder-transparent bg-transparent h-10 w-full text-gray-900 focus:outline-none focus:borer-rose-600'
                placeholder='Description'
                onChange={handleChange}
                value={formValues.description}
              />
              <label
                htmlFor='description'
                className='absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'>
                Description
              </label>
            </div>
            <div className='relative'>
              <button
                className='bg-blue-500 text-white rounded-md px-2 py-1'
                onClick={onAdd} >
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
