import React from 'react'
import { useState,useEffect } from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}){
    const Navigate = useNavigate();
    const [loader, setloader] = useState(true)
    const authstatus = useSelector(state=> state.auth.status)

    useEffect(() => {
        //TODO: make it more easy
        if(authentication && authstatus!==authentication)
        {
            Navigate("/login")
        }
        else if(!authentication && authstatus!==authentication)
        {
            Navigate("/")
        }
        setloader(false)
    }, [authstatus, Navigate, authentication])
    
  return (
   loader ? <h1>Loading...</h1>: <>{children}</>
  )
}