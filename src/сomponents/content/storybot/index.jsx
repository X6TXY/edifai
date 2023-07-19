import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navbar } from '../Navbar';
import './tips.css';

export const Storybot = () => {
  const [inputValue, setInputValue] = useState('');
  const [audio, setAudio] = useState(null);
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
      const response = await axios.get('http://localhost:8000/storybot/generate_story', {
        params: {
          request: inputValue
        },
        responseType: 'arraybuffer'
      });

      const audioData = new Blob([response.data], { type: 'audio/mpeg' });
      const audioURL = URL.createObjectURL(audioData);

      setAudio(audioURL);
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
            Imagination
          </div>
          <div className='headinginfoielst text-[#7C3BCF] font-bold flex justify-center text-5xl '>
            Enjoy Storybot
          </div>
          <div className='helparea flex justify-center items-center'>
            <form onSubmit={handleSubmit}>
              <input
                className='input1 rounded  drop-shadow-md h-12 w-96 p-3'
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Enter your word'
              />
              <button type='submit' className='buttonsub btn-primary border drop-shadow-md h-12 p-3 '>
                Submit
              </button>
            </form>
          </div>
          <div className='w-4/5 flex justify-center items-center ml-24'>
            {isLoading ? (
              <div id="loader">
                <div id="box"></div>
                <div id="hill"></div>
            </div>
            ) : audio ? (
              <audio controls autoPlay className='drop-shadow-md mt-10 h-12 w-96'>
                <source src={audio} type='audio/mpeg' />
                Your browser does not support the audio element.
              </audio>
            ) : null}
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
};
