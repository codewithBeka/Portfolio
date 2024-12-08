"use client";

import { Project } from "@/utils/types";
import { HeroParallax } from "./ui/hero-parallax";

interface HeroParallaxDemoProps {
  projects: Project[];
}

export default function HeroParallaxDemo({ projects }: HeroParallaxDemoProps) {
  // Ensure data is an array of projects
  if (!Array.isArray(projects)) {
    return (
      <div>
        Error: Expected projects to be an array, but received {typeof projects}.
      </div>
    );
  }

  const featuredProjects = projects.filter((project) => project.featured);

  if (!featuredProjects.length) {
    return <div>No featured projects available.</div>;
  }

  const products = featuredProjects.map((project) => ({
    title: project.title,
    link: `/project/${project._id}`,
    thumbnail: project.media[0]?.url || "",
  }));

  return <HeroParallax products={products} />;
}

// import React from "react";
// import { HeroParallax } from "./ui/hero-parallax";
// import { useGetAllProjectsQuery } from "@/app/redux/api/projectService";

// interface Project {
//   _id: string;
//   title: string;
//   simpleDescription: string;
//   featured: boolean;
//   media: {
//     url: string;
//     type: "image" | "video";
//   }[];
// }

// export default function HeroParallaxDemo() {
//   const {
//     data: projectsData,
//     isLoading,
//     error,
//   } = useGetAllProjectsQuery(undefined);
//   const projects = projectsData?.projects || []; // Ensure projects is an array
//   console.log("projectsData", projectsData);
//   console.log("projects", projects);
//   if (isLoading) {
//     return (
//       <div className="flex flex-wrap items-center justify-center p-4">
//         {/* Skeleton loading effect */}
//         {[...Array(3)].map((_, index) => (
//           <div
//             key={index}
//             className="w-80 h-48 bg-gray-300 rounded-lg animate-pulse m-2"
//           ></div>
//         ))}
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error fetching projects: {error.toString()}</div>;
//   }

//   // Ensure data is an array of projects
//   if (!Array.isArray(projects)) {
//     return (
//       <div>
//         Error: Expected projects to be an array, but received {typeof projects}.
//       </div>
//     );
//   }

//   const featuredProjects = projects.filter((project) => project.featured);
//   console.log("featuredProjects", featuredProjects);

//   if (!featuredProjects.length) {
//     return <div>No featured projects available.</div>;
//   }

//   const products = featuredProjects.map((project) => ({
//     title: project.title,
//     link: `/project/${project._id}`,
//     thumbnail: project.media[0]?.url || "",
//   }));
//   console.log("products", products);

//   return <HeroParallax products={products} />;
// }
