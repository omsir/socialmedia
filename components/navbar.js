import React from "react";
import { Inter } from "next/font/google";
import { IoIosNotifications, IoIosHome } from "react-icons/io";
import { AiFillMessage, AiOutlineSearch } from "react-icons/ai";
const inter = Inter({
  weight: "400",
  subsets: ["latin"],
});
const Navbar = ({ name }) => {
  return (
    <div
      className={`bg-white  m-3 p-5 flex justify-between rounded-xl ${inter.className}`}
    >
      <div className='search'>
        <AiOutlineSearch className='text-2xl m-2 lg:hidden' />
        <input
          placeholder='search...'
          className='lg:px-5 py-1 ml-10 rounded-sm hidden lg:block  bg-stone-100 border-gray-300 border '
          type='text'
          name=''
          id=''
        />
      </div>
      <div className='nav '>
        <ul className='flex lg:space-x-20 space-x-10 md:space-x-36 sm:space-x-16 '>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500 '>
            <IoIosHome className='lg:text-xl text-3xl' />
            <p className='hidden lg:block'>Home</p>
          </li>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500'>
            <AiFillMessage className='lg:text-xl text-3xl' />
            <p className='hidden lg:block'>Message</p>
          </li>
          <li className='flex space-x-2 cursor-pointer hover:text-sky-500 hover:border-b-2 pb-2 border-sky-500'>
            <IoIosNotifications className='lg:text-xl  text-3xl ' />
            <p className='hidden lg:block'>Notification</p>
          </li>
        </ul>
      </div>
      <div className='profile flex space-x-4'>
        <p className='bg-sky-600  rounded-full w-8 h-8'></p>
        <span className='font-semibold lg:text-lg hidden lg:block'>{name}</span>
      </div>
    </div>
  );
};

export default Navbar;
