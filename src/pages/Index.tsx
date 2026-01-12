import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BrandStorySection from "@/components/BrandStorySection";
import ServicesSection from "@/components/ServicesSection";
import DifferentiationSection from "@/components/DifferentiationSection";
import SectorsSection from "@/components/SectorsSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BrandStorySection />
        <ServicesSection />
        <DifferentiationSection />
        <SectorsSection />
        <ClientLogosSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
