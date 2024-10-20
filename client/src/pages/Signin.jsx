import { Alert, Button, Label, Spinner, Textarea, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInfailure,signInSuccess } from '../redux/user/userSlice';

export default function Signin() {
  const {loading,error:errorMessage}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const [formData,setFormData] = useState({}); 
  const navigate=useNavigate();

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); 
  };
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(!formData.email||!formData.password){
      return dispatch(signInfailure('please fill out all fields'));
    }
    try{
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(signInfailure(data.message));
      }
      if(res.ok){
        navigate('/Home'); 
      }
      
    }catch(error){
      dispatch(signInfailure(error.message));
    }
  }
  

  return (
    <div className='min-h-screen mt-20'>

    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      <div className="flex-1">
    <Link to="/" 
        className='self-center whitespace-nowrap text-sm sm:text-xl font-bold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-4xl text-white' >Blog</span>
      </Link>
      <div className='text-sm mt-5'>
      <p>
        Sign in here on this page 
      </p>
      </div>
    </div>
    

    <div className='flex-1'>
      <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className=''>
          <Label value='email' />
          <TextInput type='text' id='email' placeholder='email'onChange={handlechange} />
        </div>
        <div className=''>
          <Label value='password' />
          <TextInput type='text' id='password' placeholder='********'onChange={handlechange} />
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
          {
            loading ?(
              <>
              <Spinner size='sm'>
                <span className='pl-3'>
                  loading...
                </span>
              </Spinner>
              </>
             )
            :
          ('Sign in')
          }
          </Button>
      </form>
      <div className='flex gap-2 mt-5 text-sm'>
        <span className='font-semibold'>
          Don't have an account?
        </span>
        <Link to='/Signup' className='text-blue-500'>Sign up</Link>
      </div>
      {
        errorMessage&&(
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )
      }
    </div>
    </div>
    </div>
  )
}
