import './app.scss';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Display from './components/Display'
import Header from './components/Header'
import AddNumber from './components/AddNumber'
import Auth from './Auth'
import md5 from 'md5'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
// import { useEffect } from 'react'
// import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
//testing this bee
//other test

function App() {
  // let hash = `${{"area_show":1,"carrier_id":"ups","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"1ZX2Y0680307303169"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e}}`
  
  // let carrier 
  // let trackingNum
  // let obj = `{"area_show":1,"carrier_id":"${carrier}","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"${trackingNum}"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e`

  // let comb = `${obj}${keySecret}`
  let carrier = 'usps'
  let tracknum = '9400108205499345157824'

  // console.log(carrier)
  
  // console.log(md5(comb).toUpperCase())
  // const encrypIt = () => {
  //       const obj2Encrypt = `{"area_show":1,"carrier_id":"${carrier}","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"${tracknum}"}sovUoovfRIZI7116b865c79955714c2b86e50213afc3f84e`;
  //       retunmd5(obj2Encrypt).toUpperCase()
  //   }

  // encrypIt()

  // console.log(md5({"area_show":1,"carrier_id":"ups","order":"desc","phone":"","ship_from":"","ship_to":"","tracking_number":"1ZX2Y0680307303169"}))


  // const [user, setUser] = useState('')
  //------------------------------END STATE---------------------------------------//
  // const userLoggedIn = useRef('')
  console.log(sessionStorage.getItem('user'))
  const pullUserToApp = (dataIn) => {
    console.log(dataIn)
    let parseData = JSON.stringify(dataIn)
    // userLoggedIn.current = dataIn
    sessionStorage.setItem('user', parseData)
    
  }

  
  

  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='/'
          element={<Home />}
        />
        <Route path='/login'
          element={<Login pullUserToApp={pullUserToApp}/>}
        />
        <Route path='/register'
          element={<Register pullUserToApp={pullUserToApp}/>}
        />
        <Route path='/in'
          element={
            <Auth sendTo='/'>
              <Display />
            </Auth>
          }
        />
        <Route path='/addnum'
          element={
            <Auth sendTo='/'>
              <AddNumber />
            </Auth>
          }
        />
        <Route path='*' element={<Navigate to={'/'}/>}></Route>
      </Routes>
    </Router>
  );
}



export default App;
