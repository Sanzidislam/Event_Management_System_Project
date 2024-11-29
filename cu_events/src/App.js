import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
// import ShowEvents from './components/ShowEvents';
import CreateEvent from './components/CreateEvent/CreateEvent';
import RegisterEvent from './components/RegisterEvent';
import Navbar from './components/Navbar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoginPage from './components/Login/LoginPage';
import Profile from './components/Profile/Profile';

import ShowEvents from './components/showEvents/ShowEvents';
import Footer from './components/footer';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (<div>
      <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/show-events" element={<ShowEvents />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/register-event" element={<RegisterEvent />} />
        <Route path="/LoginPage" element ={<LoginPage  setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path='/Profile' element = {<Profile/>}/>
        <Route path='show-the-events' element = {<ShowEvents />}/>
      </Routes>
        {/* <Footer/> */}
    </Router>
    </div>

  );
};

export default App;
