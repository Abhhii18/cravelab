import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, Calendar, Truck, ShieldCheck, Coffee, Leaf, Award } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS, COFFEE_ITEMS } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailViewProps {
  productId: string;
  setView: (view: string) => void;
  addToCart: (product: Product, quantity: number, option?: string, customPrice?: number) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  setView,
  addToCart,
}) => {
  // Find current product details or fall back to default
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [selectedPortion, setSelectedPortion] = useState<"individual" | "box">("individual");
  const [selectedPairs, setSelectedPairs] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  // Smooth scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  // Derived price based on portion choice
  const unitPrice = selectedPortion === "box" ? 48.00 : (product.id === "salted-brownie" ? 8.50 : product.price);

  const handleAddPairToggle = (coffeeId: string) => {
    setSelectedPairs((prev) =>
      prev.includes(coffeeId) ? prev.filter((id) => id !== coffeeId) : [...prev, coffeeId]
    );
  };

  const handleAddToBasket = () => {
    const selectedOptionString = selectedPortion === "box" ? "Signature Gift Box" : "Order Individually";
    
    // Add primary product
    addToCart(product, quantity, selectedOptionString, unitPrice);

    // Add selected paired coffee drinks
    selectedPairs.forEach((pairId) => {
      const coffeeItem = COFFEE_ITEMS.find((c) => c.id === pairId);
      if (coffeeItem) {
        // Construct mock product object for Coffee
        const mockCoffeeProduct: Product = {
          id: coffeeItem.id,
          name: coffeeItem.name,
          price: coffeeItem.price,
          description: coffeeItem.description,
          category: "Coffee",
          tags: [],
          rating: 4.9,
          image: coffeeItem.image
        };
        addToCart(mockCoffeeProduct, 1);
      }
    });

    setAddedMessage(`Successfully added ${quantity}x ${product.name} (${selectedOptionString}) to your basket!`);
    
    // Clear selections
    setQuantity(1);
    setSelectedPairs([]);
    
    setTimeout(() => {
      setAddedMessage(null);
    }, 4000);
  };

  // Mock product thumbnails supporting detailed view
  const thumbnails = [
    product.image,
    // Sourdough backup photo or alternative
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5yGR6Xfh3yxTfbcPlfuuoUS3Xs1rz7EeRcNpwpCFa79O7eikLxd68Ncrq7yX0277YF34joRzL0gc37CVPrbnoC-htW_EMKmJPBI62wa5UBepZf_t0EXpcaIWjxTN5ccbMWwbDfvQ7Fk06bGqTTpgJjKQBGEO6O9Rj0CsWJUkntEloxVhw8JPpIzINqfj5HvFyo9_6wAT9-GLU29uQd1GFh0EOuOlh7sov99V1L2_sANYj4ThMAw2tNl-nkfFklyrSj9-9rggr4oi0",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDS0IIfik9xWuxc0_fqKnLTe6cOCkIw_KbphOH1oZoj82DwpCkO9wLoidn1lhE_fKROngD4AUXNOQ5gZH9hbzSeFdF_vGvcZoQsbuK1LnSCvHU7I2RPuP2tY98GrdPxWwJHjvdglZnXMpOWHs_utrZ1GQAy_sBMzaCUSPsZzd2SkkTp5kDhEQs8Lekaa7v3aTz--9bDQI628iMpZOBE3Vo49S9GbQZSLS3TUuHgiF6Za4bUKavxKC41yrLNzAfxs_6KHqTWgmbqFwnp"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-16">
      
      {/* Back button & Breadcrumbs */}
      <div className="flex items-center justify-between pb-4 border-b border-[#361f1a]/10">
        <button
          onClick={() => setView("shop")}
          className="text-stone-600 hover:text-[#7d562d] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Master Catalog</span>
        </button>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-stone-400 font-semibold uppercase tracking-widest">
          <span>Oven Store</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-[#361f1a] font-extrabold">{product.name}</span>
        </div>
      </div>

      {/* Main split details block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Interactive thumbnail visualizer (5 Columns Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-[#361f1a]/10 shadow-md bg-[#f0ede9]">
            <img
              src={thumbnails[thumbnailIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {selectedPortion === "box" && (
              <span className="absolute top-4 left-4 bg-amber-800 text-white font-serif font-extrabold text-[10px] uppercase px-3 py-1 rounded bg-opacity-95 shadow border border-amber-600">
                Luxury Wood Lattice Gift Box Engraving Included
              </span>
            )}
          </div>

          {/* Tiny alternates selector */}
          <div className="grid grid-cols-3 gap-3">
            {thumbnails.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setThumbnailIndex(idx)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  thumbnailIndex === idx ? "border-[#7d562d]" : "border-[#361f1a]/10 hover:border-stone-400"
                }`}
              >
                <img src={t} alt="Perspective thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

          {/* Core Trust badging grid */}
          <div className="grid grid-cols-3 gap-2 text-center pt-4 text-[10px] text-stone-500 font-semibold border-t border-[#361f1a]/10">
            <div className="flex flex-col items-center space-y-1 bg-[#361f1a]/5 p-2 rounded-xl">
              <Calendar className="w-4 h-4 text-[#7d562d]" />
              <span>Oven Fresh Daily</span>
            </div>
            <div className="flex flex-col items-center space-y-1 bg-[#361f1a]/5 p-2 rounded-xl">
              <Truck className="w-4 h-4 text-[#7d562d]" />
              <span>Sameday Shipping</span>
            </div>
            <div className="flex flex-col items-center space-y-1 bg-[#361f1a]/5 p-2 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#7d562d]" />
              <span>Artisanal Sourcing</span>
            </div>
          </div>
        </div>

        {/* Right Product selectors block (7 Columns Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-[#7d562d] text-[10px] font-extrabold rounded uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Masterpiece Series</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[#361f1a] leading-tight">
              {product.name}
            </h1>

            {/* Overall community ratings */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex text-amber-500 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-amber-500" : ""}`} />
                ))}
              </div>
              <span className="font-bold text-[#361f1a]">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 font-semibold">•</span>
              <span className="text-stone-500 font-medium hover:text-[#7d562d] cursor-pointer transition-colors">(428 reviews)</span>
            </div>

            <p className="text-[#361f1a]/85 text-xs md:text-sm leading-relaxed font-sans max-w-2xl">
              {product.id === "salted-brownie" && selectedPortion === "individual"
                ? "A velvet-rich single-origin 70% dark chocolate brownie crafted with grass-fed European butter and adorned with raw sea salt finishing crystals."
                : selectedPortion === "box"
                ? "A premium curated assortment of six freshly baked signature salted brownie squares, elegantly wrapped in custom linen paper and secure wooden lattice gifting boxes."
                : product.description}
            </p>
          </div>

          {/* PORTION CHOOSERS DYNAMIC COMPONENT */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#361f1a] uppercase tracking-wider">Curate Portions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Individually portion */}
              <button
                onClick={() => setSelectedPortion("individual")}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedPortion === "individual"
                    ? "bg-[#361f1a] border-transparent text-white shadow-md relative"
                    : "bg-white border-[#361f1a]/15 text-[#361f1a]"
                }`}
              >
                {selectedPortion === "individual" && (
                  <span className="absolute top-3 right-3 bg-[#7d562d] text-white text-[9px] px-2 py-0.5 rounded font-extrabold">Active</span>
                )}
                <span className="block font-serif font-bold text-base">Order Individually</span>
                <span className={`block text-xs mt-1 ${selectedPortion === "individual" ? "text-stone-200" : "text-stone-500"}`}>
                  Single master portion, perfect for private cravings.
                </span>
                <span className="block font-serif font-extrabold text-lg mt-3">
                  ${(product.id === "salted-brownie" ? 8.5 : product.price).toFixed(2)}
                </span>
              </button>

              {/* Option 2: Luxury Gift Box collection */}
              <button
                onClick={() => setSelectedPortion("box")}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedPortion === "box"
                    ? "bg-[#361f1a] border-transparent text-white shadow-md relative"
                    : "bg-white border-[#361f1a]/15 text-[#361f1a]"
                }`}
              >
                {selectedPortion === "box" && (
                  <span className="absolute top-3 right-3 bg-[#7d562d] text-white text-[9px] px-2 py-0.5 rounded font-extrabold">Active</span>
                )}
                <span className="block font-serif font-bold text-base">Signature Gift Box</span>
                <span className={`block text-xs mt-1 ${selectedPortion === "box" ? "text-stone-200" : "text-stone-500"}`}>
                  An elegant cedar box containing 6 generous custom-baked squares.
                </span>
                <span className="block font-serif font-extrabold text-lg mt-3">
                  $48.00
                </span>
              </button>
            </div>
          </div>

          {/* PAIR OPTIONS BREW (mini lists) */}
          <div className="space-y-3">
            <div className="flex items-center gap-1 text-xs font-bold text-[#361f1a] uppercase tracking-wider">
              <Coffee className="w-4 h-4 text-[#7d562d]" />
              <span>Pair with a Fresh Brew</span>
            </div>
            
            <div className="space-y-2.5">
              {COFFEE_ITEMS.map((coffee) => {
                const isSelected = selectedPairs.includes(coffee.id);
                return (
                  <div
                    key={coffee.id}
                    onClick={() => handleAddPairToggle(coffee.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#7d562d]/10 border-[#7d562d] text-[#361f1a]"
                        : "bg-white border-[#361f1a]/10 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <img
                        src={coffee.image}
                        alt={coffee.name}
                        className="w-10 h-10 object-cover rounded-md border border-[#361f1a]/10"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#361f1a]">{coffee.name}</h4>
                        <p className="text-[10px] text-stone-500">{coffee.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="font-serif font-extrabold text-xs text-[#361f1a]">+${coffee.price.toFixed(2)}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        isSelected ? "bg-[#7d562d] border-transparent" : "border-stone-300"
                      }`}>
                        {isSelected && <span className="text-[10px] font-bold text-white leading-none">✓</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action trigger portion count & buy */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#361f1a]/10">
            {/* portion counter */}
            <div className="flex items-center justify-between border border-[#361f1a]/15 bg-white rounded-xl px-4 py-2.5 sm:w-32">
              <button
                disabled={quantity <= 1}
                onClick={() => setQuantity((prev) => prev - 1)}
                className="text-[#361f1a] hover:text-[#7d562d] text-lg font-bold disabled:opacity-30 cursor-pointer"
              >
                −
              </button>
              <span className="font-serif font-extrabold text-[#361f1a] text-base">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="text-[#361f1a] hover:text-[#7d562d] text-lg font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* main buy button */}
            <button
              onClick={handleAddToBasket}
              className="flex-1 bg-[#361f1a] hover:bg-[#7d562d] text-white rounded-xl font-bold py-3.5 px-8 text-sm shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
            >
              Add Portions to Basket — ${(unitPrice * quantity).toFixed(2)}
            </button>
          </div>

        </div>
      </div>

      {/* SENSORY PROFILE BENTO GRID */}
      {product.sensoryProfile && (
        <section className="bg-white border border-[#361f1a]/10 rounded-2xl p-6 md:p-8 space-y-6 md:space-y-8 shadow-xs">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#361f1a]">The Sensory Profile</h2>
            <div className="h-0.5 w-16 bg-[#7d562d]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* profile summary (5 columns) */}
            <div className="lg:col-span-5 space-y-4">
              <p className="font-serif italic text-[#361f1a]/90 text-sm md:text-base leading-relaxed">
                "{product.sensoryProfile.description}"
              </p>
              
              {/* Characteristics descriptors list */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#361f1a]/5">
                {product.sensoryProfile.characteristics.map((char) => (
                  <div key={char.label} className="flex items-center space-x-2 text-stone-600">
                    <div className="bg-[#7d562d]/10 text-[#7d562d] p-1.5 rounded-lg">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold">{char.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ingredient listing details (7 columns) */}
            <div className="lg:col-span-7 bg-[#f0ede9]/40 border border-[#361f1a]/10 p-6 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#361f1a]">Organic Ingredients Checklist</h3>
              <p className="text-[#361f1a] font-serif italic text-sm md:text-base">
                {product.sensoryProfile.ingredients}
              </p>
              <div className="pt-3 border-t border-[#361f1a]/5 text-[11px] text-stone-500 font-semibold space-y-1">
                <p>• Suitable for vegetarians.</p>
                <p>• Strictly non-GMO grains.</p>
                <p>• Direct-trade cacao sourced directly from private growers.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THREE STEP CRAFT STORY GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif font-bold text-[#361f1a]">The Craft Behind the Cacao</h2>
          <p className="text-stone-500 text-xs">Each batch goes through a tightly-timed laboratory cycle to deliver pure bliss.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Step 1 */}
          <div className="bg-[#f0ede9]/40 border border-[#361f1a]/10 rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#361f1a]/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz_SQ1frnKZFi-_CilPwXjnVKFAmPF_8Lm_FrlJ5_GfQpXMexSRECweaFja7JUlX3fL_3kO0ixIALIr_2X79WhbYP02Gh89OlIyeYxCO0n_YkJKmDxx_TNY-ThKRSN_nQeaOUkwWODttGvIHM0J-50Ymjz-2vnnoQb8C7QY9BlbfHMfbOoa9ZtUHW_JEkooOkpkiHQTMKvQwM9iCvwF1sGbOTQtte70LIISCIZdMyXfZNQnweDf46dyhEhTY13NJepi74CmE2nAVdt"
                alt="salt finishes"
                className="w-full h-full object-cover grayscale opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[#7d562d] text-xs font-extrabold uppercase tracking-widest block">Phase One</span>
              <h3 className="font-serif font-bold text-base text-[#361f1a]">Hand-Harvested Salts</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Each finished batch is sprinkled exactly prior to setting, utilizing large flaked ocean crystals mined off rocky tidal shelves.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#f0ede9]/40 border border-[#361f1a]/10 rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#361f1a]/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIzpkRHmy6dHZZD9Vn1VNwD1wTu5nEPe85F8vaM5PH_nVv3izkuPjBidJQ_FKLTpaCwiAAjadnYkxUZLqDdovxXlEirsLsPC9CVnApi95rzsbTzqnXkeFNnBVf6rdoI5qxRuz5LyCz5irBFbr46XW5qRvb5QF_BE6qblOxGfwwMAhPr6CBi8uDP2sHv36NBaU7Yh4GruDBBlJeJzfPIrAgf8RcEPoS05ujyI173pzCwrDa9cj5hmyT76SN0DEB6DGZUkfaHi3JtUS_"
                alt="Valrhona Cocoa"
                className="w-full h-full object-cover grayscale opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[#7d562d] text-xs font-extrabold uppercase tracking-widest block">Phase Two</span>
              <h3 className="font-serif font-bold text-base text-[#361f1a]">Single Origin 70% Dark</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We select volcanic cacao beans that are organic single-estate fermented to preserve earth, citrus, and oak wood flavors.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#f0ede9]/40 border border-[#361f1a]/10 rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-[#361f1a]/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxq-TfTfILFNaNb1gApvRprED1MjJs_Sg5GmgsC7h6d2R5QJkEtQxYSsggnl_i6udF4_GnhJsO6Nu5T0i45dgk9MZhF5AAewjePVY4FImTKazGgj6Ftt6uL0SgMN6F5Y9Br6APyRVTDHTdLETTWOV0OnojYwj73LFZH--jsfHDLZzb-H0HCKhEcs8l_Qh24urDQITGfcooq3Cre8KONyONdpoRx9qeb1zBZn1jssfSwKIjYQLoSw1LP61zfjsqZT0cLoFd18QMNyj_"
                alt="slow-whipped details"
                className="w-full h-full object-cover grayscale opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[#7d562d] text-xs font-extrabold uppercase tracking-widest block">Phase Three</span>
              <h3 className="font-serif font-bold text-base text-[#361f1a]">Slow-Whipped Batter</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                To capture a delicate paper-thin glossy crinkle top and heavy, satisfyingly fudgy density, ingredients are folded cold on slow-turning grids.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FLOAT ADDED TO BASKET ALERTS */}
      <AnimatePresence>
        {addedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#361f1a] text-white border border-[#7d562d]/20 px-5 py-4 rounded-xl shadow-2xl flex items-center space-x-3 text-xs md:text-sm max-w-sm"
          >
            <span className="text-xl">✨</span>
            <div>
              <p className="font-bold">Oven Batch Allocated</p>
              <p className="text-[11px] text-stone-300 leading-snug">{addedMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
