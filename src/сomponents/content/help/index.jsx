import axios from "axios";
import React, { useState } from "react";
import { host_url } from "../../../urls.jsx";
import { Sidebar } from "../../sidebar";

import "./help.css";

export const Help = () => {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.post(`${host_url}/helpbot/get_answer`, {
        request: inputValue,
      });
      const answer = response.data.response;
      setAnswer(answer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false
      setInputValue("");
    }
  };

  return (
    <div>
      <div className="assistantworkingspace ">
        <div className="assistantheading text-[#c7200b] font-bold">
          IELTS Information
        </div>
        <div className="flex justify-center ">
          <div className="assistanttext text-black p-3 border">
            Get IELTS info and resources from our helpful bot! Ace the exam with
            tips and study materials.
          </div>
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <input
              className="assistantinputarea mt-5 drop-shadow-md h-12 p-3 rounded  text-black "
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your question"
            />
            <button
              type="submit"
              className="buttonsub btn-primary border drop-shadow-md h-12 p-3"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex justify-center">
          {isLoading ? (
            <div className=" bg-white border drop-shadow-md w-1/2 flex justify-center p-2 mt-5">
              <div
                role="status"
                class="space-y-2.5 animate-pulse max-w-lg w-full"
              >
                <div class="flex items-center w-full space-x-2 ">
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-44"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <div class="flex items-center w-full space-x-2 max-w-[480px]">
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
                </div>
                <div class="flex items-center w-full space-x-2 max-w-[400px]">
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <div class="flex items-center w-full space-x-2 max-w-[480px]">
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
                </div>
                <div class="flex items-center w-full space-x-2 max-w-[440px]">
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-32"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24"></div>
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-full"></div>
                </div>
                <div class="flex items-center w-full space-x-2 max-w-[360px]">
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 w-full"></div>
                  <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-80"></div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : answer ? (
            <div className="assitantanser w-1/2 overflow-auto h-96 mt-5  p-3 bg-white border  text-black ">
              {answer}
            </div>
          ) : null}
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
