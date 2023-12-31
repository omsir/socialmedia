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
  const [file, setfile] = useState();
  const [Image, setImage] = useState("");
  const [base64, setbase64] = useState("");
  const [hasrun, sethasrun] = useState(false);

  const router = useRouter();
  const [Post, setPost] = useState("");
  const handleImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nkqy6ley");

      let res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_data_id}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );
      let parsed = await res.json();

      setImage(parsed.secure_url);
    } catch (err) {
      console.log(err);
    }
  };
  const converttobase = () => {
    const rf = new FileReader();
    rf.readAsDataURL(file);
    rf.onloadend = async function (event) {
      setbase64(event.target.result);
    };
  };

  const handleLogout = async () => {
    let rep = await fetch("/api/logout");
    let data = await rep.json();
    if (data.sucess) {
      router.push("/");
    }
  };
  const handleLike = async (id) => {
    setisLike(!isLike);
    let rep = await fetch("/api/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    let parsedRep = await rep.json();
    let post = await fetch("/api/post");
    let parsedPost = await post.json();
    setposte(parsedPost.reverse());
  };
  const handlePost = async () => {
    try {
      let response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.firstname + " " + decoded.lastname,
          post: Post,
          profile: decoded.profile,
          image: Image,
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
        setbase64("");
        setImage("");
        let post = await fetch("/api/post");
        let parsedPost = await post.json();
        setposte(parsedPost.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (file && !hasrun) {
    converttobase();
    handleImage();
    sethasrun(true);
  }

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
          <div className='post flex space-x-2 '>
            <img
              alt='profile.jpg'
              src={decoded.profile}
              className='bg-sky-600 my-5  rounded-full w-10 h-10'
            ></img>
            <div className='flex w-3/4'>
              <div className='flex items-center space-x-12 justify-center'>
                <label
                  htmlFor='dropzone-file'
                  className='flex flex-col items-center justify-center w-full h-24 lg:px-5 px-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800  hover:bg-gray-100 '
                >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <svg
                      className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 16'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      />
                    </svg>
                  </div>
                  <input
                    onChange={(e) => {
                      setfile(e.target.files[0]);
                      sethasrun(false);
                    }}
                    id='dropzone-file'
                    type='file'
                    className='hidden'
                  />
                </label>
              </div>
              <textarea
                onChange={(e) => {
                  setPost(e.target.value);
                }}
                value={Post}
                placeholder='Write your post...'
                className='bg-white resize-none p-3  rounded-md focus:outline-none w-full  '
                rows='3'
                name=''
                id=''
              ></textarea>
            </div>

            <button
              onClick={() => {
                handlePost();
              }}
              className=' bg-sky-700  w-16 rounded-md h-10 my-5 hover:bg-sky-600'
            >
              <AiOutlineSend className='text-xl text-white mx-auto' />
            </button>

            <img
              className={`absolute left-[61%] w-12 h-12 mt-4 rounded-sm ${
                !base64 ? "hidden" : "block"
              }`}
              src={base64}
              alt=''
            />
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
                      src={dat.profile}
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
                <div className='message ml-12  mb-5  font-medium text-sm'>
                  {dat.post}
                </div>
                <img
                  className={`ml-12 h-auto w-[75%] lg:w-[85%] ${
                    !dat.image ? "hidden" : "block"
                  }`}
                  src={dat.image}
                  alt=''
                />
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
  const res = await fetch(`https://bcasit.vercel.app/api/post`);
  const dat = await res.json();
  const data = dat.reverse();

  // Pass data to the page via props
  return { props: { data } };
}
