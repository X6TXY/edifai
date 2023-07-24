import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as AIIcon } from '../../assets/ailanding.svg';
import { ReactComponent as AnalyzeIcon } from '../../assets/analyzelanding.svg';
import { ReactComponent as DataIcon } from '../../assets/datalanding.svg';
import IeltsIcon from '../../assets/ieltsicon2.png';
import MainIcon from '../../assets/ieltsmainicon.png';
import { ReactComponent as Landing1 } from '../../assets/landing1.svg';
import { ReactComponent as TimeIcon } from '../../assets/timelanding.svg';
import { ReactComponent as TriangleIcon } from '../../assets/trianglelanding.svg';
import './test.css';

export const Test = () => {
  return (
    <div>
      <div className='backgroundlanding bg-[#f5f5f5] text-black '>
        <div className='flex justify-center'>
          <div className='headinsection'>
            <div className='headingicon text-black font-medium'>Edif<span className='text-[#c7200b]'>AI</span></div>
            <a href='/login' className='loginbtn text-[#c7200b] border p-2 rounded-md border-[#c7200b] hover:underline'>Login</a>
          </div>
        </div>
        <div className='w-full relative flex justify-center'>
          <div className='mainsection'>
            <div className='mainsectiontext'>
              <div className='mainsectionheading font-semibold'>We take your score higher</div>
              <p className='secondarytext text-[#7C7A7A] font-medium'>Prepare for the IELTS exam by practicing your skills with artificial intelligence</p>
              <div className='flex justify-center'>
                <Link to='/login'>
                  <button className='btn btn-primary text-white'>Start Now!</button>
                </Link>
              </div>
            </div>
            <img src={MainIcon} className='firstimg' alt="IELTS Main Icon" />
          </div>
        </div>
        <div className='landingsection2'>
          <div className='flex justify-center'>
            <div className='landingheading2 font-semibold'>Why use EdifAI?</div>
          </div>
          <div className='flex justify-center rounded-xl drop-shadow-md mt-2'>
            <div className='landingrect2 flex justify-center'>
              <div className='sectionslanding justify-between mt-8'>
                <div className='section'>
                  <TimeIcon className='sectionicon'></TimeIcon>
                  <div className='sectionh font-medium mt-4'>Quickly get a Score</div>
                  <div className='sectionp mt-3'>After submitting your essay, you can immediately receive your score and feedback</div>
                </div>
                <div className='section'>
                  <AnalyzeIcon className='sectionicon'></AnalyzeIcon>
                  <div className='sectionh font-medium mt-4'>Analyze your mistakes</div>
                  <div className='sectionp mt-3'>Watch your progress. And watch out for your first essays</div>
                </div>
                <div className='section'>
                  <AIIcon className='sectionicon'></AIIcon>
                  <div className='sectionh font-medium mt-4'>Special project</div>
                  <div className='sectionp mt-10'>The first product that uses AI to prepare for IELTS</div>
                </div>
                <div className='section'>
                  <DataIcon className='sectionicon1'></DataIcon>
                  <div className='sectionh font-medium mt-4'>Take recent actual resources</div>
                  <div className='sectionp mt-3'>Really useful materials for studying and preparing for IELTS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=' flex justify-center items-center'>
          <div className='mainsection3'>
            <div className='mainsectiontext'>
              <div className='mainsectionh font-semibold flex justify-center items-center'>Get Instant Essay Scores! Improve your Writing Today!</div>
              <div className='flex justify-center mt-10'>
                <Link to='/login'>
                  <button className='buttonjoin btn btn-primary text-white lg:h-20 lg:w-40 xl:text-xl'>JOIN NOW!</button>
                </Link>
              </div>
            </div>
            <img src={IeltsIcon} className='firstimg1' alt="IELTS Main Icon" />
          </div>
        </div>
        
        <Landing1 ></Landing1>
        <TriangleIcon></TriangleIcon>
      </div>
    </div>
  );
};
