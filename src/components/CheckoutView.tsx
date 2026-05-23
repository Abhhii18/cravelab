import React, { useState } from "react";
import { CreditCard, Truck, Gift, ShoppingBag, ArrowLeft, Trash2, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CheckoutViewProps {
  cart: CartItem[];
  setView: (view: string) => void;
  removeFromCart: (id: string, option?: string) => void;
  updateQuantity: (id: string, quantity: number, option?: string) => void;
  clearCart: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  setView,
  removeFromCart,
  updateQuantity,
  clearCart,
}) => {
  // Gifting state (+ $5.00)
  const [giftingOption, setGiftingOption] = useState(false);

  // Form Fields State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");

  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Totals Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.overridePrice || item.product.price) * item.quantity,
    0
  );
  const deliveryCharge = cart.length > 0 ? 8.50 : 0;
  const giftingCharge = giftingOption ? 5.00 : 0;
  const grandTotal = subtotal + deliveryCharge + giftingCharge;

  const handleQuantityMinus = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1, item.selectedOption);
    } else {
      removeFromCart(item.product.id, item.selectedOption);
    }
  };

  const handleQuantityPlus = (item: CartItem) => {
    updateQuantity(item.product.id, item.quantity + 1, item.selectedOption);
  };

  // Form submission handling
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !address || !city || !cardNumber || !cardCVC) {
      setFormErrors("Please complete all shipping address and payment method details.");
      return;
    }

    setFormErrors(null);

    // Generate random order id & open success screen
    const generatedOrderNum = `CRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedOrderNum);
    setSuccessModalOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    clearCart();
    setView("home");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 min-h-screen">
      
      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#361f1a]/15 pb-6 mb-10">
        <div className="space-y-1">
          <p className="text-xs text-[#7d562d] uppercase tracking-widest font-extrabold flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-extrabold text-[#361f1a]">
            Complete Your Order
          </h1>
        </div>

        <button
          onClick={() => setView("shop")}
          className="text-stone-500 hover:text-[#7d562d] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Keep Browsing Catalog</span>
        </button>
      </div>

      {cart.length === 0 ? (
        // Empty Basket state
        <div className="text-center py-24 bg-[#f0ede9]/30 rounded-2xl border border-dashed border-[#361f1a]/25 max-w-xl mx-auto p-8 space-y-4">
          <ShoppingBag className="w-12 h-12 mx-auto text-stone-300 stroke-1" />
          <h2 className="text-xl font-serif font-bold text-[#361f1a]">Your basket is empty.</h2>
          <p className="text-stone-500 text-xs max-w-xs mx-auto">
            You have not added any baked formulas to your checkout yet. Our sourdough starters are waiting for your call!
          </p>
          <button
            onClick={() => setView("shop")}
            className="bg-[#361f1a] text-white px-6 py-2.5 text-xs font-semibold rounded-xl hover:bg-[#7d562d] transition-all cursor-pointer"
          >
            Cook Up a New Order
          </button>
        </div>
      ) : (
        // Main checkout split
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* SECURE CHECKOUT FORM (7 Columns Desktop) */}
          <form onSubmit={handleCheckoutSubmit} className="lg:col-span-7 space-y-8">
            
            {/* Shipping Address details section */}
            <div className="bg-white border border-[#361f1a]/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-[#361f1a]/5 pb-3">
                <Truck className="w-5 h-5 text-[#7d562d]" />
                <h2 className="text-lg font-serif font-bold text-[#361f1a]">1. Delivery Destination</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Eleanor"
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Vance"
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase">Delivery Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="421 Artisanal Boulevard, Suite B"
                  className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">Postal Code</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="10001"
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* ARTISANAL LUXURY GIFTING UPSELL COMPONENT */}
            <div className="bg-[#7d562d]/10 border border-[#7d562d]/35 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#7d562d]" />
                  <h3 className="font-serif font-bold text-base text-[#361f1a]">Artisanal Gifting Packaging</h3>
                </div>
                <p className="text-xs text-[#361f1a]/85 leading-relaxed max-w-xl">
                  Enclose your selections inside a custom wooden lattice pastry box with premium cloth ties, plus a hand-scored thick-stock note displaying your bespoke message. Beautiful for birthdays or ceremonies.
                </p>
              </div>

              {/* Toggle switch selector */}
              <button
                type="button"
                onClick={() => setGiftingOption(!giftingOption)}
                className={`py-2 px-5 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap ${
                  giftingOption
                    ? "bg-[#7d562d] text-white border-transparent shadow-sm"
                    : "bg-white text-stone-700 border-[#361f1a]/15 hover:border-[#7d562d]"
                }`}
              >
                {giftingOption ? "✓ Added (+$5.00)" : "Add Gifting (+$5.00)"}
              </button>
            </div>

            {/* PAYMENT PROCESSOR CARD DETAILS */}
            <div className="bg-white border border-[#361f1a]/10 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[#361f1a]/5 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#7d562d]" />
                  <h2 className="text-lg font-serif font-bold text-[#361f1a]">2. Securing Payment</h2>
                </div>
                <div className="flex space-x-1.5 opacity-50">
                  <span className="text-xs bg-stone-100 px-1.5 py-0.5 rounded border text-stone-500 uppercase tracking-widest font-extrabold font-mono">Visa</span>
                  <span className="text-xs bg-stone-100 px-1.5 py-0.5 rounded border text-stone-500 uppercase tracking-widest font-extrabold font-mono">MC</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-stone-500 uppercase">Credit or Debit Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => {
                      // basic formatting digits
                      let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                      let formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                      setCardNumber(formatted);
                    }}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-[#361f1a]/3 text-xs p-3 pl-11 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                  <span className="absolute left-4 top-3.5 text-stone-400">💳</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">Expiry Date</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/[^0-9]/gi, "");
                      if (value.length > 2) {
                        value = value.substring(0, 2) + "/" + value.substring(2, 4);
                      }
                      setCardExpiry(value);
                    }}
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-stone-500 uppercase">CVV / CVI</label>
                  <input
                    type="password"
                    required
                    maxLength={3}
                    placeholder="•••"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/gi, ""))}
                    className="w-full bg-[#361f1a]/3 text-xs p-3 rounded-xl border border-transparent focus:border-[#7d562d] focus:bg-white outline-none text-[#361f1a] font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Error displays */}
            {formErrors && (
              <div className="p-4 bg-red-100 text-red-900 border border-red-200 text-xs rounded-xl flex items-center space-x-2">
                <span>⚠️</span>
                <p className="font-semibold">{formErrors}</p>
              </div>
            )}

            {/* Checkout Action submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#361f1a] hover:bg-[#7d562d] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize Secured Order — ${grandTotal.toFixed(2)}</span>
              </button>
              <p className="text-center text-[10px] text-stone-400 mt-3 font-semibold uppercase tracking-wider">
                🔒 256-Bit SSL Encription Protected Laboratory Checkout
              </p>
            </div>

          </form>

          {/* BAKERY BASKET LIVE CALCULATOR (5 Columns Desktop) */}
          <section className="lg:col-span-5 bg-[#f0ede9] border border-[#361f1a]/15 p-6 rounded-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#361f1a]/10 pb-3 bg-[#361f1a]/5 -mx-6 -mt-6 p-4 rounded-t-2xl">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#361f1a]" />
                <h3 className="font-serif font-extrabold text-[#361f1a] text-base">Bakery Basket</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 bg-white border border-[#361f1a]/10 text-[#361f1a] rounded-full font-bold">
                {cart.reduce((acu, it) => acu + it.quantity, 0)} Items
              </span>
            </div>

            {/* Items scroll selection */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedOption || index}`}
                  className="flex items-start justify-between gap-3 bg-white border border-[#361f1a]/10 p-3 rounded-xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md border border-[#361f1a]/10"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Item Description block */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#361f1a] truncate leading-tight">
                      {item.product.name}
                    </h4>
                    
                    <p className="text-[10px] text-[#7d562d] font-semibold mt-0.5">
                      {item.selectedOption || "Individually"}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* qty toggle */}
                      <div className="flex items-center border border-stone-200 bg-[#fcf9f4] rounded-lg px-2 py-0.5 space-x-2.5 text-xs">
                        <button
                          type="button"
                          onClick={() => handleQuantityMinus(item)}
                          className="text-[#361f1a] hover:text-[#7d562d] font-extrabold cursor-pointer"
                        >
                          −
                        </button>
                        <span className="font-bold text-stone-800">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityPlus(item)}
                          className="text-[#361f1a] hover:text-[#7d562d] font-extrabold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif font-extrabold text-sm text-[#361f1a]">
                        ${((item.overridePrice || item.product.price) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* trash delete */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                    className="text-stone-300 hover:text-red-600 p-1 rounded transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pricing breakdown receipts */}
            <div className="space-y-2.5 pt-4 border-t border-[#361f1a]/10 text-xs">
              <div className="flex justify-between items-center text-stone-500 font-semibold">
                <span>Subtotal</span>
                <span className="text-[#361f1a] font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-500 font-semibold">
                <span>Artisanal Shipping</span>
                <span className="text-[#361f1a] font-bold">${deliveryCharge.toFixed(2)}</span>
              </div>
              
              {giftingOption && (
                <div className="flex justify-between items-center text-stone-500 font-semibold">
                  <span>Gift Box & Ties Pack</span>
                  <span className="text-[#7d562d] font-extrabold">+${giftingCharge.toFixed(2)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-[#361f1a]/10 flex justify-between items-center font-serif text-base text-[#361f1a] font-bold">
                <span>Grand Total</span>
                <span className="text-lg font-extrabold text-[#7d562d]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Friendly quote bottom label */}
            <div className="bg-white border border-[#361f1a]/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-1 text-[11px] text-[#7d562d] font-extrabold uppercase tracking-widest">
                <span>🌾 Oven Quote</span>
              </div>
              <p className="text-[10px] text-stone-500 italic leading-relaxed">
                "Thank you for supporting artisanal craft. Each loaf tells a story of patience, temperature precision, and natural fermentation."
              </p>
            </div>

          </section>

        </div>
      )}

      {/* SUCCESS MODAL ON SECURED TRANSACTION */}
      <AnimatePresence>
        {successModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#fcf9f4] border border-[#361f1a]/15 max-w-md w-full rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 text-center space-y-6"
            >
              <div className="flex justify-center text-emerald-500">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[#7d562d] font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ovens are heating up!</span>
                </span>
                
                <h2 className="text-2xl md:text-3xl font-serif font-extrabold text-[#361f1a]">
                  Transaction Authorized
                </h2>
                
                <p className="text-xs text-stone-500 bg-[#361f1a]/5 py-1.5 px-4 rounded-lg font-mono tracking-wider w-fit mx-auto">
                  Order ID: {orderId}
                </p>
              </div>

              <p className="text-stone-600 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">
                Thank you for your order, {firstName}! We have allocated your single-estate cacao and sourdough batches. Warm shipping departs within 2 hours.
              </p>

              {/* Loyalty reward widget */}
              <div className="bg-amber-100/50 border border-amber-200 p-4 rounded-xl flex items-center gap-3.5 text-left text-xs text-[#361f1a]">
                <div className="bg-amber-100 p-2 rounded-lg text-amber-900 font-bold">🥐</div>
                <div>
                  <h4 className="font-bold">You earned 45 Crumb Points!</h4>
                  <p className="text-[11px] text-stone-500">Log in anytime to redeem points for fresh pastries and exclusive baker releases.</p>
                </div>
              </div>

              {/* Close and return */}
              <button
                onClick={handleSuccessClose}
                className="w-full bg-[#361f1a] hover:bg-[#7d562d] text-white font-bold py-3.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
              >
                Return to Artisan Lobby
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
