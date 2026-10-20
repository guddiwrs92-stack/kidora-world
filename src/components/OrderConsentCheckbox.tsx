import React, { useId } from "react";
import { useOrderConsent } from "../context/OrderConsentContext";
import { soundManager } from "../utils/audioSynthesizer";

interface OrderConsentCheckboxProps {
  id?: string;
  className?: string;
  textClassName?: string;
  onNavigateLegal?: (path: string) => void;
}

export const OrderConsentCheckbox: React.FC<OrderConsentCheckboxProps> = ({
  id,
  className = "",
  textClassName = "text-xs text-gray-700",
  onNavigateLegal
}) => {
  const generatedId = useId();
  const checkboxId = id || `order-consent-${generatedId}`;
  const { hasConsented, setHasConsented } = useOrderConsent();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigateLegal) {
      e.preventDefault();
      onNavigateLegal(path);
    }
  };

  return (
    <div className={`flex items-start gap-2.5 py-1 text-left ${className}`}>
      <input
        type="checkbox"
        id={checkboxId}
        checked={hasConsented}
        onChange={(e) => {
          soundManager.playSoundEffect("click");
          setHasConsented(e.target.checked);
        }}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-brand-primary focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-1 cursor-pointer accent-[#1A3BD4]"
      />
      <label htmlFor={checkboxId} className={`leading-relaxed select-none cursor-pointer ${textClassName}`}>
        I am the child's parent or legal guardian and I agree to the{" "}
        <a
          href="/privacy"
          onClick={(e) => handleLinkClick(e, "/privacy")}
          className="text-[#1A3BD4] font-bold underline hover:text-blue-800 focus:outline-hidden focus:ring-2 focus:ring-[#1A3BD4] rounded-xs px-0.5"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="/terms"
          onClick={(e) => handleLinkClick(e, "/terms")}
          className="text-[#1A3BD4] font-bold underline hover:text-blue-800 focus:outline-hidden focus:ring-2 focus:ring-[#1A3BD4] rounded-xs px-0.5"
        >
          Terms
        </a>
        .
      </label>
    </div>
  );
};

export const OrderConsentWarningModal: React.FC = () => {
  const { showWarning, dismissWarning, setHasConsented } = useOrderConsent();

  if (!showWarning) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-warning-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
    >
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-indigo-100 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-brand-primary flex items-center justify-center mx-auto text-2xl font-bold">
          🛡️
        </div>
        <div className="text-center space-y-2">
          <h3 id="consent-warning-title" className="font-display text-lg font-black text-brand-text">
            Parental Consent Required
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Please tick the checkbox to confirm you are the child's parent or legal guardian and agree to the Privacy Policy and Terms before ordering on WhatsApp.
          </p>
        </div>

        <div className="bg-indigo-50/60 p-3.5 rounded-2xl border border-indigo-100">
          <OrderConsentCheckbox id="warning-modal-consent-checkbox" />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              dismissWarning();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 border border-gray-200 transition-all cursor-pointer"
          >
            Go Back
          </button>
          <button
            onClick={() => {
              soundManager.playSoundEffect("click");
              setHasConsented(true);
              dismissWarning();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white bg-brand-primary hover:bg-brand-primary/95 shadow-md transition-all cursor-pointer"
          >
            I Agree &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};
