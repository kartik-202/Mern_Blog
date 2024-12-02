import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon,FaSun} from "react-icons/fa"; 
import {useSelector,useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/themes/themeslice';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {
  const {theme}=useSelector((state)=>state.theme);
  const {currentUser}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const path=useLocation().pathname;
  console.log(path);

  const handleSignout=async ()=>{
    try {
      const res=await fetch(`api/user/signout`,{
        method:'POST',
      })
      const data=res.json();
      if(!res.ok){
        console.log(data.message);
      }
      else{
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <Navbar className='border-b-2'>
      <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg' >Blog</span>
      </Link>
      <form action="">
        <TextInput type='text' placeholder='search...' rightIcon={AiOutlineSearch} className='hidden lg:inline'>
        </TextInput>
        </form>
        <Button className='hidden lg:inline w-12 h-10' color='gray' pill>
          <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
        <Button className='hidden sm:inline w-12 h-10' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          {theme==='light' ? <FaMoon/> : <FaSun/>}
        </Button>
        {currentUser ? (
          <Dropdown arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilepicture} rounded/>}>
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
        <Link to='/Sign-in'>
        <Button gradientDuoTone='purpleToBlue' color='gray' pill outline>
          Sign in
        </Button>
        </Link>
      )
    }
        <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path ==="/"} as={'div'}>
            <Link to='/'>
            Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/About"} as={'div'}>
            <Link to='/About'>
            About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path ==="/Projects"} as={'div'}>
            <Link to='/Projects'>
            Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>

    </Navbar>
  )
}
