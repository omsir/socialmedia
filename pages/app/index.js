import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import {
  AiOutlineSend,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineBarChart,
} from "react-icons/ai";

const App = () => {
  const [Token, setToken] = useState("");
  let decoded = Token && jwt_decode(Token);
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);
  return (
    <div className='h-full'>
      <Navbar name={decoded.firstname} />
      <div className='flex m-5 justify-between '>
        <div className='left hidden lg:block bg-white w-[20%]  h-screen text-center rounded-md'>
          <h1 className='text-xl my-2 font-semibold'>Friends</h1>
        </div>
        <div className='middle lg:w-[50%] space-y-10'>
          <div className='post flex  space-x-2'>
            <p className='bg-sky-600 my-5  rounded-full w-10 h-10'></p>
            <textarea
              placeholder='Write your post...'
              className='bg-white resize-none p-3 ml-14  rounded-md focus:outline-none w-3/4 '
              rows='3'
              name=''
              id=''
            ></textarea>
            <button className='bg-sky-700 w-16 rounded-md h-10 my-5 hover:bg-sky-600'>
              <AiOutlineSend className='text-xl text-white mx-auto' />
            </button>
          </div>
          <div className='posts bg-white w-[75%] pb-5 rounded-md ml-12 '>
            <div className='headers flex justify-between  '>
              <div className='flex'>
                <p className='bg-sky-600 mt-5  rounded-full w-8 h-8 m-2 '></p>
                <h1 className='name md:text-lg text-sm  font-bold mt-5'>
                  Omprasad Poudel
                </h1>
              </div>
              <p className='date text-gray-400  mt-5 md:mx-5 mr-2'>08 Aug</p>
            </div>
            <div className='message ml-12 w-[82%] font-serif text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              voluptatem soluta ipsum dolorum molestias assumenda. Aspernatur,
              eligendi quam similique delectus, molestias magnam animi sapiente
              magni mollitia optio recusandae! Quia culpa, ab, magni facere
              illum expedita magnam ullam officia accusantium consequatur eius
              ipsam quam libero cupiditate eveniet provident, sint aliquid
              itaque laborum officiis harum reiciendis voluptatem voluptas
              quaerat! Maxime saepe iusto facere fugiat fuga id quidem! Quas nam
              mollitia itaque quisquam, debitis pariatur eveniet modi odit
              libero nostrum suscipit nesciunt alias obcaecati, facilis
              repellendus at autem perspiciatis assumenda ab? Asperiores
              voluptas cumque quod odit est impedit fugit veniam iste quas
              possimus!
            </div>
            <div className='inteactions ml-12 mt-10 flex justify-between  '>
              <AiFillLike className='text-xl cursor-pointer ' />
              <AiOutlineComment className='text-xl cursor-pointer' />
              <AiOutlineBarChart className='text-xl cursor-pointer' />
              <AiOutlineShareAlt className='text-xl cursor-pointer md:mr-14 mr-6' />
            </div>
          </div>
        </div>
        <div className='end bg-white hidden lg:block w-[25%]  h-screen text-center rounded-md'>
          sdf
        </div>
      </div>
    </div>
  );
};

export default App;
