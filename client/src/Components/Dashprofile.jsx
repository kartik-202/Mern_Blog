import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import axios from "axios";

export default function Dashsidebar() {
    const {currentUser} = useSelector(state=>state.user)
    const [imagefile,SetImageFile]=useState(null);
    const [imagefileurl,SetImageFileURL]=useState(null);
    const fileref=useRef();
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
        console.log("Image uploaded successfully!");
    } catch (error) {
        console.error("Upload failed:", error);
        Alert("Image upload failed. Please try again.");
    }
};

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

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={fileref} hidden/>
        <div className="w-32 h-32 self-center cursor-pointer shodow-md overflow-hidden rounder-full">
        <img src={imagefileurl || currentUser.profilepicture} alt="user" 
        className='rounded-full w-full h-full object-cover border-8 border-[lightgray]' onClick={()=>fileref.current.click()}   />
      </div>
      <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}></TextInput>
      <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}></TextInput>
      <TextInput type='password' id='password' placeholder='password'></TextInput>
      <Button type='submit' gradientDuoTone='purpleToBlue'>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>

      </div>
    )
}
