import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-github-contribution-calendar";
import { Link } from "react-router-dom";
import { host_url } from "../../../urls.jsx";
import { Sidebar } from "../../sidebar";
import "./home.css";

export const Home = () => {
  const today = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleString("en-US", options);
  const [until, setUntil] = useState(new Date().toISOString().split("T")[0]);
  const [values, setValues] = useState({});
  const panelColors = ["#f5f5f5", "#F7B4BB", "#F46D75", "#C7002B", "#a31000"];

  const motivationalPhrases = [
    "Start now, no regrets.",
    "Take the first step.",
    "Embrace the challenge, begin.",
    "Just start, make progress.",
    "Begin the journey today.",
  ];

  useEffect(() => {
    // Fetch the data from the API endpoint
    const user_token = localStorage.getItem("token");
    axios
      .get(`${host_url}/wtask2/get_dates`, {
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
          console.error("Unauthorized");
        } else {
          // Handle other errors
          console.error(error);
        }
      });
  }, []);

  const randomMotivationalPhrase =
    motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];

  return (
    <div>
      <div className="text-black">
        <div className="workingspacehome">
          <div className="Homeheading font-bold">Home</div>
          <div className="Homemainsections">
            <div className="date font-medium">{formattedDate}</div>
            <div className="typinghello">
              <div className="wrapper">
                <div className="typing-demo font-semibold ">
                  Hello<span className="text-[#c7200b]">, Dear friend.</span>
                </div>
              </div>
            </div>
            <div className="motivationsection">
              <div className="backgroundmotivation drop-shadow-md rounded-xl p-6">
                <div className="flex items-center">
                  <div className="font-medium motivaitontext ">
                    {randomMotivationalPhrase}
                  </div>
                  <Link to="/study/writing/task2">
                    <button className="motivationbtn  btn btn-primary text-white ">
                      Start Now!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="calendarebg bg-white drop-shadow-md">
                <Calendar
                  values={values}
                  until={until}
                  panelColors={panelColors}
                  className="calendare"
                />
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};
