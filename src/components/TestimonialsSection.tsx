import React from "react";
import { Star, Heart, CheckCircle2, Quote, Volume2, ShieldCheck } from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";

export const TestimonialsSection: React.FC = () => {
  const TESTIMONIALS = [
    {
      id: 1,
      parent: "Priya Sharma",
      child: "Aarav (Age 4)",
      city: "Bengaluru",
      rating: 5,
      quote: "Aarav plays his personalized dinosaur jingle every single morning while brushing his teeth. His speech and new word recall exploded in just two weeks!",
      tag: "Dinosaur Explorer Pack"
    },
    {
      id: 2,
      parent: "Rohan & Sneha Mehta",
      child: "Diya (Age 6)",
      city: "Mumbai",
      rating: 5,
      quote: "We replaced 40 minutes of YouTube cartoons with Diya's interactive bedtime storybook. She actually loves making the moral choices before sleeping!",
      tag: "Growth Duo Pack"
    },
    {
      id: 3,
      parent: "Ananya Iyer",
      child: "Kabir (Age 5)",
      city: "Chennai",
      rating: 5,
      quote: "Having Kabir's name in the space rocket rhyme made his jaw drop. He showed his certificate to everyone in his kindergarten class!",
      tag: "Cosmic Quest Pack"
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-linear-to-b from-white to-[#FFFBF5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-black uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Verified Parent Reviews</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
            Loved by 12,000+ Happy Families
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Read real stories of confidence, healthy screen habits, and big smiles across India.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-gray-500 ml-2">Verified Parent</span>
                </div>

                <Quote className="w-8 h-8 text-brand-primary/15" />

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-sm text-brand-text">{item.parent}</h4>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Mom of {item.child} • {item.city}
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-indigo-50 text-brand-primary px-2.5 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-14 p-6 bg-indigo-50/60 rounded-3xl border border-indigo-100 flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-gray-800">100% Ad-Free & Child Safe</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-xs font-bold text-gray-800">4.9 / 5 Average Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-brand-primary" />
            <span className="text-xs font-bold text-gray-800">24h Guaranteed Delivery</span>
          </div>
        </div>

      </div>
    </section>
  );
};
