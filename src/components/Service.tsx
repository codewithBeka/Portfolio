"use client";
import React from "react";
import { Meteors } from "./ui/meteors";
import { FlipWords } from "./ui/flip-words";
import useIsLargeScreen from "../utils/useIsLargeScreen";

const services = [
  {
    title: "Backend Developer",
    description:
      "Crafting scalable and efficient server-side solutions that power your applications. Let's build robust APIs and microservices together!",
  },
  {
    title: "Mobile App Developer",
    description:
      "Transforming your ideas into intuitive mobile experiences. I specialize in creating seamless apps for both iOS and Android platforms.",
  },
  {
    title: "Web Developer",
    description:
      "Building responsive and interactive websites that engage users. From front to back, I ensure your web presence is polished and effective.",
  },
  {
    title: "Frontend Developer",
    description:
      "Designing user-friendly interfaces that captivate and retain users. Let's create stunning visuals and seamless interactions that enhance user experience.",
  },
];

export function Service() {
  const isLargeScreen = useIsLargeScreen(768);
  const words = ["Backend", "Frontend", "UI/UX", "Mobile APP"];
  return (
    <section className="c-space my-20" id="service">
      <h1 className="heading mb-[2rem]">
        My Services
        {isLargeScreen && (
          <span className="text-purple">
            <FlipWords words={words} />
          </span>
        )}
      </h1>
      <div className="flex flex-wrap justify-center gap-6 p-6 mb-12">
        {services.map((service, index) => (
          <div key={index} className="max-w-xs">
            {/* <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl" /> */}
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>
              <h1 className="font-bold text-xl text-white mb-4 relative z-20">
                {service.title}
              </h1>
              <p className="font-normal text-base text-slate-500 mb-4 relative z-20">
                {service.description}
              </p>
              <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
                Explore
              </button>
              {/* Meaty part - Meteor effect */}
              {isLargeScreen && <Meteors number={20} />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
