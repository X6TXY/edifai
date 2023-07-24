import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../../../sidebar';
import './task2.css';

export const Task2 = () => {
  const [inputText, setInputText] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(40 * 60); // 40 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0); // Initial score value
  const [showHintModal, setShowHintModal] = useState(false);

  const closeHintModal = () => {
    setShowHintModal(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleButtonClick = () => {
    const user_token = localStorage.getItem('token');
    setIsLoading(true); // Set loading state to true
    axios
      .post('http://localhost:8000/wtask2/get_answer', {
        request: inputText,
      }, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      })
      .then((response) => {
        const responseData = response.data;
        // Update the state with the response data
        setResponseText(responseData.response);
        const newScore = responseData.score; // Assuming the score is included in the response data
        setScore(newScore); // Update the score state with the new score
      })
      .catch((error) => {
        console.error(error);
        // Handle errors
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false
      });
  };

  const submitScore = () => {
    // Implement the score submission logic here
    // You can use the score and any other relevant data to calculate the final score
    // Send the score to the server or perform any other required actions
    console.log('Score submitted:', score);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimer(40 * 60); // Reset the timer to 40 minutes in seconds
    setIsTimerRunning(false);
  };

  useEffect(() => {
    let intervalId;
    if (isTimerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(intervalId);
            submitScore(); // Call submitScore function when the timer reaches 0
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    setShowHintModal(true);
  }, []);
  
  return (
    <div>
      
      <div className='h-screen w-screen bg-[#f5f5f5]'>
        <div className='w-4/5 h-screen absolute right-0 bg-[#f5f5f5] text-black'>  
          <button
            className='btn btn-primary buttonsubmit1 border-none text-white hover:bg-red-600 transition-colors duration-500'
            onClick={handleButtonClick}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
          
          <div className='headingstudy mt-7 text-black text-3xl font-semibold'>
            Writing Task 2
          </div>
          
          <div className=' h-4/5'>
            <textarea
              className='textareatask2 absolute w-2/5 p-4 text-lg resize-none border border-gray-300 drop-shadow-md rounded ml-20'
              placeholder='Write your essay'
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <div className='textareatask2r bg-white border rounded border-gray-300 w-2/5 text-black drop-shadow-md overflow-auto'>
              <p className='bg-white ml-5 mt-3 font-semibold '>Response:</p>
              {isLoading ? (
                <div role="status" className="space-y-2.5 animate-pulse max-w-lg p-3">
                <div className="flex items-center  w-full space-x-2">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[400px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-80"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[440px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[360px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[500px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-40"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                 <div className="flex items-center  w-full space-x-2">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                </div>
                <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[400px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-80"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[440px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[360px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                </div>
                <div className="flex items-center  space-x-2 max-w-[500px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-40"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                </div>
                <span className="sr-only">Loading...</span>
            </div>
              ) : (
                <div className='text-black p-4 mb-4'>{responseText}</div>
              )}
              
            </div>
            <div className='timer1 w-40 h-20   drop-shadow-md'>
            <div className='timer text-white flex justify-center items-center mt-3 text-xl mb-2'>{formatTime(timer)}</div>
            <div className='buttons flex justify-center items-center'>
            {!isTimerRunning && timer !== 0 && (
              <button onClick={startTimer} className='starttimer bg-emerald-400 w-16 rounded text-white hover:bg-emerald-600'>Start</button>
            )}
            {isTimerRunning && (
              <button onClick={pauseTimer} className='bg-yellow-400 w-16 rounded hover:bg-yellow-600 text-white'>Pause</button>
            )}
            {!isTimerRunning && timer !== 40 * 60 && (
              <button onClick={resetTimer} className='bg-orange-600 w-16 rounded text-white hover:bg-red-700'>Reset</button>
            )}
          </div>
          </div>
          <div className='score-section bg-[#C7002B] w-28  flex justify-center items-center rounded-md drop-shadow-md '>
            <p className='text-lg font-semibold text-white p-1 '>Score: {score}</p>
          </div>
          </div>
        </div>
        <Sidebar className='' />
        {showHintModal && (
        <div className="h-screen w-screen flex justify-center items-center fixed inset-0">
          <div className="modal-container p-4 rounded">
            <div className="buttonhint w-screen flex justify-center">
              <div className="modal-container  bg-gray-600 bg-opacity-75  p-4 rounded">
                <p className='text-[#c7200b] font-medium text-2xl w-full rounded bg-opacity-90 bg-gray-400 p-5 flex justify-center'>Warning: AI assessment may not be fully accurate. Remember, artificial intelligence evaluates your essay, but human evaluation remains invaluable.</p>
                <p className="font-semibold text-xl mb-4 text-white mt-3">Hints for IELTS Task 2:</p>
                <p className="text-md text-white">
                  - You have 40 minutes to write the essay in the IELTS Task 2.
                </p>
                <p className="text-md text-white">
                  - The time limit is set to assess your ability to express your ideas
                  effectively within a reasonable timeframe.
                </p>
                <p className="text-md text-white">
                  - Use the time wisely to plan, write, and revise your essay
                  adequately.
                </p>
                <p className="text-md text-white">- Make sure to address the given topic.</p>
                <p className="text-md text-white">
                  - You will be evaluated based on your response's coherence,
                  cohesion, vocabulary, grammar, and overall argument quality.
                </p>
                <p className="text-md text-white">
                  - Remember to have an introduction, body paragraphs, and a
                  conclusion in your essay.
                </p>
                <p className="text-md text-white">- Use formal language and avoid slang.</p>
                <p className="text-md text-white">
                  - Focus on presenting a well-structured and organized essay.
                </p>
                <p className="text-md text-white">
                  - You can choose any topic; just write "Topic:" and then provide
                  your essay on that topic.
                </p>
                
                <div className="flex justify-center">
                  <button
                    onClick={closeHintModal}
                    className="btn btn-primary mt-4 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
