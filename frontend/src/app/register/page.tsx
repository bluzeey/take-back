"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import SocialLogin from "@/components/SocialLogin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-8">
          Join the Take Back Community!
        </h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <RegistrationForm />
          <div className="mt-6">
            <SocialLogin />
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline">
              Log in here
            </Link>
          </p>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Having trouble registering?{" "}
            <Button
              variant="link"
              className="text-green-600 p-0"
              onClick={() => setShowHelp(true)}
            >
              Need Help?
            </Button>
          </p>
        </div>
        {showHelp && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-md">
              <h2 className="text-2xl font-bold mb-4">Registration Help</h2>
              <p className="mb-4">
                If you&apos;re experiencing issues with registration, please
                contact our support team at support@takeback.com or call us at
                1-800-TAKEBACK.
              </p>
              <Button onClick={() => setShowHelp(false)}>Close</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
