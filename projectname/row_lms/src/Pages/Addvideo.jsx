import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import prev from '../img/generic-image-file-icon-hi.png'


function Addvideo() {
  let {changemenu} = useContext(mainContext);
  const [coursesdata, setCoursesdata] = useState([]);
  console.log(coursesdata);

  const fetchCoursedata = async()=>{
   let courses = await fetch('http://localhost:5500/viewcoursetrue');
   courses =await courses.json();

   console.log(courses);

   if(courses.data)
   {
    setCoursesdata(courses.data);
   }
   else
   {
    alert(courses.messege);
   }
  };

  useEffect(()=>{
    fetchCoursedata();
  },[])
  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] pt-[20px] pb-[60px]  bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Video
        </h1>
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <form action="">
            Course Category
            <select name="coursescat" id="" className='w-full border my-3 border-gray-400 h-[50px]'>
              {
                coursesdata.map((course)=>(
                  <option value={course._id} className=''>{course.coursename}</option>
                ))
              }
             
            </select>
            Video Topic
            <input type="text" className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4 '  />
            Video Link
            <input type="text" className='border border-gray-400 w-full h-[50px] mb-3 mt-2 px-4'  />
           
            Video Stauts
            <div className='flex items-center mt-5  mb-8 gap-2'>
            <input type="radio" className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Active
            <input type="radio" className='mx-2 w-[20px] h-[20px] text-[20px]'  /> Deactive
            </div>
            
            <input type="submit" className='bg-[#4B49AC] mb-8 mt-7 text-[18px] px-8 py-2 rounded-[10px] text-white' />
            <input type="reset" value="Cancel" className='bg-[#F8F9FA] ml-4  text-[18px] px-8 py-2 rounded-[10px] text-black' />
          </form>
          </div>
        </div>
      <Footer/>
      </div>
    </div>

    </div>
  )
}

export default Addvideo