import React from "react";
import { Star, MessageCircle } from "lucide-react";
import { CONTACT_CONFIG, getWhatsAppUrl } from "../config/contact";
import { soundManager } from "../utils/audioSynthesizer";
import { resetConsent } from "../lib/consent";

interface FooterProps {
  onOpenBedtimeMode: () => void;
  onOpenPlayroom: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onOpenCookieSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBedtimeMode,
  onOpenPlayroom,
  onNavigatePrivacy,
  onNavigateTerms,
  onOpenCookieSettings
}) => {
  const whatsAppGeneralUrl = getWhatsAppUrl(
    "Hello Kidora Team! 🌟 I have a question about your personalized stories and songs."
  );

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-9 h-9 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-md">
                <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
              </span>
              <span className="font-display text-2xl font-black tracking-tight text-white">
                Kidora <span className="text-amber-400">⭐</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Transforming screen time into personal discovery, values, and joy. Personalized songs, interactive books, and educational games delivered right to WhatsApp.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={whatsAppGeneralUrl}
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                onClick={() => soundManager.playSoundEffect("victory")}
                className="inline-flex items-center px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 fill-white text-[#25D366]" />
                WhatsApp Us ({CONTACT_CONFIG.whatsappDisplay})
              </a>
              <button
                onClick={() => {
                  soundManager.playSoundEffect("pop");
                  onOpenPlayroom();
                }}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Launch Playroom 🎮
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white">
              Explore Kidora
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="/#home" className="hover:text-amber-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="/#features" className="hover:text-amber-400 transition-colors">
                  Why Parents Choose Kidora
                </a>
              </li>
              <li>
                <a href="/#personalise" className="hover:text-amber-400 transition-colors">
                  Personalisation Studio
                </a>
              </li>
              <li>
                <a href="/#games" className="hover:text-amber-400 transition-colors">
                  Playroom Games (4 Modes)
                </a>
              </li>
              <li>
                <a href="/#calculator" className="hover:text-amber-400 transition-colors">
                  Screen Time Impact Calculator
                </a>
              </li>
              <li>
                <a href="/#products" className="hover:text-amber-400 transition-colors">
                  Pricing &amp; Packs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Legal */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white">
              Contact &amp; Location
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Based in {CONTACT_CONFIG.location}.
            </p>
            <p className="text-xs text-zinc-400">
              Email: <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-amber-300 hover:underline">{CONTACT_CONFIG.email}</a>
            </p>
            <p className="text-xs text-zinc-400">
              WhatsApp: <a href={whatsAppGeneralUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline">{CONTACT_CONFIG.whatsappDisplay}</a>
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playSoundEffect("click");
                  resetConsent();
                }}
                className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-bold border border-zinc-800 transition-colors cursor-pointer"
              >
                Cookie settings 🍪
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 Kidora. All rights reserved. No ads. No autoplay. Reviewed by a person before it reaches your child.</p>
          <div className="flex items-center space-x-3 flex-wrap justify-center">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigatePrivacy();
              }}
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigateTerms();
              }}
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Terms &amp; Refunds
            </a>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                soundManager.playSoundEffect("click");
                resetConsent();
              }}
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Cookie settings
            </button>
            <span>•</span>
            <button
              onClick={onOpenBedtimeMode}
              className="hover:text-zinc-300 cursor-pointer"
            >
              Bedtime Mode 🌙
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
