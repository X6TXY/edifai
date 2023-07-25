import React, { useEffect, useState } from "react";
import { ReactComponent as BarsIcon } from "../../assets/bars.svg";
import { ReactComponent as HelpIcon } from "../../assets/help.svg";
import { ReactComponent as HistoryIcon } from "../../assets/history.svg";
import { ReactComponent as HomeIcon } from "../../assets/home.svg";
import { ReactComponent as InfoIcon } from "../../assets/info.svg";
import { ReactComponent as LogOutIcon } from "../../assets/logout.svg";
import { ReactComponent as StudyIcon } from "../../assets/study.svg";
import { ReactComponent as TipsIcon } from "../../assets/tips.svg";
import { ReactComponent as XmarkIcon } from '../../assets/xmar.svg';
import "./sidebar.css";

export const Sidebar = ({ selectedResponse }) => {
  const currentPage = window.location.pathname;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [displaySize, setDisplaySize] = useState(window.innerWidth);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Perform any additional logout actions you might have here
    localStorage.removeItem("token"); // Remove 'token' from localStorage
    // Add any other code you want to execute when the user logs out
  };

  const checkDisplaySize = () => {
    setDisplaySize(window.innerWidth);
    setSidebarOpen(window.innerWidth < 768);
  };

  useEffect(() => {
    // Update the displaySize state and set the sidebar open state on component mount
    checkDisplaySize();

    // Add a listener to handle window resize events
    const handleResize = () => {
      checkDisplaySize();
    };
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={`sidebarbg ${isSidebarOpen ? "sidebar-open" : ""} text-black`}>
        {displaySize < 768 && (
          <div className="hamburger-menu">
            <div className="menustyle ">
              <button className="hamburger-button" onClick={toggleSidebar}>
              {isSidebarOpen ? <BarsIcon className="openicon "/> :  <XmarkIcon className="closeicon" />}

              </button>
            </div>
          </div>
        )}

        {isSidebarOpen ? null : (
          <>
            <a href="/home" className="sidebarheading font-semibold">
              Edif<span className="text-[#c7200b] ">AI</span>
            </a>
            <div className="flex justify-center">
              <hr className="line"></hr>
            </div>
          </>
        )}

        <ul className="mt-8">
          {isSidebarOpen ? null : (
            <>
              <li
                className={`${
                  currentPage === "/home" ? "bg-[#d9d9d9] " : ""
                }homesection  hover:bg-[#d9d9d9] transition-colors duration-500 rounded-xl`}
              >
                <a href="/home" className="sections   text-black rounded">
                  <HomeIcon className="icons" />
                  Home
                </a>
              </li>
              <li
                className={`${
                  currentPage === "/study/writing/task2" ? "bg-[#d9d9d9] " : ""
                }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-xl`}
              >
                <a href="/study/writing/task2" className="sections text-black rounded">
                  <StudyIcon className="icons" />
                  Study
                </a>
              </li>
              <li
                className={`${
                  currentPage === "/history" ? "bg-[#d9d9d9] " : ""
                }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-xl`}
              >
                <a href="/history" className="sections  text-black rounded">
                  <HistoryIcon className="icons" />
                  History
                </a>
              </li>
              <li
                className={`${
                  currentPage === "/storybot" ? "bg-[#d9d9d9] " : ""
                }mt-2 hover:bg-[#d9d9d9]  transition-colors duration-500 rounded-xl`}
              >
                <a href="/storybot" className="sections text-black rounded">
                  <TipsIcon className="icons" />
                  Storybot
                </a>
              </li>
              <li
                className={`${
                  currentPage === "/assistant" ? "bg-[#d9d9d9] " : ""
                } mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-xl`}
              >
                <a href="/assistant" className="sections text-black rounded">
                  <HelpIcon className="icons" />
                  Assistant
                </a>
              </li>
              <li
                className={`${
                  currentPage === "/about" ? "bg-[#d9d9d9] " : ""
                }mt-2 hover:bg-[#d9d9d9] transition-colors duration-500 rounded-xl`}
              >
                <a href="/about" className="sections text-black rounded">
                  <InfoIcon className="icons" />
                  About
                </a>
              </li>
              {!selectedResponse && (
                <li>
                  <div className="flex justify-center text-black  ">
                    <a
                        onClick={handleLogout}
                      href="/"
                      className="sections logoutsection hover:bg-red-600 p-2 rounded-md"
                    >
                      <LogOutIcon className="logouticon " />
                      Log Out
                    </a>
                  </div>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
