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

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <Hero />
        <Service />
        <HeroParallaxDemo />
        <About />
        <Marquee />
        <AllProjects />
        <Clients />
        <Approach />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
