import { useState } from 'react';
import './App.css';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <CreateTodo />
      <TodoList/>
    </div>
  );
}

export default App;
