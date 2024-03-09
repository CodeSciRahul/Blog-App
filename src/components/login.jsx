import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as Storelogin} from '../store/authslice'
import {Button,Logo,Input} from './index'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
function login() {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit}=useForm()
    const [error, seterror] = useState('')

    const login = async(data)=>{
        seterror("")
        try {
            const session=await authservice.login(data)
            if(session)
            {
                const userdata = await authservice.getaccount()
                if(userdata)
                {
                    dispatch(Storelogin(userdata))
                    Navigate("/")
                }
            }
        } catch (error) {
            seterror(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl border border-black/10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px'>
                <Logo width="100%"/>
                </span>

            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Sign in to your account
            </h2>
            <p className='mt-2 text-center text-base text-black/60'>
                Don't have an account
                <Link
                to="/signup"
                className='font-medium text-primary transition-all duration-200 hover: underline'
                > Sign Up</Link>

            </p>
            {error && <p className='text-red-600 bg-red-100 border border-red-400 px-4 py-2 rounded-md'>{error}</p> }

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                <Input
                label= 'Email: '
                placeholder="Enter you email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPattern: (value) => {
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/. test(value) || "Email address must be valid address"
                        }
                    }
                })}
                />
                <Input
                label = "Password"
                type = "password"
                placeholder = "Enter your Password"
                {...register("password",{
                    required: true
                })}
                />
                <Button 
                type='submit' 
                className='w-full'
                >Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default login