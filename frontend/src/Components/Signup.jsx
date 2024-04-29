import React,{useState} from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [val, setval] = useState({username:"",email:"",password:""});
    const [buttonColorClass, setButtonColorClass] = useState('bg-blue-500');
   const handlesubmit=(event)=>{
    event.preventDefault();
    let r= fetch("https://signup-login-tau.vercel.app/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(val)
    }).then((res)=>{
      if(res.status===200){
        setButtonColorClass('bg-green-500');
        alert("Signed up successfully");
        
      }else{
        alert("Signup failed")
        setButtonColorClass('bg-red-500');

      }
    })
   }
  return (
    <>
    <h1 className=''>Sign Up</h1>
    <form action="/signup" method="post" className='flex gap-4  text-black' onSubmit={handlesubmit}>
    <input onChange={(event)=>setval({...val,username:event.target.value})} className='px-4 py-2 rounded-md outline-none' type="text" name="username" placeholder="Username"/>
    <input onChange={(event)=>setval({...val,email:event.target.value})} className='px-4 py-2 rounded-md outline-none' type="email" name="email" placeholder="Email"/>
    <input onChange={(event)=>setval({...val,password:event.target.value})} className='px-4 py-2 rounded-md outline-none' type="password" name="password" placeholder="Password"/>
    <input className={`px-4 py-2 bg-blue-500 text-white rounded-md ${buttonColorClass}`} type="submit" value="Signup"/>
    <button className={`px-4 py-2 bg-blue-500 text-white rounded-md`}>
      <Link to="/login">Login</Link>
    </button>
    </form>
    </>
  )
}

export default Signup