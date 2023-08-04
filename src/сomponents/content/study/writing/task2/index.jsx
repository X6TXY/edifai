import axios from "axios";
import { useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../../assets/close.svg";
import { host_url } from "../../../../../urls";
import { Sidebar } from "../../../../sidebar";
import "./task2.css";

export const Task2 = () => {
  const [inputText, setInputText] = useState("");
  const Swal = require("sweetalert2");

  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(40 * 60); // 40 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [score, setScore] = useState(0); // Initial score value
  const [showHintModal, setShowHintModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [addTopicToTextarea, setAddTopicToTextarea] = useState(true);

  const handleCheckboxChange = (e) => {
    setAddTopicToTextarea(e.target.checked);
  };

  const selectTopic = (topic) => {
    closeTopicModal();
    if (addTopicToTextarea) {
      setInputText(`Topic: ${topic}\n\n${inputText}`);
    }
  };

  const openTopicModal = () => {
    setShowTopicModal(true);
  };

  const closeTopicModal = () => {
    setShowTopicModal(false);
  };

  const topics = [
    "Advantages and disadvantages of online education",
    "The impact of climate change on our daily lives",
    "The role of technology in modern medicine",
    "Effects of social media on interpersonal communication",
    "Nuclear energy: Solution to the global energy crisis or not?",
    "Animal testing for medical research",
    "The significance of learning a second language",
    "Measures to control population growth",
    "Importance of art education in schools",
    "Health effects of a vegan diet",
    "The influence of celebrities on youth culture",
    "Public transport vs. private vehicles",
    "Should physical education be mandatory in schools?",
    "The effect of violent video games on children",
    "The ethical issues of genetic engineering",
    "The impact of e-commerce on traditional businesses",
    "Strategies to reduce the gap between the rich and the poor",
    "Pros and cons of space exploration",
    "The role of parents and teachers in child development",
    "For a long time art has been considered an essential part of all cultures in the world. However, nowadays people’s values have changed, and we tend to consider science, technology and business more important than arts.What do you think are the causes of this?What can be done to draw people’s attention to art?",
    "The government's investment in arts, music and theatre is a waste of money. Governments should invest these funds in public services instead.To what extent do you agree with this statement?",
    " Studying art in school improves students' performance in other subjects, because it is easier for multi-skilled students to learn new things. That's why art should be obligatory in schools.Do you agree or disagree?",
    " Some students work while studying. This often results in lacking time for education and constantly feeling under pressure.What do you think are the causes of this?What solutions can you suggest?",
    " Children are generally more successful in foreign language studies than adults. Thus, it is better to learn languages in childhood.Do you agree or disagree?Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
    "Online education is becoming more and more popular. Some people claim that e-learning has so many benefits that it will replace face-to-face education soon. Others say that traditional education is irreplaceable.Discuss both views and give your opinion.",
    "In contemporary society, everyone should have equal opportunities in education. Therefore, universities should accept equal numbers of male and female students in every subject.To what extent do you agree or disagree?",
    "Everyone deserves to be educated. It's unfair that intelligent people are not admitted to private universities because of their financial background. University education should be free for everyone.Do you agree or disagree?Provide relevant examples if necessary.",
    "Some people argue that girls and boys should be educated separately, while others think that it is more advantageous for children to study at the same school.What is your opinion?",
    "Nowadays university education is considered very important for people's future. However, there are a lot of successful people who didn't get higher education.Do you think that higher education is necessary to succeed in life?Justify your opinion with relevant examples.",
    "Students should focus on learning in the classroom rather than show their status by wearing fashionable clothes. Therefore, all students have to wear school uniforms.Do you agree or disagree with this statement?",
    "Climate change is a big environmental problem that has become critical in last couple of decades. Some people claim that humans should stop burning fossil fuels and use only alternative energy resources, such as wind and solar power. Others say that oil, gas and coal are essential for many industries, and not using them will lead to economic collapse.What is your opinion?Support your point of view with relevant examples.",
    "Influence of human beings on the world's ecosystem is leading to the extinction of species and loss of bio-diversity.What are the primary causes of loss of bio-diversity?What solutions can you suggest?",
    "The planet's population is reaching unsustainable levels, and people are facing shortage of resources like water, food and fuel.To what consequences may overpopulation lead?In your opinion, what measures can be taken to fight overpopulation?",
    "Production of carbon dioxide and other greenhouse gases has a heating effect on the atmosphere and results in global warming.Why global warming is considered one of the most serious issues nowadays?How can this problem be solved?",
    "Forests produce fresh oxygen and participate in regulating climate. But every year tree cover of our planet is lessening due to deforestation.What are the primary causes of deforestation?To what results may it lead?",
    "Young people prefer listening to music rather than listening to the news on the radio. Is this a positive opposite negative trend?",
    "Some people believe that homework should not be given to school children. Others, however, say that homework is an important requirement for children to be able to develop appropriately. Discuss both views and give your opinion",
    "Even though globalization affects the world’s economies in a very positive way, its negative side should not be forgotten.",
    "Nowadays families are not as close as they used to be. What do you think are the causes of this? What can be done to make families closer?",
    "New technologies have changed the way children spend their free time. Do you think the advantages of this trend outweigh the disadvantages?",
    "Many people argue that museums and art galleries should present the nation’s art, as opposed to artworks from other countries. To what extent do you agree or disagree?",
    "Nowadays families are not as close as they used to be. What do you think are the causes of this? What can be done to make families closer?",
    "New technologies have changed the way children spend their free time. Do you think the advantages of this trend outweigh the disadvantages?",
    "Some people argue that because the internet makes it so easy for children to access facts, schools should not focus on teaching facts. Instead, they should focus on developing children’s skills and potential, and their relationships with other people.To what extent do you agree or disagree with this opinion?",
    "Some people choose a career according to the social status and salary, while others choose a career according to whether they will enjoy the work. Give your opinion which one is the best.",
    "Some people believe that couples should be allowed to determine the size of their family. However, in many countries, the governments interfere in matters of family planning. Do you agree or disagree with us?",
    "The disabled are not always treated fairly. What measures can be taken to assist disabled people?",
    "Some people believe that criminals should be punished with lengthy jail terms. Others are of the opinion that they must be re-educated and rehabilitated through community service programs. Do you agree or disagree?",
    "Do you think that governments should reserve jobs for women?",
    "Some people prefer to travel alone. Others are more interested in going with someone. Discuss both views and give your own opinion.",
    "A large number of people now change jobs several times. Is this a positive or a negative development? Discuss.",
    "Today food travels thousands of miles before it reaches consumers. Why is this so? Is this a positive or a negative development?",
  ];
  const closeHintModal = () => {
    localStorage.setItem("hintModalClosed", "true");
    setShowHintModal(false);
    const isSecondModalClosed = localStorage.getItem("secondModalClosed");
    if (isSecondModalClosed !== "true") {
      setShowSecondModal(true);
    }
  };
  const closeSecondModal = () => {
    localStorage.setItem("secondModalClosed", "true");
    setShowSecondModal(false);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = () => {
    if (inputText.length < 200) {
      Swal.fire({
        title: "Please enter at least 200 characters.",
        icon: "error",
        confirmButtonText: "Continue",
        confirmButtonColor: "#c7200b",
      });
      return;
    }
    const user_token = localStorage.getItem("token");
    setIsLoading(true); // Set loading state to true
    axios
      .post(
        `${host_url}/wtask2/get_answer`,
        {
          request: inputText,
        },
        {
          headers: {
            Authorization: `Bearer ${user_token}`,
          },
        }
      )
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
    console.log("Score submitted:", score);
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
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  useEffect(() => {
    const isHintModalClosed = localStorage.getItem("hintModalClosed");
    const isSecondModalClosed = localStorage.getItem("secondModalClosed");

    if (isHintModalClosed !== "true") {
      setShowHintModal(true);
    } else if (isSecondModalClosed !== "true") {
      setShowSecondModal(true);
    }
  }, []);
  return (
    <div>
      <div className="h-screen w-screen bg-[#f5f5f5]">
        <div className=" workingspacestudy1 lg:w-4/5 md:w-4/5 md:h-screen lg:h-screen absolute right-0 bg-[#f5f5f5] text-black">
          <div className="headingstudy font-bold text-[#c7200b] ">
            Writing Task 2
          </div>
          <div className=" h-4/5">
            <div className="flex justify-start lg:ml-20 sm:ml-20 ml-10 absolute top-20">
              <button
                className="bg-[#c7200b] rounded-md drop-shadow-md p-2 sm:text-lg text-md text-white border-none  hover:bg-red-600 transition-colors duration-500"
                onClick={openTopicModal}
              >
                Topics
              </button>
            </div>
            <textarea
              className="textareatask2 absolute w-2/5 p-4 text-lg resize-none border border-gray-300 drop-shadow-md rounded ml-20"
              placeholder="Write your essay"
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <div className="textareatask2r bg-white border rounded border-gray-300 w-2/5 text-black drop-shadow-md overflow-auto">
              <p className="bg-white ml-5 mt-3 font-semibold ">Response:</p>
              {isLoading ? (
                <div
                  role="status"
                  className="space-y-2.5 animate-pulse max-w-lg p-3"
                >
                  <div className="flex items-center  w-full space-x-2">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[400px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-80"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[440px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[360px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[500px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-40"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                  </div>
                  <div className="flex items-center  w-full space-x-2">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                  </div>
                  <div className="flex items-center w-full space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[400px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-80"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[480px]">
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[440px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-24"></div>
                    <div className="h-2.5 bg-gray-100 rounded-full dark:bg-gray-400 w-full"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[360px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-24"></div>
                  </div>
                  <div className="flex items-center  space-x-2 max-w-[500px]">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-32"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-40"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-full"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <div className="text-black p-4 mb-4">{responseText}</div>
              )}
            </div>
            <div className="timer1 w-40 h-20   drop-shadow-md">
              <div className="timer text-white flex justify-center items-center mt-3 text-xl mb-2">
                {formatTime(timer)}
              </div>
              <div className="buttons flex justify-center items-center">
                {!isTimerRunning && timer !== 0 && (
                  <button
                    onClick={startTimer}
                    className="starttimer bg-emerald-400 w-16 rounded text-white hover:bg-emerald-600"
                  >
                    Start
                  </button>
                )}
                {isTimerRunning && (
                  <button
                    onClick={pauseTimer}
                    className="bg-yellow-400 w-16 rounded hover:bg-yellow-600 text-white"
                  >
                    Pause
                  </button>
                )}
                {!isTimerRunning && timer !== 40 * 60 && (
                  <button
                    onClick={resetTimer}
                    className="bg-orange-600 w-16 rounded text-white hover:bg-red-700"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className="score-section bg-[#C7002B] w-28 lg:right-44 xl:right-52 sl:right-32 flex justify-center items-center rounded-md drop-shadow-md ">
              <p className="text-lg font-semibold text-white p-1 ">
                Score: {score}
              </p>
            </div>
          </div>

          <div className="button-container  ">
            <button
              className="btn btn-primary border-none text-white hover:bg-red-600 transition-colors duration-500"
              onClick={handleButtonClick}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
        <Sidebar />
        {showHintModal && (
          <div>
            <div
              onClick={handleBackdropClick}
              className=" h-screen w-screen backdrop-filter backdrop-blur-sm flex justify-center items-center fixed inset-0 "
            >
              <div className="modal-container p-4 rounded ">
                <div className="lg:ml-72 flex justify-center   items-center">
                  <div className="modal-container  bg-slate-50 border-red-200 border bg-opacity-75  p-4 rounded lg:w-5/6 sm:3/4 ">
                    <p className="text-[#c7200b] font-medium warningtext lg:text-2xl w-full rounded bg-opacity-90 bg-slate-100 border p-5 flex justify-center">
                      Warning: AI assessment may not be fully accurate.
                      Remember, artificial intelligence evaluates your essay,
                      but human evaluation remains invaluable.
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={closeHintModal}
                        className="btn btn-primary mt-4 text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showSecondModal && (
          <div>
            <div
              onClick={handleBackdropClick}
              className=" h-screen w-screen backdrop-filter backdrop-blur-sm flex justify-center items-center fixed inset-0 "
            >
              <div className="modal-container p-4 rounded ">
                <div className="lg:ml-72 flex justify-center   items-center">
                  <div className="modal-container  bg-white border-red-200 border drop-shadow-xl bg-opacity-75  p-4 rounded lg:w-5/6 sm:3/4 ">
                    <p className="flex justify-center font-semibold lg:text-xl sm:text-xl text-lg lg:mb-4 mb-3 text-[#c7200b] mt-3">
                      Hints for IELTS Task 2:
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - Make sure to address the given topic.
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - You will be evaluated based on your response's
                      coherence, cohesion, vocabulary, grammar, and overall
                      argument quality.
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - Remember to have an introduction, body paragraphs, and a
                      conclusion in your essay.
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - Use formal language and avoid slang.
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - Focus on presenting a well-structured and organized
                      essay.
                    </p>
                    <p className="texthint lg:text-lg text-black">
                      - You can get questions by clicking on the questions
                      button or write a question: and write an essay on this
                      question
                    </p>

                    <div className="flex justify-center">
                      <button
                        onClick={closeSecondModal}
                        className="btn btn-primary mt-4 text-white"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showTopicModal && (
          <div className=" h-screen w-screen backdrop-filter backdrop-blur-sm flex justify-center items-center fixed inset-0 ">
            <div className="modal-container p-4 rounded w-4/5 h-4/5 flex justify-center items-center">
              <div className="lg:ml-72 flex justify-center   items-center ">
                <div className="modal-container  bg-white border-red-200 border drop-shadow-xl bg-opacity-75  p-4 rounded lg:w-5/6 sm:3/4 ">
                  <p className="flex justify-center font-semibold lg:text-2xl sm:text-xl text-lg lg:mb-4 mb-3 text-[#c7200b] mt-3">
                    Choose a topic for IELTS Task 2:
                  </p>
                  <div className="p-3  ">
                    <div className="flex justify-between ">
                      <div>
                        <div className="text-md text-black hidden">
                          <input
                            type="checkbox"
                            id="addTopicToTextarea"
                            className="h-4 w-4"
                            checked={addTopicToTextarea}
                            onChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="addTopicToTextarea"
                            className=" ml-2 text-black lg:text-xl"
                          >
                            Add topic
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Search topics..."
                          value={searchTerm}
                          className="text-black w-24 sm:w-96 rounded-md border p-3 mt-3"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                          className="text-white border p-1 h-12 rounded-md bg-[#c7200b]"
                          onClick={() =>
                            setSearchResults(
                              topics.filter((topic) =>
                                topic
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              )
                            )
                          }
                        >
                          Search
                        </button>
                      </div>
                      <button onClick={closeTopicModal} className="">
                        <CloseIcon className=" w-8 h-8 hover:bg-red-500 rounded-3xl" />
                      </button>
                    </div>
                  </div>
                  <div className="h-[500px]  overflow-y-scroll">
                    <ul className=" grid gap-1">
                      {searchResults.map((filteredTopic) => (
                        <li
                          className="texthint lg:text-lg text-black bg-[#d9d9d9] flex justify-center p-3 gap-1 rounded-md "
                          onClick={() => selectTopic(filteredTopic)}
                        >
                          {filteredTopic}
                        </li>
                      ))}
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  mt-1
                      "
                        onClick={() => selectTopic("")}
                      >
                        Create a custom topic
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  mt-1"
                        onClick={() =>
                          selectTopic(
                            "Advantages and disadvantages of online education"
                          )
                        }
                      >
                        1.Advantages and disadvantages of online education
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3 "
                        onClick={() =>
                          selectTopic(
                            "The impact of climate change on our daily lives"
                          )
                        }
                      >
                        2.The impact of climate change on our daily lives
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3 "
                        onClick={() =>
                          selectTopic(
                            "The role of technology in modern medicine"
                          )
                        }
                      >
                        3.The role of technology in modern medicine
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3 "
                        onClick={() =>
                          selectTopic(
                            "Effects of social media on interpersonal communication"
                          )
                        }
                      >
                        4.Effects of social media on interpersonal communication
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3 "
                        onClick={() =>
                          selectTopic(
                            "Nuclear energy: Solution to the global energy crisis or not?"
                          )
                        }
                      >
                        5.Nuclear energy: Solution to the global energy crisis
                        or not?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3 "
                        onClick={() =>
                          selectTopic("Animal testing for medical research")
                        }
                      >
                        6.Animal testing for medical research
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The significance of learning a second language"
                          )
                        }
                      >
                        7.The significance of learning a second language
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic("Measures to control population growth")
                        }
                      >
                        8.Measures to control population growth
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic("Importance of art education in schools")
                        }
                      >
                        9.Importance of art education in schools
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic("Health effects of a vegan diet")
                        }
                      >
                        10.Health effects of a vegan diet
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The influence of celebrities on youth culture"
                          )
                        }
                      >
                        11.The influence of celebrities on youth culture
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic("Public transport vs. private vehicles")
                        }
                      >
                        12.Public transport vs. private vehicles
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Should physical education be mandatory in schools?"
                          )
                        }
                      >
                        13.Should physical education be mandatory in schools?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The effect of violent video games on children"
                          )
                        }
                      >
                        14.The effect of violent video games on children
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The ethical issues of genetic engineering"
                          )
                        }
                      >
                        15.The ethical issues of genetic engineering
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The impact of e-commerce on traditional businesses"
                          )
                        }
                      >
                        16.The impact of e-commerce on traditional businesses
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Strategies to reduce the gap between the rich and the poor"
                          )
                        }
                      >
                        17.Strategies to reduce the gap between the rich and the
                        poor
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic("Pros and cons of space exploration")
                        }
                      >
                        18.Pros and cons of space exploration
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The role of parents and teachers in child development"
                          )
                        }
                      >
                        19.The role of parents and teachers in child development
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "For a long time art has been considered an essential part of all cultures in the world. However, nowadays people’s values have changed, and we tend to consider science, technology and business more important than arts.What do you think are the causes of this?What can be done to draw people’s attention to art?"
                          )
                        }
                      >
                        20.For a long time art has been considered an essential
                        part of all cultures in the world. However, nowadays
                        people’s values have changed, and we tend to consider
                        science, technology and business more important than
                        arts.What do you think are the causes of this?What can
                        be done to draw people’s attention to art?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The government's investment in arts, music and theatre is a waste of money. Governments should invest these funds in public services instead.To what extent do you agree with this statement?"
                          )
                        }
                      >
                        21.The government's investment in arts, music and
                        theatre is a waste of money. Governments should invest
                        these funds in public services instead.To what extent do
                        you agree with this statement?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            " Studying art in school improves students' performance in other subjects, because it is easier for multi-skilled students to learn new things. That's why art should be obligatory in schools.Do you agree or disagree?"
                          )
                        }
                      >
                        22.Studying art in school improves students' performance
                        in other subjects, because it is easier for
                        multi-skilled students to learn new things. That's why
                        art should be obligatory in schools.Do you agree or
                        disagree?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            " Some students work while studying. This often results in lacking time for education and constantly feeling under pressure.What do you think are the causes of this?What solutions can you suggest?"
                          )
                        }
                      >
                        23.Some students work while studying. This often results
                        in lacking time for education and constantly feeling
                        under pressure.What do you think are the causes of
                        this?What solutions can you suggest?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            " Children are generally more successful in foreign language studies than adults. Thus, it is better to learn languages in childhood.Do you agree or disagree?Give reasons for your answer and include any relevant examples from your own knowledge or experience."
                          )
                        }
                      >
                        24.Children are generally more successful in foreign
                        language studies than adults. Thus, it is better to
                        learn languages in childhood.Do you agree or
                        disagree?Give reasons for your answer and include any
                        relevant examples from your own knowledge or experience.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Online education is becoming more and more popular. Some people claim that e-learning has so many benefits that it will replace face-to-face education soon. Others say that traditional education is irreplaceable.Discuss both views and give your opinion."
                          )
                        }
                      >
                        25.Online education is becoming more and more popular.
                        Some people claim that e-learning has so many benefits
                        that it will replace face-to-face education soon. Others
                        say that traditional education is irreplaceable.Discuss
                        both views and give your opinion.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "In contemporary society, everyone should have equal opportunities in education. Therefore, universities should accept equal numbers of male and female students in every subject.To what extent do you agree or disagree?"
                          )
                        }
                      >
                        26.In contemporary society, everyone should have equal
                        opportunities in education. Therefore, universities
                        should accept equal numbers of male and female students
                        in every subject.To what extent do you agree or
                        disagree?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Everyone deserves to be educated. It's unfair that intelligent people are not admitted to private universities because of their financial background. University education should be free for everyone.Do you agree or disagree?Provide relevant examples if necessary."
                          )
                        }
                      >
                        27.Everyone deserves to be educated. It's unfair that
                        intelligent people are not admitted to private
                        universities because of their financial background.
                        University education should be free for everyone.Do you
                        agree or disagree?Provide relevant examples if
                        necessary.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people argue that girls and boys should be educated separately, while others think that it is more advantageous for children to study at the same school.What is your opinion?"
                          )
                        }
                      >
                        28.Some people argue that girls and boys should be
                        educated separately, while others think that it is more
                        advantageous for children to study at the same
                        school.What is your opinion?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Nowadays university education is considered very important for people's future. However, there are a lot of successful people who didn't get higher education.Do you think that higher education is necessary to succeed in life?Justify your opinion with relevant examples."
                          )
                        }
                      >
                        29.Nowadays university education is considered very
                        important for people's future. However, there are a lot
                        of successful people who didn't get higher education.Do
                        you think that higher education is necessary to succeed
                        in life?Justify your opinion with relevant examples.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Students should focus on learning in the classroom rather than show their status by wearing fashionable clothes. Therefore, all students have to wear school uniforms.Do you agree or disagree with this statement?"
                          )
                        }
                      >
                        30.Students should focus on learning in the classroom
                        rather than show their status by wearing fashionable
                        clothes. Therefore, all students have to wear school
                        uniforms.Do you agree or disagree with this statement?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Climate change is a big environmental problem that has become critical in last couple of decades. Some people claim that humans should stop burning fossil fuels and use only alternative energy resources, such as wind and solar power. Others say that oil, gas and coal are essential for many industries, and not using them will lead to economic collapse.What is your opinion?Support your point of view with relevant examples."
                          )
                        }
                      >
                        31.Climate change is a big environmental problem that
                        has become critical in last couple of decades. Some
                        people claim that humans should stop burning fossil
                        fuels and use only alternative energy resources, such as
                        wind and solar power. Others say that oil, gas and coal
                        are essential for many industries, and not using them
                        will lead to economic collapse.What is your
                        opinion?Support your point of view with relevant
                        examples.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Influence of human beings on the world's ecosystem is leading to the extinction of species and loss of bio-diversity.What are the primary causes of loss of bio-diversity?What solutions can you suggest?"
                          )
                        }
                      >
                        32.Influence of human beings on the world's ecosystem is
                        leading to the extinction of species and loss of
                        bio-diversity.What are the primary causes of loss of
                        bio-diversity?What solutions can you suggest?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The planet's population is reaching unsustainable levels, and people are facing shortage of resources like water, food and fuel.To what consequences may overpopulation lead?In your opinion, what measures can be taken to fight overpopulation?"
                          )
                        }
                      >
                        33.The planet's population is reaching unsustainable
                        levels, and people are facing shortage of resources like
                        water, food and fuel.To what consequences may
                        overpopulation lead?In your opinion, what measures can
                        be taken to fight overpopulation?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Production of carbon dioxide and other greenhouse gases has a heating effect on the atmosphere and results in global warming.Why global warming is considered one of the most serious issues nowadays?How can this problem be solved?"
                          )
                        }
                      >
                        34.Production of carbon dioxide and other greenhouse
                        gases has a heating effect on the atmosphere and results
                        in global warming.Why global warming is considered one
                        of the most serious issues nowadays?How can this problem
                        be solved?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Forests produce fresh oxygen and participate in regulating climate. But every year tree cover of our planet is lessening due to deforestation.What are the primary causes of deforestation?To what results may it lead?"
                          )
                        }
                      >
                        35.Forests produce fresh oxygen and participate in
                        regulating climate. But every year tree cover of our
                        planet is lessening due to deforestation.What are the
                        primary causes of deforestation?To what results may it
                        lead?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Young people prefer listening to music rather than listening to the news on the radio. Is this a positive opposite negative trend?"
                          )
                        }
                      >
                        36.Young people prefer listening to music rather than
                        listening to the news on the radio. Is this a positive
                        opposite negative trend?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people believe that homework should not be given to school children. Others, however, say that homework is an important requirement for children to be able to develop appropriately. Discuss both views and give your opinion"
                          )
                        }
                      >
                        37.Some people believe that homework should not be given
                        to school children. Others, however, say that homework
                        is an important requirement for children to be able to
                        develop appropriately. Discuss both views and give your
                        opinion
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Even though globalization affects the world’s economies in a very positive way, its negative side should not be forgotten."
                          )
                        }
                      >
                        38.Even though globalization affects the world’s
                        economies in a very positive way, its negative side
                        should not be forgotten.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Many people argue that museums and art galleries should present the nation’s art, as opposed to artworks from other countries. To what extent do you agree or disagree?"
                          )
                        }
                      >
                        39.Many people argue that museums and art galleries
                        should present the nation’s art, as opposed to artworks
                        from other countries. To what extent do you agree or
                        disagree?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Nowadays families are not as close as they used to be. What do you think are the causes of this? What can be done to make families closer?"
                          )
                        }
                      >
                        40.Nowadays families are not as close as they used to
                        be. What do you think are the causes of this? What can
                        be done to make families closer?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "New technologies have changed the way children spend their free time. Do you think the advantages of this trend outweigh the disadvantages?"
                          )
                        }
                      >
                        41.New technologies have changed the way children spend
                        their free time. Do you think the advantages of this
                        trend outweigh the disadvantages?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people argue that because the internet makes it so easy for children to access facts, schools should not focus on teaching facts. Instead, they should focus on developing children’s skills and potential, and their relationships with other people.To what extent do you agree or disagree with this opinion?"
                          )
                        }
                      >
                        42.Some people argue that because the internet makes it
                        so easy for children to access facts, schools should not
                        focus on teaching facts. Instead, they should focus on
                        developing children’s skills and potential, and their
                        relationships with other people. To what extent do you
                        agree or disagree with this opinion?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people choose a career according to the social status and salary, while others choose a career according to whether they will enjoy the work. Give your opinion which one is the best."
                          )
                        }
                      >
                        43.Some people choose a career according to the social
                        status and salary, while others choose a career
                        according to whether they will enjoy the work. Give your
                        opinion which one is the best.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people believe that couples should be allowed to determine the size of their family. However, in many countries, the governments interfere in matters of family planning. Do you agree or disagree with us?"
                          )
                        }
                      >
                        44.Some people believe that couples should be allowed to
                        determine the size of their family. However, in many
                        countries, the governments interfere in matters of
                        family planning. Do you agree or disagree with us?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "The disabled are not always treated fairly. What measures can be taken to assist disabled people?"
                          )
                        }
                      >
                        45.The disabled are not always treated fairly. What
                        measures can be taken to assist disabled people?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people believe that criminals should be punished with lengthy jail terms. Others are of the opinion that they must be re-educated and rehabilitated through community service programs. Do you agree or disagree?"
                          )
                        }
                      >
                        46.Some people believe that criminals should be punished
                        with lengthy jail terms. Others are of the opinion that
                        they must be re-educated and rehabilitated through
                        community service programs. Do you agree or disagree?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Do you think that governments should reserve jobs for women?"
                          )
                        }
                      >
                        47.Do you think that governments should reserve jobs for
                        women?
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Some people prefer to travel alone. Others are more interested in going with someone. Discuss both views and give your own opinion."
                          )
                        }
                      >
                        48.Some people prefer to travel alone. Others are more
                        interested in going with someone. Discuss both views and
                        give your own opinion.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "A large number of people now change jobs several times. Is this a positive or a negative development? Discuss."
                          )
                        }
                      >
                        49.A large number of people now change jobs several
                        times. Is this a positive or a negative development?
                        Discuss.
                      </li>
                      <li
                        className="texthint lg:text-lg text-black bg-[#d9d9d9] hover:bg-slate-50 rounded-md p-3  "
                        onClick={() =>
                          selectTopic(
                            "Today food travels thousands of miles before it reaches consumers. Why is this so? Is this a positive or a negative development?"
                          )
                        }
                      >
                        50.Today food travels thousands of miles before it
                        reaches consumers. Why is this so? Is this a positive or
                        a negative development?
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
