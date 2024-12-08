import About from "@/components/About";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import AllProjects from "@/components/AllProjects";
import HeroParallaxDemo from "@/components/HeroParallaxDemo";
import { Service } from "@/components/Service";
import Marquee from "@/components/Skills";

export const revalidate = 3600; // Revalidate every hour

async function fetchProjects() {
  const res = await fetch(`https://codewithbeka.onrender.com/api/projects`, {
    cache: "force-cache", // Static fetch
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }
  const data = await res.json();
  return data.projects || [];
}

async function fetchCategories() {
  const res = await fetch(`https://codewithbeka.onrender.com/api/categories`, {
    cache: "force-cache", // Static fetch
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return data || [];
}
async function fetchSkills() {
  const res = await fetch(`https://codewithbeka.onrender.com/api/skills`, {
    cache: "force-cache", // Static fetch
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return data || [];
}
async function fetchTestimonials() {
  const res = await fetch(
    `https://codewithbeka.onrender.com/api/testimonials`,
    {
      cache: "force-cache", // Static fetch
      credentials: "include", // Include cookies and authentication data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return data || [];
}

export default async function Home() {
  const projects = await fetchProjects();
  const categories = await fetchCategories();
  const skills = await fetchSkills();
  const testimonials = await fetchTestimonials();

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <Service />
        <HeroParallaxDemo projects={projects} />
        <About />
        <Marquee skills={skills} />
        <AllProjects  categories={categories} />
        <Clients testimonials={testimonials} />
        <Approach />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
