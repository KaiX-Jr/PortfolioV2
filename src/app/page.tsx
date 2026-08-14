import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import InteractiveResume from "@/components/InteractiveResume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimeScrollProvider from "@/components/AnimeScrollProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SoundProvider } from "@/components/SoundProvider";
import { SilkBackground } from "@/components/ui/silk-background";
import { FluidGlassCursor } from "@/components/ui/fluid-glass-cursor";

export default function Home() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AnimeScrollProvider>
          {/* 1. React Bits Interactive Fluid Glass Cursor Follower (Hidden on mobile touch devices for smooth native touch scrolling) */}
          <FluidGlassCursor />

          {/* 2. React Bits Flowing Green Silk Background */}
          <SilkBackground
            color="#10b981"
            speed={0.0012}
            scale={1.1}
            interactive={true}
          />

          {/* 3. Main Page Layout with Translucent Liquid Glass Elevation */}
          <Navbar />
          <main className="flex-grow pt-20 sm:pt-28 px-3 sm:px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col gap-10 sm:gap-16 relative z-10 overflow-hidden">
            <Hero />
            <TechStack />
            <Projects />
            <Experience />
            <InteractiveResume />
            <Contact />
          </main>
          <Footer />
        </AnimeScrollProvider>
      </SoundProvider>
    </ThemeProvider>
  );
}
