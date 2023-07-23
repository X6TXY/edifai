import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ReactComponent as LfArrow } from '../../../assets/leftarrow.svg';
import { ReactComponent as RtArrow } from '../../../assets/rightarrow.svg';
import { Navbar } from '../Navbar';
import './history.css';

export const History = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const responsesPerPage = 9;
  const [responseCardVisible, setResponseCardVisible] = useState(false);

  useEffect(() => {
    // Fetch responses data from the backend API
    const user_token = localStorage.getItem('token');
    axios
      .get('http://localhost:8000/wtask2/get_responses', {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      })
      .then((response) => {
        setResponses(response.data);
        // Show response cards with animation after a short delay (e.g., 300ms)
        setTimeout(() => {
          setResponseCardVisible(true);
        }, 30);
      })
      .catch((error) => {
        console.error('Error fetching responses:', error);
      });
  }, []);

  // Function to open the modal for a specific response
  const openModal = (response) => {
    setSelectedResponse(response);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedResponse(null);
  };

  // Calculate the index of the last response for the current page
  const indexOfLastResponse = currentPage * responsesPerPage;
  // Calculate the index of the first response for the current page
  const indexOfFirstResponse = indexOfLastResponse - responsesPerPage;
  // Get the current responses to display on the page
  const currentResponses = responses.slice(indexOfFirstResponse, indexOfLastResponse);

  // Function to handle pagination (change page)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-screen h-screen  bg-[#f5f5f5]'>
      <div className='grid grid-cols-1 xl:w-4/5 lg:w-4/5 md:w-3/4 sm:w-2/3 w-2/3 h-screen absolute -right-0 bg-[#f5f5f5]'>
        <div className='flex justify-center text-5xl mt-5 font-bold text-[#c7200b]'>History</div>
        <div className='absolute lg:mt-20 xl:mt-24 parent mx-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {currentResponses.map((response, index) => (
            <div
              key={response.id}
              className={`response-card bg-white shadow-md rounded-md p-4 max-h-60 lg:max-h-56 grid grid-col-0.5 ${responseCardVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 150}ms` }} // Adjust animation delay for each card
            >
              <p className=''><span className='font-bold text-[#c7200b]'>Date: </span> {response.date}</p>
              <p className=''><span className='font-bold text-[#c7200b]'>Essay:</span> {response.request.split(' ').slice(0, 5).join(' ')}...</p>
              <p className=''><span className='font-bold text-[#c7200b]'>Feedback:</span> {response.response.split(' ').slice(0, 5).join(' ')}...</p>
              <p className=''><span className='font-bold text-[#c7200b]'>Score:</span> {response.score}</p>
              <div className='w-40 mx-auto'>
                <button className='btn btn-primary mt-3 text-white mx-auto' onClick={() => openModal(response)}>More information</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className='grid grid-cols-3 w-40 absolute lg:bottom-3 xl:bottom-8 left-1/3 lg:ml-24 xl:ml-28 h-12   '>
          <button
            className='btn btn-primary xl:h-12 lg:10 rounded-3xl'
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <LfArrow></LfArrow>
          </button>
          <span className='h-12 flex justify-center items-center rounded-3xl p-4 bg-gray-200 text-xl '>{currentPage}</span>
          <button
            className='h-12 btn btn-primary rounded-3xl'
            disabled={indexOfLastResponse >= responses.length}
            onClick={() => paginate(currentPage + 1)}
          >
            <RtArrow></RtArrow>
          </button>
        </div>
      </div>
      {selectedResponse && (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${selectedResponse ? '' : 'modal-hidden'}`}>
          <div className='modal-card bg-white w-4/5 rounded-md p-4 transform transition-all ease-in-out'>
            <p className=''><span className='font-bold text-[#c7200b]'>Date: </span>{selectedResponse.date}</p>
            <p className='mt-2'><span className='font-bold text-[#c7200b]'>Essay:</span> {selectedResponse.request}</p>
            <p className='mt-2'><span className='font-bold text-[#c7200b]'>Feedback:</span> {selectedResponse.response}</p>
            <p className='mt-2'><span className='font-bold text-[#c7200b]'>Score:</span> {selectedResponse.score}</p>
            <div className='w-40 mx-auto mt-3'>
              <button className='btn btn-primary text-white mx-auto' onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      <Navbar selectedResponse={selectedResponse} className='fixed ' />
    </div>
  );
};
