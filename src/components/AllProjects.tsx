"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { PinContainer } from "./ui/Pin";
import { useGetProjectsQuery } from "@/app/redux/api/projectService";
import { useGetCategoriesQuery } from "@/app/redux/api/categoryService";
import Link from "next/link";
import bg from "@/assets/images/bg.png";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SkeletonLoader from "./ui/SkeletonLoader";

// Define types for Project and Category
interface Technology {
  image: string;
}

interface Category {
  name: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  simpleDescription: string;
  media: { url: string }[];
  category: Category; // Adjust this if the structure is different
  technologies: Technology[];
}

const AllProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | undefined>("All");
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const [allProjects, setAllProjects] = useState<Project[]>([]); // New state to hold all projects

  const limit = 4; // Number of projects to fetch per request
  console.log("Active Filter:", activeFilter);
  // Fetch projects and categories from the API
  const {
    data: projectsData,
    error: projectsError,
    isLoading: projectsLoading,
  } = useGetProjectsQuery({
    categoryName: activeFilter === "All" ? undefined : activeFilter, // Handle "All" case
    page: currentPage,
    limit,
  });

  useEffect(() => {
    if (projectsData) {
      setAllProjects((prevProjects) => [
        ...prevProjects,
        ...projectsData.projects.filter(
          (newProject: Project) =>
            !prevProjects.some(
              (prevProject) => prevProject._id === newProject._id
            )
        ),
      ]);
    }
  }, [projectsData]);
  const {
    data: categories = [],
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery(undefined); // Fetch categories without parameters

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter === "All" ? undefined : filter);
    setCurrentPage(1);
    setAllProjects([]); // Reset projects when filter changes
  };

  // Error handling function
  const getErrorMessage = (error: any): string => {
    if (error && "status" in error) {
      const fetchError = error as FetchBaseQueryError;
      return fetchError.data
        ? JSON.stringify(fetchError.data)
        : "An error occurred.";
    } else if (error && "message" in error) {
      return error.message;
    }
    return "An unknown error occurred.";
  };

  // Loading states
  if (projectsLoading || categoriesLoading) {
    return <SkeletonLoader />; // Use SkeletonLoader while loading
  }

  // Error handling
  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    return (
      <div className="text-red-500 text-center">
        Error fetching projects: {getErrorMessage(projectsError)}
      </div>
    );
  }

  if (categoriesError) {
    console.error("Error fetching categories:", categoriesError);
    return (
      <div className="text-red-500 text-center">
        Error fetching categories: {getErrorMessage(categoriesError)}
      </div>
    );
  }

  // Extract projects and total count from the fetched data
  const { projects = [], totalCount = 0 } = projectsData || {};

  return (
    <div className="py-20" id="projects">
      <h1 className="heading">
        A robust selection of <span className="text-purple">All projects</span>
      </h1>

      <div className="flex flex-wrap justify-center items-center my-16">
        {["All", ...categories.map((category: Category) => category.name)].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleFilterChange(item)}
              className={`flex items-center justify-center p-2 rounded-md dark:border-white/[0.2] text-white font-bold cursor-pointer transition-all duration-300 m-2 
                        ${
                          activeFilter === item
                            ? "bg-indigo-500 text-purple"
                            : "hover:bg-indigo-500 hover:text-purple"
                        }`}
              style={{
                background:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              {item}
            </div>
          )
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center p-4 gap-14 mt-3">
        {allProjects.map((project: Project) => (
          <div
            key={project._id}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <PinContainer>
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <Image
                    src={bg}
                    alt="bgimg"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                  />
                </div>

                <Image
                  src={project.media[0]?.url}
                  alt="cover"
                  layout="fill"
                  objectFit="contain"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {project.title}
              </h1>
              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{ color: "#BEC1DD", margin: "1vh 0" }}
              >
                {project?.simpleDescription}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    >
                      <Image
                        src={tech.image}
                        alt={`Icon ${index + 1}`}
                        width={40}
                        height={40}
                        className="p-2"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <Link href={`/project/${project._id}`}>
                    <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                      Read More
                    </p>
                    <FaLocationArrow className="ms-3" color="#CBACF9" />
                  </Link>
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {allProjects.length < totalCount && ( // Show button if there are more projects
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)} // Increment page when button is clicked
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProjects;
