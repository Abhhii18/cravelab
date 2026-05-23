import React, { useState } from "react";
import { Search, ShoppingBag, User, Menu, X, ArrowRight, Trash2 } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  cart: CartItem[];
  removeFromCart: (id: string, option?: string) => void;
  updateQuantity: (id: string, quantity: number, option?: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setView,
  cart,
  removeFromCart,
  updateQuantity,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + (item.overridePrice || item.product.price) * item.quantity,
    0
  );

  const handleShopClick = () => {
    setSelectedCategory("All");
    setView("shop");
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    setView("home");
    setMobileMenuOpen(false);
  };

  const handleNavClick = (view: string) => {
    setView(view);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#361f1a]/10 px-4 md:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#361f1a]">
          <button
            onClick={handleShopClick}
            className={`hover:text-[#7d562d] transition-colors relative py-1 cursor-pointer ${
              currentView === "shop" ? "text-[#7d562d] font-semibold" : ""
            }`}
          >
            Shop
            {currentView === "shop" && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7d562d]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => handleNavClick("home")}
            className="hover:text-[#7d562d] transition-colors cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => {
              setView("home");
              setTimeout(() => {
                document.getElementById("alchemist-lab")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="hover:text-[#7d562d] transition-colors cursor-pointer"
          >
            Experiences
          </button>
          <button
            onClick={() => {
              setView("home");
              setTimeout(() => {
                document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="hover:text-[#7d562d] transition-colors cursor-pointer"
          >
            Locations
          </button>
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#361f1a]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Center Logo */}
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="text-2xl md:text-3xl font-serif font-extrabold tracking-widest text-[#361f1a] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
          >
            <span>Crave</span>
            <span className="text-[#7d562d] bg-[#7d562d]/10 px-1.5 py-0.5 rounded text-lg font-sans font-semibold tracking-normal align-middle">Lab</span>
          </button>
        </div>

        {/* Right Side: Search and Account/Cart Controls */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Search */}
          <div className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Search decadent baked goods..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== "shop") {
                  setView("shop");
                }
              }}
              className="w-48 lg:w-64 bg-[#361f1a]/5 text-[#361f1a] rounded-full pl-10 pr-4 py-1.5 text-xs outline-none focus:ring-1 focus:ring-[#7d562d] focus:bg-white transition-all border border-transparent focus:border-[#7d562d]/20"
            />
            <Search className="w-4 h-4 text-[#361f1a]/50 absolute left-3.5" />
          </div>

          {/* User Profile Hook (Mock interaction) */}
          <button
            onClick={() => alert("CraveLab Loyalty Profile Coming Soon! Collect crumb points with every order.")}
            className="p-2 hover:bg-[#361f1a]/5 rounded-full transition-all text-[#361f1a] cursor-pointer"
            title="Profile & Rewards"
          >
            <User className="w-[19px] h-[19px] md:w-5 md:h-5" />
          </button>

          {/* Cart Pill with Popover Support */}
          <div className="relative">
            <button
              id="cart-btn"
              onClick={() => setView(currentView === "checkout" ? "shop" : "checkout")}
              onMouseEnter={() => setCartDropdownOpen(true)}
              onMouseLeave={() => setCartDropdownOpen(false)}
              className={`p-2 hover:bg-[#361f1a]/5 rounded-full transition-all text-[#361f1a] relative cursor-pointer flex items-center justify-center`}
              title="Shopping Basket"
            >
              <ShoppingBag className="w-[19px] h-[19px] md:w-5 md:h-5 text-[#361f1a]" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#7d562d] text-white text-[10px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center font-bold shadow-sm"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Cart Hover Dropdown (Desktop only) */}
            <AnimatePresence>
              {cartDropdownOpen && (
                <div
                  onMouseEnter={() => setCartDropdownOpen(true)}
                  onMouseLeave={() => setCartDropdownOpen(false)}
                  className="hidden lg:block absolute right-0 mt-1 w-80 bg-[#fcf9f4] border border-[#361f1a]/15 shadow-xl rounded-xl overflow-hidden z-50 py-3"
                >
                  <div className="px-4 pb-2 border-b border-[#361f1a]/10 flex justify-between items-center bg-[#361f1a]/5">
                    <span className="font-serif font-bold text-[#361f1a]">Your Basket</span>
                    <span className="text-xs text-[#7d562d] font-semibold">{totalItems} Item{totalItems !== 1 ? "s" : ""}</span>
                  </div>

                  <div className="max-h-60 overflow-y-auto px-1 py-1">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 px-4 text-[#361f1a]/60">
                        <ShoppingBag className="w-8 h-8 mx-auto stroke-1 text-[#361f1a]/30 mb-2" />
                        <p className="text-sm font-serif italic">Your oven is empty.</p>
                        <p className="text-xs mt-1">Fill it with sweet details.</p>
                      </div>
                    ) : (
                      cart.map((item, idx) => (
                        <div
                          key={`${item.product.id}-${item.selectedOption || idx}`}
                          className="flex items-center justify-between p-2 hover:bg-[#361f1a]/5 rounded-lg transition-colors"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded-md border border-[#361f1a]/10"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 ml-3 min-w-0">
                            <h4 className="text-xs font-semibold text-[#361f1a] truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-[#7d562d] font-medium">
                              {item.selectedOption || "Individually"}
                            </p>
                            <div className="flex items-center mt-1 text-[11px] text-[#361f1a]/70">
                              <span>Qty: {item.quantity}</span>
                              <span className="mx-1.5">•</span>
                              <span className="font-semibold text-[#361f1a]">
                                ${(item.overridePrice || item.product.price) * item.quantity}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                            className="p-1 hover:text-red-600 text-stone-400 rounded transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="px-4 pt-3 border-t border-[#361f1a]/10 bg-[#fcf9f4]">
                      <div className="flex justify-between items-center text-xs mb-3">
                        <span className="text-stone-500 font-medium">Subtotal</span>
                        <span className="font-semibold text-sm text-[#361f1a]">${cartSubtotal.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => {
                          setView("checkout");
                          setCartDropdownOpen(false);
                        }}
                        className="w-full bg-[#361f1a] hover:bg-[#7d562d] text-white text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        Checkout Basket
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden mt-4 overflow-hidden bg-[#f0ede9] rounded-2xl border border-[#361f1a]/10"
          >
            <div className="p-4 space-y-4 flex flex-col">
              {/* Mobile Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search decadent baked goods..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (currentView !== "shop") {
                      setView("shop");
                    }
                  }}
                  className="w-full bg-white text-[#361f1a] rounded-xl pl-10 pr-4 py-2 text-xs outline-none focus:ring-1 focus:ring-[#7d562d] border border-[#361f1a]/10"
                />
                <Search className="w-4 h-4 text-[#361f1a]/50 absolute left-3.5 top-2.5" />
              </div>

              <button
                onClick={handleShopClick}
                className="text-left py-2 font-medium text-lg border-b border-[#361f1a]/5 flex items-center justify-between text-[#361f1a]"
              >
                <span>Shop Decadence</span>
                <span className="text-xs px-2 py-0.5 bg-[#7d562d]/10 text-[#7d562d] rounded-full">New</span>
              </button>

              <button
                onClick={() => {
                  setView("home");
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById("signatures")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-left py-2 font-medium text-lg border-b border-[#361f1a]/5 text-[#361f1a]"
              >
                Chef's Signatures
              </button>

              <button
                onClick={() => {
                  setView("home");
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById("alchemist-lab")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-left py-2 font-medium text-lg border-b border-[#361f1a]/5 text-[#361f1a]"
              >
                The Alchemist's Lab
              </button>

              <button
                onClick={() => {
                  setView("home");
                  setMobileMenuOpen(false);
                  setTimeout(() => {
                    document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="text-left py-2 font-medium text-lg text-[#361f1a]"
              >
                Locations & Story
              </button>

              <button
                onClick={() => handleNavClick("checkout")}
                className="w-full bg-[#361f1a] hover:bg-[#7d562d] text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mt-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Go to Checkout ({totalItems} items)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
