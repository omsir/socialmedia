import React from "react";
import { Inter } from "next/font/google";
import { IoIosNotifications, IoIosHome } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});
const Navbar = () => {
  return (
    <div
      className={`bg-white m-3 p-5 flex justify-between rounded-xl ${inter.className}`}
    >
      <div className='search'>
        <input
          placeholder='search...'
          className='px-5 py-1 ml-10 rounded-sm  bg-stone-100 border-gray-300 border '
          type='text'
          name=''
          id=''
        />
      </div>
      <div className='nav '>
        <ul className='flex space-x-20 '>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500 '>
            <IoIosHome className='text-xl' />
            <p>Home</p>
          </li>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500'>
            <AiFillMessage className='text-xl ' />
            <p>Message</p>
          </li>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500'>
            <IoIosNotifications className='text-xl  ' />
            <p>Notification</p>
          </li>
        </ul>
      </div>
      <div className='profile flex space-x-4'>
        <p className='bg-sky-600  rounded-full w-8 h-8'></p>
        <span className='font-semibold text-lg'>Omprasad</span>
      </div>
    </div>
  );
};

export default Navbar;
