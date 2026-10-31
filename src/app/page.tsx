
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import ImpactSection from "./components/home/ImpactSection";
import CommunityGallery from "./components/home/CommunityGallery";
import RecentUpcomingEvents from "./components/home/RecentUpcomingEvents";
import CommunityInAction from "./components/home/CommunityInAction";
import Newsletter from "./components/home/Newsletter";

export default function Home() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutSection></AboutSection>
      <RecentUpcomingEvents></RecentUpcomingEvents>
      <CommunityInAction></CommunityInAction>
      <ImpactSection></ImpactSection>
      <CommunityGallery></CommunityGallery>
      <Newsletter></Newsletter>
     
    </main>
  );
}
