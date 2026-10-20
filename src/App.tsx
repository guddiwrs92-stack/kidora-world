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
import { ScrollMascot } from "./components/ScrollMascot";
import { PersonalisationState } from "./types";
import { soundManager } from "./utils/audioSynthesizer";
import { MessageCircle, Gamepad2 } from "lucide-react";
import { buildCompliantWhatsAppMessage, getWhatsAppUrl, CONTACT_CONFIG } from "./config/contact";
import { OrderConsentProvider, useOrderConsent } from "./context/OrderConsentContext";
import { OrderConsentWarningModal } from "./components/OrderConsentCheckbox";
import { CookieBanner } from "./components/CookieBanner";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsPage } from "./pages/TermsPage";
import { trackGenericEvent } from "./lib/consent";

function MainAppContent() {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(false);

  // Client-side routing for /privacy and /terms
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  const { hasConsented, triggerWarning } = useOrderConsent();

  // Modals
  const [isBedtimeOpen, setIsBedtimeOpen] = useState(false);
  const [isPlayroomModalOpen, setIsPlayroomModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

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

  // Handle URL change detection (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Track generic page_view (strictly no personal info, parameters or child data)
  useEffect(() => {
    trackGenericEvent("page_view");
  }, [currentPath]);

  const navigateTo = (path: string) => {
    try {
      window.history.pushState(null, "", path);
    } catch {
      // fallback
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll detection for sticky navbar
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

  const childFirstName = personalisation.name.trim().split(/\s+/)[0] || "Arjun";

  // Strict compliant WhatsApp order message builder
  const whatsappMsg = buildCompliantWhatsAppMessage({
    childName: childFirstName,
    ageBand: personalisation.age,
    interest: personalisation.interest,
    value: personalisation.value,
    learningGoal: personalisation.goal,
    chosenPack: "Growth Duo Pack"
  });
  const whatsAppUrl = getWhatsAppUrl(whatsappMsg);

  const scrollToCreator = () => {
    const el = document.getElementById("personalise");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFloatingWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasConsented) {
      e.preventDefault();
      soundManager.playSoundEffect("pop");
      triggerWarning();
    } else {
      soundManager.playSoundEffect("victory");
      trackGenericEvent("click_order_button");
    }
  };

  // Route: /privacy
  if (currentPath === "/privacy") {
    return (
      <>
        <PrivacyPolicyPage
          onBackToHome={() => navigateTo("/")}
          onNavigateTerms={() => navigateTo("/terms")}
        />
        <CookieBanner
          onNavigatePrivacy={() => navigateTo("/privacy")}
          onVisibilityChange={setIsCookieBannerVisible}
        />
        <OrderConsentWarningModal />
      </>
    );
  }

  // Route: /terms
  if (currentPath === "/terms") {
    return (
      <>
        <TermsPage
          onBackToHome={() => navigateTo("/")}
          onNavigatePrivacy={() => navigateTo("/privacy")}
        />
        <CookieBanner
          onNavigatePrivacy={() => navigateTo("/privacy")}
          onVisibilityChange={setIsCookieBannerVisible}
        />
        <OrderConsentWarningModal />
      </>
    );
  }

  // Main Home Page
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAF9F5] text-[#1A1A2E] selection:bg-brand-primary selection:text-white relative">
      
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
        onNavigateLegal={navigateTo}
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
          onNavigateLegal={navigateTo}
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
          onNavigateLegal={navigateTo}
        />

        {/* 3. In-Browser Educational Games Playroom */}
        <GamesPlayroom />

        {/* 4. WhatsApp Delivery Smartphone Mockup */}
        <WhatsAppMockupViewer
          personalisation={personalisation}
          onNavigateLegal={navigateTo}
        />

        {/* 5. Parent Screen Time vs. Growth Analyzer */}
        <GrowthImpactCalculator />

        {/* 6. Products, Pricing Tiers & FAQ */}
        <ProductsAndPricing
          personalisation={personalisation}
          onNavigateLegal={navigateTo}
        />

        {/* 7. Parent Reviews & Testimonials */}
        <TestimonialsSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenBedtimeMode={() => setIsBedtimeOpen(true)}
        onOpenPlayroom={() => setIsPlayroomModalOpen(true)}
        onNavigatePrivacy={() => navigateTo("/privacy")}
        onNavigateTerms={() => navigateTo("/terms")}
      />

      {/* Floating Sticky Actions (WhatsApp + Playroom trigger) - clearance prevents covering banner */}
      <div
        className={`fixed ${
          isCookieBannerVisible ? "bottom-36 sm:bottom-6" : "bottom-6"
        } right-6 z-40 flex flex-col items-end space-y-3 transition-all duration-300`}
      >
        
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
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            onClick={handleFloatingWhatsAppClick}
            aria-label={`Chat & Order on WhatsApp (${CONTACT_CONFIG.whatsappDisplay})`}
            className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 transition-all relative z-10 cursor-pointer"
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

      {/* Cookie Consent Banner */}
      <CookieBanner
        onNavigatePrivacy={() => navigateTo("/privacy")}
        onVisibilityChange={setIsCookieBannerVisible}
      />

      {/* Order Consent Warning Modal */}
      <OrderConsentWarningModal />

    </div>
  );
}

export function App() {
  return (
    <OrderConsentProvider>
      <MainAppContent />
    </OrderConsentProvider>
  );
}

export default App;
