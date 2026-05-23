import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeView } from "./components/HomeView";
import { ShopView } from "./components/ShopView";
import { ProductDetailView } from "./components/ProductDetailView";
import { CheckoutView } from "./components/CheckoutView";
import { Product, CartItem } from "./types";
import { PRODUCTS } from "./data";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [currentView, setView] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string>("salted-brownie");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Populate default cart state to align perfectly with the user checkout screenshots:
  // Heritage Sourdough: $12.00
  // Pistachio Glazed Croissant: 2x $7.50 = $15.00
  // Velvet Dark Babka: $22.00
  // Subtotal: $49.00
  const [cart, setCart] = useState<CartItem[]>(() => {
    const sourdough = PRODUCTS.find((p) => p.id === "heritage-sourdough") || PRODUCTS[5];
    const glazeCroissant = PRODUCTS.find((p) => p.id === "pistachio-glazed-croissant") || PRODUCTS[6];
    const darkBabka = PRODUCTS.find((p) => p.id === "velvet-dark-babka") || PRODUCTS[7];

    return [
      {
        product: sourdough,
        quantity: 1,
        selectedOption: "Order Individually",
        overridePrice: 12.00, // Explicitly override Sourdough to match user checkout screenshot
      },
      {
        product: glazeCroissant,
        quantity: 2,
        selectedOption: "Order Individually",
      },
      {
        product: darkBabka,
        quantity: 1,
        selectedOption: "Order Individually",
      },
    ];
  });

  const addToCart = (
    product: Product,
    quantity: number,
    option: string = "Order Individually",
    customPrice?: number
  ) => {
    setCart((prev) => {
      // Look for match by product id AND selected portion package option
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedOption === option
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedOption: option,
            overridePrice: customPrice,
          },
        ];
      }
    });
  };

  const removeFromCart = (id: string, option?: string) => {
    setCart((prev) =>
      prev.filter((item) => {
        if (item.product.id !== id) return true;
        if (option && item.selectedOption !== option) return true;
        return false;
      })
    );
  };

  const updateQuantity = (id: string, quantity: number, option?: string) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === id && (!option || item.selectedOption === option)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f4] selection:bg-[#7d562d]/20 selection:text-[#361f1a]">
      {/* Universal Stick Navbar */}
      <Navbar
        currentView={currentView}
        setView={setView}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Core Viewport area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            id="view-container"
          >
            {currentView === "home" && (
              <HomeView
                setView={setView}
                setSelectedProduct={setSelectedProductId}
                addToCart={addToCart}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {currentView === "shop" && (
              <ShopView
                setView={setView}
                setSelectedProduct={setSelectedProductId}
                addToCart={addToCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            {currentView === "product" && (
              <ProductDetailView
                productId={selectedProductId}
                setView={setView}
                addToCart={addToCart}
              />
            )}

            {currentView === "checkout" && (
              <CheckoutView
                cart={cart}
                setView={setView}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal footer */}
      <Footer setView={setView} />
    </div>
  );
}

export default App;
