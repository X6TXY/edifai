import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HideIcon } from "../../assets/hide.svg";
import { ReactComponent as ShowIcon } from "../../assets/show.svg";
import { host_url } from "../../urls";
import "./auth.css";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] =
    useState(false);

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
          method: "post",
          maxBodyLength: Infinity,
          url: `${host_url}/auth/users?email=${username}&password=${password}`,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios
          .request(config)
          .then((response) => {
            navigate("/home");
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
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
        };

        const response = await axios.post(
          `${host_url}/auth/users/tokens`,
          {
            username: username,
            password: password,
          },
          config
        );

        // Save the token to local storage or a state variable for later use
        const token = response.data.access_token;

        localStorage.setItem("token", token);

        // Redirect to /home after successful sign-in
        navigate("/home");
      } catch (error) {
        console.error(error);
      }
    }
    setUsername("");
    setPassword("");
    setConfirmPassword("");
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
    endSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="workingspaceauth">
      <div className="authiconsection flex justify-center  ">
        <div className="authheadingsection border">
          <div className="font-medium">
            EDIF<span className="text-[#c7200b] ">AI</span>
          </div>
        </div>
      </div>
      <div className="singup-signin btn-group flex justify-center  mt-5 ">
        <input
          type="radio"
          name="options"
          data-title="Sign In"
          className={`togglebuttonsingin  btn  text-black  bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${
            !isSignUp ? "checked" : ""
          }`}
          checked={!isSignUp}
          onChange={() => toggleSignUp()}
        />
        <input
          type="radio"
          name="options"
          data-title="Sign Up"
          className={`togglebuttonsingup text-black   btn  bg-white hover:bg-[#D9D9D9] hover:text-black border-none ${
            isSignUp ? "checked" : ""
          }`}
          checked={isSignUp}
          onChange={() => toggleSignUp()}
        />
      </div>
      <div className="flex  justify-center items-center">
        <form onSubmit={handleFormSubmit} className="flex flex-col  mt-4">
          <input
            type="text"
            placeholder="Username"
            className="authinputs input input-md bg-white mt-4 md:mt-6"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isUsernameTaken && isSignUp && (
            <p className="flex justify-center  error-text text-sm mt-3 text-red-500 font-mono">
              Username is already taken
            </p>
          )}
          <div className="password-input-container flex flex-col justify-center">
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="passwordinputs  input input-md bg-white mt-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show-password-btn bg-white ml-4 h-12 mt-4 flex justify-center items-center rounded-3xl"
                onClick={toggleShowPassword}
              >
                {showPassword ? <HideIcon /> : <ShowIcon />}
              </button>
            </div>
            {isSignUp && (
              <div className="flex items-center mt-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="passwordinputs input input-md bg-white "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="show-password-btn bg-white ml-4 h-12  flex justify-center items-center rounded-3xl"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <HideIcon /> : <ShowIcon />}
                </button>
              </div>
            )}
            {isSignUp && password !== confirmPassword && (
              <p className="error-text flex justify-center text-sm mt-4 text-red-500 font-mono">
                Password and confirm password do not match
              </p>
            )}
          </div>
          <button className="btn btn-primary mt-4 md:mt-6 mb-10" type="submit">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
