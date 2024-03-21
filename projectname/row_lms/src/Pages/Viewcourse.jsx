import React, { useContext, useEffect, useState } from 'react'
import { mainContext } from '../Context';
import Header from '../Common/Header';
import Sidebar from '../Common/Sidebar';
import Footer from '../Common/Footer';
import { useNavigate } from 'react-router';
// import { Cookie } from '@mui/icons-material';
import Cookies from  "js-cookie";
function Viewcourse() {

  const nav = useNavigate();
  let {changemenu} = useContext(mainContext);
  const [coursesdata, setCoursesdata] = useState([]);
  const [selectedData,setSelectedData] = useState([]);
  const [isAllchecked,setIsallchecked] = useState(false);
  // console.log(selectedData);

  const [searchValue, setSearchValue] = useState('');

  const fetchCoursedata = async()=>{

  const tokenAuth = Cookies.get('token');

  console.log(tokenAuth);

   let courses = await fetch('http://localhost:5500/viewcourse',{
    method:'GET',
    headers:{
      'Authorization': `Bearer ${tokenAuth}`
    }
   });
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


  const handleStatus = async(e)=>{
    const id = e.target.value
    const status = e.target.textContent;

    const newStatus = status !== 'Active';

    console.log(id, newStatus);

   try{
    const res = await fetch(`http://localhost:5500/changecoursestatus/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({newstatus:newStatus})
    });
    // const data = await res.json();
    // console.log(data);
    fetchCoursedata();
   }
   catch(err)
   {
    console.log(err);
    alert('Something went wrong');
   }
    
  };

  const handleUpdateRoute = (e)=>{
   const id =  e.target.value;

   nav(`/addcourse/${id}`);
  }

  const checkDataSelect = (e)=>{
    const selectedId = e.target.value;

    const ifChecked = e.target.checked;

    if(ifChecked)
    {
      setSelectedData([...selectedData,selectedId]);
    }
    else
    {
      setSelectedData(selectedData.filter((item)=> item!==selectedId));
    }
   
  };

  const handleAllcheck = (e)=>{
    const idAllcChecked =  e.target.checked;
    setIsallchecked(idAllcChecked);


    let newDataArr = [];

    if(idAllcChecked){
      coursesdata.forEach((item)=>{
        newDataArr.push(item._id);
      })

      setSelectedData(newDataArr);
    }
    else
    {
      setSelectedData([]);
    }
  };

  const deleteMultiData = async()=>{

    if(!window.confirm('Are you sure to remove?')) return;
    console.log('hello');
      let response = await fetch('http://localhost:5500/multipledelete',{
        method:'DELETE',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ids:selectedData})
      });

      response = await response.json();

      console.log(response);
      if(response.data)
      {
        fetchCoursedata();
      }
      else
      {
        alert('Something went wrong');
      }
  };

  const handleSearch = async(e)=>{
    const sVal = e.target.value;
    setSearchValue(sVal);

    if(!sVal){
      fetchCoursedata();
    }
    else
    {
      let response = await fetch(`http://localhost:5500/searchcourse/${sVal}`);
      response = await response.json();

      if(response.data)
      {
        setCoursesdata(response.data);
      }
    }
    
  }
 
  return (
    <div>

<Header/>
    
    <div className='flex  bg-[#F5F7FF]'>
      <Sidebar/>
      
      <div className={` ${changemenu==true ? 'w-[95%]':'w-[84%]'} relative px-[30px] py-[50px] bg-[#F5F7FF]`}>

        <h1 className='text-[25px] font-[500] mb-[10px]'>
        Course Table
        </h1>
        <input type="text" value={searchValue} onChange={handleSearch} className='border w-75 py-2 px-4' name="" id="" />
        <div className=''>
        <div className='bg-white w-[100%] mb-[50px] p-4 h-full rounded-[20px]'>
          <table >
            <tr>
              <th>S.no</th>
              <th>
                <button className='bg-red-400' onClick={deleteMultiData}>Delete</button>
                <input type="checkbox" onChange={handleAllcheck} name="" id="" />
              </th>
              <th>Course Name</th>
              <th>Fees</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {coursesdata.map((course,index)=>(
               <tr>
               <td>{index+1}</td>
               <td>
                <input type="checkbox" checked={isAllchecked || selectedData.includes(course._id)} onChange={checkDataSelect} value={course._id} />
               </td>
               <td>{course.coursename}</td>
               <td>{course.courseprice}</td>
               <td>{course.courseduration}</td>
               <td>{course.coursedes}</td>
               <td>
                <img className='w-[100px]' src={course.courseimage} alt="" />
               </td>
               <td>
                <button onClick={handleStatus} value={course._id} className={`py-2 px-4 rounded ${(course.cousrestatus) ? 'bg-green-600' : 'bg-red-600'} `}>{(course.cousrestatus) ? 'Active' : 'Inactive'}</button>
               </td>
               <td className='text-center'>
 
               <button onClick={handleUpdateRoute} value={course._id} className='bg-green-500 text-white px-5 mr-5 py-1'>Edit</button>
               <button className='bg-red-400 text-white px-5 py-1'>Delete</button>
 
 
               </td>
             </tr>
            ))}
           
          </table>
        </div>
        </div>
      <Footer/>
      </div>
    </div>

    </div>
  )
}

export default Viewcourse