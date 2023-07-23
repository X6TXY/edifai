import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-github-contribution-calendar';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar';
import './home.css';

export const Home = () => {
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleString('en-US', options);
  const [until, setUntil] = useState(new Date().toISOString().split('T')[0]);
  const [values, setValues] = useState({});
  const panelColors = [
    '#f5f5f5',
    '#F7B4BB',
    '#F46D75',
    '#C7002B',
    '#a31000'
  ];

  const motivationalPhrases = [
    'Start now, no regrets.',
    'Take the first step.',
    'Embrace the challenge, begin.',
    'Just start, make progress.',
    'Begin the journey today.'
  ];

  useEffect(() => {
    // Fetch the data from the API endpoint
    const user_token = localStorage.getItem('token');
    axios.get('http://localhost:8000/wtask2/get_dates', {
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    })
      .then((response) => {
        // Extract the values from the response data
        const data = response.data;
        const calendarValues = {};
        for (const date in data) {
          calendarValues[date] = data[date];
        }
        // Update the values state
        setValues(calendarValues);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login page)
          console.error('Unauthorized');
        } else {
          // Handle other errors
          console.error(error);
        }
      });
  }, []);

  // Select a random motivational phrase from the array
  const randomMotivationalPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

  return (
    <div className='w-screen h-screen bg-[#f5f5f5]'>
      <div className='xl:w-4/5 lg:w-4/5 md:w-3/4 sm:w-2/3 w-2/3 h-screen absolute -right-0 bg-[#f5f5f5]'>
        <div className='heading'>
          <h1 className='home mt-7 text-black text-3xl font-semibold'>Home</h1>
        </div>
        <div className='hello flex justify-center flex-col'>
          <div className='date flex justify-center text-xl font-medium mb-3'>{formattedDate}</div>
          <div className='wrapper'>
            <div className='typing-demo mb-0 md:mb-6 flex justify-center xl:text-3xl lg:text-2xl font-medium'>
              Hello<span className='text-[#C7002B]'>, Dear friend</span>.
            </div>
          </div>
        </div>
        <div className='motivation'>
          <div className='rectposition flex justify-center'>
            <div className='rectmot bg-white drop-shadow'>
              <h2 className='mottext xl:text-2xl lg:text-2xl font-medium'>{randomMotivationalPhrase}</h2>
              <Link to='/study/writing/task2'>
                <button className='start rofl btn btn-primary text-white normal-case text-xl'>
                  Start Now!
                </button>
              </Link>
            </div>
          </div>
          <div className='calendar bg-white xl:h-36 lg:h-32 md:h-28 w-4/6 p-6 flex justify-center items-center mt-96 drop-shadow-md'>
            <Calendar values={values} until={until} panelColors={panelColors} className='xl:h-32 md:h-24 lg:h-28' />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};