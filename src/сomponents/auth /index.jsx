import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HideIcon } from '../../assets/hide.svg';
import Ieltsicon from '../../assets/ishard.webp';
import { ReactComponent as ShowIcon } from '../../assets/show.svg';
import './auth.css';


export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  const signInUpSectionRef = useRef(null);
  const endSectionRef = useRef(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (password !== confirmPassword) {
        console.log("Password and confirm password do not match");
        return;
      }

      try {
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `http://localhost:8000/auth/users?email=${username}&password=${password}`,
          headers: { 
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setIsRegistrationSuccessful(true);
          })
          .catch((error) => {
            console.log(error);
            setIsUsernameTaken(true);
          });
        
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }  else {
      try {
        console.log(typeof username, typeof password)
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        
        const response = await axios.post("http://localhost:8000/auth/users/tokens", {
          username: username,
          password: password,
        }, config);

        console.log(response)
        console.log(response.data);

        // Save the token to local storage or a state variable for later use
        const token = response.data.access_token;
        console.log(token)
        localStorage.setItem('token', token);
        
        // Redirect to /home after successful sign-in
        navigate('/home');
      } catch (error) {
        console.error(error);
      }
    }
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsUsernameTaken(false);
    setIsRegistrationSuccessful(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = () => {
    endSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  
  return (
    <div>
      <nav className="border-gray-200 bg-[#7C3BCF]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EdifAI</span>
          </a>
          <div className="flex items-center">
            <button
              href="#"
              className="text-md w-16 flex justify-center  border rounded-md text-[#f5f5f5]  hover:underline "
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <div className='landing w-screen h-screen flex justify-center '>
          <div  className='landingpg bg-white '>
            <div className='landheading  flex justify-center h-full items-center '>
              <p className='textsection'> <span className='text-[#7C3BCF] font-medium'>Get your dream Score  on</span> <span className='text-red-600 font-bold'>IELTS</span></p>
            <img src={Ieltsicon} alt='icon' className='imgicon h-72 '></img></div>
            </div>
      </div>
      <div className="main min-w-screen min-h-screen relative overflow-hidden flex justify-center bg-[#F5F5F5] p-4 md:p-24 top-0 left-0 right-0 ">
        <div className="edifaibg" ref={signInUpSectionRef}>
        <div className="logo flex justify-center h-24 md:h-48 bg-slate-50 items-center rounded-lg drop-shadow-lg">
          <h3 className="text-3xl md:text-5xl text-black">Edif<span className="text-[#7C3BCF]">AI</span></h3>
        </div>
        <div className="singup-signin btn-group flex justify-center mt-4 md:mt-6 ">
          <input
            type="radio"
            name="options"
            data-title="Sign In"
            className={`btn text-black bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${!isSignUp ? 'checked' : ''}`}
            checked={!isSignUp}
            onChange={() => toggleSignUp()}
          />
          <input
            type="radio"
            name="options"
            data-title="Sign Up"
            className={`btn text-black bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${isSignUp ? 'checked' : ''}`}
            checked={isSignUp}
            onChange={() => toggleSignUp()}
          />
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center mt-4 md:mt-8">
          <input
            type="text"
            placeholder="Username"
            className="input input-md w-full max-w-xs bg-white mt-4 md:mt-6"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isUsernameTaken && isSignUp && (
            <p className="error-text text-sm mt-2 text-red-500 font-mono">Username is already taken</p>
          )}
          <div className="password-input-container w-full max-w-xs">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-md w-full max-w-xs bg-white mt-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignUp && (
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-md w-full max-w-xs bg-white mt-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            {isSignUp && password !== confirmPassword && (
              <p className="error-text text-sm mt-4 text-red-500 font-mono">Password and confirm password do not match</p>
            )}
            <button
              type="button"
              className="show-password-btn mt-2 md:mt-5 flex justify-center items-center w-full h-full"
              onClick={toggleShowPassword}
            >
              {showPassword ? <HideIcon /> : <ShowIcon />}
            </button>
          </div>
          <button className="btn btn-primary mt-4 md:mt-6" type="submit">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        {isRegistrationSuccessful && (
          <p className="success-text flex justify-center  text-md font-mono mt-2 text-green-500">Registration successful!</p>
        )}
      </div>
      <div ref={endSectionRef}></div>
      
    </div>
    </div>
  );
};