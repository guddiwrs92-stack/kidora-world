import React, { useState } from "react";
import { Brain, Sparkles, Clock, CheckCircle2, AlertTriangle, ShieldCheck, Download, Calendar } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

export const GrowthImpactCalculator: React.FC = () => {
  const [dailyHours, setDailyHours] = useState(1.5);
  const [childAgeGroup, setChildAgeGroup] = useState<"3-5" | "6-8" | "9-11">("6-8");

  // Yearly computations
  const yearlyHours = Math.round(dailyHours * 365);
  const passiveVideosWatched = Math.round(yearlyHours * 12);
  const activeKidoraVocabularyWords = Math.round(dailyHours * 365 * 4);
  const moralChoicesMastered = Math.round(dailyHours * 365 * 2);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#FFF8F0] border-b border-amber-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-widest">
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            <span>Parental Screen Time Impact Analyzer</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Passive Scrolling vs. Active Growth
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            90% of brain architecture develops by age 11. See what happens when screen time is customized.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-amber-200/80 shadow-xl max-w-4xl mx-auto">
          
          {/* Sliders and Controls */}
          <div className="space-y-6 pb-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <label className="text-xs font-black text-gray-700 uppercase tracking-wider block">
                  Daily Screen Time: <span className="text-brand-primary text-base font-black">{dailyHours} Hours/Day</span>
                </label>
                <p className="text-xs text-gray-500 font-medium">Adjust the slider to simulate your child's weekly routine</p>
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
          </div>

          {/* Comparison Cards: Negative vs Positive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            
            {/* Passive Video Scrolling */}
            <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 space-y-4">
              <div className="flex items-center space-x-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Passive Video Apps (~{yearlyHours}h/year)</span>
              </div>

              <div className="space-y-3 text-xs text-gray-700 font-medium">
                <div className="flex items-start space-x-2">
                  <span className="text-rose-500 font-black">✕</span>
                  <span><strong>~{passiveVideosWatched} random videos:</strong> Hyper-stimulating dopamine loops reduce patience and attention span.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-500 font-black">✕</span>
                  <span><strong>Zero personalization:</strong> Generic cartoons with no name recognition or customized moral lessons.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-rose-500 font-black">✕</span>
                  <span><strong>Passive consumption:</strong> No choices, singing, or interactive phonics participation.</span>
                </div>
              </div>
            </div>

            {/* Kidora Active Personalised Content */}
            <div className="p-6 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>With Kidora Active Growth Pack</span>
              </div>

              <div className="space-y-3 text-xs text-emerald-950 font-medium">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>+{activeKidoraVocabularyWords} Vocabulary Words:</strong> Embedded through rhythm, rhyme, and interactive stories.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>{moralChoicesMastered} Moral Character Decisions:</strong> Building kindness, bravery, and resilience daily.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>100% Ad-Free & Safe:</strong> Parent-guided with zero algorithmic traps or autoplay rabbit holes.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Weekly Schedule Planner */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-brand-primary" />
              <p className="text-xs text-gray-700 font-bold">
                Suggested Healthy Balance: 20 min morning sing-along, 15 min interactive game, 10 min bedtime lullaby story.
              </p>
            </div>
            <span className="text-xs bg-brand-primary/10 text-brand-primary font-black px-3 py-1.5 rounded-full shrink-0">
              Recommended: 45m / Day
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
