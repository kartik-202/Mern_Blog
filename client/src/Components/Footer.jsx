import { Footer } from 'flowbite-react'
import {Link} from 'react-router-dom'
import React from 'react'
import {BsFacebook,BsLinkedin,BsTwitter} from 'react-icons/bs'

export default function Footercomp() {
  return <Footer container className='border border-t-8 border-teal-400'>
    <div className='w-full max-w-7xl mx-auto'>
    <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
    <div className='mb-6 mt-5'>
     <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-lg' >Blog</span>
      </Link>
    </div>
    <div className='grid grid-cols-2 gap-8 md:mt-4 md:grid-cols-3 md:gap-6 '>
        <div>
        <Footer.Title title='about'/>
        <Footer.LinkGroup col>
            <Footer.Link href='https://www.youtube.com/watch?v=xvFZjo5PgG0'
            target='_black'
            rel='nooperner noreferrer'>
            Click me
            </Footer.Link>
        </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='Follow me'/>
        <Footer.LinkGroup col>
            <Footer.Link href='https://github.com/kartik-202'
            target='_black'
            rel='nooperner noreferrer'>
            Github
            </Footer.Link>
        </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title='Legal'/>
        <Footer.LinkGroup col>
            <Footer.Link href='#'
            target='_black'
            rel='nooperner noreferrer'>
            Privacy Policy
            </Footer.Link>
            <Footer.Link href='#'
            target='_black'
            rel='nooperner noreferrer'>
            Terms & Conditions
            </Footer.Link>
        </Footer.LinkGroup>
        </div>
    </div>
    </div>
    <Footer.Divider/>
    <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright href='#' by='Firespawn' year={new Date().getFullYear()}/>
        <div className='flex gap-6 sm:mt-2 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook}/> 
            <Footer.Icon href='#' icon={BsLinkedin}/> 
            <Footer.Icon href='#' icon={BsTwitter}/>    
        </div>
    </div>
    </div>

  </Footer>
}
