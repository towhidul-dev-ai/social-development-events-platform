import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
    </main>
  );
}
