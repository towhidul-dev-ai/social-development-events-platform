import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import LatestEvents from "./components/home/LatestEvents";
import ImpactSection from "./components/home/ImpactSection";
import CommunityGallery from "./components/home/CommunityGallery";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <LatestEvents></LatestEvents>
      <ImpactSection></ImpactSection>
      <CommunityGallery></CommunityGallery>
    </main>
  );
}
