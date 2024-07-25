import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-700 text-white flex justify-around items-center h-14'>
        <div className="logo font-bold text-2xl">
            <span className='text-green-700 '>&lt;</span>
            Pass
            <span className='text-green-700 '>OP/&gt;</span>
            </div>
        <ul className='flex gap-4 items-center text-lg '>
            <li className='hover:font-bold cursor-pointer'>Home</li>
            <li className='hover:font-bold cursor-pointer'>Contact</li>
            <li className='hover:font-bold cursor-pointer'>About</li>
        </ul>
    </nav>
  )
}

export default navbar
