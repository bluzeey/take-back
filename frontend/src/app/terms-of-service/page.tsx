import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Terms of Service
        </h1>
        <div className="prose max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Take Back platform, you agree to be bound
            by these Terms of Service. If you do not agree to these terms,
            please do not use our services.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Take Back provides a platform for users to manage recyclable
            materials, schedule pickups and drop-offs, and participate in a
            community forum related to sustainability and recycling.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their
            account information and for all activities that occur under their
            account. Users agree to notify Take Back immediately of any
            unauthorized use of their account.
          </p>

          <h2>4. Content</h2>
          <p>
            Users retain ownership of the content they post on Take Back. By
            posting content, users grant Take Back a non-exclusive, worldwide,
            royalty-free license to use, copy, reproduce, process, adapt,
            modify, publish, transmit, display, and distribute such content.
          </p>

          <h2>5. Prohibited Activities</h2>
          <p>
            Users agree not to engage in any activity that interferes with or
            disrupts the services or servers and networks connected to Take
            Back.
          </p>

          <h2>6. Termination</h2>
          <p>
            Take Back reserves the right to terminate or suspend access to our
            services immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the
            Terms.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            Take Back reserves the right to modify or replace these Terms at any
            time. It is your responsibility to check the Terms periodically for
            changes.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            terms@takeback.com.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
