import React from 'react';
import { Sidebar } from '../../sidebar';
import './study.css';

export const Study = () => {
  return (
    <div>
      <div className='h-screen w-screen bg-[#f5f5f5] text-black'>
        <div className='xl:w-4/5 lg:w-4/5 md:w-3/4 sm:w-2/3 w-2/3 h-screen absolute -right-0 bg-[#f5f5f5] '>
          
          <div className='headinginfoielst text-[#C7002B] font-bold flex justify-center text-5xl mt-10 '>IELTS Information</div>
          <div className='inforect drop-shadow   '>
            <p className='textielts mt-5 mb-5 ml-5 mr-5'>IELTS (International English Language Testing System) is a widely recognized English proficiency test for non-native English speakers. It assesses four language skills: listening, reading, writing, and speaking. IELTS is accepted by over 10,000 organizations globally, including universities, employers, and immigration authorities. It offers two versions: Academic for higher education and General Training for employment and migration purposes. Scores are reported on a nine-band scale and are valid for two years. IELTS can be taken in computer-delivered or paper-based formats. Preparation materials, sample tests, and online courses are available to help candidates familiarize themselves with the test and enhance their language abilities.</p>
          </div>
          <a href='/study/writing/task2' className='writingtask2btn flex justify-center items-center text-white hover:bg-red-600 transition-colors duration-500'>Start writing task 2</a>
        </div>
        <Sidebar className='fixed'/>
      </div>
    </div>
  );
};
