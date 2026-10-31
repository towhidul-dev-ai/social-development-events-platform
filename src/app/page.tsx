
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import ImpactSection from "./components/home/ImpactSection";
import CommunityGallery from "./components/home/CommunityGallery";
import NewsletterSection from "./components/home/NewsShelterSection";
import RecentUpcomingEvents from "./components/home/RecentUpcomingEvents";
import CommunityInAction from "./components/home/CommunityInAction";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <RecentUpcomingEvents></RecentUpcomingEvents>
      <CommunityInAction></CommunityInAction>
      <ImpactSection></ImpactSection>
      <CommunityGallery></CommunityGallery>
      <NewsletterSection></NewsletterSection>
    </main>
  );
}
