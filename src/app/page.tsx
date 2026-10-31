
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";

import ImpactSection from "./components/home/ImpactSection";
import CommunityGallery from "./components/home/CommunityGallery";
import NewsletterSection from "./components/home/NewsShelterSection";
import RecentUpcomingEvents from "./components/home/RecentUpcomingEvents";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <RecentUpcomingEvents></RecentUpcomingEvents>
    
      <ImpactSection></ImpactSection>
      <CommunityGallery></CommunityGallery>
      <NewsletterSection></NewsletterSection>
    </main>
  );
}
