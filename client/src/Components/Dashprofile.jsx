import { Alert, Button, Modal, ModalHeader, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import { updateFailure,updateStart,updateSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutSuccess} from '../redux/user/userSlice';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function Dashsidebar() {
    const {currentUser,error} = useSelector(state=>state.user)
    const [imagefile,SetImageFile]=useState(null);
    const [imagefileurl,SetImageFileURL]=useState(null);
    const [formdata,setFormData]=useState({});
    const [updateusersuccess,setUpdateUserSuccess]=useState(null);
    const [updateerror,setUpdateError]=useState(null);
    const [showModal,setShowModal]=useState(false);
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
      console.log('Current User :', currentUser);
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

    const handledeleteUser=async()=>{
        setShowModal(false);
        try {
          dispatch(deleteUserStart());
          const res = await fetch(`/api/user/delete/${currentUser._id}`, {
            method: 'DELETE',
            
          });
          const data=await res.json();
          if(!res.ok){
            dispatch(deleteUserFailure(data.message));

          }else{
            dispatch(deleteUserSuccess(data));
          }
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
    }

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
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
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
      {error &&(
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}


      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size="md">
        
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
            <h3 className='mb-3 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account??</h3>
          
          <div className='flex justify-center gap-4'>
          <Button color='failure' onClick={handledeleteUser}>Yes,I want to delete my account</Button>
          <Button onClick={()=>setShowModal(false)} >No,take me back</Button>
          </div>
          
          </div>
        </Modal.Body>

      </Modal>
      </div>
    )
}
