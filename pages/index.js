import React, { useState } from "react";
import Image from "next/image";
import { Comforter } from "next/font/google";

const comfortor = Comforter({
  weight: "400",
  subsets: ["latin"],
});

const index = () => {
  const [isSignup, setisSignup] = useState(false);
  return (
    <>
      <div
        className={`flex justify-center md:mt-16 ${
          isSignup ? "blur-xl" : "blur-none"
        } `}
      >
        <div className='img w-1/2  hidden md:flex'>
          <Image
            className='rounded-xl'
            width={120}
            height={100}
            src={"/img/img_2.jpg"}
          />
          <Image
            className='rounded-xl mt-10'
            width={300}
            height={50}
            src={"/img/img_1.jpg"}
          />
          <Image
            className='rounded-xl'
            width={120}
            height={50}
            src={"/img/img_3.jpg"}
          />
        </div>
        <div className='bg-white w-[418px] h-[521px] text-center rounded-xl items-center space-y-5'>
          <h1 className={`${comfortor.className} text-6xl p-5 text-blue-800`}>
            Bcachat
          </h1>
          <div className='inputs space-y-10'>
            <input
              placeholder='Email or phoneno'
              className='p-1 border-gray-400 border w-3/4 rounded-sm  focus:outline-gray-400'
              type='text'
              name=''
              id=''
            />
            <input
              placeholder='Password'
              className='p-1 border-gray-400 border w-3/4 rounded-sm focus:outline-gray-400'
              type='password'
              name=''
              id=''
            />
            <input
              className='p-1 border-gray-400 border w-3/4 rounded-md text-white font-sans cursor-pointer active:bg-sky-600 hover:bg-sky-500 bg-sky-600 '
              type='button'
              value={"Log in"}
            />
          </div>
          <p
            className='p-1 cursor-pointer font-mono  mx-auto w-3/4 rounded-sm'
            type='text'
            name=''
            id=''
          >
            Forgot Password?
          </p>
          <p className='py-5'>
            Dont have account?{" "}
            <span
              onClick={() => {
                setisSignup(!isSignup);
              }}
              className='text-sky-700 cursor-pointer'
            >
              Signup
            </span>
          </p>
        </div>
      </div>
      <div
        className={`bg-white absolute   top-0 sm:w-[70] lg:left-96 md:left-60 rounded-xl md:w-[60%] xl:w-[45%]  lg:w-[55%] mx-auto px-10 py-5 mt-[5%] ${
          isSignup ? "" : "hidden"
        } `}
      >
        <div className='hedder'>
          <p
            onClick={() => {
              setisSignup(!isSignup);
            }}
            className='text-end font-medium text-lg cursor-pointer '
          >
            X
          </p>
          <h1 className='text-3xl font-medium text-sky-600'>Sign Up</h1>
          <p className='font-serif py-2'>
            Feel free to join us and connect with friends
          </p>
        </div>
        <div className='form  space-y-10 '>
          <input
            placeholder='Firstname'
            className='bg-stone-200 py-2 px-4 w-[41%] focus:outline-gray-400 rounded-md '
            type='text'
          />

          <input
            placeholder='Lastname'
            className='bg-stone-200 py-2 px-4 w-[41%] focus:outline-gray-400 ml-8 rounded-md'
            type='text'
          />
          <input
            placeholder='Enter the Email'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='text'
          />
          <input
            placeholder='Enter the Password'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='password'
          />
          <input
            placeholder='Confirm Password'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='password'
          />
          <input
            className='text-white mx-[30%] cursor-pointer focus:outline-gray-400 rounded-md bg-sky-700 w-[30%] p-2 '
            type='button'
            value='Sign up'
          />
        </div>
      </div>
    </>
  );
};

export default index;
