import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import { updateFailure,updateStart,updateSuccess } from '../redux/user/userSlice';

export default function Dashsidebar() {
    const {currentUser} = useSelector(state=>state.user)
    const [imagefile,SetImageFile]=useState(null);
    const [imagefileurl,SetImageFileURL]=useState(null);
    const [formdata,setFormData]=useState({});
    const [updateusersuccess,setUpdateUserSuccess]=useState(null);
    const [updateerror,setUpdateError]=useState(null);
    const fileref=useRef();
    const dispatch=useDispatch();


    const uploadImage=async()=>{
      if(!imagefile){
        Alert("please select an image");
      }
      const formData=new FormData();
      formData.append('file', imagefile);
      formData.append('upload_preset', 'zsnl90ui');
      formData.append('cloud_name', 'dvcekjd26');

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dvcekjd26/image/upload",
            formData
        );
        SetImageFileURL(response.data.secure_url);
        setFormData({...formData,profilepicture:response.data.secure_url});
        console.log("Image uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
        Alert("Image upload failed. Please try again.");
    }
};
      const handlechange=(e)=>{
        setFormData({...formdata,[e.target.id]:e.target.value});
      }

    const handleImageChange=(e)=>{
      const file=e.target.files[0];
      if(file){
        SetImageFile(file);
        SetImageFileURL(URL.createObjectURL(file));
      }
    }
    useEffect(()=>{
      if(imagefile){
        uploadImage();
      }
    },[imagefile]
    )

    const handlesubmit=async(e)=>{
      e.preventDefault();
      setUpdateError(null);
      setUpdateUserSuccess(null);
      if(Object.keys(formdata).length===0){
        setUpdateError("no changes made")
        return;
      }
      try {
        dispatch(updateStart());
        const res=await fetch(`/api/user/update/${currentUser._id}`,{
          method:'PUT',
          headers:{
            'Content-type':"application/json",

          },
          body:JSON.stringify(formdata),
        }
      )
      const data=await res.json();
      if(!res){
        dispatch(updateFailure(data.message));
        setUpdateError(data.message)
      }
      else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("user profile updated");
      }
        
      } catch (error) {
        dispatch(updateFailure(error.message));
        
      }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={fileref} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shodow-md overflow-hidden rounder-full">
        <img src={imagefileurl || currentUser.profilepicture} alt="user" 
        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' onClick={()=>fileref.current.click()}   />
      </div>
      <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handlechange}></TextInput>
      <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handlechange}></TextInput>
      <TextInput type='password' id='password' placeholder='password' onChange={handlechange}></TextInput>
      <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateusersuccess &&(
        <Alert color='success' className='mt-5'>
          {updateusersuccess}
        </Alert>
      )}
      {updateerror &&(
        <Alert color='failure' className='mt-5'>
          {updateerror}
        </Alert>
      )}
      </div>
    )
}
