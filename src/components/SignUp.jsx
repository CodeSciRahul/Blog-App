import React from 'react'
import { useState } from 'react'
import authservice from '../appwrite/auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login } from '../store/authslice'
import {Button, Input , Logo} from './index'
import { UseDispatch, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, seterror] = useState('')
    const {register, handleSubmit} = useForm()


    const create =async (data) =>{
      seterror("")
      try {
        const userdata = await authservice.createAccount(data)
        if(userdata)
        {
          const userdata = await authservice.getaccount()
          if(userdata)
          {
            dispatch(login(userdata))
            Navigate("/")
          }
        }
      } catch (error) {
        seterror(error.message);
      }
    }
  return (
    <div className='flex items-center justify-center'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
      <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px'>
                <Logo width="100%"/>
                </span>
      </div>
      <h2 className='text-center text-2xl font-bold leading-tight'>
                create an account
      </h2>
      <p className='mt-2 text-center text-base text-black/60'>
                Already have an account ? 
                <Link
                to="/login"
                className='font-medium text-primary transition-all duration-200 hover: underline'
                > Sign In</Link>
      </p>
      {error && <p className='text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md'>{error}</p> }

      <form onSubmit={handleSubmit(create)}>
        <div className='space-y-5'>

          <Input
          label = "full-name"
          placeholder = "Enter your full name"
          {...register("name", {
            required: true
          })}
          />

          <Input
          label = "Email"
          placeholder = "enter your email "
          type="email"
          {...register('email', {
            required: true,
            validate: {
              matchPattern: (value) => {
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/. test(value) || "Email address must be valid address"
              }
          }
          })}
          />

          <Input
          label = "password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: true,
          })}
          />

          <button 
          type='submit'
          className='w-full'
          >create an account
          </button>
        </div>
      </form>
      </div>

    </div>
  )
}

export default SignUp