import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  const logout=()=>{
    fetch ("http://localhost:3000/logout",{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-type":"application/json"
      }
  })
}
  return (
    <div className='p-4 bg-zinc-500 w-full h-20'>
        <div className="flex w-full items-center justify-center gap-4">
      
      <buttton className={`px-4 py-2 bg-blue-500 text-white rounded-md `}><Link to="/login">Login</Link></buttton>
      <buttton className={`px-4 py-2 bg-green-500 text-white rounded-md `}><Link to="/profile">Profile</Link></buttton>
      
        <buttton onClick={logout} className={`px-4 py-2 bg-red-500 text-white rounded-md `}><Link to="/">Logout</Link></buttton>
        
        </div>

            
    </div>
  )
}

export default Navbar