"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileSummary from "@/components/ProfileSummary";
import QuickAccessLinks from "@/components/QuickAccessLinks";
import RecentActivityFeed from "@/components/RecentActivityFeed";
import ImpactStatistics from "@/components/ImpactStatistics";
import CommunityEngagement from "@/components/CommunityEngagement";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Welcome, John Doe!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {user && <ProfileSummary user={user} />}
            <QuickAccessLinks />
            <RecentActivityFeed />
          </div>
          <div className="space-y-8">
            <ImpactStatistics />
            <CommunityEngagement />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
