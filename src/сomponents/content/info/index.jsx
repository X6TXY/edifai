import React from 'react';
import { Navbar } from '../Navbar';
import './info.css';

export const Info = () => {
  return (
    <div>
      <div className="h-screen w-4/5 absolute -right-0 bg-[#f5f5f5]">
        <div className="">
          <h1 className="flex w-full absolute text-6xl text-[#7C3BCF] font-bold justify-center top-10">Information</h1>
          <h3 className="main bg-[#7C3BCF] text-white rounded w-40 p-2 flex justify-center items-center drop-shadow-md text-3xl font-medium">Main Idea</h3>
          <div className="rect1 rounded bg-white drop-shadow-md p-5 text-xl font-semibold">The main goal of this project is to help prepare for IELTS.There is also a share of entertaining material here.I hope users will enjoy using it.In the future, the project will be developed and new functions will be added to it.Good luck!</div>
          <h3 className="about bg-[#7C3BCF] text-white rounded w-28 p-3 flex justify-center items-center text-3xl font-medium">About</h3>
          <div className="rect2 rounded bg-white drop-shadow-md p-2 "></div>
        </div>
      </div>
      <Navbar className="h-screen w-1/5" />
    </div>
  );
};
