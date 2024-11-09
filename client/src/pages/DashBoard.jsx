import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom'
import Dashsidebar from '../Components/Dashsidebar'
import Dashprofile from '../Components/Dashprofile';

export default function DashBoard() {
  const location = useLocation();
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      <div className='md:w-56'>

        <Dashsidebar/>

      </div>

      {tab=='profile' && <Dashprofile/>}

    </div>
  )
}
