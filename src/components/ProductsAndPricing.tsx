import React, { useState } from "react";
import { MessageCircle, Check, Gift, ChevronDown, ChevronUp, Shield, Lock, EyeOff, Trash2 } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";
import { buildCompliantWhatsAppMessage, getWhatsAppUrl } from "../config/contact";
import { useOrderConsent } from "../context/OrderConsentContext";
import { OrderConsentCheckbox } from "./OrderConsentCheckbox";
import { PersonalisationState } from "../types";
import { trackGenericEvent } from "../lib/consent";

interface ProductsAndPricingProps {
  personalisation: PersonalisationState;
  onNavigateLegal?: (path: string) => void;
}

export const ProductsAndPricing: React.FC<ProductsAndPricingProps> = ({
  personalisation,
  onNavigateLegal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { hasConsented, triggerWarning } = useOrderConsent();

  const childFirstName = personalisation.name.trim().split(/\s+/)[0] || "Child";

  const getPackWhatsAppUrl = (packTitle: string) => {
    const message = buildCompliantWhatsAppMessage({
      childName: childFirstName,
      ageBand: personalisation.age,
      interest: personalisation.interest,
      value: personalisation.value,
      learningGoal: personalisation.goal,
      chosenPack: packTitle
    });
    return getWhatsAppUrl(message);
  };

  const PRODUCTS = [
    {
      id: "single",
      title: "Magic Jingle",
      badge: "Fast Delivery",
      price: "₹299",
      desc: "One 60-second high-energy, custom name sing-along song for your child.",
      features: [
        "Personalised with child's name & interests",
        "High-fidelity MP3 delivered on WhatsApp",
        "Printable Lyrics Sheet PDF",
        "Delivered in 24-48 hours",
        "1 free revision included"
      ],
      ctaText: "Order Magic Jingle",
      popular: false
    },
    {
      id: "growth",
      title: "Growth Duo Pack",
      badge: "Most Popular ⭐",
      price: "₹499",
      desc: "Custom singalong song + Illustrated 3-chapter moral choice storybook.",
      features: [
        "Personalised 60s Magic Jingle MP3",
        "Illustrated 3-Chapter Storybook PDF",
        "Custom Moral Value & Life Lesson Focus",
        "Printable Explorer Certificate",
        "1 free revision included",
        "Delivered in 24-48 hours"
      ],
      ctaText: `Get Growth Duo for ${childFirstName}`,
      popular: true
    },
    {
      id: "birthday",
      title: "Birthday Mega Pack",
      badge: "Celebration Special 🎂",
      price: "₹899",
      desc: "Full celebration pack with Happy Birthday anthem, personalized trivia & games link.",
      features: [
        "Custom Birthday Anthem with Child's Name",
        "Full Illustrated Storybook & Coloring Sheets",
        "Personalised Birthday Trivia Game URL",
        "Gold Explorer Certificate",
        "High-Res WhatsApp Video Invitation Card",
        "1 free revision included",
        "Priority delivery"
      ],
      ctaText: "Order Birthday Mega Pack",
      popular: false
    }
  ];

  const FAQS = [
    {
      q: "How does the delivery process work on WhatsApp?",
      a: "Once you place your order via WhatsApp, our creative team drafts and reviews your child's personalized audio and illustrated materials based on your inputs. Every piece is AI-assisted, human-reviewed before it reaches your child. Within 24-48 hours, you receive the high-fidelity audio MP3, printable PDF storybooks, and badges right inside your WhatsApp chat."
    },
    {
      q: "Can I request changes if my child's name pronunciation is unique?",
      a: "Absolutely! When you order on WhatsApp, you can send a 5-second voice note of how your child's name is pronounced. If any detail needs tuning, we provide 1 free revision for name pronunciation or small details."
    },
    {
      q: "Are the games and stories safe for screen time?",
      a: "No ads. No autoplay. Reviewed by a person before it reaches your child. Kidora content is designed around active learning rather than passive addictive feeds. We do not track or profile children, and all content promotes curiosity, vocabulary, and moral values."
    },
    {
      q: "Do you offer bulk packs for schools or birthday return gifts?",
      a: "Yes! We create custom classroom song bundles, annual day anthems, and personalized return gift packs with each guest child's name. Message us on WhatsApp for special bulk school pricing."
    }
  ];

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>, packTitle: string) => {
    if (!hasConsented) {
      e.preventDefault();
      soundManager.playSoundEffect("pop");
      triggerWarning();
    } else {
      soundManager.playSoundEffect("victory");
      trackGenericEvent("click_order_button");
    }
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-black uppercase tracking-widest">
            <Gift className="w-3.5 h-3.5" />
            <span>Transparent Pricing &amp; Plans</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Simple, honest pricing. Delivered in 24-48 hours.
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            No subscriptions or hidden fees. One-time payment with verified WhatsApp delivery.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 items-stretch">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                prod.popular
                  ? "bg-linear-to-b from-indigo-50/50 via-white to-indigo-50/30 border-2 border-brand-primary shadow-2xl scale-105"
                  : "bg-white border-2 border-gray-100 shadow-lg hover:border-gray-200"
              }`}
            >
              {prod.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {prod.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display text-xl font-black text-brand-text">{prod.title}</h3>
                  {!prod.popular && (
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-full">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-500 font-medium mb-4">{prod.desc}</p>

                {/* Real Price Display */}
                <div className="flex items-baseline space-x-2 mb-6">
                  <span className="font-display text-4xl font-black text-brand-text">{prod.price}</span>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    One-Time Price
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 mb-6">
                  {prod.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs font-semibold text-gray-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Consent Checkbox before button */}
              <div className="mt-auto space-y-3 pt-4 border-t border-gray-100">
                <OrderConsentCheckbox
                  id={`consent-card-${prod.id}`}
                  textClassName="text-[11px] text-gray-600 font-medium"
                  onNavigateLegal={onNavigateLegal}
                />

                <a
                  href={getPackWhatsAppUrl(prod.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  onClick={(e) => handleOrderClick(e, prod.title)}
                  aria-disabled={!hasConsented}
                  className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                    !hasConsented
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                      : prod.popular
                      ? "bg-[#25D366] hover:bg-[#20ba59] text-white shadow-lg shadow-emerald-500/20 cursor-pointer"
                      : "bg-gray-900 hover:bg-black text-white cursor-pointer"
                  }`}
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>{prod.ctaText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Small Note Under Pricing: "Prices are in ₹ and shown without GST." */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm font-semibold text-gray-500">
            Prices are in ₹ and shown without GST.
          </p>
        </div>

        {/* TRUST SECTION: How we treat your child's information */}
        <div className="max-w-3xl mx-auto mb-16 p-6 sm:p-8 bg-linear-to-b from-indigo-50/70 to-white rounded-3xl border-2 border-indigo-100/80 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-brand-primary text-white flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-black text-brand-text">
              How we treat your child's information
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-6">
            We believe children's digital experiences should be respectful, private, and parent-guided.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-primary">
                <Lock className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Minimal Collection</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                We collect only the child's first name, age band, and interests you choose.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-primary">
                <EyeOff className="w-4 h-4 text-brand-primary shrink-0" />
                <span>No Profiling</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                We do not track or profile children across apps, devices, or browsing sessions.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-primary">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Ads, No Selling</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                No third-party advertisements, no marketing trackers, and we never sell data.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-1">
              <div className="flex items-center space-x-2 text-xs font-bold text-brand-primary">
                <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Right to Delete</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                You can ask us to delete everything at any time simply via WhatsApp message.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="max-w-3xl mx-auto space-y-4 pt-2">
          <div className="text-center space-y-2 mb-8">
            <h3 className="font-display text-2xl sm:text-3xl font-black text-brand-text">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500 font-medium">Clear answers about our personalized content packs and delivery</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-50/80 rounded-2xl border border-gray-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => {
                    soundManager.playSoundEffect("click");
                    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
                  }}
                  className="w-full p-4 text-left flex items-center justify-between font-display font-black text-sm text-brand-text cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-brand-primary" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed font-medium border-t border-gray-100 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
