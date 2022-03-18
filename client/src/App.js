import './app.scss';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Display from './components/Display'
import Auth from './Auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { useEffect } from 'react'
// import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function App() {
  
  //------------------------------END STATE---------------------------------------//

  const pullUserToAppCompo = (dataIn) => {
    console.log(dataIn)
    setUser(true)
  }

  console.log(user)

  return (
    <Router>
      <Routes>
        <Route path='/'
          element={<Home />}
        />
        <Route path='/login'
          element={<Login />}
        />
        <Route path='/register'
          element={<Register pullUserToAppCompo={pullUserToAppCompo}></Register>}
        />
        <Route path='/in'
          element={
            <Auth sendTo='/in'>
              <Display />
            </Auth>
          }
        />
        <Route path='*' element={<h1>Hey there you need to be logged in to see this</h1>}></Route>
      </Routes>
    </Router>
  );
}



export default App;
