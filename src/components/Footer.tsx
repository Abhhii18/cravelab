import React from "react";
import { Mail, Phone, MapPin, Instagram, Clock, Gift, Award } from "lucide-react";

interface FooterProps {
  setView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-[#361f1a] text-[#fcf9f4] pt-16 pb-8 px-4 md:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Information Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-serif font-extrabold tracking-widest text-[#fcf9f4]">Crave</span>
            <span className="text-[#fcf9f4] bg-[#7d562d] px-2 py-0.5 rounded text-sm font-sans font-bold">Lab</span>
          </div>
          <p className="font-serif italic text-[#fcf9f4]/75 text-sm leading-relaxed max-w-xs">
            "Freshly baked happiness, delivered to your door. Where ancient fermentation meets gourmet laboratory craftsmanship."
          </p>
          <div className="flex items-center space-x-3 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 bg-[#fcf9f4]/5 hover:bg-[#7d562d] rounded-full transition-colors text-[#fcf9f4]">
              <Instagram className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-1.5 text-xs text-[#fcf9f4]/60 bg-[#7d562d]/20 px-3 py-1 rounded-full border border-[#7d562d]/20">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>No. 1 Boutique Bakery 2026</span>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-sans font-semibold tracking-widest text-amber-100 uppercase">
            Menu & Journey
          </h4>
          <ul className="space-y-2 text-sm text-[#fcf9f4]/80">
            <li>
              <button onClick={() => setView("shop")} className="hover:text-[#7d562d] text-left transition-colors cursor-pointer">
                The Master Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setView("product")} className="hover:text-[#7d562d] text-left transition-colors cursor-pointer">
                Signature Brownie Series
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setView("home");
                  setTimeout(() => {
                    document.getElementById("alchemist-lab")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="hover:text-[#7d562d] text-left transition-colors cursor-pointer"
              >
                Fermentation Timeline
              </button>
            </li>
            <li>
              <button onClick={() => setView("checkout")} className="hover:text-[#7d562d] text-left transition-colors cursor-pointer">
                View Secured Basket
              </button>
            </li>
          </ul>
        </div>

        {/* Laboratory Operating Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-sans font-semibold tracking-widest text-amber-100 uppercase">
            Lab Hours & Timings
          </h4>
          <div className="space-y-3 text-sm text-[#fcf9f4]/80">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#7d562d] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Oven Warm Ups</p>
                <p className="text-xs text-[#fcf9f4]/60">Mon — Fri: 06:00 AM — 08:00 PM</p>
                <p className="text-xs text-[#fcf9f4]/60">Sat — Sun: 07:00 AM — 09:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Gift className="w-4 h-4 text-[#7d562d] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Gourmet Box Deliveries</p>
                <p className="text-xs text-[#fcf9f4]/60">Sameday slots bookable before 1 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Care Support */}
        <div className="space-y-4">
          <h4 className="text-sm font-sans font-semibold tracking-widest text-amber-100 uppercase">
            Direct Line
          </h4>
          <div className="space-y-3 text-sm text-[#fcf9f4]/85">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#7d562d] shrink-0" />
              <span>421 Artisanal Boulevard, Suite B, NYC</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#7d562d] shrink-0" />
              <span>+1 (555) 72-CRAVE</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#7d562d] shrink-0" />
              <span>hello@cravelab.boutique</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-[#fcf9f4]/15 flex flex-col sm:flex-row justify-between items-center text-xs text-[#fcf9f4]/50 space-y-4 sm:space-y-0">
        <p>© 2026 CraveLab Boutique Storefront. All rights reserved. Craft is our heritage.</p>
        <div className="flex space-x-6">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Baking</a>
          <a href="#licensing" className="hover:text-white transition-colors">Cookie Recipes</a>
        </div>
      </div>
    </footer>
  );
};
