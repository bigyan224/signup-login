import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup'
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Home from "./Components/Home"

const App = () => {
  return (
    <div className='bg-zinc-800 h-screen w-full text-white'>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  )
  
}

export default App
