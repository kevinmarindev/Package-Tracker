import './app.scss';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Display from './components/Display'
import Header from './components/Header'
import AddNumber from './components/AddNumber'
import Auth from './Auth'
import Auth2 from './Auth2'
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
            element={
            <Auth2>
              <Home />
             </Auth2>
            }
          />
          <Route path='/login'
            element={
            <Auth2>
              <Login pullUserToApp={pullUserToApp}/>
            </Auth2>
          }
          />
          <Route path='/register'
            element={
              <Auth2>
                <Register pullUserToApp={pullUserToApp}/>
              </Auth2>  
          }
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
