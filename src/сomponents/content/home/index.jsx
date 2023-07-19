import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-github-contribution-calendar';
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
    '#d4b9ec',
    '#a575d8',
    '#7C3BCF',
    '#5a269c'
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

  return (
    <div className='w-screen h-screen bg-[#f5f5f5]'>
      <div className='w-4/5 h-screen absolute -right-0 bg-[#f5f5f5]'>
        <div className='heading'>
          <h1 className='home mt-7 text-black text-3xl font-semibold'>Home</h1>
        </div>
        <div className='hello flex justify-center flex-col'>
          <div className='date flex justify-center text-xl font-medium'>{formattedDate}</div>
          <div className='wrapper'>
            <div className='typing-demo flex justify-center text-3xl font-medium'>
              Hello<span className='text-[#7C3BCF]'>, Dear friend</span>.
            </div>
          </div>
        </div>
        <div className='motivation'>
          <div className='rectposition flex justify-center'>
            <div className='rectmot bg-white drop-shadow'>
              <h2 className='mottext text-2xl font-medium'>Motivation text</h2>
              <button className='start btn btn-primary hover:text-white normal-case text-xl'>Start</button>
            </div>
          </div>
          <div className='calendar bg-white h-32 w-4/6 p-6 flex justify-center items-center mt-96 drop-shadow-md'>
            <Calendar values={values} until={until} panelColors={panelColors} />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};
