import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Privacy Policy
        </h1>
        <div className="prose max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, schedule a pickup or drop-off, or participate in
            our community forum. This may include your name, email address,
            physical address, and content you post on our platform.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, to communicate with you, and to personalize your
            experience on Take Back.
          </p>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>
            We do not share your personal information with third parties except
            as described in this policy. We may share your information with
            service providers who perform services on our behalf, or when
            required by law.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to help protect information about you
            from loss, theft, misuse, unauthorized access, disclosure,
            alteration, and destruction.
          </p>

          <h2>5. Your Choices</h2>
          <p>
            You can access and update certain information about you through your
            account settings. You can also opt-out of certain communications
            from us.
          </p>

          <h2>6. Cookies</h2>
          <p>
            We use cookies and similar technologies to collect information about
            your browsing activities and to distinguish you from other users of
            our platform.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may change this privacy policy from time to time. If we make
            changes, we will notify you by revising the date at the top of the
            policy.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            us at privacy@takeback.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
