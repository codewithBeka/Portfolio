import React from "react";
import { FaSpinner } from "react-icons/fa"; // Import the spinner icon

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <FaSpinner className="animate-spin text-purple text-6xl mb-4" />
      <p className="text-xl text-purple">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
