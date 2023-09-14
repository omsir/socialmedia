import Navbar from "@/components/navbar";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { FaUserFriends } from "react-icons/fa";
import {
  AiOutlineSend,
  AiFillLike,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiOutlineBarChart,
  AiFillSetting,
  AiFillMessage,
  AiFillSecurityScan,
  AiOutlineLogout,
} from "react-icons/ai";
import { useRouter } from "next/router";

const App = ({ data }) => {
  const [poste, setposte] = useState(data);
  const [isLike, setisLike] = useState(false);

  const router = useRouter();
  const [Post, setPost] = useState("");
  const handleLogout = async () => {
    let rep = await fetch("http://localhost:3000/api/logout");
    let data = await rep.json();
    if (data.sucess) {
      router.push("/");
    }
  };
  const handleLike = async (id) => {
    setisLike(!isLike);
    let rep = await fetch("http://localhost:3000/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let parsedRep = await rep.json();
    let post = await fetch("http://localhost:3000/api/post");
    let parsedPost = await post.json();
    setposte(parsedPost.reverse());
  };
  const handlePost = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.firstname + " " + decoded.lastname,
          post: Post,
        }),
      });
      let res = await response.json();
      if (res.sucess) {
        toast.success("Post Sent", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setPost("");
        let post = await fetch("http://localhost:3000/api/post");
        let parsedPost = await post.json();
        setposte(parsedPost.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [Token, setToken] = useState("");
  let decoded = Token && jwt_decode(Token);
  useEffect(() => {
    setToken(localStorage.getItem("jwt"));
  }, []);
  return (
    <div className='h-full'>
      <Navbar name={decoded.firstname} profile={decoded.profile} />
      <div className='flex  '>
        <div className='left hidden lg:block fixed h-screen  bg-white w-[20%] py-5 pb-12   ted-ext-center rounded-md'>
          <div className='flex mx-5 space-x-3'>
            <img
              alt='profile.jpg'
              src={decoded.profile}
              className='bg-sky-600 my-3  rounded-full w-7 h-7'
            />
            <h1 className='text-xl my-2 font-semibold'>
              {decoded.firstname + " " + decoded.lastname}
            </h1>
          </div>
          <div className='buttons m-5 space-y-10'>
            <button className='flex px-2 rounded-sm  space-x-3 hover:bg-sky-200 w-full py-2'>
              <AiFillSetting className='text-2xl text-sky-600 mt-1' />{" "}
              <p className='text-lg font-semibold'>Profile Setting</p>
            </button>
            <button className='flex px-2 rounded-sm  space-x-3 hover:bg-sky-200 w-full py-2'>
              <FaUserFriends className='text-2xl text-sky-600 mt-1' />{" "}
              <p className='text-lg font-semibold'>Friends</p>
            </button>
            <button className='flex  px-2 rounded-sm space-x-3 hover:bg-sky-200 w-full py-2'>
              <AiFillMessage className='text-2xl text-sky-600 mt-1' />{" "}
              <p className='text-lg font-semibold'>Messages</p>
            </button>
            <button className='flex  px-2 rounded-sm space-x-3 hover:bg-sky-200 w-full py-2'>
              <AiFillSecurityScan className='text-2xl text-sky-600 mt-1' />{" "}
              <p className='text-lg font-semibold'>Security</p>
            </button>
            <button
              onClick={() => {
                handleLogout();
              }}
              className='flex  px-2 rounded-sm space-x-3 hover:bg-sky-200 w-full py-2'
            >
              <AiOutlineLogout className='text-2xl text-sky-600 mt-1' />{" "}
              <p className='text-lg font-semibold'>Logout</p>
            </button>
          </div>
        </div>

        <div className='middle lg:w-[50%] space-y-10 my-5 mx-auto'>
          <div className='post flex  space-x-2'>
            <img
              alt='profile.jpg'
              src={decoded.profile}
              className='bg-sky-600 my-5  rounded-full w-10 h-10'
            ></img>
            <textarea
              onChange={(e) => {
                setPost(e.target.value);
              }}
              value={Post}
              placeholder='Write your post...'
              className='bg-white resize-none p-3 ml-14  rounded-md focus:outline-none w-3/4 '
              rows='3'
              name=''
              id=''
            ></textarea>
            <button
              onClick={() => {
                handlePost();
              }}
              className=' bg-sky-700  w-16 rounded-md h-10 my-5 hover:bg-sky-600'
            >
              <AiOutlineSend className='text-xl text-white mx-auto' />
            </button>
          </div>
          {poste.map((dat, k) => {
            return (
              <div
                key={k}
                className='posts bg-white w-[75%] pb-5 rounded-md ml-12 '
              >
                <div className='headers flex justify-between  '>
                  <div className='flex'>
                    <img
                      src={decoded.profile}
                      className='bg-sky-600 mt-5  rounded-full w-8 h-8 m-2 '
                    ></img>
                    <h1 className='name md:text-lg text-sm  font-bold mt-5'>
                      {dat.name}
                    </h1>
                  </div>
                  <p className='date text-gray-400  mt-5 md:mx-5 mr-2'>
                    {dat.createdAt.slice(5, 10)}
                  </p>
                </div>
                <div className='message ml-12 w-[82%] font-serif text-sm'>
                  {dat.post}
                </div>
                <div className='inteactions ml-12 mt-10 flex justify-between  '>
                  <button
                    onClick={() => {
                      handleLike(dat._id);
                    }}
                    className={`like flex space-x-1`}
                  >
                    <p className='text-lg font-semibold'>{dat.like}</p>
                    <AiFillLike className='text-xl  ' />
                  </button>
                  <AiOutlineComment className='text-xl cursor-pointer' />
                  <AiOutlineBarChart className='text-xl cursor-pointer' />
                  <AiOutlineShareAlt className='text-xl cursor-pointer md:mr-14 mr-6' />
                </div>
              </div>
            );
          })}
        </div>
        <div className='end fixed right-0 bg-white hidden lg:block  w-[25%] text-center rounded-md'>
          <h1 className='font-bold py-5 text-xl h-screen'>Active Members</h1>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/post`);
  const dat = await res.json();
  const data = dat.reverse();

  // Pass data to the page via props
  return { props: { data } };
}
