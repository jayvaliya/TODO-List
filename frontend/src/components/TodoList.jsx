import React from 'react';
import { useState, useEffect } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState();
  const getTodos = async () => {
    
  }
  useEffect(() => {
    
  });
  return (
    <div className='container p-2 mx-auto sm:p-4 text-left'>
      <h2 className='mb-4 text-2xl font-semibold leadi'>Tasks</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-xs table-auto'>
          <thead className=''>
            <tr className='text-left'>
              <th className='p-3'>Title</th>
              <th className='p-3'>Description</th>
              <th className='p-3 text-center'>Status</th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto'>


            <tr className='border-b border-opacity-20 '>
              <td className='p-3'>
                <p>97412378923</p>
              </td>
              <td className='p-3'>
                <p>Microsoft Corporation</p>
              </td>
              <td className='p-3 text-center'>
                  <button className='px-3 py-2 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900'>Pending</button>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </div>
  );
}
