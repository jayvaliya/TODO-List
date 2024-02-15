import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=' overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='home' element={<Home />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='sighup' element={<SignUp />}></Route>
      </Routes>
      {/* <Home/> */}
    </div>
  );
}

export default App;
