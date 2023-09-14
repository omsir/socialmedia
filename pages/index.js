import React, { useState } from "react";
import Image from "next/image";
import { Comforter } from "next/font/google";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const comfortor = Comforter({
  weight: "400",
  subsets: ["latin"],
});

const Index = () => {
  let router = useRouter();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [isSignup, setisSignup] = useState(false);

  const handleonSignup = async () => {
    if (password == cpassword) {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }),
        });
        let res = await response.json();
        if (res.sucess) {
          toast.success("Sucessfully Created Account", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("Password Doesnot Match", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let res = await response.json();

      if (res.sucess) {
        localStorage.setItem("jwt", res.token);
        toast.success("Login Sucess", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,

          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        router.push("/app");
        console.log("dafsd");
      } else {
        toast.error(res.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
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
            alt='oppo'
          />
          <Image
            alt='oppo'
            className='rounded-xl mt-10'
            width={300}
            height={50}
            src={"/img/img_1.jpg"}
          />
          <Image
            alt='oppo'
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
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder='Email or phoneno'
              className='p-1 border-gray-400 border w-3/4 rounded-sm  focus:outline-gray-400'
              type='text'
              name=''
              id=''
            />
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder='Password'
              className='p-1 border-gray-400 border w-3/4 rounded-sm focus:outline-gray-400'
              type='password'
              name=''
              id=''
            />
            <input
              onClick={() => {
                handleLogin();
              }}
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
            value={firstname}
            onChange={(e) => {
              setfirstname(e.target.value);
            }}
            placeholder='Firstname'
            className='bg-stone-200 py-2 px-4 w-[41%] focus:outline-gray-400 rounded-md '
            type='text'
          />

          <input
            value={lastname}
            onChange={(e) => {
              setlastname(e.target.value);
            }}
            placeholder='Lastname'
            className='bg-stone-200 py-2 px-4 w-[41%] focus:outline-gray-400 ml-8 rounded-md'
            type='text'
          />
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
            placeholder='Enter the Email'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='text'
          />
          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
            placeholder='Enter the Password'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='password'
          />
          <input
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
            value={cpassword}
            placeholder='Confirm Password'
            className='bg-stone-200 py-2 px-4 w-[90%] focus:outline-gray-400 rounded-md'
            type='password'
          />
          <input
            onClick={() => {
              handleonSignup();
            }}
            className='text-white mx-[30%] cursor-pointer focus:outline-gray-400 rounded-md bg-sky-700 w-[30%] p-2 '
            type='button'
            value='Sign up'
          />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Index;
