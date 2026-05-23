import React, { useState, useMemo } from "react";
import { Star, SlidersHorizontal, Check, RefreshCw, ShoppingCart, Search } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface ShopViewProps {
  setView: (view: string) => void;
  setSelectedProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number, option?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  setView,
  setSelectedProduct,
  addToCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  // Filters State
  const [selectedDietaryTags, setSelectedDietaryTags] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(30);
  const [sortBy, setSortBy] = useState<string>("most-indulgent");
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const categoriesList = ["All", "Brownies", "Pastries", "Cakes", "Artisan Sourdough"];
  const dietaryTagsList = ["Gluten-Free", "Vegan", "Contains Nuts", "Limited Edition"];

  // Toggle Dietary Tags
  const handleDietaryToggle = (tag: string) => {
    setSelectedDietaryTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedDietaryTags([]);
    setMaxPrice(30);
    setSearchQuery("");
    setSortBy("most-indulgent");
  };

  // Live filtered list
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Filter by Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by Dietary Tags
    if (selectedDietaryTags.length > 0) {
      result = result.filter((p) =>
        selectedDietaryTags.every((tag) => p.tags.includes(tag))
      );
    }

    // Filter by Price
    result = result.filter((p) => p.price <= maxPrice);

    // Sort Products
    if (sortBy === "most-indulgent") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.reverse(); // Mock newer by reverse list
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, selectedCategory, selectedDietaryTags, maxPrice, sortBy]);

  const handleProductDetail = (id: string) => {
    setSelectedProduct(id);
    setView("product");
  };

  const handleFastAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemNotification(product.name);
    setTimeout(() => {
      setAddedItemNotification(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8 min-h-screen">
      
      {/* Search and Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-[#361f1a]/15 pb-6">
        <div className="space-y-2">
          <p className="text-xs text-[#7d562d] uppercase tracking-widest font-extrabold">Handcrafted Indulgence</p>
          <h1 className="text-3xl md:text-5xl font-serif font-extrabold text-[#361f1a]">
            The Master Catalog
          </h1>
        </div>

        {/* Live Search and Match Stats */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1 sm:w-80">
            <input
              type="text"
              placeholder="Search baked items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#361f1a]/15 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#7d562d] outline-none text-[#361f1a]"
            />
            <Search className="w-4 h-4 text-[#361f1a]/40 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#361f1a] bg-[#361f1a]/5 px-4 py-2 rounded-xl border border-[#361f1a]/5">
            <span>{filteredProducts.length} Items Found</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Filters column (3 Columns Desktop) */}
        <aside className="lg:col-span-3 space-y-8 bg-[#f0ede9]/40 border border-[#361f1a]/10 p-6 rounded-2xl h-fit">
          <div className="flex items-center justify-between border-b border-[#361f1a]/10 pb-3">
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#361f1a]">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filter Laboratory</span>
            </div>
            
            <button
              onClick={handleResetFilters}
              className="text-stone-500 hover:text-[#7d562d] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              title="Reset All Filters"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Section A: Categories Selection */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#361f1a] uppercase tracking-wider">Oven Categories</h4>
            <div className="flex flex-col space-y-1.5">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-2 px-3 rounded-lg flex items-center justify-between transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#361f1a] text-[#fcf9f4] font-bold shadow-xs"
                      : "hover:bg-[#361f1a]/5 text-[#361f1a]/85 font-medium"
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5 stroke-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Section B: Diet & Specials badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#361f1a] uppercase tracking-wider">Dietary Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {dietaryTagsList.map((tag) => {
                const isActive = selectedDietaryTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleDietaryToggle(tag)}
                    className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#7d562d] text-white border-transparent shadow-xs font-bold"
                        : "bg-white text-stone-600 border-[#361f1a]/10 hover:border-stone-400"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section C: Price slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <h4 className="font-bold text-[#361f1a] uppercase tracking-wider">Upper Price</h4>
              <span className="font-serif font-extrabold text-[#7d562d] text-sm">${maxPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="0.5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
              className="w-full accent-[#7d562d] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-semibold">
              <span>$5.00</span>
              <span>$30.00 max</span>
            </div>
          </div>

          {/* Direct Line / Help banner inside sidebar */}
          <div className="bg-[#361f1a] text-white p-4 rounded-xl text-xs space-y-1">
            <p className="font-serif italic font-bold text-[#fcf9f4]">Special Ingredient Request?</p>
            <p className="text-[#fcf9f4]/75">Call our Boutique Bakers direct to organize a completely bespoke flour mix or custom cake design!</p>
          </div>
        </aside>

        {/* Right Products grid & Sort line (9 Columns Desktop) */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* Sorters Bar */}
          <div className="flex justify-between items-center bg-[#f0ede9]/40 border border-[#361f1a]/10 px-4 py-3 rounded-xl text-xs">
            <span className="font-medium text-stone-500">Showing {filteredProducts.length} Artisanal items</span>
            <div className="flex items-center gap-2">
              <span className="text-stone-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-[#361f1a]/15 text-[#361f1a] rounded px-2.5 py-1 outline-none text-xs focus:ring-1 focus:ring-[#7d562d]"
              >
                <option value="most-indulgent">Most Indulgent</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Empty Results state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-[#361f1a]/25 rounded-2xl p-8 space-y-3">
              <span className="text-4xl">🥐</span>
              <h3 className="text-lg font-serif font-bold text-[#361f1a]">No indulgence aligns with your filters</h3>
              <p className="text-stone-500 text-xs max-w-xs mx-auto">
                Try widening your price limit or clearing active dietary toggles to allow our oven formulas to match.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#361f1a] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#7d562d] transition-all mt-4 cursor-pointer"
              >
                Clear Active Filters
              </button>
            </div>
          )}

          {/* Goods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProducts.map((p) => (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleProductDetail(p.id)}
                  className="bg-white border border-[#361f1a]/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all group cursor-pointer flex flex-col justify-between"
                >
                  {/* Image cover + labels */}
                  <div className="relative aspect-square bg-[#361f1a]/5 overflow-hidden border-b border-[#361f1a]/10">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badge badges */}
                    {p.tags.includes("Limited Edition") && (
                      <span className="absolute top-3 left-3 bg-[#7d562d] text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                        Limited Release
                      </span>
                    )}

                    {p.id === "salted-brownie" && (
                      <span className="absolute top-3 right-3 bg-teal-800 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                        Best Seller
                      </span>
                    )}

                    {/* Small category overlay info */}
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#361f1a] text-[9px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
                      {p.category}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs text-amber-600 font-bold gap-1">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span className="text-[#361f1a]">{p.rating.toFixed(1)}</span>
                        </div>
                        {p.tags.filter(t => t !== "Limited Edition").slice(0, 1).map((t) => (
                          <span key={t} className="text-[#7d562d] text-[10px] font-extrabold bg-[#7d562d]/10 px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#361f1a] group-hover:text-[#7d562d] transition-colors leading-snug">
                        {p.name}
                      </h3>

                      <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 border-t border-[#361f1a]/5">
                      <div>
                        <span className="text-stone-400 text-[9px] uppercase tracking-wider block">Price</span>
                        <span className="font-serif font-extrabold text-[#361f1a] text-base">${p.price.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={(e) => handleFastAdd(p, e)}
                        className="bg-[#361f1a] text-white p-2.5 rounded-xl hover:bg-[#7d562d] transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                        title="Add to Basket"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>

      {/* FIXED FAST NOTIFICATION FLOATER */}
      <AnimatePresence>
        {addedItemNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#361f1a] text-white border border-[#7d562d]/20 px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs md:text-sm"
          >
            <div className="bg-[#7d562d]/20 p-1.5 rounded">📦</div>
            <div>
              <p className="font-bold">Added to Oven</p>
              <p className="text-[11px] text-stone-300">{addedItemNotification} is in your secure basket.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
