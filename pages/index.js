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
  const [file, setfile] = useState();
  const [profile, setProfile] = useState("");
  const [hasrun, sethasrun] = useState(false);
  const [base64, setbase64] = useState("");

  const converttobase = () => {
    const rf = new FileReader();
    rf.readAsDataURL(file);
    rf.onloadend = async function (event) {
      setbase64(event.target.result);
    };
  };
  // const handleImagee = async () => {
  //   const rf = new FileReader();
  //   rf.readAsDataURL(file); //file is from a useState() hook
  //   rf.onloadend = async function (event) {
  //     const body = new FormData();
  //     body.append("image", event.target.result.split(",").pop()); //To delete 'data:image/png;base64,' otherwise imgbb won't process it.
  //     try {
  //       let res = await fetch(
  //         "https://api.imgbb.com/1/upload?key=2ec68f8a6b3a19d8f9cf4c574d69e777",
  //         {
  //           method: "POST",
  //           body: body,
  //         },
  //       );
  //       let parsed = await res.json();

  //       setProfile(parsed && parsed.data.display_url);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // };
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
      console.log("i am working");

      setProfile(parsed);
    } catch (err) {
      console.log(err);
    }
  };
  if (file && !hasrun) {
    // Check if 'file' exists and the function hasn't run yet
    handleImage();
    converttobase();
    sethasrun(true);
  }
  const handleonSignup = async () => {
    if (password == cpassword) {
      try {
        const response = await fetch("/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email.toLowerCase(),
            password: password,
            profile: profile && profile.secure_url,
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
        } else {
          toast.error("Something Went Wrong", {
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

        setisSignup(false);
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
      const response = await fetch("/api/login", {
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
          <div className='flex items-center space-x-12 justify-center'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 '
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
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Upload your Profile</span>
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
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
            <img
              className='w-24 h-24 rounded-full'
              src={base64 && base64}
              alt=''
            />
          </div>

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
