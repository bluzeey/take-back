import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { MaterialProvider } from "@/context/MaterialContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoCycle - Sustainable Recycling Platform",
  description:
    "Join us to code a greener future by connecting recyclers with companies that take back materials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MaterialProvider>{children}</MaterialProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
