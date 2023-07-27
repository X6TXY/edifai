import axios from "axios";
import React, { useState } from "react";
import { host_url } from "../../../urls.jsx";
import { Sidebar } from "../../sidebar";
import "./tips.css";

export const Storybot = () => {
  const [inputValue, setInputValue] = useState("");
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="storybotworkingspace ">
        <div className="storybotheading font-bold text-[#c7200b]">
          Enjoy Storybot
        </div>
        <div className="flex justify-center ">
          <div className="storybottext text-black border ">
            <div className="flex justify-center p-3 font-md drop-shadow-md">
              In a lush glade, a golden key unlocked a portal to a world of
              enchantment. Write a word and unlock the world of enchantment
            </div>
          </div>
        </div>
        <div className="flex justify-center ">
          <form onSubmit={handleSubmit}>
            <input
              className="storybotinputarea rounded drop-shadow-md h-12 p-3 text-black"
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
              className="drop-shadow-md mt-10 h-12 w-3/4"
            >
              <source src={audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : null}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
