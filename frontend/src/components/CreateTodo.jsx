import React from 'react';

export default function CreateTodo() {
  const styl = {
    padding: 10,
    margin: 10,
  };
  return (
    <div>
      <input
        style={{ padding: 10, margin: 10 }}
        type='text'
        placeholder='title'
      />
      <br />

      <input
        style={{ padding: 10, margin: 10 }}
        type='text'
        placeholder='descrription'
      />
      <br />

      <button style={{ padding: 10, margin: 10 }}>Add a todo</button>
    </div>
  );
}
