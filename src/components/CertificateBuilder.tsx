import React, { useRef } from "react";
import { Award, Star, Printer, X, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { PersonalisationState } from "../types";
import { soundManager } from "../utils/audioSynthesizer";
import confetti from "canvas-confetti";

interface CertificateBuilderProps {
  personalisation: PersonalisationState;
  onClose: () => void;
}

export const CertificateBuilder: React.FC<CertificateBuilderProps> = ({
  personalisation,
  onClose
}) => {
  const certRef = useRef<HTMLDivElement | null>(null);
  const childName = personalisation.name.trim() || "Arjun";
  const dateStr = new Date().toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const handlePrint = () => {
    soundManager.playSoundEffect("starDing");
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.4 } });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border-4 border-amber-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div
          ref={certRef}
          className="bg-linear-to-b from-amber-50/50 via-white to-amber-50/50 border-8 border-double border-amber-400 rounded-2xl p-6 sm:p-10 text-center space-y-5 relative overflow-hidden"
        >
          {/* Top Corner Ribbons */}
          <div className="absolute top-2 left-2 text-2xl">⭐</div>
          <div className="absolute top-2 right-2 text-2xl">⭐</div>
          <div className="absolute bottom-2 left-2 text-2xl">⭐</div>
          <div className="absolute bottom-2 right-2 text-2xl">⭐</div>

          {/* Header */}
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Official Kidora Achievement Award
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-brand-primary tracking-tight">
              CERTIFICATE OF BRAVE EXPLORATION
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 font-serif italic">
            This certifies that
          </p>

          {/* Child Name Highlight */}
          <div className="py-2 border-b-2 border-dashed border-amber-400 max-w-sm mx-auto">
            <h3 className="font-display text-3xl sm:text-4xl font-black text-brand-text">
              {childName}
            </h3>
          </div>

          {/* Achievement Description */}
          <p className="text-xs sm:text-sm text-gray-700 max-w-md mx-auto leading-relaxed font-medium">
            Has successfully explored the magical realms of <strong>{personalisation.interest}</strong> alongside companion{" "}
            <strong>{personalisation.avatar.companionPet}</strong>, demonstrating exceptional{" "}
            <strong>{personalisation.value}</strong> and a boundless love for learning.
          </p>

          {/* Mascot Seal & Signatures */}
          <div className="pt-4 flex items-center justify-between border-t border-amber-200 text-xs">
            <div className="text-left">
              <p className="font-bold text-gray-800">{dateStr}</p>
              <p className="text-[10px] text-gray-400 font-mono">Date of Conformance</p>
            </div>

            {/* Gold Seal */}
            <div className="w-16 h-16 rounded-full bg-amber-400 text-amber-950 flex flex-col items-center justify-center font-black shadow-lg border-2 border-amber-500 transform rotate-12">
              <Award className="w-6 h-6" />
              <span className="text-[8px] uppercase tracking-wider">KIDORA SEAL</span>
            </div>

            <div className="text-right">
              <p className="font-bold text-brand-primary font-serif">Kidora Magic Council</p>
              <p className="text-[10px] text-gray-400 font-mono">Master Mentor Signature</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 font-medium">
            💡 Print on A4 cardstock for your child's study room or fridge!
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print Certificate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
