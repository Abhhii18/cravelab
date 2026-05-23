import React, { useState } from "react";
import { ArrowRight, Star, Sparkles, AlertCircle, ShoppingCart } from "lucide-react";
import { Product, CartItem } from "../types";
import { PRODUCTS, REVIEWS, CATEGORIES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface HomeViewProps {
  setView: (view: string) => void;
  setSelectedProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number, option?: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setView,
  setSelectedProduct,
  addToCart,
  setSelectedCategory,
}) => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [labModalOpen, setLabModalOpen] = useState(false);
  const [labStep, setLabStep] = useState(0);
  const [addedProductNotification, setAddedProductNotification] = useState<string | null>(null);

  const featuredProducts = PRODUCTS.filter((p) =>
    ["salted-brownie", "almond-croissant", "pistachio-tart", "heritage-sourdough"].includes(p.id)
  );

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setView("shop");
  };

  const handleProductDetail = (id: string) => {
    setSelectedProduct(id);
    setView("product");
  };

  const handleFastAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductNotification(product.name);
    setTimeout(() => {
      setAddedProductNotification(null);
    }, 2500);
  };

  const labStepsData = [
    {
      title: "1. The Sifting & Scent",
      desc: "Heirloom flours are milled cold and combined with natural volcanic water. We screen-sift three times to capture micro-air pocket structures.",
      icon: "🌾"
    },
    {
      title: "2. The 72h Deep Fermentation",
      desc: "Our wild-culture sourdough culture starters 'Alchemist Base A1' feed slowly in climate controlled humidity. Patience produces rich aromatic prebiotics.",
      icon: "⏳"
    },
    {
      title: "3. Hand Folding & Lamination",
      desc: "Over 48 hours, rich sweet butter layers are folded by hand twenty-four times. No shortcuts, no automated machines—pure physical touch.",
      icon: "🧈"
    },
    {
      title: "4. The Stone Deck Sear",
      desc: "Baked on custom firestones inside deep pre-steamed ovens. Intense direct heat caramelizes starches into deep complex amber crunkle structures.",
      icon: "🔥"
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Content (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#7d562d]/10 text-[#7d562d] text-xs font-semibold rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oven Heat Presets Active</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#361f1a] leading-tight select-none">
              Freshly Baked <br />
              <span className="text-[#7d562d] italic font-medium">Happiness,</span> Delivered <br />
              to Your Door
            </h1>
            
            <p className="text-[#361f1a]/85 max-w-xl mx-auto lg:mx-0 text-sm md:text-base leading-relaxed font-sans">
              From early morning warmth to deep-midnight indulgence, CraveLab transforms pure organic ingredients into baked works of sensory art. Order hot, or curated in artisanal gift collections.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleCategoryClick("All")}
                className="bg-[#361f1a] hover:bg-[#7d562d] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleProductDetail("salted-brownie")}
                className="border border-[#361f1a] hover:bg-[#361f1a]/5 text-[#361f1a] px-8 py-3.5 rounded-full font-semibold text-sm transition-all cursor-pointer"
              >
                Signature Brownie Series
              </button>
            </div>

            {/* Micro details indicator */}
            <div className="pt-6 border-t border-[#361f1a]/15 max-w-md mx-auto lg:mx-0 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#7d562d]">4.9★</span>
                <span className="text-[11px] font-sans text-stone-500">2,000+ Reviews</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#7d562d]">72h</span>
                <span className="text-[11px] font-sans text-stone-500">Fermentation</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#7d562d]">0%</span>
                <span className="text-[11px] font-sans text-stone-500">Preservatives</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Display (5 Columns) */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-[#7d562d]/10 rounded-full blur-3xl -z-10" />

            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-[#361f1a]/10 shadow-2xl bg-gradient-to-tr from-[#361f1a]/5 to-[#7d562d]/5 flex items-center justify-center group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDz_SQ1frnKZFi-_CilPwXjnVKFAmPF_8Lm_FrlJ5_GfQpXMexSRECweaFja7JUlX3fL_3kO0ixIALIr_2X79WhbYP02Gh89OlIyeYxCO0n_YkJKmDxx_TNY-ThKRSN_nQeaOUkwWODttGvIHM0J-50Ymjz-2vnnoQb8C7QY9BlbfHMfbOoa9ZtUHW_JEkooOkpkiHQTMKvQwM9iCvwF1sGbOTQtte70LIISCIZdMyXfZNQnweDf46dyhEhTY13NJepi74CmE2nAVdt"
                alt="Finest Cacao Brownie"
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 text-white">
                <p className="font-serif font-bold text-lg">Signature Salted Fudgy Brownie</p>
                <p className="text-xs text-white/80">From $12.50 — Click to customize yours</p>
              </div>
            </div>

            {/* floating interactive card */}
            <div className="absolute bottom-4 right-4 bg-[#fcf9f4] border border-[#361f1a]/15 p-4 rounded-2xl shadow-lg flex items-center space-x-3 text-xs max-w-xs animate-bounce">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-bold">✨</div>
              <div>
                <p className="font-serif font-bold text-[#361f1a]">Fresh Out of the Oven</p>
                <p className="text-stone-500">Salted Brownie batches ready to ship!</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section className="bg-[#f0ede9] py-16 px-4 md:px-8 border-y border-[#361f1a]/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#361f1a]">From the Oven to Your Heart</h2>
            <p className="text-[#361f1a]/70 text-sm max-w-md mx-auto">
              Select an indulgence genre. Our stone decks stay warm around the clock to cater to your specific mood.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-items-center">
            {CATEGORIES.map((cat, idx) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="flex flex-col items-center space-y-4 text-center group cursor-pointer"
              >
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#7d562d] shadow-md group-hover:shadow-lg transition-all bg-white p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Category circular overlay */}
                  <div className="absolute inset-0 bg-[#361f1a]/5 group-hover:bg-[#7d562d]/10 transition-colors" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#361f1a] group-hover:text-[#7d562d] text-base transition-colors">{cat.name}</h3>
                  <span className="text-[10px] uppercase font-sans tracking-wide text-stone-400 group-hover:text-stone-500">Order Now</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CHEF'S SIGNATURES */}
      <section id="signatures" className="px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#361f1a]/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-[#7d562d] font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>CraveLab Classics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#361f1a]">
              Chef's Signatures
            </h2>
          </div>
          <button
            onClick={() => handleCategoryClick("All")}
            className="text-sm font-semibold text-[#7d562d] hover:text-[#361f1a] transition-colors flex items-center gap-1 group pb-1 cursor-pointer"
          >
            Explore Master Catalog
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Signatures List grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductDetail(product.id)}
              className="bg-[#fcf9f4] border border-[#361f1a]/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image with Tag badge */}
              <div className="relative overflow-hidden aspect-square border-b border-[#361f1a]/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Nutritional Tags */}
                {product.tags.length > 0 && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.tags.map(t => (
                      <span key={t} className="bg-[#fcf9f4]/90 backdrop-blur-sm text-[#361f1a] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stars Badge & Price Bottom line inside cover */}
                <div className="absolute bottom-3 right-3 bg-[#361f1a]/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-serif font-bold text-lg text-[#361f1a] group-hover:text-[#7d562d] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </div>
                  
                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#361f1a]/5">
                  <div>
                    <span className="text-stone-400 text-[10px] block font-sans">Price</span>
                    <span className="font-serif font-extrabold text-[#361f1a] text-lg">${product.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={(e) => handleFastAdd(product, e)}
                    className="bg-[#361f1a]/5 hover:bg-[#361f1a] text-[#361f1a] hover:text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 font-bold text-xs"
                    title="Quick Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 4. THE ALCHEMIST'S LAB STORY */}
      <section id="alchemist-lab" className="bg-[#361f1a] text-[#fcf9f4] py-16 px-4 md:px-8 border-y-4 border-[#7d562d]/30 relative">
        <div className="absolute inset-0 bg-radial-gradient from-black/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Lab Story Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7d562d]/30 text-amber-100 rounded-full text-xs font-semibold tracking-wide">
              <span>🔬 Laboratory Concept</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-extrabold leading-tight">
              The Alchemist's Lab
            </h2>

            <p className="text-[#fcf9f4]/80 text-sm md:text-base leading-relaxed">
              We don't consider breadmaking a task; it is an equation of time, heat, and moisture, mapped to historic fermentation principles. Each sourdough starter sample is monitored, each croissant hand-layered precisely twenty-four times over two entire solar cycles.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <span className="text-[#7d562d] font-bold text-2xl">✓ 100% Organic</span>
                <p className="text-xs text-[#fcf9f4]/60">Grown locally, milled stone ground without bleach.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#7d562d] font-bold text-2xl">✓ 72 Hours</span>
                <p className="text-xs text-[#fcf9f4]/60">Sourdough fermentation for rich prebiotic nutrition.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#7d562d] font-bold text-2xl">✓ Lava Stone Deck</span>
                <p className="text-xs text-[#fcf9f4]/60">Ovens sealed using natural mineral deck elements.</p>
              </div>
              <div className="space-y-1">
                <span className="text-[#7d562d] font-bold text-2xl">✓ Small Batches</span>
                <p className="text-xs text-[#fcf9f4]/60">Handcrafted strictly under 50 loaves per oven roll.</p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setLabStep(0);
                  setLabModalOpen(true);
                }}
                className="bg-[#7d562d] hover:bg-white hover:text-[#361f1a] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer group"
              >
                Watch the Craft
                <span className="text-xs opacity-80 bg-black/10 px-2 py-0.5 rounded-full group-hover:bg-[#361f1a]/20">Interactive</span>
              </button>
            </div>
          </div>

          {/* Luxury Showcase Image */}
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#7d562d]/50 to-transparent rounded-2xl blur-xl" />
            
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-[#7d562d]/20 shadow-2xl bg-black">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5yGR6Xfh3yxTfbcPlfuuoUS3Xs1rz7EeRcNpwpCFa79O7eikLxd68Ncrq7yX0277YF34joRzL0gc37CVPrbnoC-htW_EMKmJPBI62wa5UBepZf_t0EXpcaIWjxTN5ccbMWwbDfvQ7Fk06bGqTTpgJjKQBGEO6O9Rj0CsWJUkntEloxVhw8JPpIzINqfj5HvFyo9_6wAT9-GLU29uQd1GFh0EOuOlh7sov99V1L2_sANYj4ThMAw2tNl-nkfFklyrSj9-9rggr4oi0"
                alt="Sourdough preparation"
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-6">
                <h4 className="text-amber-100 font-serif font-bold text-lg">Ancient Grains & Earth</h4>
                <p className="text-xs text-[#fcf9f4]/70">No preservatives. Just sourdough culture, grains, water, and heat.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS & REVIEWS SECTION */}
      <section id="testimonials" className="bg-[#f0ede9]/50 py-16 px-4 md:px-8 border-y border-[#361f1a]/5">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-[#361f1a]">
              The Sweet Scent of Loyalty
            </h2>
            <p className="text-[#361f1a]/70 text-sm max-w-sm mx-auto">
              Read stories from neighbors, critics, and dessert lovers around the globe.
            </p>
          </div>

          {/* Carousel Widget */}
          <div className="relative max-w-3xl mx-auto bg-[#fcf9f4] border border-[#361f1a]/10 rounded-2xl p-8 md:p-12 shadow-sm text-center">
            
            {/* Carousel controllers */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIndex(idx)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                    activeReviewIndex === idx ? "bg-[#361f1a]" : "bg-stone-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Score representation */}
                <div className="flex justify-center text-amber-500 gap-1">
                  {Array.from({ length: REVIEWS[activeReviewIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500" />
                  ))}
                </div>

                <blockquote className="font-serif italic text-lg text-[#361f1a]/95 leading-relaxed">
                  "{REVIEWS[activeReviewIndex].comment}"
                </blockquote>

                <div>
                  <div className={`w-10 h-10 ${REVIEWS[activeReviewIndex].avatarColor} border border-[#361f1a]/10 rounded-full flex items-center justify-center font-bold text-sm text-[#361f1a] mx-auto mb-2`}>
                    {REVIEWS[activeReviewIndex].name.charAt(0)}
                  </div>
                  <cite className="not-italic block font-sans font-bold text-[#361f1a]">
                    {REVIEWS[activeReviewIndex].name}
                  </cite>
                  <span className="text-[11px] text-stone-500 uppercase tracking-widest font-sans font-medium">
                    {REVIEWS[activeReviewIndex].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick action helper buttons */}
            <button
              onClick={() => setActiveReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[#361f1a]/5 text-[#361f1a] rounded-full transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              onClick={() => setActiveReviewIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-[#361f1a]/5 text-[#361f1a] rounded-full transition-colors cursor-pointer"
              aria-label="Next review"
            >
              →
            </button>
          </div>

        </div>
      </section>

      {/* FAST NOTIFICATION FLOATER */}
      <AnimatePresence>
        {addedProductNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-[#361f1a] text-[#fcf9f4] border border-[#7d562d]/20 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs md:text-sm"
          >
            <div className="bg-[#7d562d]/25 p-1.5 rounded-md">🥐</div>
            <div>
              <p className="font-bold">Indulgence Added</p>
              <p className="text-[11px] text-[#fcf9f4]/70">{addedProductNotification} appended to basket.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. INTERACTIVE LAB CRAFT MODAL */}
      <AnimatePresence>
        {labModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#fcf9f4] border border-[#361f1a]/20 max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Head */}
              <div className="bg-[#361f1a] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔬</span>
                  <h3 className="font-serif font-bold text-lg">Artisanal Laboratory Process</h3>
                </div>
                <button
                  onClick={() => setLabModalOpen(false)}
                  className="p-1 hover:bg-[#7d562d] rounded text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Interactive Steps Section */}
              <div className="p-6 md:p-8 flex-1 space-y-6">
                {/* Stepper display bar */}
                <div className="flex justify-between items-center bg-[#f0ede9] rounded-full py-1.5 px-3 border border-[#361f1a]/15 text-xs text-stone-500">
                  {labStepsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setLabStep(idx)}
                      className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                        labStep === idx ? "bg-[#7d562d] text-white shadow-sm" : "hover:text-[#361f1a]"
                      }`}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Animated Slide Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={labStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="text-5xl text-center py-4 bg-[#f0ede9]/40 rounded-xl leading-none">
                      {labStepsData[labStep].icon}
                    </div>
                    <h4 className="font-serif font-bold text-xl text-[#361f1a] text-center">
                      {labStepsData[labStep].title}
                    </h4>
                    <p className="text-stone-600 text-xs md:text-sm text-center leading-relaxed">
                      {labStepsData[labStep].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Modal Footer actions */}
              <div className="bg-[#361f1a]/5 p-4 border-t border-[#361f1a]/10 flex justify-between items-center">
                <button
                  disabled={labStep === 0}
                  onClick={() => setLabStep((prev) => prev - 1)}
                  className="px-4 py-2 border border-[#361f1a]/20 text-xs font-semibold rounded-xl text-[#361f1a] hover:bg-stone-100 disabled:opacity-40"
                >
                  Previous
                </button>

                {labStep < labStepsData.length - 1 ? (
                  <button
                    onClick={() => setLabStep((prev) => prev + 1)}
                    className="bg-[#7d562d] text-white px-5 py-2 text-xs font-semibold rounded-xl hover:bg-[#361f1a] transition-all"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={() => setLabModalOpen(false)}
                    className="bg-[#361f1a] text-white px-6 py-2 text-xs font-semibold rounded-xl hover:bg-[#7d562d] transition-all"
                  >
                    Close Lab Tour
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
