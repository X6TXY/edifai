import React from 'react';
import { ReactComponent as HelpIcon } from '../../../assets/help.svg';
import { ReactComponent as HistoryIcon } from '../../../assets/history.svg';
import { ReactComponent as HomeIcon } from '../../../assets/home.svg';
import { ReactComponent as InfoIcon } from '../../../assets/info.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/logout.svg';
import { ReactComponent as StudyIcon } from '../../../assets/study.svg';
import { ReactComponent as TipsIcon } from '../../../assets/tips.svg';
import './navbar.css';

export const Navbar = () => { 
  return (
    <div className="flex h-screen ">
      <div className="rect w-1/5  bg-[#edeaea]">
        <div className="flex items-center justify-center mt-8  text-black text-2xl font-semibold">
          <a href='/home'>Edif<span className=' text-[#7C3BCF]'>AI</span></a>
        </div>
        <ul className="mt-8">
          <li className='hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md'>
            <a href="/home" className="flex items-center px-4 py-2 mt-2 text-black rounded">
              <HomeIcon className="svg w-5 h-5 mr-2 rounded" />
              Home
            </a>
          </li>
          <li className="mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md">
            <a href="/study" className="flex items-center px-4 py-2 text-black rounded">
              <StudyIcon className='svg w-5 h-5 mr-2 rounded' />
              Study
            </a>
          </li>
          <li className="mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md">
            <a href="/history" className="flex items-center px-4 py-2 text-black rounded">
              <HistoryIcon className='svg w-5 h-5 mr-2 rounded' />
              History
            </a>
          </li>
          <li className="mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md">
            <a href="/storybot" className="flex items-center px-4 py-2 text-black rounded">
              <TipsIcon className='svg w-5 h-5 mr-2' />
              Storybot
            </a>
          </li>
          <li className="mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md">
            <a href="/info" className="flex items-center px-4 py-2 text-black rounded">
              <InfoIcon className='svg w-5 h-5 mr-2' />
              Info
            </a>
          </li>
          <li className="mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md">
            <a href="/help" className="flex items-center px-4 py-2 text-black rounded">
              <HelpIcon className='svg w-5 h-5 mr-2' />
              Help
            </a>
          </li>
          <li>
            <div className="logout absolute flex justify-center px-4 py-2 text-black  w-1/5">
              <a href='/' className='flex justify-center w-44 hover:bg-red-500   transition-colors duration-500 rounded-full'>
                <LogOutIcon className='svg w-5 h-5 mr-2' />
                Log Out
              </a>
            </div>
          </li>
        </ul>
        
      </div>
    </div>
    
  );
};

