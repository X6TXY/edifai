import React, { useEffect, useState } from "react";
import { Sidebar } from "../../sidebar";
import "./info.css";

export const Info = () => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const textToType =
      "The main goal of this project is to help prepare for IELTS. There is also a share of entertaining material here. I hope users will enjoy using it. In the future, the project will be developed, and new functions will be added to it. Good luck!";
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex <= textToType.length) {
        setTypedText(textToType.slice(0, currentIndex));
        currentIndex++;
        setTimeout(typeText, 20); // Adjust the typing speed here (milliseconds per character)
      }
    };

    typeText();
  }, []);

  return (
    <div className="w-screen h-screen bg-[#f5f5f5]">
      <div className="min-h-screen text-black  xl:w-4/5 lg:w-4/5 md:w-3/4 sm:w-2/3 w-2/3 absolute -right-0 bg-[#f5f5f5] flex justify-center items-center">
        <div className="w-full max-w-2xl p-4">
          <h3 className="bg-[#c7200b] text-white rounded text-2xl sm:text-3xl md:text-4xl p-2 text-center mt-6 fade-in">
            Main Idea
          </h3>
          <div className="rounded bg-white shadow-md p-4 mt-2 text-xl sm:text-2xl font-semibold">
            {typedText}
          </div>
          <h3 className="bg-[#c7200b] text-white rounded text-2xl sm:text-3xl md:text-4xl p-2 text-center mt-6">
            About
          </h3>
          <div className="rounded bg-white shadow-md p-4 mt-2"></div>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};
