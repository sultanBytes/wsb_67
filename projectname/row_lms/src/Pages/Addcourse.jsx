import React, { useContext, useEffect, useState } from 'react'
import Header from '../Common/Header'
import Sidebar from '../Common/Sidebar'
import DashboardItems from '../Common/DashboardItems'
import Footer from '../Common/Footer'
import { mainContext } from '../Context'
import prev from '../img/generic-image-file-icon-hi.png';
import { useNavigate } from 'react-router';


import { useParams } from 'react-router'
// import AdminForms from '../Common/AdminForms'

function Addcourse() {
  const nav = useNavigate();
  let {changemenu} = useContext(mainContext);
  const [prevImg,setImgPrev] = useState('');
  const [courseData, setCourseData] = useState({});

  console.log(courseData);

  const {id} = useParams();
  console.log(id);

  const fetchCourseByid = async()=>{
    let res = await fetch(`http://localhost:5500/coursebyid/${id}`);
    res = await res.json();
    setCourseData(res.data);
    setImgPrev(res.data.courseimage);
  }

useEffect(()=>{
  if(id)
  {
    fetchCourseByid();
  }
},[]);



  const handleImgPrev = (e)=>{
    const reader = new FileReader();
    const file = e.target.files[0];

    // reader.onload = ()=>{
    //   setImagePreviewUrl(reader.result);
    // }

    if(file){
      reader.readAsDataURL(file);
      
    }

    reader.onload = ()=>{
      // console.log(reader);
      setImgPrev(reader.result);
    }
  };

  const formSubmitHandle = async(e)=>{
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    if(!id)
    {
      
    let response =await fetch('http://localhost:5500/addcourse',{
      method:'POST',
      body:data
    });

    response =await response.json();
    
    if(response.data)
    {
      nav('/viewcourse');
    }
    else
    {
      alert(response.messege);
    }
  }
  else
  {
    let response =await fetch(`http://localhost:5500/updatecourse/${id}`,{
      method:'PUT',
      body:data
    });
    response = await response.json();

    if(response.data){
      nav('/viewcourse')
    }

  }
    
  };

  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>

      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Courses
        </h1>
        <div className=''>
          <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <form action="" onSubmit={formSubmitHandle}>
            Courses Name
            <input type="text" value={courseData.coursename} onChange={(e)=> setCourseData({...courseData,coursename:e.target.value})} name='coursename' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Price
            <input type="text" onChange={(e)=> setCourseData({...courseData,courseprice:e.target.value})} value={courseData.courseprice} name='courseprice' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Duration
            <input type="text" onChange={(e)=> setCourseData({...courseData,courseduration:e.target.value})} value={courseData.courseduration} name='courseduration' className='border px-4 border-gray-400 w-full h-[50px] mb-3 mt-2 '  />
            Courses Description
            <textarea name="coursedes" id="" onChange={(e)=> setCourseData({...courseData,coursedes:e.target.value})} className='border px-4 pt-3 border-gray-400 my-2 w-full h-[100px]' value={courseData.coursedes} cols="30" rows="10"></textarea>
            <input type="file" id='file-input' name='image' onChange={handleImgPrev} className='border hidden border-gray-400 w-full h-[50px] mb-3 mt-2 '/>
            <div className='flex items-center gap-0 mt-[80px]'>
              <div className='w-full flex items-center'>
            <input type="text" name='image' readOnly placeholder='Upload File' className=' px-4 rounded-[10px_0px_0px_10px] border border-gray-400 w-[70%] h-[50px]' />
            <label id="file-input-label" for="file-input" className='border block  bg-[#4B49AC] text-white text-center leading-[50px]  w-[10%] rounded-[0px_20px_20px_0px] h-[50px]  '>Upload</label>
            </div>
            <div className=''>
              <img src={prevImg || prev} alt="" width={150} />
            </div>
            </div>
            Courses Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input name='cousrestatus' onChange={(e)=> setCourseData({...courseData,cousrestatus:e.target.value})} checked={courseData.cousrestatus} value={true} type="radio" className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Active
            <input name='cousrestatus' onChange={(e)=> setCourseData({...courseData,cousrestatus:e.target.value})} checked={courseData.cousrestatus !== true} value={false} type="radio" className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Deactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer className/>
      </div>
    </div>

    </div>
  )
}

export default Addcourse