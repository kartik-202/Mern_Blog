import { Button, Label, Textarea, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
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
        lsdmklcvfdjnd ajnlscdkhbjsdankjsmlk aklcsndjdfhbsnkjsadnjcdvbh kanldcvjdbhdvnkjdkcfvhbf
      </p>
      </div>
    </div>
    

    <div className='flex-1'>
      <form action="" className='flex flex-col gap-4'>
        <div className=''>
          <Label value='username' />
          <TextInput type='text' id='username' placeholder='username'/>
        </div>
        <div className=''>
          <Label value='email' />
          <TextInput type='text' id='email' placeholder='email'/>
        </div>
        <div className=''>
          <Label value='password' />
          <TextInput type='text' id='password' placeholder='password'/>
        </div>
        <Button gradientDuoTone='purpleToPink' type='submit'>Sign up</Button>
      </form>
      <div className='flex gap-2 mt-5 text-sm'>
        <span className='font-semibold'>
          have an account?
        </span>
        <Link to='/Signin' className='text-blue-500'>Sign in</Link>
      </div>
    </div>
    </div>
    </div>
  )
}
