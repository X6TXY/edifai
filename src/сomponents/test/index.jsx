import axios from "axios";
import { useEffect, useState } from "react";
import { host_url } from "../../urls";
import { Sidebar } from "../sidebar";
import "./storybot.css";

export const Test = () => {
  const [inputValue, setInputValue] = useState("");
  const [audio, setAudio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Update dots animation
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots === "..." ? "" : prevDots + "."));
    }, 500);

    return () => {
      // Clean up interval
      clearInterval(intervalId);
    };
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true); // Set loading state to true
      const response = await axios.get(`${host_url}/storybot/generate_story`, {
        params: {
          request: inputValue,
        },
        responseType: "arraybuffer",
      });

      const audioData = new Blob([response.data], { type: "audio/mpeg" });
      const audioURL = URL.createObjectURL(audioData);

      setAudio(audioURL);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading state to false
      setInputValue("");
    }
  };

  return (
    <div>
      <div className=" ">
        
      </div>
      <Sidebar />
    </div>
  );
};
