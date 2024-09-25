
// eslint-disable-next-line no-unused-vars
import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-white py-3'>
      
    <div className="logo">
        <span className="font-bold text-xl mx-9">iTask</span>
    </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
      </ul>
    </nav>
  )
}

export default NavBar
