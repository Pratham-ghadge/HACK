import React, { useState } from 'react'
import Logins from '../assets/Logins.json'
import Lottie from 'lottie-react'
import NavBar from '../components/NavBar'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/Auth'
import {toast} from'react-toastify'

const Login = () => {
   const [user , setUser] = useState({
    email:"",
    password:""
   })

   const navigate = useNavigate();
   const {servertokenInLS} = useAuth();

    const handleInput = (e) => {
      console.log(e);
      const name = e.target.name;
      const value = e.target.value;
      setUser({
        ... user,
        [name]:value,
      })
    }
     const handleSubmit =  async (e) => {
      e.preventDefault();
      console.log(user);
      const response = await fetch(`http://localhost:2000/api/auth/login`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
      });
      console.log(response);
      const res_data = await response.json();
      if(response.ok){
       
       servertokenInLS(res_data.token);
       toast.success("Login successfully")
        setUser({email:"", password:""});
        navigate("/")
      }else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }
     }

  return ( 
   
    <div className='max-w-[1240px] mx-auto my-10  md:grid grid-cols-2  bg-slate-600'>
      
      <div className='  col-span-1  item-center  '>
        
       <form onSubmit={handleSubmit} className='mt-[35%]'>
       
            <div className='ml-20 mt-4'>
              <label htmlFor="email" className="block   text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInput}
                  autoComplete='off'
                  required
                  className="block w-[80%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className='ml-20 mt-4'>
              <label htmlFor="password" className="block   text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="passwors"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInput}
                  autoComplete='off'
                  required
                  className="block w-[80%] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <button type='submit' className='block mt-7 w-[80%] rounded-md border-0 py-1.5 text-white bg-[#66FCF1]'>LOGIN</button>

            </div>
       </form>
      </div>

      <div className=' col-span-1  w-[97%]'>
      <Lottie animationData={Logins}></Lottie>
      </div>
      
    </div>
    
   
  )
}

export default Login
