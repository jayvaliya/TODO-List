import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*
  https://justdoit-x194.onrender.com
*/

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=' overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='signup' element={<SignUp />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='about' element={<About />}></Route>
      </Routes>
      {/* <Home/> */}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </div>
  );
}

export default App;
