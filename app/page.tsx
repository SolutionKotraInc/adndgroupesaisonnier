import Hero from "../components/Hero";
import BloomSection from "../components/BloomSection";
import GrowthStory from "../components/GrowthStory";
import EcoDesign from "../components/EcoDesign";
import ParallaxSection from "../components/ParallaxSection";
import ServiceCards from "../components/ServiceCards";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import SocialsBar from "../components/SocialsBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADND Groupe Saisonnier - Aménagement paysager professionnel à Montréal",
  description: "Services d'aménagement paysager professionnel : tonte de pelouse, ouverture de terrain, contrôle des mauvaises herbes. ADND Groupe Saisonnier, votre partenaire paysagiste à Montréal et environs.",
  keywords: [
    "aménagement paysager Montréal",
    "tonte de pelouse professionnelle",
    "ouverture de terrain",
    "contrôle mauvaises herbes",
    "paysagiste Montréal",
    "entretien pelouse",
    "aménagement extérieur",
    "jardinage professionnel",
    "ADND Groupe Saisonnier",
    "services paysagers"
  ],
  openGraph: {
    title: "ADND Groupe Saisonnier - Aménagement paysager professionnel à Montréal",
    description: "Services d'aménagement paysager professionnel : tonte de pelouse, ouverture de terrain, contrôle des mauvaises herbes. Service dans la région de Montréal.",
    images: [
      {
        url: "/images/GARE_1.JPG",
        width: 1200,
        height: 630,
        alt: "Aménagement paysager professionnel ADND Groupe Saisonnier",
      },
    ],
  },
  alternates: {
    canonical: "https://adndgroupesaisonnier.com",
  },
};

export default function Page() {
  return (
    <>
      <Hero />
      <BloomSection />
      <GrowthStory />
      <EcoDesign />

      <ParallaxSection />
      <ServiceCards />
      <Projects />
      <Testimonials />
      <SocialsBar />
      <Footer />
    </>
  );
}
