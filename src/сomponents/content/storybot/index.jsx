import axios from "axios";
import React, { useEffect, useState } from "react";
import { host_url } from "../../../urls.jsx";
import { Sidebar } from "../../sidebar";
import "./tips.css";

export const Storybot = () => {
  const [inputValue, setInputValue] = useState("");
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Update dots animation
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);

    return () => {
      // Clean up interval
      clearInterval(intervalId);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(`${host_url}/storybot/generate_story`, {
        params: {
          request: inputValue,
        },
        responseType: "arraybuffer",
      });

      const audioData = new Blob([response.data], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(audioData);

      setAudio(audioURL);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="h-screen w-screen bg-[#f5f5f5]">
        <div className="xl:w-4/5 lg:w-4/5 md:w-3/4 sm:w-2/3 w-full h-screen absolute right-0 bg-[#f5f5f5] text-black">
          <div className="mt-10 headinginfoielst text-[#C7002B] font-bold flex justify-center text-5xl">
            Enjoy Storybot
          </div>
          <div className="flex justify-center mt-20">
            <div className="bg-white p-5 flex justify-center w-3/4 drop-shadow-md rounded font-medium">
              In a lush glade, a golden key unlocked a portal to a world of
              enchantment. Write a word and unlock the world of enchantment
            </div>
          </div>
          <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit}>
              <input
                className="input1 rounded drop-shadow-md h-12 p-3"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter your word"
              />
              <button
                type="submit"
                className="buttonsub btn-primary border drop-shadow-md h-12 p-3"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center">
            {isLoading ? (
              <div role="status" className="space-y-2.5 animate-pulse w-3/5">
                <div className="flex items-center space-x-2 mt-10 bg-white h-10 p-4 rounded drop-shadow-md">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : audio ? (
              <audio
                controls
                autoPlay
                className="drop-shadow-md mt-10 h-12 w-96"
              >
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
