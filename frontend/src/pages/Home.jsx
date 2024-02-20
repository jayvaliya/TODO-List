import React, { useState } from 'react';
import axios from 'axios';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import { Link, useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();


  const [todos, setTodos] = useState([]);
  // const authorization = localStorage.getItem('token');

  const fetchTodos = async () => {
    const responce = await axios.get('http://localhost:3000/user/todo', {
      headers: {
        // authorization: localStorage.getItem('token'),
        authorization: "eyJhbGciOiJIUzI1NiJ9.dmFsaXlhamF5NTU1QGdtYWlsLmNvbQ.IuOoaph998r2KCbXoay7ITSl-Z8AMGOBkr61_10e4zc",
      },
    });

    await setTodos(responce.data['todos']);
    console.log(todos);
  };
  // useEffect(()=>{
  //   if(localStorage.token);
  // },[]);

  return (
    <div className='xl:flex md h-screen w-screen overflow-y-auto'>
      <div>
        <CreateTodo fetchTodos={fetchTodos}/>
      </div>
      <TodoList fetchTodos={fetchTodos} todos={todos} />
      {/* <Todo/> */}
      
    </div>
  );
}
