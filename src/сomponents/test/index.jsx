import React from "react";
import { Link } from "react-router-dom";
import SecondImg from "../../assets/ieltsnewlogo1.png";
import MainIcon from "../../assets/mainpagefirst photo.png";
import "./main.css";
export const Test = () => {
  return (
    <div>
      <div className="backgroundmain absolute bg-[#f5f5f5] text-black ">
        <header>
          <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 ">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              <Link to="/" className="flex">
                <span class="self-center text-xl font-semibold whitespace-nowrap ">
                  Edif<span className="text-[#c7200b]">AI</span>
                </span>
              </Link>
              <div class="flex items-center lg:order-2">
                <Link to="/login">
                  <p className="text-[#c7200b] border border-[#c7200b] hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">
                    Log in{" "}
                  </p>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <div className="w-full flex justify-center">
          <div className="mainpagefirstsection flex items-center justify-center">
            <div className="">
              <div className=" font-semibold text-5xl ">
                We take your score higher
              </div>
              <p className=" text-[#7C7A7A] font-medium mt-5 text-md">
                Prepare for the IELTS exam by practicing your skills with
                artificial intelligence
              </p>

              <Link to="/login" className="flex justify-center mt-5">
                <button className="startbtn btn btn-primary text-white">
                  Start Now!
                </button>
              </Link>
            </div>
            <img src={MainIcon} className="firstimg" alt="IELTS Main Icon" />
          </div>
        </div>
        <div className="w-full flex justify-center ">
          <div className="mainpagefirstsection">
            <div className=" font-semibold flex justify-center items-center text-4xl">
              Get Instant Essay Scores! Improve your Writing Today!
              <div className="flex justify-center mt-10">
                <Link to="/login">
                  <button className="buttonjoin btn btn-primary text-white lg:h-20 lg:w-40 xl:text-xl">
                    JOIN NOW!
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <img src={SecondImg} className="firstimg" alt="IELTS second image" />
        </div>
      </div>
    </div>
  );
};
