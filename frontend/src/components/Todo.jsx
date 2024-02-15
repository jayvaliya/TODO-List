import React from 'react';

export default function Todo(props) {
  return (
    <div className='container p-2 mx-auto sm:p-4 text-left'>
      <h2 className='mb-4 text-2xl font-semibold leadi'>Tasks</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-xs table-auto'>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className='w-24' />
          </colgroup>
          <thead className=''>
            <tr className='text-left'>
              <th className='p-3'>Title</th>
              <th className='p-3'>Description</th>
              {/* <th className='p-3'>Due</th> */}
              <th className='p-3 text-right'>Status</th>
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
              {/* <td className='p-3'>
                <p>01 Feb 2022</p>
                <p className='dark:text-gray-400'>Tuesday</p>
              </td> */}
              <td className='p-3 text-right'>
                <button className='px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900'>
                  <span>Pending</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
