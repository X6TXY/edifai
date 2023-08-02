import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactComponent as LfArrow } from "../../../assets/leftarrow.svg";
import { ReactComponent as RtArrow } from "../../../assets/rightarrow.svg";
import { host_url } from "../../../urls.jsx";
import { Sidebar } from "../../sidebar";
import "./history.css";

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

export const History = () => {
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
  } else if (windowWidth <= 767 && windowWidth >= 425) {
    responsesPerPage = 9;
  } else if (windowWidth < 425) {
    responsesPerPage = 4;
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
    <div className="h-screen w-screen  bg-[#f5f5f5] text-black  ">
      <div className="grid grid-cols-1 backgroundhistory  absolute -right-0 bg-[#f5f5f5]">
        <div className="flex justify-center text-5xl mt-5 font-bold text-[#c7200b]">
          History
        </div>
        <div className="absolute md:mt-36 lg:mt-40 xl:mt-40 mt-32 xs:mt-20 mx-5 flex  items-center">
          <div className="   grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {currentResponses.map((response, index) => (
              <div
                key={response.id}
                className={`response-card bg-white shadow-md rounded-md p-4 grid grid-col-1 ${
                  responseCardVisible ? "animate-fade-in" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }} // Adjust animation delay for each card
              >
                <p className="text-xs lg:text-md sm:text-xs">
                  <span className="font-bold text-[#c7200b] ">Date: </span>{" "}
                  {response.date}
                </p>
                <p className="text-xs lg:text-md xl:text-md sm:text-xs">
                  <span className="font-bold text-[#c7200b]">Essay:</span>{" "}
                  {response.request.substring(0, 15)}...
                </p>
                <p className="text-xs lg:text-md sm:text-xs">
                  <span className="font-bold text-[#c7200b]">Feedback:</span>{" "}
                  {response.response.substring(0, 15)}...
                </p>
                <p className="text-xs lg:text-md sm:text-xs lg:w-60 md:w-32  ">
                  <span className="font-bold text-[#c7200b]">Score:</span>{" "}
                  {response.score.split(" ").slice(0, 2).join(" ")}
                </p>
                <div className="flex justify-center ">
                  <button
                    className="btn text-xs btn-primary mt-3 text-white w-24 mr-5"
                    onClick={() => openModal(response)}
                  >
                    More information
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-end  xl:mb-7 lg:mb-7 md:mb-7 mb-12">
          <button
            className="page-nav-button"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            <LfArrow className="page-nav-button "></LfArrow>
          </button>
          <span className="mx-5 ">{currentPage}</span>
          <button
            className="page-nav-button"
            disabled={indexOfLastResponse >= responses.length}
            onClick={() => paginate(currentPage + 1)}
          >
            <RtArrow className="page-nav-button  "></RtArrow>
          </button>
        </div>
      </div>
      {selectedResponse && (
         <div
         className={`absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50  ${
           selectedResponse ? "" : "modal-hidden"
         }`}
         style={{ zIndex: "100" }}
       >
          <div className="modal-card bg-white w-4/5   rounded-md p-4 transform transition-all ease-in-out ">
            <p className="">
              <span className="font-bold text-[#c7200b]">Date: </span>
              {selectedResponse.date}
            </p>
            <p className="mt-2 text-xs lg:text-md sm:text-base">
              <span className="font-bold text-[#c7200b]">Essay:</span>{" "}
              {selectedResponse.request}
            </p>
            <p className="mt-2 text-xs lg:text-md sm:text-base">
              <span className="font-bold text-[#c7200b]">Feedback:</span>{" "}
              {selectedResponse.response}
            </p>
            <p className="mt-2 text-xs lg:text-md sm:text-base">
              <span className="font-bold text-[#c7200b]">Score:</span>{" "}
              {selectedResponse.score}
            </p>
            <div className="w-40 mx-auto mt-3">
              <button
                className="btn btn-primary text-white mx-auto"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <Sidebar />
    </div>
  );
};
