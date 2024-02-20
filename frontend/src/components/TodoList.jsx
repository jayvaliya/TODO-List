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
    <div className='container md:mx-auto lg:max-w-[70vw] m-2 sm:p-4 text-left overflow-y-auto'>
      <h2 className='mb-4 text-2xl font-semibold leadi'>Tasks</h2>
      <div className='overflow-x-auto'>
        {(todos && (
          <table className='min-w-full text-xs table-auto bg-zinc-200 rounded-xl overflow-hidden'>
            <colgroup>
              <col span='1' className='w-[20%]' />
              <col span='1' className='w-[50%]' />
              <col span='1' className='w-[20%]' />
              <col span='1' className='w-[10%]' />
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
                        <div>{item.title}</div>
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
                          {item.done ? 'Done' : 'Not Done'}
                        </button>
                      </td>
                      <td className='p-3'>
                        {/* <div className=' text-xl font-bold'>X</div> */}
                        <div
                          className='hover:cursor-alias'
                          onClick={() => {
                            onDelete(item._id);
                          }}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            x='0px'
                            y='0px'
                            width='25'
                            height='25'
                            viewBox='0 0 24 24'>
                            <path d='M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z'></path>
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )) || <h1>No todos yet.</h1>}
      </div>
    </div>
  );
}
