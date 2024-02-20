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
      'http://localhost:3000/user/completed',
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
      'http://localhost:3000/user/delete',
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
      <h2 className='mb-4 text-2xl font-semibold leadi'>Tasks</h2>
      <div className='overflow-x-auto'>
        {(todos.length) > 0 ? (
          <table className='min-w-full text-xs table-auto bg-zinc-200 rounded-xl overflow-hidden'>
            <colgroup>
              <col span='1' className='w-[20%]' />
              <col span='1' className='w-[60%]' />
              <col span='2' className='w-[20%]' />
              {/* <col span='1' className='w-[10%]' /> */}
            </colgroup>
            <thead className=' bg-zinc-400'>
              <tr className='text-left'>
                <th className='p-3'>Title</th>
                <th className='p-3'>Description</th>
                <th className='p-3 text-center'>Status</th>
                <th className='p-3 text-center'></th>
              </tr>
            </thead>
            <tbody className='overflow-y-auto'>
              {todos &&
                todos.map((item) => {
                  // add star *******
                  return (
                    <tr
                      className='my-1 size-fit border-b rounded-2xl text-sm sm:text-base md:text-lg hover:bg-zinc-300'
                      key={item._id}>
                      <td className='p-3'>
                        <div className=' font-medium'>{item.title}</div>
                      </td>
                      <td className='p-3'>
                        <p>{item.description}</p>
                      </td>
                      <td className=' items-center justify-betwee p-3 text-center'>
                        <button
                          onClick={() => {
                            onDone(item._id);
                          }}
                          className={`px-3 py-2 font-semibold ${
                            item.done ? 'bg-green-400' : 'bg-red-500'
                          } rounded-md dark:text-gray-900 md:whitespace-nowr`}>
                          {item.done ? 'Done' : '!Done'}
                        </button>
                      </td>
                      <td className='p-3'>
                        {/* <div className=' text-xl font-bold'>X</div> */}
                        <div
                          className='cursor-pointer'
                          onClick={() => {
                            onDelete(item._id);
                          }}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            x='0px'
                            y='0px'
                            width='28'
                            height='28'
                            viewBox='0 0 64 64'>
                            <path d='M 28 7 C 25.243 7 23 9.243 23 12 L 23 15 L 13 15 C 11.896 15 11 15.896 11 17 C 11 18.104 11.896 19 13 19 L 15.109375 19 L 16.792969 49.332031 C 16.970969 52.510031 19.600203 55 22.783203 55 L 41.216797 55 C 44.398797 55 47.029031 52.510031 47.207031 49.332031 L 48.890625 19 L 51 19 C 52.104 19 53 18.104 53 17 C 53 15.896 52.104 15 51 15 L 41 15 L 41 12 C 41 9.243 38.757 7 36 7 L 28 7 z M 28 11 L 36 11 C 36.552 11 37 11.449 37 12 L 37 15 L 27 15 L 27 12 C 27 11.449 27.448 11 28 11 z M 19.113281 19 L 44.886719 19 L 43.212891 49.109375 C 43.153891 50.169375 42.277797 51 41.216797 51 L 22.783203 51 C 21.723203 51 20.846109 50.170328 20.787109 49.111328 L 19.113281 19 z M 32 23.25 C 31.033 23.25 30.25 24.034 30.25 25 L 30.25 45 C 30.25 45.966 31.033 46.75 32 46.75 C 32.967 46.75 33.75 45.966 33.75 45 L 33.75 25 C 33.75 24.034 32.967 23.25 32 23.25 z M 24.642578 23.251953 C 23.677578 23.285953 22.922078 24.094547 22.955078 25.060547 L 23.652344 45.146484 C 23.685344 46.091484 24.462391 46.835938 25.400391 46.835938 C 25.421391 46.835938 25.441891 46.835938 25.462891 46.835938 C 26.427891 46.801938 27.183391 45.991391 27.150391 45.025391 L 26.453125 24.939453 C 26.419125 23.974453 25.606578 23.228953 24.642578 23.251953 z M 39.355469 23.251953 C 38.388469 23.224953 37.580875 23.974453 37.546875 24.939453 L 36.849609 45.025391 C 36.815609 45.991391 37.571109 46.801938 38.537109 46.835938 C 38.558109 46.836938 38.578609 46.835938 38.599609 46.835938 C 39.537609 46.835938 40.314656 46.091484 40.347656 45.146484 L 41.044922 25.060547 C 41.078922 24.094547 40.321469 23.285953 39.355469 23.251953 z'></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (<h1>No todos yet.</h1>)}
      </div>
    </div>
  );
}
