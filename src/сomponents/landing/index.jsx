import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AIIcon } from "../../assets/ailanding.svg";
import { ReactComponent as AnalyzeIcon } from "../../assets/analyzelanding.svg";
import { ReactComponent as CommentIcon } from "../../assets/comment.svg";
import { ReactComponent as DataIcon } from "../../assets/datalanding.svg";
import IeltsIcon from "../../assets/ieltsicon2.png";
import MainIcon from "../../assets/ieltsmainicon.png";
import { ReactComponent as Insta } from "../../assets/insta.svg";
import { ReactComponent as Landing1 } from "../../assets/landing1.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/linkedin.svg";
import Nfactorial from "../../assets/nfac.png";
import { ReactComponent as TimeIcon } from "../../assets/timelanding.svg";
import { ReactComponent as TriangleIcon } from "../../assets/trianglelanding.svg";
import "./landing.css";
import "./landing1.css";

export const Landing = () => {
  return (
    <div>
      <div className="backgroundlanding bg-[#f5f5f5] text-black ">
        <div className="flex justify-center">
          <div className="headinsection">
            <div className="headingicon text-black font-medium">
              Edif<span className="text-[#c7200b]">AI</span>
            </div>
            <a
              href="/login"
              className="loginbtn text-[#c7200b] border p-2 rounded-md border-[#c7200b] hover:underline"
            >
              Login
            </a>
          </div>
        </div>
        <div className="w-full relative flex justify-center">
          <div className="mainsection">
            <div className="mainsectiontext">
              <div className="mainsectionheading font-semibold">
                We take your score higher
              </div>
              <p className="secondarytext text-[#7C7A7A] font-medium">
                Prepare for the IELTS exam by practicing your skills with
                artificial intelligence
              </p>
              <div className="flex justify-center">
                <Link to="/login">
                  <button className="startbtn btn btn-primary text-white">
                    Start Now!
                  </button>
                </Link>
              </div>
            </div>
            <img src={MainIcon} className="firstimg" alt="IELTS Main Icon" />
          </div>
        </div>
        <div className="landingsection2 mt-5">
          <div className="flex justify-center">
            <div className="landingheading2 font-semibold">Why use EdifAI?</div>
          </div>
          <div className="flex justify-center rounded-xl drop-shadow-md mt-2">
            <div className="landingrect2 flex justify-center">
              <div className="sectionslanding justify-between mt-8">
                <div className="section">
                  <TimeIcon className="sectionicon"></TimeIcon>
                  <div className="sectionh font-medium mt-4">
                    Quickly get a Score
                  </div>
                  <div className="sectionp mt-3">
                    After submitting your essay, you can immediately receive
                    your score and feedback
                  </div>
                </div>
                <div className="section">
                  <AnalyzeIcon className="sectionicon"></AnalyzeIcon>
                  <div className="sectionh font-medium mt-4">
                    Analyze your mistakes
                  </div>
                  <div className="sectionp mt-3">
                    Watch your progress. And watch out for your first essays
                  </div>
                </div>
                <div className="section">
                  <AIIcon className="sectionicon"></AIIcon>
                  <div className="sectionh font-medium mt-4">
                    Special project
                  </div>
                  <div className="sectionp mt-10">
                    The first product that uses AI to prepare for IELTS
                  </div>
                </div>
                <div className="section">
                  <DataIcon className="sectionicon1"></DataIcon>
                  <div className="sectionh font-medium mt-4">
                    Take recent actual resources
                  </div>
                  <div className="sectionp mt-3">
                    Really useful materials for studying and preparing for IELTS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center mt-4">
          <div className="mainsection3">
            <div className="mainsectiontext">
              <div className="mainsectionh font-semibold flex justify-center items-center">
                Get Instant Essay Scores! Improve your Writing Today!
              </div>
              <div className="flex justify-center mt-10">
                <Link to="/login">
                  <button className="buttonjoin btn btn-primary text-white lg:h-20 lg:w-40 xl:text-xl">
                    JOIN NOW!
                  </button>
                </Link>
              </div>
            </div>
            <img src={IeltsIcon} className="firstimg1" alt="IELTS Main Icon" />
          </div>
        </div>
        <footer class="fixed bottom-0 left-0 z-20 w-full p-6 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 ">
          <span class="text-sm text-black sm:text-center ">
            © 2023{" "}
            <a href="https://edifai.vercel.app/" class="hover:underline">
              EdifAI™
            </a>
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-black sm:mt-0">
            <li>
              <a
                href="https://forms.gle/tsXoX7ncaXgdjS9n8"
                className="mr-4 flex items-center hover:underline md:mr-6"
              >
                <CommentIcon className="lg:w-8 lg:h-8 sm:h-5 sm:w-5 w-5 h-5" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/bahauddintoleu/"
                class="mr-4 hover:underline md:mr-6 flex items-center"
              >
                <LinkedinIcon className="lg:w-8  lg:h-8 sm:h-5 sm:w-5 w-5 h-5" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/x6txy/"
                className="mr-4 flex items-center hover:underline md:mr-6"
              >
                <Insta className="lg:w-8  lg:h-8 sm:h-5 sm:w-5 w-5 h-5" />
              </a>
            </li>

            <li>
              <a
                href="https://www.nfactorial.live/"
                class="flex items-center hover:underline "
              >
                <img
                  src={Nfactorial}
                  className="lg:w-8  lg:h-8 sm:h-5 sm:w-5 w-5 h-5"
                />
              </a>
            </li>
          </ul>
        </footer>
        <Landing1></Landing1>
        <TriangleIcon></TriangleIcon>|
      </div>
    </div>
  );
};
