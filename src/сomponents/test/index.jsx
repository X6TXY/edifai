import axios from "axios";
import React, { useEffect, useState } from "react";
import { host_url } from "../../urls";
import { Sidebar } from "../sidebar";
import "./style.css";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export const Test = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [responseCardVisible, setResponseCardVisible] = useState(false);

  const windowWidth = useWindowWidth();
  let responsesPerPage;
  if (windowWidth > 1220 && windowWidth <= 1024) {
    responsesPerPage = 8;
  } else if (windowWidth > 1023) {
    responsesPerPage = 12;
  } else if (windowWidth <= 1023 && windowWidth > 767) {
    responsesPerPage = 6;
  } else if (windowWidth <= 767 && windowWidth > 640) {
    responsesPerPage = 6;
  } else if (windowWidth <= 640) {
    responsesPerPage = 3;
  }

  useEffect(() => {
    // Fetch responses data from the backend API
    const user_token = localStorage.getItem("token");
    axios
      .get(`${host_url}/wtask2/get_responses`, {
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
        console.error("Error fetching responses:", error);
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
  const currentResponses = responses.slice(
    indexOfFirstResponse,
    indexOfLastResponse
  );

  // Function to handle pagination (change page)
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="historyworkingsection">
        <div className="flex justify-center text-[#c7200b] font-bold historyheading">
          History
        </div>
        <div className="flex justify-center  mt-10 items-center">
          <div className="text-black bg-white p-5">
            {currentResponses.map((response, index) => (
              <div
                key={response.id}
                className={`${
                  responseCardVisible ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }} // Adjust animation delay for each card
              >
                <p className="">
                  <span className="font-bold text-[#c7200b] ">Date: </span>{" "}
                  {response.date}
                </p>
                <p className="">
                  <span className="font-bold text-[#c7200b]">Essay:</span>{" "}
                  {response.request.split(" ").slice(0, 1).join(" ")}...
                </p>
                <p className="">
                  <span className="font-bold text-[#c7200b]">Feedback:</span>{" "}
                  {response.response.split(" ").slice(0, 2).join(" ")}...
                </p>
                <p className=" ">
                  <span className="font-bold text-[#c7200b]">Score:</span>{" "}
                  {response.score.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="flex justify-center mx-auto">
                  <button
                    className="btn  btn-primary mt-3 text-white"
                    onClick={() => openModal(response)}
                  >
                    More information
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};
