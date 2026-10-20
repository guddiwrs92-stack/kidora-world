import React, { useState, useEffect } from "react";
import { initConsent, accept, decline } from "../lib/consent";
import { Shield } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

interface CookieBannerProps {
  onNavigatePrivacy?: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({
  onNavigatePrivacy,
  onVisibilityChange
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialise consent check; if null, showBanner() is invoked
    initConsent(() => {
      setIsVisible(true);
      if (onVisibilityChange) onVisibilityChange(true);
    });
  }, [onVisibilityChange]);

  const handleAccept = () => {
    soundManager.playSoundEffect("click");
    accept();
    setIsVisible(false);
    if (onVisibilityChange) onVisibilityChange(false);
  };

  const handleDecline = () => {
    soundManager.playSoundEffect("click");
    decline();
    setIsVisible(false);
    if (onVisibilityChange) onVisibilityChange(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-6 sm:right-28 md:max-w-xl z-50 p-4 sm:p-5 bg-[#FAF9F5] border border-amber-200/90 rounded-2xl shadow-2xl pb-[max(1rem,env(safe-area-inset-bottom))] animate-fade-in"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Banner Text with Shield Icon */}
        <div className="flex items-start space-x-3 text-left">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1A3BD4] flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-4 h-4 text-[#1A3BD4]" />
          </div>
          <p className="text-xs sm:text-sm text-[#1A3BD4] leading-relaxed font-sans font-medium">
            We use Google Analytics to understand how our site is used. It is never given your child's details.{" "}
            <a
              href="/privacy"
              onClick={(e) => {
                if (onNavigatePrivacy) {
                  e.preventDefault();
                  onNavigatePrivacy();
                }
              }}
              className="text-[#1A3BD4] font-extrabold underline hover:text-blue-900 focus:outline-hidden focus:ring-2 focus:ring-[#1A3BD4] rounded-xs"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Action Buttons: Accept (royal blue) and Decline (outlined) */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl border-2 border-[#1A3BD4] text-[#1A3BD4] hover:bg-blue-50/60 text-xs font-bold font-sans transition-all focus:outline-hidden focus:ring-2 focus:ring-[#1A3BD4] cursor-pointer"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-2 rounded-xl bg-[#1A3BD4] hover:bg-blue-800 text-white text-xs font-bold font-sans shadow-md shadow-blue-900/20 transition-all focus:outline-hidden focus:ring-2 focus:ring-[#1A3BD4] cursor-pointer"
          >
            Accept
          </button>
        </div>

      </div>
    </div>
  );
};
