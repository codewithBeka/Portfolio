"use client";
import React, { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/cs";
import useIsLargeScreen from "@/utils/useIsLargeScreen";

const TextGenerateEffect = React.memo(
  ({ words, className }: { words: string; className?: string }) => {
    const [scope, animate] = useAnimate();
    const wordsArray = words.split(" ");
    const isLargeScreen = useIsLargeScreen(768); // Define your threshold here

    useEffect(() => {
      if (!isLargeScreen) return; // Skip animation on small screens
      if (wordsArray.length === 0) return; // Early return if no words
      animate("span", { opacity: 1 }, { duration: 0.5, delay: stagger(0.1) });
    }, [animate, wordsArray, isLargeScreen]);

    const renderWords = () => (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={`${word}-${idx}`} // Use a more unique key
            className={`${
              idx > 3 ? "text-purple" : "dark:text-white text-black"
            } opacity-0`}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    );

    const renderSmallScreenText = () => {
      const normalWords = wordsArray.slice(0, -2).join(" ");
      const highlightedWords = wordsArray.slice(-2).join(" ");

      return (
        <span>
          {normalWords} <span className="text-purple">{highlightedWords}</span>
        </span>
      );
    };

    return (
      <div className={cn("font-bold", className)} aria-live="polite">
        <div className="my-4">
          <div className="dark:text-white text-black leading-snug tracking-wide">
            {isLargeScreen ? renderWords() : renderSmallScreenText()}
          </div>
        </div>
      </div>
    );
  }
);

// Add display name
TextGenerateEffect.displayName = "TextGenerateEffect";

export default TextGenerateEffect;
