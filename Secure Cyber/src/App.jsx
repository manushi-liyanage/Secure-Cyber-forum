import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp'
import "./Styles/SignIn.css"
import "./Styles/SignUp.css"
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import Navbar from './Components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn setUser={setUser}/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/navbar' element={<Navbar/>}/>
      </Routes>
    </Router>
  )

}


export default App
