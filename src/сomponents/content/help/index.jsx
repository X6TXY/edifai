import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar';
import './help.css';

export const Help = () => {
  const [inputValue, setInputValue] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Update dots animation
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
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
      const response = await axios.post('http://localhost:8000/helpbot/get_answer', {
        request: inputValue
      });
      const answer = response.data.response;
      setAnswer(answer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false
      setInputValue('');
    }
  };

  return (
    <div>
      <div className='h-screen w-screen bg-[#f5f5f5]'>
        <div className='w-4/5 h-screen absolute right-0 bg-[#f5f5f5] '>
          <div className='headinghelp mt-7 text-black text-3xl font-semibold ml-4 '>
            Help
          </div>
          <div className='headinginfoielst text-[#7C3BCF] font-bold flex justify-center text-5xl '>
            IELTS Information
          </div>
          <div className='helparea flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
              <input
                className='input1 border drop-shadow-md h-12 w-96 p-3 rounded'
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Enter your question'
              />
              <button type='submit' className='buttonsub btn-primary border drop-shadow-md h-12 p-3'>
                Submit
              </button>
            </form>
          </div>
          <div className='flex justify-center items-center'>
            {isLoading ? (
              <div className='answer bg-white border drop-shadow-md'>
                <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
    <div class="flex items-center w-full space-x-2">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-32"></div>
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
              <div className='answer bg-white border drop-shadow-md'>{answer}</div>
            ) : null}
          </div>
        </div>
        
        <Navbar />
        
      </div>
    </div>
  );
};
