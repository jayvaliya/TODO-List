import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function TodoList(props) {
  const navigate = useNavigate();
  const { fetchTodos, todos } = props;

  useEffect(() => {
    // console.log(typeof localStorage.getItem('token'));
    if (!localStorage.token) {
      navigate('/login');
    }
    fetchTodos();
  }, []);

  const onDone = async (id) => {
    // console.log(id);
    const responce = await axios.post(
      'https://justdoit-x194.onrender.com/user/completed',
      { id: id },
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    // console.log(responce);
    if (responce.status != 200) {
      toast.error(responce.data.msg);
    }
    fetchTodos();
  };

  const onDelete = async (id) => {
    // console.log("deleted......")
    const responce = await axios.post(
      'https://justdoit-x194.onrender.com/user/delete',
      { id: id },
      {
        headers: {
          authorization: localStorage.getItem('token'),
        },
      }
    );
    // console.log(responce);
    if (responce.status != 200) {
      toast.error(responce.data.msg);
    }
    fetchTodos();
  };

  return (
    <div className='container xl:max-w-[90vw] lg:min-w-[60vw] m-2 sm:p-4 text-left overflow-y-auto mb-14'>
      <h2 className='mb-4 text-3xl font-semibold leading'>Tasks</h2>
      <div className='overflow-x-auto'>
        {todos.length > 0 ? (
          <table className='min-w-full text-base sm:text-lg table-auto bg-gray-200 rounded-xl overflow-hidden'>
            <colgroup>
              <col span='1' className='w-[20%] border-r-2 border-gray-400' />
              <col span='1' className='w-[60%] border-r-2 border-gray-400' />
              <col span='2' className='w-[20%]' />
            </colgroup>
            <thead className='bg-gray-400 text-base'>
              <tr className='text-left'>
                <th className='p-3'>Title</th>
                <th className='p-3'>Description</th>
                <th className='p-3 text-center'>Status</th>
                <th className='p-3 text-center'></th>
              </tr>
            </thead>
            <tbody className='overflow-y-auto'>
              {todos.map((item) => (
                <tr
                  className='my-1 size-fit border-b rounded-2xl text-base hover:bg-gray-300'
                  key={item._id}>
                  <td className='p-3 font-medium'>{item.title}</td>
                  <td className='p-3'>{item.description}</td>
                  <td className='p-3 text-center'>
                    <button
                      onClick={() => onDone(item._id)}
                      className={`px-3 py-2 font-medium ${
                        item.done ? 'bg-green-400' : 'bg-red-500'
                      } rounded-md text-black`}>
                      {item.done ? 'Done' : '!Done'}
                    </button>
                  </td>
                  <td className='p-3'>
                    <div
                      className='cursor-pointer'
                      onClick={() => onDelete(item._id)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 64 64'
                        width='28'
                        height='28'>
                        <path d='M28 7C25.243 7 23 9.243 23 12L23 15L13 15C11.896 15 11 15.896 11 17C11 18.104 11.896 19 13 19L15.109375 19L16.792969 49.332031C16.970969 52.510031 19.600203 55 22.783203 55L41.216797 55C44.398797 55 47.029031 52.510031 47.207031 49.332031L48.890625 19L51 19C52.104 19 53 18.104 53 17C53 15.896 52.104 15 51 15L41 15L41 12C41 9.243 38.757 7 36 7L28 7zM28 11L36 11C36.552 11 37 11.449 37 12L37 15L27 15L27 12C27 11.449 27.448 11 28 11zM19.113281 19L44.886719 19L43.212891 49.109375C43.153891 50.169375 42.277797 51 41.216797 51L22.783203 51C21.723203 51 20.846109 50.170328 20.787109 49.111328L19.113281 19zM32 23.25C31.033 23.25 30.25 24.034 30.25 25L30.25 45C30.25 45.966 31.033 46.75 32 46.75C32.967 46.75 33.75 45.966 33.75 45L33.75 25C33.75 24.034 32.967 23.25 32 23.25zM24.642578 23.251953C23.677578 23.285953 22.922078 24.094547 22.955078 25.060547L23.652344 45.146484C23.685344 46.091484 24.462391 46.835938 25.400391 46.835938C25.421391 46.835938 25.441891 46.835938 25.462891 46.835938C26.427891 46.801938 27.183391 45.991391 27.150391 45.025391L26.453125 24.939453C26.419125 23.974453 25.606578 23.228953 24.642578 23.251953zM39.355469 23.251953C38.388469 23.224953 37.580875 23.974453 37.546875 24.939453L36.849609 45.025391C36.815609 45.991391 37.571109 46.801938 38.537109 46.835938C38.558109 46.836938 38.578609 46.835938 38.599609 46.835938C39.537609 46.835938 40.314656 46.091484 40.347656 45.146484L41.044922 25.060547C41.078922 24.094547 40.321469 23.285953 39.355469 23.251953z'></path>
                      </svg>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-xl font-semibold text-gray-600">No todos yet.</h1>
        )}
      </div>
    </div>
  );
}
