import { faL } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

export default function Register() {

    const [ifOtp, setIfOtp] = useState(true);
    const [ifGerated, setIfGenrated] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});

    console.log(formData);

    const handleFormData = (e)=>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name] : value
        });
    }

    const validateForm = ()=>{
        const newError = {};

        if(!formData.firstname.trim())
        {
            newError.firstname = "First name is required.";
        }

        if(!formData.lastname.trim())
        {
            newError.lastname = "Last name is required";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(formData.email))
        {
            newError.email = "Please enter a valid email";
        }

        const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$@%&?]{8,20}$/;

        if(!passwordRegex.test(formData.password))
        {
            newError.password = "Please enter a valid password"
        }

        if(formData.password !== formData.c_password)
        {
            newError.c_password = 'Password does not match';
        }

        setErrors(newError);
        console.log(newError);
        return Object.keys(newError).length === 0;
    }

    const genrateOtp = async()=>{
       const ifValid = validateForm();
       if(ifValid)
       {
        let response = await fetch('http://localhost:5500/genrateotp',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
        });

        response =await response.json();

        if(response.message)
        {
            setIfGenrated(true);
            setIfOtp(false);

        }
       }
       else
       {
        setTimeout(()=>{
            setErrors({});
        },5000)
       }
    };

    const handleregister = async()=>{
        let response = await fetch('http://localhost:5500/registeruser',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(formData)
        });

        response =await response.json();
    }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen px-6">
        {/* Row */}
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          {/* Col */}
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style={{ backgroundImage: "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')" }}
          ></div>
          {/* Col */}
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleFormData}
                  />
                  <p className='text-red-500'>{errors.firstname}</p>
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleFormData}
                  />
                    <p className='text-red-500'>{errors.lastname}</p>
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name='email'
                    value={formData.email}
                    onChange={handleFormData}
                />
                <p className='text-red-500'>{errors.email}</p>
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    name='password'
                    value={formData.password}
                    onChange={handleFormData}
                  />
                   <p className='text-red-500'>{errors.password}</p>
                
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    name='c_password'
                    value={formData.c_password}
                    onChange={handleFormData}
                  />
                   <p className='text-red-500'>{errors.c_password}</p>
                </div>
                
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={ifGerated}
                  onClick={genrateOtp}
                >
                  Gentare OTP
                </button>
              </div>
              <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Enter OTP
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="text"
                    placeholder="Enter OTP"
                    name='otp'
                    value={formData.otp}
                    onChange={handleFormData}
                  />
                   <p className='text-red-500'>{errors.otp}</p>
                </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={ifOtp}
                  onClick={handleregister}
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                {/* <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a> */}
              </div>
              <div className="text-center">
                {/* <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="./index.html"
                >
                  Already have an account? Login!
                </a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}