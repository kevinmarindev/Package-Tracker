import './app.scss';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Display from './components/Display'
import Header from './components/Header'
import AddNumber from './components/AddNumber'
import Auth from './Auth'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'



function App() {

  console.log(sessionStorage.getItem('user'))
  const pullUserToApp = (dataIn) => {
    console.log(dataIn)
    let parseData = JSON.stringify(dataIn)
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
