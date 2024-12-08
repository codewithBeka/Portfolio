"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { FC, useMemo, useRef } from "react";
import { twJoin, twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

type Technology = {
  name: string;
  image: string;
};

type Skill = {
  technologies: Technology[];
};

type Props = {
  skills: Skill[]; // Receive skills as a prop
  isReversed?: boolean;
  className?: string;
};

const Marquee: FC<Props> = ({ skills, isReversed = false, className }) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline>();

  useGSAP(
    () => {
      const setupInfiniteMarqueeTimeline = () => {
        gsap.set(movingContainer.current, {
          xPercent: isReversed ? -50 : 0,
        });
        timeline.current = gsap
          .timeline({
            defaults: { ease: "none", repeat: -1 },
          })
          .to(movingContainer.current, {
            xPercent: isReversed ? 0 : -50,
            duration: 20,
          })
          .set(movingContainer.current, { xPercent: 0 });
      };

      setupInfiniteMarqueeTimeline();
    },
    { dependencies: [isReversed] }
  );

  const timelineTimeScaleTween = useRef<GSAPTween>();

  const onPointerEnter = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  // Use useMemo to optimize rendering
  const list = useMemo(() => {
    if (!skills || skills.length === 0) {
      return (
        <div className="flex w-fit items-center gap-10">
          {/* Skeleton loading effect */}
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      );
    }

    const technologies = skills.flatMap((skill: Skill) => skill.technologies);

    return (
      <div className="flex w-fit items-center gap-10">
        {technologies.map((tech: Technology, index: number) => {
          const isLast = index === technologies.length - 1;
          return (
            <div
              key={index}
              className={twJoin(
                "relative flex shrink-0 items-center justify-center",
                isLast && "mr-10"
              )}
              style={{ height: 40, width: 40 }}
            >
              <Image
                src={tech.image}
                alt={tech.name}
                height={40}
                width={40}
                className="object-contain"
                priority
              />
            </div>
          );
        })}
      </div>
    );
  }, [skills]);

  return (
    <div
      className={twMerge("max-w-full select-none overflow-hidden", className)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}
    >
      <div
        ref={movingContainer}
        className="flex justify-center items-center w-fit"
      >
        {list}
        {list} {/* Repeat for infinite marquee effect */}
      </div>
    </div>
  );
};

export default Marquee;
