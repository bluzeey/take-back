import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import Testimonials from "@/components/Testimonials";
import ImpactStatistics from "@/components/ImpactStatistics";
import JoinCommunity from "@/components/JoinCommunity";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <KeyFeatures />
        <Testimonials />
        {/* <ImpactStatistics /> */}
        <JoinCommunity />
      </main>
      <Footer />
    </div>
  );
}
