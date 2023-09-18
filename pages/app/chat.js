import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import { AiOutlineWechat } from "react-icons/ai";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { MdGroups2 } from "react-icons/md";
const Chat = () => {
  const [Token, setToken] = useState("");
  let decoded = Token && jwt_decode(Token);
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);

  return (
    <div>
      <Navbar name={decoded.firstname} profile={decoded.profile} />
      <div className='flex'>
        <div className='left bg-gray-200 fixed h-screen w-[25%] space-y-8'>
          <button className='flex px-2 rounded-lg m-6 bg-white  space-x-3 hover:bg-sky-200 w-[80%] py-2'>
            <AiOutlineWechat className='text-2xl text-sky-600 mt-1' />{" "}
            <p className='text-lg font-semibold'>All Chat</p>
          </button>
          <button className='flex px-2 rounded-lg m-6 bg-white  space-x-3 hover:bg-sky-200 w-[80%] py-2'>
            <LiaUserFriendsSolid className='text-2xl text-sky-600 mt-1' />{" "}
            <p className='text-lg font-semibold'>Friends</p>
          </button>
          <button className='flex px-2 rounded-lg m-6 bg-white  space-x-3 hover:bg-sky-200 w-[80%] py-2'>
            <MdGroups2 className='text-2xl text-sky-600 mt-1' />{" "}
            <p className='text-lg font-semibold'>Groups</p>
          </button>
        </div>
        <div className='mesage mx-auto ml-[25%]  '>
          <div className='messages h-[80%]  text-center justify-center w-[80%]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A dicta,
            hic molestiae, at aperiam officiis obcaecati expedita nulla
            assumenda in voluptate odit excepturi maxime illum neque tempora
            veritatis laudantium magnam laborum! Libero quaerat dignissimos
            aspernatur sunt impedit quis quibusdam expedita nihil qui, fugit at
            suscipit odio facere aperiam quod ab soluta corporis cumque facilis.
            Ipsam dolores totam laboriosam expedita delectus corrupti, pariatur
            velit necessitatibus qui eius fugiat neque veritatis hic rerum,
            dicta perspiciatis, libero veniam quo voluptatum sunt deleniti
            magnam nemo sequi non? Laboriosam quam dolores assumenda eligendi
            fugiat ut quibusdam impedit temporibus laborum corporis! Explicabo a
            cum nemo consectetur.
          </div>
          <div className='flex textarea space-x-7'>
            <img className='w-12 h-12 m-3' src={decoded.profile} alt='' />
            <textarea className='' name='' id='' cols='80' rows='3'></textarea>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
