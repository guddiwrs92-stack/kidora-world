import React, { useState } from "react";
import { Users, Sparkles, CheckCircle2, Send, ShieldCheck, Heart } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";
import confetti from "canvas-confetti";

export const TestimonialsSection: React.FC = () => {
  const [parentName, setParentName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [childInterests, setChildInterests] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) return;

    soundManager.playSoundEffect("victory");
    setSubmitted(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#1A3BD4", "#F5A623", "#1D9E75", "#7F77DD"]
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-linear-to-b from-white to-[#FFFBF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-black uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            <span>Founding Families Program</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Join Our Founding Families
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Be part of shaping personalized, thoughtful kids' content. Get early access to new stories, audio jingles, and learning games.
          </p>
        </div>

        {/* Founding Families Waitlist Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-indigo-100 shadow-xl relative">
          
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-black text-brand-text">
                Welcome to the Founding Families!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for joining. We will reach out directly with preview stories and invite your feedback as we release new packs.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-brand-primary hover:underline pt-2 cursor-pointer"
              >
                Register another family member &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1.5">
                <label htmlFor="founding-parent-name" className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                  Parent or Guardian Name
                </label>
                <input
                  id="founding-parent-name"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-semibold outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="founding-contact-info" className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                  Email or WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  id="founding-contact-info"
                  type="text"
                  required
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Where we can send your early access invite"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-semibold outline-hidden transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="founding-child-interests" className="block text-xs font-black text-gray-700 uppercase tracking-wider">
                  What topics or themes does your child love most? <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="founding-child-interests"
                  type="text"
                  value={childInterests}
                  onChange={(e) => setChildInterests(e.target.value)}
                  placeholder="E.g., Space, Dinosaurs, Animals, Trains, Music"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-brand-primary focus:bg-white rounded-2xl text-sm font-semibold outline-hidden transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-primary hover:bg-brand-primary/95 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-brand-primary/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join the Founding Families Waitlist</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-gray-500 font-medium">
                No spam. No selling data. You can opt out at any time.
              </div>

            </form>
          )}

        </div>

        {/* Founding Principles */}
        <div className="mt-12 p-6 bg-indigo-50/60 rounded-3xl border border-indigo-100 flex flex-wrap items-center justify-around gap-6 text-center max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-gray-800">No ads. No autoplay.</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-brand-primary shrink-0" />
            <span className="text-xs font-bold text-gray-800">AI-assisted, human-reviewed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 shrink-0" />
            <span className="text-xs font-bold text-gray-800">Designed with family input</span>
          </div>
        </div>

      </div>
    </section>
  );
};
