"use client";
import React, { useEffect } from "react";

interface AlertProps {
  show: boolean;
  text: string;
  type: "success" | "danger" | "info" | "warning"; // Include all types here
  onClose: () => void; // Callback to close the alert
}

const Alert: React.FC<AlertProps> = ({ show, text, type, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Call the onClose function after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [show, onClose]);

  if (!show) return null; // Early return if not shown

  return (
    <div className="fixed bottom-5 right-5 flex justify-center items-center z-50">
      <div
        className={`p-2 ${
          type === "danger"
            ? "bg-red-800"
            : type === "success"
            ? "bg-green-800"
            : type === "info"
            ? "bg-blue-800"
            : "bg-yellow-800" // Default for warning
        } items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex rounded-md p-5`}
        role="alert"
      >
        <p
          className={`flex rounded-full ${
            type === "danger"
              ? "bg-red-500"
              : type === "success"
              ? "bg-green-500"
              : type === "info"
              ? "bg-blue-500"
              : "bg-yellow-500" // Default for warning
          } uppercase px-2 py-1 text-xs font-semibold mr-3`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} {/* Capitalize type */}
        </p>
        <p className="mr-2 text-left">{text}</p>
      </div>
    </div>
  );
};

export default Alert;
