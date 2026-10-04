import React, { useState } from "react";
import { Clock, CheckCircle2, Tv, Sparkles, Calendar, Info } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

export const GrowthImpactCalculator: React.FC = () => {
  const [dailyHours, setDailyHours] = useState(1.5);
  const [childAgeGroup, setChildAgeGroup] = useState<"3-5" | "6-8" | "9-11">("6-8");

  // Suggested daily balance calculation (in minutes)
  const totalMinutes = Math.round(dailyHours * 60);
  const suggestedActiveMinutes = Math.min(totalMinutes, Math.round(totalMinutes * 0.6));
  const suggestedPassiveMinutes = totalMinutes - suggestedActiveMinutes;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#FFF8F0] border-b border-amber-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Screen-Time Balance Planner</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Plan a Balanced Screen Routine
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Plan your child's daily screen routine with a healthy balance of interactive participation and parent-guided focus.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-amber-200/80 shadow-xl max-w-4xl mx-auto">
          
          {/* Slider and Controls */}
          <div className="space-y-6 pb-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider block">
                  Daily Screen Time: <span className="text-brand-primary text-base font-black">{dailyHours} Hours/Day</span>
                </label>
                <p className="text-xs text-gray-500 font-medium">Use the slider to see a suggested active vs passive breakdown</p>
              </div>

              <div className="flex items-center space-x-2">
                {(["3-5", "6-8", "9-11"] as const).map((age) => (
                  <button
                    key={age}
                    onClick={() => {
                      soundManager.playSoundEffect("click");
                      setChildAgeGroup(age);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      childAgeGroup === age
                        ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    Age {age}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="range"
              min="0.5"
              max="4"
              step="0.5"
              value={dailyHours}
              onChange={(e) => {
                soundManager.playSoundEffect("pop");
                setDailyHours(parseFloat(e.target.value));
              }}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
            />

            {/* Suggested Minutes Breakdown */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Suggested Active Time
                </span>
                <span className="text-xl sm:text-2xl font-black text-brand-primary">
                  ~{suggestedActiveMinutes} min/day
                </span>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Sing-alongs, moral choice stories &amp; educational puzzles
                </p>
              </div>

              <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Passive / Rest Time
                </span>
                <span className="text-xl sm:text-2xl font-black text-amber-900">
                  ~{suggestedPassiveMinutes} min/day
                </span>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Quiet viewing or transition time before offline play
                </p>
              </div>
            </div>

            {/* Required Disclaimer */}
            <p className="text-xs text-gray-500 italic text-center pt-2">
              A planning guide, not a medical or learning-outcome claim.
            </p>
          </div>

          {/* Neutral Comparison Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            
            {/* Typical autoplay video */}
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
              <div className="flex items-center space-x-2 text-gray-800 font-bold text-xs uppercase tracking-wider">
                <Tv className="w-4 h-4 text-gray-500" />
                <span>Typical autoplay video</span>
              </div>

              <div className="space-y-3 text-xs text-gray-600 font-medium">
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-black">•</span>
                  <span>Next video plays automatically without a pause point</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-black">•</span>
                  <span>Primarily passive viewing with few moments for reflection</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gray-400 font-black">•</span>
                  <span>Content determined by broad recommendation algorithms</span>
                </div>
              </div>
            </div>

            {/* Kidora: chosen by you, no autoplay */}
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-200 space-y-4">
              <div className="flex items-center space-x-2 text-brand-primary font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-brand-primary" />
                <span>Kidora: chosen by you, no autoplay</span>
              </div>

              <div className="space-y-3 text-xs text-gray-700 font-medium">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Stories and songs chosen by parents for specific topics</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Encourages active sing-along and moral choice decision points</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>No ads. No autoplay. Reviewed by a person before it reaches your child.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Weekly Schedule Guide */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-brand-primary shrink-0" />
              <p className="text-xs text-gray-700 font-bold">
                Suggested balance: 20 min interactive morning rhyme, 15 min learning game, 10 min bedtime story.
              </p>
            </div>
            <span className="text-xs bg-brand-primary/10 text-brand-primary font-black px-3 py-1.5 rounded-full shrink-0">
              Balanced Routine
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
