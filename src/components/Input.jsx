import React, { forwardRef, useId } from 'react'

const Input = forwardRef( function Input(
    {
        type= "text",
        label,
        className="",
        ...props

    }, ref)
{
    const id = useId();
    return (
   <div>
    {label && (
        <label htmlFor="id" className='inline-block mb-1 pl-1'>{label}</label>
    )}
    <input 
    type={type}
    className={`w-full h-10 px-3 py-2 text-base text-gray-700 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${className}`} 
    ref ={ref}
    {...props} />
   </div>
    )
})

export default Input
