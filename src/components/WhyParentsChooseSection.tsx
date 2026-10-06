import React from "react";
import { Sparkles, Gamepad2, Moon, ArrowRight, Wand2, ShieldCheck, HeartHandshake, CheckCircle2 } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

interface WhyParentsChooseSectionProps {
  onOpenCreator: () => void;
  onOpenPlayroom: () => void;
  onOpenBedtimeMode: () => void;
}

export const WhyParentsChooseSection: React.FC<WhyParentsChooseSectionProps> = ({
  onOpenCreator,
  onOpenPlayroom,
  onOpenBedtimeMode
}) => {
  return (
    <section
      id="features"
      className="py-16 md:py-24 bg-linear-to-b from-[#FFFDF9] via-white to-[#F7F9FF] relative overflow-hidden border-b border-indigo-50/60"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-accent1/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 md:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-indigo-50 text-brand-primary border border-indigo-100 rounded-full text-xs font-black uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent1 animate-pulse" />
            <span>Why Parents Choose Kidora</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text tracking-tight leading-tight">
            Why Parents Choose Kidora Over Passive Screen Time
          </h2>

          <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
            Children today spend an average of 2.5 hours daily on passive digital screens. Kidora turns that time into an empowering ritual where your child is the brave hero of every story, mastering new vocabulary and life lessons along the way.
          </p>
        </div>

        {/* Feature Cards Grid with Subtle Floating Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* Card 1: Personalised Creator Studio */}
          <div className="relative group">
            <article
              className="animate-card-float-1 h-full flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border-2 border-indigo-100 shadow-xl shadow-indigo-100/40 hover:shadow-2xl hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top color accent band */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-brand-primary via-indigo-400 to-purple-400" />

              <div>
                {/* Header & Floating Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Wand2 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-indigo-50 text-brand-primary border border-indigo-100 rounded-full">
                    Starring Your Child
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-black text-brand-primary mb-3">
                  1. Personalised Creator Studio
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  Parents specify child name, age bracket (2–4, 4–6, 6–8, 8–10 years), curiosity passion (Space, Dinosaurs, Ocean, Animals), and core virtues (Kindness, Courage, Honesty). Real-time synthesized melodies preview the story soundscapes.
                </p>

                {/* Micro-perks */}
                <ul className="space-y-2 mb-6 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Ages 2 to 10 personalized stories</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Interactive moral value forks</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Instant pentatonic musical preview</span>
                  </li>
                </ul>
              </div>

              {/* Action Link */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSoundEffect("click");
                  onOpenCreator();
                }}
                className="w-full mt-2 py-3 px-4 bg-indigo-50/80 hover:bg-brand-primary text-brand-primary hover:text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs hover:shadow-md"
              >
                <span>Customize Story Now</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </article>
          </div>

          {/* Card 2: Interactive Educational Playroom */}
          <div className="relative group">
            <article
              className="animate-card-float-2 h-full flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-100 shadow-xl shadow-amber-100/40 hover:shadow-2xl hover:border-brand-accent1/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top color accent band */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-brand-accent1 via-amber-300 to-orange-400" />

              <div>
                {/* Header & Floating Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    <Gamepad2 className="w-6 h-6 text-amber-600" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                    Zero Ads & No Autoplay
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-black text-brand-accent1 mb-3">
                  2. Interactive Educational Playroom
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  Play FactBlast trivia, phonics spelling labs, space math arithmetic, and memory logic games directly in your browser with zero advertisements and child-friendly touch controls.
                </p>

                {/* Micro-perks */}
                <ul className="space-y-2 mb-6 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>4 active brain-building minigames</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Zero addictive autoplay loops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Printable explorer certificate rewards</span>
                  </li>
                </ul>
              </div>

              {/* Action Link */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSoundEffect("pop");
                  onOpenPlayroom();
                }}
                className="w-full mt-2 py-3 px-4 bg-amber-50/80 hover:bg-brand-accent1 text-amber-900 hover:text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs hover:shadow-md"
              >
                <span>Launch Playroom Games</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </article>
          </div>

          {/* Card 3: Calming Bedtime Sleep Mode */}
          <div className="relative group">
            <article
              className="animate-card-float-3 h-full flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-7 border-2 border-emerald-100 shadow-xl shadow-emerald-100/40 hover:shadow-2xl hover:border-emerald-400/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top color accent band */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-linear-to-r from-emerald-500 via-teal-400 to-indigo-400" />

              <div>
                {/* Header & Floating Icon */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <Moon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                    Peaceful Wind-Down
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#1D9E75] mb-3">
                  3. Calming Bedtime Sleep Mode
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-medium">
                  Gentle synthesized music box chimes, warm evening narration, and built-in sleep timers (10m, 20m, 30m) designed by sleep researchers to wind down hyperactive screen habits peacefully.
                </p>

                {/* Micro-perks */}
                <ul className="space-y-2 mb-6 text-xs text-gray-700 font-semibold">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Lullaby music box chimes generator</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Custom sleep timers (10m, 20m, 30m)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Warm night-light UI & calming tempo</span>
                  </li>
                </ul>
              </div>

              {/* Action Link */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSoundEffect("starDing");
                  onOpenBedtimeMode();
                }}
                className="w-full mt-2 py-3 px-4 bg-emerald-50/80 hover:bg-[#1D9E75] text-emerald-900 hover:text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-2xs hover:shadow-md"
              >
                <span>Try Bedtime Mode</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </article>
          </div>

        </div>

        {/* Bottom Trust Guarantee Strip */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Human-Reviewed Content</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span>Active Learning &gt; Passive Scrolling</span>
          </div>
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-4 h-4 text-rose-500" />
            <span>Safe &amp; Ad-Free Promise</span>
          </div>
        </div>

      </div>
    </section>
  );
};
