import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AIIcon } from '../../assets/ailanding.svg';
import { ReactComponent as AnalyzeIcon } from '../../assets/analyzelanding.svg';
import { ReactComponent as DataIcon } from '../../assets/datalanding.svg';
import MainIcon from '../../assets/ieltsmainicon.png';
import { ReactComponent as Landing1 } from '../../assets/landing1.svg';
import NfacIcon from '../../assets/nfac.png';
import { ReactComponent as TimeIcon } from '../../assets/timelanding.svg';
import { ReactComponent as TriangleIcon } from '../../assets/trianglelanding.svg';
import './landing.css';

export const Landing = () => {
  return (
    <div className='background'>
      <div className='headinglanding w-full flex items-center'>
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap relative lg:left-16 xl:left-32 lg:text-3xl xl:text-4xl top-4">Edif<span className='text-[#c7200b]'>AI</span></span>
        </a>
        <Link to='/login' className='border border-[#c7200b] text-[#c7200b] hover:underline absolute right-20 sm:right-10 lg:text-md  xl:text-md top-4 rounded-md p-3'>Login</Link>
      </div>
      <div className='w-full relative mt-40 flex justify-center'>
        <div className='mainsection lg:w-5/6 md:w-3/5 sm:w-4/5 '>
          <div className='mainsectiontext'>
            <div className='mainsectionheading xl:text-6xl lg:text-5xl font-bold lg:w-96'>We take your score higher</div>
            <p className='secondarytext lg:text-lg xl:text-xl text-[#7C7A7A] mb-2 mt-2'>Prepare for the IELTS exam by practicing your skills with artificial intelligence</p>
            <div className='forbutton1 flex justify-center'>
              <Link to='/login'>
                <button className='btn btn-primary text-white mt-2 xl:w-32 lg:w-28 xl:text-sm lg:text-xs'>Start Now!</button>
              </Link>
            </div>
          </div>
          <img src={MainIcon} className='firstimg xl:w-5/6 lg:4/5' alt="IELTS Main Icon" />
        </div>
      </div>
      <div className='mainsection2 w-screen h-screen'>
      <div className='mainsectionheading2 xl:left-32 lg:left-12 font-bold text-3xl absolute '> Why use EdifAI?</div>
      <div className='w-screen flex justify-center'>
        <div className='mainsectionrect bg-white rounded-md drop-shadow flex  '>
          <div>
          <TimeIcon className='mx-24 mt-10'></TimeIcon>
          <div className='w-28 text-xl font-semibold mt-12 ml-20'>Quickly get a Score</div>
          <div className='text-md w-44 ml-20 mt-5'>After submitting your essay, you can immediately receive your score and feedback</div>
          </div>
          <div>
          <AnalyzeIcon className='mx-24 mt-10'></AnalyzeIcon>
          <div className='w-32 text-xl font-semibold mt-12 ml-20'>Analyze your mistakes</div>
          <div className='text-md w-44 ml-20 mt-5'>Watch your progress.And watch out for your first essays</div>
          </div>
          <div>
          <AIIcon className='mx-28 mt-10'></AIIcon>
          <div className='w-40 text-xl font-semibold mt-12 ml-24'>Special project</div>
          <div className='text-md w-44 ml-24 mt-12'>The first product that uses AI to prepare for IELTS</div>
          </div>
          <div>
          <DataIcon className='mx-24 mt-12'></DataIcon>
          <div className='w-44 text-xl font-semibold mt-10 ml-20'>Take recent actual resources</div>
          <div className='text-md w-44 ml-20 mt-5'>Really useful materials for studying and preparing for IELTS</div>
          </div>
        </div>
      </div>
      <div className='mainsection3 '>
        <div className='mainsectiontext3 text-6xl absolute lg:left-10 xl:left-32 lg:top-16 xl:top-12 font-semibold'>Get Instant Essay <span className='text-[#c7200b]'>Scores!</span> Improve your <span className='text-[#c7200b]'>Writing Today!</span></div>
        <Link to='/login'>
          <button className='mainsectionbtn3 btn btn-primary  text-white mt-5 w-44 h-20 xl:text-2xl lg:text-xl absolute '>Join Now!</button>
        </Link>
      </div>
        <div className='footerbg bg-[#EAEAEA] w-screen h-24 absolute '>
          <div className='flex justify-center h-24 items-center text-[#c7200b]'>©2023 EdifAI  Technologies, Inc.</div>
          <div className='footertext text-[#C7200B] w-40 font-medium '>Made in Kazakhstan🇰🇿 brought to you by<span> </span><a href='https://www.linkedin.com/in/bahauddintoleu/' className='underline'>Bahauddin</a></div>
        </div>
        <img src={NfacIcon} className='nfacicon'></img>
      <Landing1 ></Landing1>
      <TriangleIcon></TriangleIcon>
      </div>
    </div>
  );
};
