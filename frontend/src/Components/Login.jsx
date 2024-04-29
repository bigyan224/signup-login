import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Navbar from './Navbar'


const Login = () => {
    const [val, setval] = useState({email:"",password:""});
    const [buttonColorClass, setButtonColorClass] = useState('bg-blue-500');

    const handlesubmit=(e)=>{
        e.preventDefault();

        let r= fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(val),
        credentials:"include"
    }).then((res)=>{
        if(res.status===200){
            // alert("Login success");
            
        setButtonColorClass('bg-green-500');
        window.location="/profile"

        }
        else if(res.status===401){
            // alert("wrong email or password");
        setButtonColorClass('bg-red-500');

        }
        else{
            // alert("wrong password");
        setButtonColorClass('bg-red-500');

        }
        
    })
    }
    
  return (
    <>
    <Navbar></Navbar>
    <h1>Login</h1>
    <form action="/login" method="post" onSubmit={handlesubmit} className='flex gap-4 text-black'>
    <input onChange={()=>setval({...val,email:event.target.value})} className='px-4 py-2 rounded-md outline-none' type="email" name="email" placeholder="Email"/>
    <input onChange={()=>setval({...val,password:event.target.value})} className='px-4 py-2 rounded-md outline-none' type="password" name="password" placeholder="Password"/>
    <input className={`px-4 py-2 bg-blue-500 text-white rounded-md ${buttonColorClass}`} type="submit" value="Login"/>
    <button className= {`px-4 py-2 bg-blue-500 text-white rounded-md`}><Link to="/signup">Signup</Link></button>
    </form>
    </>
  )
}

export default Login