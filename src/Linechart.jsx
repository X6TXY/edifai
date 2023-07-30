import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { host_url } from "./urls";

// Register necessary chart elements and plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Scores",
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          return value.toFixed(2); // Format the tooltip label to display the score with 2 decimal places
        },
      },
    },
  },
};

export const LineChart = () => {
  // State to hold the chart data
  const [data, setData] = useState({
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Scores",
        data: [0, 0, 0, 0, 0],
        borderColor: "rgb(199, 32, 11)",
        backgroundColor: "rgba(199, 32, 11, 0.5)",
      },
    ],
  });

  // Fetch the newest scores from the backend API on component mount
  useEffect(() => {
    const user_token = localStorage.getItem("token");
    axios
      .get(`${host_url}/wtask2/get_responses`, {
        headers: {
          Authorization: `Bearer ${user_token}`,
        },
      })
      .then((response) => {
        // Sort the response data in descending order based on the date or any other relevant field
        const sortedScores = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Extract the five newest scores
        const newestScores = sortedScores.slice(0, 5);

        const scoreValues = newestScores.map((item) =>
          parseFloat(item.score.trim())
        );

        setData((prevData) => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data:
                scoreValues.length >= 5 ? scoreValues : [...Array(5).fill(0)], // If there are less than 5 scores, fill the rest with 0
            },
          ],
        }));
      })
      .catch((error) => {
        console.error("Error fetching responses:", error);
      });
  }, []);

  // Render the Line chart with the fetched data
  return <Line options={options} data={data} />;
};
