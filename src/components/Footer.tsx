import React from "react";
import { Star, MessageCircle, Heart, Shield, Sparkles, Mail, Phone } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

interface FooterProps {
  whatsAppUrl: string;
  onOpenBedtimeMode: () => void;
  onOpenPlayroom: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  whatsAppUrl,
  onOpenBedtimeMode,
  onOpenPlayroom,
  onOpenPrivacy,
  onOpenTerms
}) => {
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
                href={whatsAppUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center px-4 py-2 bg-[#25D366] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md"
              >
                <MessageCircle className="w-4 h-4 mr-1.5 fill-white text-[#25D366]" />
                WhatsApp Us
              </a>
              <button
                onClick={onOpenPlayroom}
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
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-amber-400 transition-colors">
                  Why Parents Choose Kidora
                </a>
              </li>
              <li>
                <a href="#personalise" className="hover:text-amber-400 transition-colors">
                  Personalisation Studio
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-amber-400 transition-colors">
                  Playroom Games (4 Modes)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Screen Time Impact Calculator
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  Pricing & Packs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Schools & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white">
              Schools & Preschools
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Looking for custom preschool graduation anthems, annual day songs, or student birthday packs?
            </p>
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
              <span>Bulk School Inquiries</span>
              <a
                href={whatsAppUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-amber-400 font-bold hover:underline"
              >
                Inquire on WhatsApp →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Kidora. All rights reserved. No ads. No autoplay. Reviewed by a person before it reaches your child.</p>
          <div className="flex items-center space-x-3 flex-wrap justify-center">
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="hover:text-zinc-300 underline cursor-pointer"
              >
                Privacy Policy
              </button>
            )}
            <span>•</span>
            {onOpenTerms && (
              <button
                onClick={onOpenTerms}
                className="hover:text-zinc-300 underline cursor-pointer"
              >
                Terms of Service
              </button>
            )}
            <span>•</span>
            <button onClick={onOpenBedtimeMode} className="hover:text-zinc-300 cursor-pointer">
              Bedtime Mode 🌙
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
