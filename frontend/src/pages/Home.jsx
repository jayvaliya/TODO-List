import React from 'react';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import Todo from '../components/Todo';

export default function Home() {
  return (
    <div className='xl:flex md bg-zinc-400 h-screen w-screen overflow-hidden'>
      <div>
        <CreateTodo />
      </div>
      <TodoList />
      {/* <Todo/> */}

    </div>
  );
}
