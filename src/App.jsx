import './App.css'
import { useDispatch} from 'react-redux';
import { login,logout } from './store/authslice';
import { useState,useEffect } from 'react';
import authservice from './appwrite/auth';
import {Header, Footer} from './components/index'
function App() {
  const [loading, setloading] = useState(true)
  const dispatch=useDispatch();
  useEffect(() => {
   authservice.getaccount()
              .then((userdata)=>{
                if(userdata)
                {
                  dispatch(login({userdata}))
                }
                else{
                  dispatch(logout())
                }
              })
              .catch((error)=>{
                console.log(error)
              })
              .finally(()=>setloading(false))
    
  }, [])
  

  console.log(import.meta.env.VITE_APPWRITE_URL);
  return !loading ? 
  ( <div>
    <Header/>
    <main>

    </main>
    <Footer/>
  </div>
    ) 
    : (null)
}

export default App
