import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { WhyParentsChooseSection } from "./components/WhyParentsChooseSection";
import { PersonalisationStudio } from "./components/PersonalisationStudio";
import { GamesPlayroom } from "./components/GamesPlayroom";
import { WhatsAppMockupViewer } from "./components/WhatsAppMockupViewer";
import { GrowthImpactCalculator } from "./components/GrowthImpactCalculator";
import { ProductsAndPricing } from "./components/ProductsAndPricing";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";
import { BedtimeModeModal } from "./components/BedtimeModeModal";
import { CertificateBuilder } from "./components/CertificateBuilder";
import { LegalModal } from "./components/LegalModal";
import { ScrollMascot } from "./components/ScrollMascot";
import { PersonalisationState } from "./types";
import { soundManager } from "./utils/audioSynthesizer";
import { MessageCircle, Gamepad2, Sparkles, Moon } from "lucide-react";

export function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  // Modals
  const [isBedtimeOpen, setIsBedtimeOpen] = useState(false);
  const [isPlayroomModalOpen, setIsPlayroomModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<"privacy" | "terms" | null>(null);

  // Core personalization state
  const [personalisation, setPersonalisation] = useState<PersonalisationState>({
    name: "Arjun",
    age: "6-8 Years",
    interest: "Space & Stars",
    goal: "Curiosity & Science",
    value: "Bravery 🦁",
    avatar: {
      skinTone: "🏽",
      hairStyle: "Spiky Hair",
      accessory: "Explorer Goggles 🥽",
      companionPet: "Baby Dragon 🐉",
      color: "Royal Blue"
    }
  });

  // Handle scroll detection for sticky glass navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
  };

  const handlePlaySample = () => {
    setIsPlayingSample(true);
    soundManager.playThemedSong("chimes", undefined, () => {
      setIsPlayingSample(false);
    });
  };

  const handleStopSample = () => {
    soundManager.stopCurrentSong();
    setIsPlayingSample(false);
  };

  // Pre-configured WhatsApp direct link with child parameters
  const childName = personalisation.name.trim() || "Arjun";
  const whatsappMsg = encodeURIComponent(
    `Hello Kidora Team! 🌟 I'd like to order a personalised pack for my child:\n\n` +
    `• Child Name: ${childName}\n` +
    `• Age: ${personalisation.age}\n` +
    `• Interest: ${personalisation.interest}\n` +
    `• Moral Value: ${personalisation.value}\n` +
    `• Companion: ${personalisation.avatar.companionPet}\n\n` +
    `Please share sample details & next steps!`
  );
  const whatsAppUrl = `https://wa.me/919999999999?text=${whatsappMsg}`;

  const scrollToCreator = () => {
    const el = document.getElementById("personalise");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFAF8] text-[#1A1A2E] selection:bg-brand-primary selection:text-white relative">
      
      {/* Scroll-Driven Flying Mascot Animation & Trail */}
      <ScrollMascot companionPet={personalisation.avatar.companionPet} />

      {/* Top Glass Navbar */}
      <Navbar
        scrolled={scrolled}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenBedtimeMode={() => setIsBedtimeOpen(true)}
        onOpenPlayroom={() => setIsPlayroomModalOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        whatsAppUrl={whatsAppUrl}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          personalisation={personalisation}
          onOpenCreator={scrollToCreator}
          onPlaySample={handlePlaySample}
          isPlayingSample={isPlayingSample}
          onStopSample={handleStopSample}
        />

        {/* 1.5. Why Parents Choose Kidora Feature Section */}
        <WhyParentsChooseSection
          onOpenCreator={scrollToCreator}
          onOpenPlayroom={() => setIsPlayroomModalOpen(true)}
          onOpenBedtimeMode={() => setIsBedtimeOpen(true)}
        />

        {/* 2. Personalisation Creator Studio & Live Interactive Story Engine */}
        <PersonalisationStudio
          personalisation={personalisation}
          onUpdatePersonalisation={setPersonalisation}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          whatsAppUrl={whatsAppUrl}
        />

        {/* 3. In-Browser Educational Games Playroom */}
        <GamesPlayroom />

        {/* 4. WhatsApp Delivery Smartphone Mockup */}
        <WhatsAppMockupViewer
          personalisation={personalisation}
          whatsAppUrl={whatsAppUrl}
        />

        {/* 5. Parent Screen Time vs. Growth Analyzer */}
        <GrowthImpactCalculator />

        {/* 6. Products, Pricing Tiers & FAQ */}
        <ProductsAndPricing
          whatsAppUrl={whatsAppUrl}
          childName={childName}
        />

        {/* 7. Parent Reviews & Testimonials */}
        <TestimonialsSection />

      </main>

      {/* Footer */}
      <Footer
        whatsAppUrl={whatsAppUrl}
        onOpenBedtimeMode={() => setIsBedtimeOpen(true)}
        onOpenPlayroom={() => setIsPlayroomModalOpen(true)}
        onOpenPrivacy={() => setLegalModalTab("privacy")}
        onOpenTerms={() => setLegalModalTab("terms")}
      />

      {/* Floating Sticky Actions (WhatsApp + Playroom trigger) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        
        {/* Quick Playroom Trigger */}
        <button
          onClick={() => {
            soundManager.playSoundEffect("pop");
            setIsPlayroomModalOpen(true);
          }}
          className="p-3 bg-brand-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer group"
          title="Open Playroom Games"
        >
          <Gamepad2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Play Games</span>
        </button>

        {/* Floating WhatsApp Button with pulse rings */}
        <div className="relative">
          <div className="wa-pulse-ring wa-pulse-ring-1" />
          <div className="wa-pulse-ring wa-pulse-ring-2" />
          <a
            id="floating-whatsapp-btn"
            href={whatsAppUrl}
            target="_blank"
            referrerPolicy="no-referrer"
            onClick={() => soundManager.playSoundEffect("victory")}
            className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all relative z-10"
            title="Chat & Order on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
          </a>
        </div>
      </div>

      {/* Bedtime Mode Modal */}
      {isBedtimeOpen && (
        <BedtimeModeModal
          personalisation={personalisation}
          onClose={() => setIsBedtimeOpen(false)}
        />
      )}

      {/* Playroom Dedicated Fullscreen / Modal overlay if triggered */}
      {isPlayroomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-6 shadow-2xl relative my-8">
            <GamesPlayroom isModal onClose={() => setIsPlayroomModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Certificate Builder Modal */}
      {isCertificateOpen && (
        <CertificateBuilder
          personalisation={personalisation}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Legal Modal (Privacy Policy & Terms) */}
      {legalModalTab && (
        <LegalModal
          initialTab={legalModalTab}
          onClose={() => setLegalModalTab(null)}
          whatsAppUrl={whatsAppUrl}
        />
      )}

    </div>
  );
}

export default App;
