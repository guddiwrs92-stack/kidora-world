import React, { useState } from "react";
import { Star, MessageCircle, Menu, X, Volume2, VolumeX, Moon, Sparkles, Gamepad2, Award } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  scrolled: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenBedtimeMode: () => void;
  onOpenPlayroom: () => void;
  onOpenCertificate: () => void;
  whatsAppUrl: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  scrolled,
  isMuted,
  onToggleMute,
  onOpenBedtimeMode,
  onOpenPlayroom,
  onOpenCertificate,
  whatsAppUrl
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md py-2"
          : "bg-white/40 backdrop-blur-md border-b border-white/20 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a
            href="#home"
            id="nav-logo"
            className="flex items-center space-x-2.5 group focus:outline-hidden"
            onClick={() => soundManager.playSoundEffect("click")}
          >
            <span className="w-10 h-10 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-md shadow-brand-primary/25 transform group-hover:rotate-12 group-hover:scale-105 transition-transform duration-300">
              <Star className="w-5 h-5 fill-brand-accent1 text-brand-accent1 animate-pulse" />
            </span>
            <div>
              <span className="font-display text-2xl font-black tracking-tight text-brand-primary flex items-center">
                Kidora
                <span className="text-brand-accent1 ml-1 text-base transform group-hover:scale-125 transition-transform duration-300">⭐</span>
              </span>
              <p className="text-[10px] uppercase tracking-wider text-brand-accent2 font-bold -mt-1 font-sans">
                Magic For Your Child
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            <a
              href="#home"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#personalise"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent1" />
              Creator Studio
            </a>
            <button
              onClick={() => {
                soundManager.playSoundEffect("pop");
                onOpenPlayroom();
              }}
              className="text-xs uppercase font-extrabold tracking-wider text-brand-primary bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border border-indigo-100 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 text-brand-primary" />
              Play Games
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </button>
            <a
              href="#products"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="#calculator"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200"
            >
              Screen Impact
            </a>
            <a
              href="#testimonials"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="text-xs uppercase font-extrabold tracking-wider text-gray-700 hover:text-brand-primary transition-colors duration-200"
            >
              FAQ
            </a>
          </nav>

          {/* Quick Action Controls & Order CTA */}
          <div className="flex items-center space-x-2.5">
            {/* Bedtime Calm Button */}
            <button
              id="btn-bedtime-mode"
              onClick={() => {
                soundManager.playSoundEffect("starDing");
                onOpenBedtimeMode();
              }}
              title="Bedtime Sleep & Story Mode"
              aria-label="Bedtime Sleep & Story Mode"
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-purple-50 text-brand-accent2 hover:bg-purple-100 transition-colors border border-purple-100 flex items-center justify-center gap-1 text-xs font-bold cursor-pointer"
            >
              <Moon className="w-4 h-4" />
              <span className="hidden sm:inline">Bedtime</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              id="btn-toggle-mute"
              onClick={() => {
                onToggleMute();
                soundManager.playSoundEffect("click");
              }}
              title={isMuted ? "Unmute Sound Effects & Audio" : "Mute Sound"}
              aria-label={isMuted ? "Unmute Sound Effects & Audio" : "Mute Sound"}
              className={`min-h-[44px] min-w-[44px] p-2.5 rounded-xl transition-colors border cursor-pointer flex items-center justify-center ${
                isMuted
                  ? "bg-gray-100 text-gray-400 border-gray-200"
                  : "bg-amber-50 text-brand-accent1 border-amber-200"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* WhatsApp Order Button */}
            <a
              id="btn-nav-order"
              href={whatsAppUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              aria-label="Order on WhatsApp"
              onClick={() => soundManager.playSoundEffect("victory")}
              className="min-h-[44px] hidden sm:inline-flex items-center px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 fill-white text-[#25D366]" />
              Order on WhatsApp
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden min-h-[44px] min-w-[44px] p-2 rounded-xl text-gray-700 hover:bg-gray-100 flex items-center justify-center focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 px-4 pt-3 pb-6 space-y-3"
          >
            <nav className="flex flex-col space-y-2">
              <a
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-bold py-2 hover:text-brand-primary text-sm flex items-center justify-between"
              >
                <span>Home</span>
                <span>🏠</span>
              </a>
              <a
                href="#personalise"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-bold py-2 hover:text-brand-primary text-sm flex items-center justify-between"
              >
                <span>Creator Studio (Personalise)</span>
                <span>✨</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlayroom();
                }}
                className="text-left text-brand-primary font-bold py-2 text-sm flex items-center justify-between"
              >
                <span>Kidora Playroom Games</span>
                <span className="bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-full font-black">4 Games</span>
              </button>
              <a
                href="#products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-bold py-2 hover:text-brand-primary text-sm flex items-center justify-between"
              >
                <span>Products & Pricing</span>
                <span>🎁</span>
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-800 font-bold py-2 hover:text-brand-primary text-sm flex items-center justify-between"
              >
                <span>Screen Time Impact</span>
                <span>📊</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCertificate();
                }}
                className="text-left text-brand-success font-bold py-2 text-sm flex items-center justify-between"
              >
                <span>Print Explorer Certificate</span>
                <span>📜</span>
              </button>
            </nav>

            <div className="pt-2">
              <a
                id="btn-nav-order-mobile"
                href={whatsAppUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full text-center inline-flex justify-center items-center px-5 py-3.5 bg-[#25D366] text-white font-extrabold text-sm rounded-xl shadow-md"
              >
                <MessageCircle className="w-5 h-5 mr-2 fill-white text-[#25D366]" />
                Order on WhatsApp Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
