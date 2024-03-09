import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import logout from '../../store/authslice'

const Logout = () => {
  const dispatch = useDispatch();
  const logouthandler = ()=>{
    authservice.logout().then(()=>{
      dispatch(logout());
    })
  }

  return (
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>logout</button>
  )
}

export default Logout
