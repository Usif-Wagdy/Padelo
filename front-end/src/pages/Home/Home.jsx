import { useAuth } from "../../context/AuthContext";
import HeroSection from "./HeroSection";
import InfoCardsSection from "./InfoCardsSection";
import { howItWorksSteps, whyPadeloFeatures } from "../../constants/index";

export default function Home() {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection bgImage="/hero-bg.webp" isAuthed={auth?.user} />
      <InfoCardsSection
        title="How It Works"
        items={howItWorksSteps}
        bgImage="/pattern-bg.webp"
        bgColor="bg-neutral-100 dark:bg-gray-800"
        cardBgColor="bg-white dark:bg-gray-700"
      />
      <InfoCardsSection
        title="Why Choose Padelo?"
        items={whyPadeloFeatures}
        bgColor="bg-white dark:bg-gray-900"
        cardBgColor="bg-neutral-100 dark:bg-gray-800"
      />
    </div>
  );
}
