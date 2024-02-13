import React from 'react';
import Todo from './Todo';

export default function TodoList() {
  const todos = [
    {
      title: 'go to gym',
      description: 'workout',
      completed: true,
    },
    {
      title: 'go to gym',
      description: 'workout',
      completed: false,
    },
    {
      title: 'go to gym',
      description: 'workout',
      completed: false,
    },
    {
      title: 'go to gym',
      description: 'workout',
      completed: true,
    },
  ];
  return (
    <div>
      {todos.map(function (item) {
        console.log(item);
        return <Todo
          title={item.title}
          description={item.description}
          completed={item.completed}
        />;
      })}
    </div>
  );
}
