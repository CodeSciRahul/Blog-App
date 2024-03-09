import { useId } from "react"
import React from 'react'

function Select({
    options,
    label,
    className="",
    ...props
},ref) {
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=""></label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
        >
            {options?.map((option)=>(
                <option 
                value={option}
                key={option.name}
                >
                {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)