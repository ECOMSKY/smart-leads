"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="font-outfit text-xl font-bold text-primary">
          Smart Leads
        </a>
        <a
          href="#formulaire"
          className="bg-primary hover:bg-primary-hover text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Réserver ma démo
        </a>
      </div>
    </nav>
  );
}
