import React from 'react'
import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {getAuth,signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {app} from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const HandleGoogleClick=async ()=>{
        const auth=getAuth(app);
        const provider=new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try{
            const resultsFromGoogle=await signInWithPopup(auth,provider);
            const res=await fetch('api/auth/google',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    photo_url:resultsFromGoogle.user.photoURL,
                }),
            })
            const data=await res.json()
            if(res.ok){
                dispatch(signInSuccess(data.user));
                navigate('/Home');
            }
        }catch(error){
            return error;
        }
    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={HandleGoogleClick}>
    <AiFillGoogleCircle className='w-6 h-6 mr-2'/>Continue with Google
    </Button> 
  )
}
