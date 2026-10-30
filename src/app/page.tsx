import Image from "next/image";
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import LatestEvents from "./components/home/LatestEvents";
import ImpactSection from "./components/home/ImpactSection";
import CommunityGallery from "./components/home/CommunityGallery";
import NewsletterSection from "./components/home/NewsShelterSection";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <LatestEvents></LatestEvents>
      <ImpactSection></ImpactSection>
      <CommunityGallery></CommunityGallery>
      <NewsletterSection></NewsletterSection>
    </main>
  );
}
