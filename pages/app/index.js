import Navbar from "@/components/navbar";
import React from "react";
import {
  AiOutlineSend,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineBarChart
} from "react-icons/ai";

const App = () => {
  return (
    <div className='h-full'>
      <Navbar />
      <div className='flex m-5 justify-between '>
        <div className='left bg-white w-[20%]  h-screen text-center rounded-md'>
          <h1 className='text-xl my-2 font-semibold'>Friends</h1>
        </div>
        <div className='middle w-[50%] space-y-10'>
          <div className='post flex  space-x-2'>
            <p className='bg-sky-600 my-5  rounded-full w-10 h-10'></p>
            <textarea
              placeholder='Write your post...'
              className='bg-white resize-none p-3 ml-14 rounded-md focus:outline-none'
              name=''
              id=''
              cols='60'
              rows='3'
            ></textarea>
            <button className='bg-sky-700 w-16 rounded-md h-10 my-5 hover:bg-sky-600'>
              <AiOutlineSend className='text-xl text-white mx-auto' />
            </button>
          </div>
          <div className='posts bg-white w-[75%] h-[40%] rounded-md ml-12 '>
            <div className='headers flex justify-between  '>
              <div className='flex'>
                <p className='bg-sky-600 mt-5  rounded-full w-8 h-8 m-2 '></p>
                <h1 className='name text-lg font-bold mt-5'>Omprasad Poudel</h1>
              </div>
              <p className='date text-gray-400  mt-5 mx-5'>08 Aug</p>
            </div>
            <div className='message ml-12 w-[82%] font-serif'>
              Lorem, ipsum dolor Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Minus reiciendis labore voluptatibus magnam
              veniam sed nesciunt illo voluptatum pariatur. Illum architecto
              minus omnis velit! Id distinctio nulla hic tenetur omnis?
            </div>
            <div className='inteactions ml-12 mt-10 flex justify-between'>
              <AiFillLike className='text-xl cursor-pointer ' />
              <AiOutlineComment className='text-xl cursor-pointer' />
              <AiOutlineBarChart className='text-xl cursor-pointer' />
              <AiOutlineShareAlt className='text-xl cursor-pointer mr-14' />
            </div>
          </div>
        </div>
        <div className='end bg-white w-[25%]  h-screen text-center rounded-md'>
          sdf
        </div>
      </div>
    </div>
  );
};

export default App;
