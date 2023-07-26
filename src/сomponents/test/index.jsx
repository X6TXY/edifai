import axios from 'axios';
import { useEffect, useState } from 'react';
import { host_url } from '../../urls';
import { Sidebar } from '../sidebar';
import './test.css';

export const Test = () => {
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
      .post(`${host_url}/wtask2/get_answer`, {
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

  // Add this event listener to close the modal when clicking on the backdrop
  const handleBackdropClick = (e) => {
    // Check if the click target is the backdrop itself (not its children)
    if (e.target === e.currentTarget) {
      closeHintModal();
    }
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
      <div className='text-black '>
        <div className='workingspacestudy '>
  
          <div className='headingstudy font-bold'>
            Writing Task 2 
          </div>
          <div className='flex justify-center'>
            <div className='workingspacewriting'>
              <div className='workingsectionwriting'>
              <div className='textareawritingsection'>
                <textarea
                  className='textareawriting resize-none border border-gray-300 drop-shadow-md rounded p-3 '
                  placeholder='Write your essay'
                  value={inputText}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              </div>
              <div className='responsearea '>
                <div className='responseareabg border borde-gray-300 bg-white drop-shadow-md rounded'>
                  <p className='bg-white  font-semibold p-3 '>Response:</p>
                </div>
              </div>

            </div>
          </div>
          <div className='button-container'>
              <button
                className='btn btn-primary  border-none text-white hover:bg-red-600 transition-colors duration-500'
                onClick={handleButtonClick}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
        </div>
          
        <Sidebar className='' />
      </div>
    </div>
  );
};
