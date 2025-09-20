import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// INSTALL ICON LIBRARY (( @heroicons/react ))

import "@/app/_styles/globals.css"

export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-primary-950 text-primary-100">
        <header>
          <Navigation />
          <Logo />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
