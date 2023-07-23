import React from 'react';
import { ReactComponent as HelpIcon } from '../../../assets/help.svg';
import { ReactComponent as HistoryIcon } from '../../../assets/history.svg';
import { ReactComponent as HomeIcon } from '../../../assets/home.svg';
import { ReactComponent as InfoIcon } from '../../../assets/info.svg';
import { ReactComponent as LogOutIcon } from '../../../assets/logout.svg';
import { ReactComponent as StudyIcon } from '../../../assets/study.svg';
import { ReactComponent as TipsIcon } from '../../../assets/tips.svg';
import './navbar.css';

export const Navbar = ({ selectedResponse }) => {
  const currentPage = window.location.pathname;

  return (
    <div className="flex h-screen  ">
      <div className="rect w-1/5 xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 bg-[#edeaea]">
        <div className=" ml-4 mt-8 text-black xl:text-2xl lg:text-2xl sm:text-md  font-semibold">
          <a href="/home">
            Edif<span className="text-[#C7200B]">AI</span>
          </a>
        </div>
        <ul className="mt-8">
          <li
            className={`${
              currentPage === '/home' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/home" className="flex items-center px-4 py-2 text-black rounded">
              <HomeIcon className="svg w-5 h-5 mr-2 rounded" />
              Home
            </a>
          </li>
          <li
            className={`${
              currentPage === '/study' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/study" className="flex items-center px-4 py-2 text-black rounded">
              <StudyIcon className="svg w-5 h-5 mr-2 rounded" />
              Study
            </a>
          </li>
          <li
            className={`${
              currentPage === '/history' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/history" className="flex items-center px-4 py-2 text-black rounded">
              <HistoryIcon className="svg w-5 h-5 mr-2 rounded" />
              History
            </a>
          </li>
          <li
            className={`${
              currentPage === '/storybot' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/storybot" className="flex items-center px-4 py-2 text-black rounded">
              <TipsIcon className="svg w-5 h-5 mr-2" />
              Storybot
            </a>
          </li>
          <li
            className={`${
              currentPage === '/assistant' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/assistant" className="flex items-center px-4 py-2 text-black rounded">
              <HelpIcon className="svg w-5 h-5 mr-2" />
              Assistant
            </a>
          </li>
          <li
            className={`${
              currentPage === '/about' ? 'bg-[#d9d9d9] ' : ''
            }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-md`}
          >
            <a href="/about" className="flex items-center px-4 py-2 text-black rounded">
              <InfoIcon className="svg w-5 h-5 mr-2" />
              About
            </a>
          </li>
          {!selectedResponse && (
            <li>
              <div className="logout absolute flex justify-center px-4 py-2 text-black  w-1/5">
                <a
                  href="/"
                  className="flex justify-center lg:text-lg xl:text-xl md:text-md xl:w-44 lg:w-40 md:w-36 sm:w-32 hover:bg-red-500   transition-colors duration-500 rounded-full"
                >
                  <LogOutIcon className="svg w-5   h-5 mr-2" />
                  Log Out
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
