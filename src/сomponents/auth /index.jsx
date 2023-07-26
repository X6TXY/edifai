import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as HideIcon } from '../../assets/hide.svg';
import { ReactComponent as ShowIcon } from '../../assets/show.svg';
import { host_url } from '../../urls';
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
          url: `${host_url}/auth/users?email=${username}&password=${password}`,
          headers: { 
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.request(config)
          .then((response) => {
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
        
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json',
          }
        };
        
        const response = await axios.post(`${host_url}/auth/users/tokens`, {
          username: username,
          password: password,
        }, config);


        // Save the token to local storage or a state variable for later use
        const token = response.data.access_token;
        
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
      
      <div className="main text-black w-screen h-screen  relative overflow-hidden flex justify-center bg-[#F5F5F5] p-4 md:p-24 top-0 left-0 right-0 ">
        <div className="edifaibg" ref={signInUpSectionRef}>
        <div className="logo flex justify-center xl:h-48 md:h-40 sm:h-32 h-32 bg-slate-50 items-center rounded-lg drop-shadow-lg">
          <h3 className="xl:text-5xl md:text-4xl sm:text-4xl text-3xl text-black sm:p-4">Edif<span className="text-[#C7002B]">AI</span></h3>
        </div>
        <div className="singup-signin btn-group flex justify-center  mt-4 sm:mt-10 md:mt-6 ">
          <input
            type="radio"
            name="options"
            data-title="Sign In"
            className={`xl:w-1/3 md:w-1/2 sm:w-1/2 w-3/5 btn  text-black text-xs md:text-sm bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${!isSignUp ? 'checked' : ''}`}
            checked={!isSignUp}
            onChange={() => toggleSignUp()}
          />
          <input
            type="radio"
            name="options"
            data-title="Sign Up"
            className={`xl:w-1/3 md:w-1/2 sm:w-1/2 w-3/5 xl:h-12  flex justify-center items-center  btn    text-black text-xs md:text-sm bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${isSignUp ? 'checked' : ''}`}
            checked={isSignUp}
            onChange={() => toggleSignUp()}
          />
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col justify-center items-center mt-4 md:mt-4">
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