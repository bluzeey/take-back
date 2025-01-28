import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-green-100 py-20">
      <div className="container mx-auto max-w-7xl w-full  px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Transform Recycling into Opportunities!
          </h1>
          <p className="text-xl text-green-700 mb-6">
            Join our platform to connect with companies that take back materials
            and track your recycling impact.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button className="bg-green-700 hover:bg-green-600 text-white">
                Get Started
              </Button>
            </Link>
            <Button
              variant="outline"
              className="text-green-700 border-green-700 hover:bg-green-100"
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <Image
            src="/images/hero/image.png"
            alt="Recycling Illustration"
            width={400}
            height={400}
            className="rounded-lg shadow-lg w-full "
          />
        </div>
      </div>
    </section>
  );
}
