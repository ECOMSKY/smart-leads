"use client";

import { useInView } from "@/hooks/useInView";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Probleme from "@/components/Probleme";
import Transition from "@/components/Transition";
import Solution from "@/components/Solution";
import Resultats from "@/components/Resultats";
import Differenciateurs from "@/components/Differenciateurs";
import Secteurs from "@/components/Secteurs";
import Formulaire from "@/components/Formulaire";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  useInView();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Probleme />
        <Transition />
        <Solution />
        <Resultats />
        <Differenciateurs />
        <Secteurs />
        <Formulaire />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
