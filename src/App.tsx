import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingCart,
  Search,
  Filter,
  Plus,
  Minus,
  Trash2,
  Edit,
  X,
  Check,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
  LayoutDashboard,
  Home,
  Info,
  Package,
  PlusCircle,
  TrendingUp,
  Award,
  Clock,
  MessageCircle,
  Moon,
  Sun,
  Menu,
  LogOut,
  Lock,
  User,
  Eye,
  EyeOff
} from "lucide-react";

import { Product, CartItem, Testimonial, FAQItem, Stats } from "./types";
import { INITIAL_PRODUCTS, TESTIMONIALS, FAQS } from "./data";

export default function App() {
  // Navigation & States
  const [activeTab, setActiveTab] = useState<string>("home");
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Zote");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // Notification system
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Admin edit form states
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adminView, setAdminView] = useState<"list" | "add" | "edit">("list");

  // Admin authentication states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(
    () => sessionStorage.getItem("admin_logged_in") === "true"
  );
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  
  // Product Form states
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("Elektroniki");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formStock, setFormStock] = useState("");

  // Order Info Form in Cart
  const [buyerName, setBuyerName] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");

  // FAQ Expanded index
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Load products from Local Storage or default to initial
  useEffect(() => {
    const savedProducts = localStorage.getItem("duka_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem("duka_products", JSON.stringify(INITIAL_PRODUCTS));
    }

    const savedCart = localStorage.getItem("duka_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }
  }, []);

  // Save Cart to Local Storage
  useEffect(() => {
    localStorage.setItem("duka_cart", JSON.stringify(cart));
  }, [cart]);

  // Show customized toasts
  const triggerNotification = (message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Login handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const validUsername = "admin";
    const validPasswords = ["admin123", "gcollection"];

    if (loginUsername.trim().toLowerCase() === validUsername && validPasswords.includes(loginPassword)) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem("admin_logged_in", "true");
      triggerNotification("Umeingia kwenye mfumo wa udhibiti kwa mafanikio!", "success");
      setLoginUsername("");
      setLoginPassword("");
    } else {
      setLoginError("Jina la mtumiaji au Nywila sio sahihi! Tafadhali jaribu tena.");
      triggerNotification("Ushuhuda wa kuingia umeshindwa!", "error");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem("admin_logged_in");
    triggerNotification("Umetoka kwenye mfumo wa udhibiti kwa usalama.", "info");
  };

  // Cart operations
  const addToCart = (product: Product, qty: number = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: qty }]);
    }
    triggerNotification(`"${product.name}" imeongezwa kwenye kikapu cha manunuzi!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    const updatedCart = cart
      .map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const removeFromCart = (productId: string, name: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    triggerNotification(`"${name}" imeondolewa kwenye kikapu.`, "info");
  };

  const clearCart = () => {
    setCart([]);
    triggerNotification("Kikapu chako kimesafishwa kwa ufanisi.", "info");
  };

  // WhatsApp Single Product Order
  const handleSingleOrderWhatsApp = (product: Product, quantity: number = 1) => {
    const whatsappNumber = "255762012479";
    const message = `Habari, naomba kuagiza bidhaa hii:

Jina la Bidhaa: ${product.name}
Bei: TZS ${product.price.toLocaleString()}
Idadi: ${quantity}

Jina langu: _________________
Mahali nilipo: _________________

Asante.`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  // WhatsApp Cart Order
  const handleCartOrderWhatsApp = () => {
    if (cart.length === 0) {
      triggerNotification("Kikapu chako ni tupu! Tafadhali ongeza bidhaa kwanza.", "error");
      return;
    }

    const whatsappNumber = "255762012479";
    const totalCost = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    
    let itemsList = "";
    cart.forEach((item, index) => {
      itemsList += `${index + 1}. ${item.product.name} (Idadi: ${item.quantity}) - TZS ${(item.product.price * item.quantity).toLocaleString()}\n`;
    });

    const mtejaName = buyerName.trim() || "__________";
    const mtejaMahali = buyerLocation.trim() || "__________";

    const message = `Habari, naomba kuagiza bidhaa zifuatazo kutoka kwenye Cart yangu:

${itemsList}
Jumla ya Gharama: TZS ${totalCost.toLocaleString()}

Jina langu: ${mtejaName}
Mahali nilipo: ${mtejaMahali}

Asante.`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  // Admin: Add/Edit Product handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice || !formStock) {
      triggerNotification("Tafadhali jaza jina, bei na idadi ya bidhaa stoki.", "error");
      return;
    }

    const priceNum = parseFloat(formPrice);
    const stockNum = parseInt(formStock);

    if (isNaN(priceNum) || priceNum <= 0) {
      triggerNotification("Bei lazima iwe namba halali inayozidi sifuri.", "error");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      triggerNotification("Idadi kwenye stoki lazima iwe namba inayofaa.", "error");
      return;
    }

    const defaultImg = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80";
    const finalImg = formImage.trim() || defaultImg;

    if (adminView === "add") {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formName,
        price: priceNum,
        category: formCategory,
        description: formDescription || "Hakuna maelezo yaliyowekwa kwa sasa.",
        image: finalImg,
        salesCount: 0,
        rating: 5.0,
        stock: stockNum
      };

      const updated = [newProduct, ...products];
      setProducts(updated);
      localStorage.setItem("duka_products", JSON.stringify(updated));
      triggerNotification(`Bidhaa mpya "${formName}" imesajiliwa kikamilifu!`);
    } else if (adminView === "edit" && editingProduct) {
      const updated = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName,
            price: priceNum,
            category: formCategory,
            description: formDescription,
            image: finalImg,
            stock: stockNum
          };
        }
        return p;
      });

      setProducts(updated);
      localStorage.setItem("duka_products", JSON.stringify(updated));
      triggerNotification(`Bidhaa "${formName}" imeboreshwa kikamilifu!`, "success");
    }

    // Reset forms and return
    resetForm();
    setAdminView("list");
  };

  const resetForm = () => {
    setFormName("");
    setFormPrice("");
    setFormCategory("Elektroniki");
    setFormDescription("");
    setFormImage("");
    setFormStock("");
    setEditingProduct(null);
  };

  const startEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormPrice(p.price.toString());
    setFormCategory(p.category);
    setFormDescription(p.description);
    setFormImage(p.image);
    setFormStock(p.stock.toString());
    setAdminView("edit");
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Je, uko tayari kufuta bidhaa "${name}"? Kitendo hiki hakiwezi kubatilishwa.`)) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("duka_products", JSON.stringify(updated));
      triggerNotification(`Bidhaa "${name}" imefutwa kwenye duka letu.`, "info");
    }
  };

  // Filter Categories
  const categoriesList = ["Zote", "Elektroniki", "Vifaa vya Nyumbani", "Mavazi na Mitindo", "Burudani na Muziki"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Zote" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats for admin dashboard
  const stats: Stats = {
    totalSales: products.reduce((acc, p) => acc + (p.salesCount || 0), 0),
    totalOrdersCount: Math.ceil(products.reduce((acc, p) => acc + (p.salesCount || 0), 0) / 2.3),
    totalProductsCount: products.length,
    totalRevenueValue: products.reduce((acc, p) => acc + (p.price * (p.salesCount || 0)), 0)
  };

  const cartTotalAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-slate-50 font-sans selection:bg-green-100 selection:text-green-800">
      
      {/* Sliding Page Content Wrapper */}
      <div 
        className="min-h-screen flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: mobileMenuOpen ? "translateX(-280px)" : "none" }}
      >
        
        {/* Styled Modern Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-md shadow-emerald-500/20">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-display text-gray-900 flex items-center gap-1">
                G collection <span className="text-emerald-600 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">store</span>
              </h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">Kariakoo • Tanzania</p>
            </div>
          </div>

          {/* Navigation Links (Desktop-only) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {[
              { id: "home", label: "Mwanzo" },
              { id: "products", label: "Bidhaa" },
              { id: "about", label: "Kuhusu Sisi" },
              { id: "contact", label: "Mawasiliano" },
              { id: "faq", label: "Maswali na Majibu" },
              { id: "admin", label: "Dhibiti Duka", icon: <LayoutDashboard className="w-4 h-4 inline" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo(0, 0);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-slate-100 text-emerald-600 border border-slate-200/50 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    : "text-gray-600 hover:text-emerald-500 hover:bg-slate-50"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Checkout Basket Indicator & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              id="cart-toggle"
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-all border border-emerald-100 cursor-pointer flex items-center gap-2 group shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-semibold text-xs hidden sm:inline">Kikapu Chako</span>
              {cartTotalItems > 0 && (
                <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartTotalItems}
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-all border border-slate-200 cursor-pointer flex items-center justify-center shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Real-time Toast Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4"
          >
            <div className={`p-4 rounded-xl shadow-xl border flex items-center gap-3 justify-between ${
              notification.type === "error"
                ? "bg-rose-50 border-rose-100 text-rose-800"
                : notification.type === "info"
                ? "bg-slate-50 border-slate-100 text-slate-800"
                : "bg-emerald-50 border-emerald-100 text-emerald-800"
            }`}>
              <div className="flex items-center gap-2">
                <Check className={`w-5 h-5 flex-shrink-0 ${notification.type === "error" ? "text-rose-500" : "text-emerald-500"}`} />
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
              <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600 flex-shrink-0 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Core Container */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === "home" && (
          <div className="animate-fade-in divide-y divide-gray-100">
            
            {/* Elegant Hero Slider section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent opacity-70"></div>
              
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
                <div className="md:col-span-7 space-y-6 text-left">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Duka la Mtandaoni Uhakika 100%
                  </span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight tracking-tight text-white">
                    Pata Bidhaa Bora <br />
                    kwa <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300 font-extrabold">Bei na Urahisi Naafu!</span>
                  </h2>
                  <p className="text-gray-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
                    Karibu kwenye G collection store. Tunaagiza bidhaa orijino kutoka viwandani na kukufikishia popote ulipo Tanzania. Agiza sasa na ufarijike kwa urahisi wa WhatsApp!
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab("products")}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 transition-all text-sm flex items-center gap-2 cursor-pointer border border-emerald-400/10 group"
                    >
                      Agiza Sasa 
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm cursor-pointer"
                    >
                      Kuhusu Sisi
                    </button>
                  </div>

                  {/* Highlights Bullet Indicators */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-850">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold font-display text-emerald-400">100%</h4>
                      <p className="text-xs text-gray-400">Bidhaa Orijino</p>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold font-display text-emerald-400">Kariakoo</h4>
                      <p className="text-xs text-gray-400">Ofisi na Duka</p>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold font-display text-emerald-400">Masaa 24</h4>
                      <p className="text-xs text-gray-400">Ufikishaji Haraka</p>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Image representation */}
                <div className="md:col-span-5 relative flex justify-center">
                  <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-slate-850 flex items-center justify-center p-4 border border-slate-700/50 shadow-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
                      alt="Viatu vya Michezo"
                      className="relative z-10 w-4/5 h-auto object-contain drop-shadow-[0_20px_35px_rgba(34,197,94,0.35)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Best Sellers Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Mambo yanayovuma</span>
                  <h3 className="text-2xl md:text-3.5xl font-extrabold text-gray-900 mt-1 font-display">
                    Bidhaa Zinazouzwa Zaidi 🔥
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Bidhaa hizi ni maarufu na zimepata makadirio ya juu kutoka kwa wateja wetu mwezi huu.</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory("Zote");
                    setActiveTab("products");
                  }}
                  className="text-emerald-600 hover:text-emerald-700 font-bold text-sm tracking-wide flex items-center gap-1 group cursor-pointer inline-flex"
                >
                  Onyesha Zote
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Grid of limited sample best sellers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group flex flex-col h-full overflow-hidden">
                    <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md opacity-90 backdrop-blur-xs">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1 text-emerald-500">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-250"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-gray-500">({product.rating.toFixed(1)})</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-md line-clamp-1 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-gray-500 text-xs line-clamp-2 h-8 leading-normal font-light">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between gap-1">
                        <div>
                          <p className="text-[10px] text-gray-400 font-medium">Bei ya Leo</p>
                          <p className="text-emerald-600 font-extrabold text-lg tracking-tight">
                            TZS {product.price.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-2.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-700 rounded-xl transition-all cursor-pointer border border-slate-100 hover:border-emerald-200"
                          title="Ongeza Kwenye Kikapu"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Choose Us Minimal Bento Grid / Trust Cards */}
            <section className="bg-slate-100 py-16 px-4">
              <div className="max-w-7xl mx-auto text-center space-y-12">
                <div>
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Ubora Wetu</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1 font-display">
                    Kwanini Ununue Kupitia Sisi? 🌟
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 space-y-4 text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">100% Uhakika wa Ubora</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Bidhaa zetu zote zinafanyiwa ukaguzi kamili (QC) kabla ya kukabidhiwa kwa mteja. Hakuna asilimia ya kupewa bidhaa isiyofanya kazi.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 space-y-4 text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-905">Agiza Kirafiki kwa WhatsApp</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Huhitaji kujisajili kwa kadi au mifumo migumu ya mikopo. Unaongea na muhudumu wetu wa msaada moja kwa moja kwa WhatsApp ili kujibu maswali yako yote.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 space-y-4 text-center">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900">Usaidizi na Warranty</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Tunatoa msaada kamili wa baada ya mauzo (After Sales Support) pamoja na warranty inayolinda chombo chako dhidi ya hitilafu za kimitambo au kiufundi.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Customer Testimonial section */}
            <section className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider">Ushuhuda</span>
                  <h3 className="text-2xl md:text-3.5xl font-extrabold text-gray-900 mt-1 font-display">
                    Maoni ya Wateja Wetu Wanaofurahi 💬
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">Soma uzoefu wa kweli wa wanunuzi ambao wamefanya manunuzi nasi kutoka sehem mbalimbali za nchi.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-250"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-650 text-sm italic leading-relaxed font-light">
                          "{t.comment}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-xl shadow-xs">
                          {t.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{t.name}</h4>
                          <p className="text-[11px] text-gray-500">{t.role}, <span className="font-semibold text-emerald-600">{t.location}</span></p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: PRODUCTS PAGE */}
        {activeTab === "products" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {/* Search and Category Filtering Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
              
              {/* Search input with lens */}
              <div className="relative w-full md:max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tafuta bidhaa hapa (mfano: Samsung, Laptop, Viatu)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm bg-slate-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category selector row */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

            </div>

            {/* Display products lists */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-xs space-y-4">
                <Package className="w-16 h-16 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold text-gray-900 font-display">Hakuna bidhaa iliyopatikana!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">Hakuna bidhaa inayolingana na neno au kundi ulilochagua. Jaribu kubadilisha vigezo vyako vya utafutaji au uanze upya.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("Zote");
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-5 py-2 rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Onyesha Bidhaa Zote
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    id={`product-${product.id}`}
                    className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl hover:border-emerald-100 transition-all duration-300 group flex flex-col h-full overflow-hidden"
                  >
                    {/* Visual Badge Category and Stock Status */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded-md opacity-90 backdrop-blur-xs">
                        {product.category}
                      </span>

                      {/* Stock badge */}
                      {product.stock <= 3 ? (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-md">
                          Mwisho stoki: {product.stock} pekee!
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-emerald-500/95 text-white text-[9px] font-bold px-2 py-1 rounded-md">
                          Stoki ipo {product.stock}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        
                        {/* Rating block */}
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-250"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-bold text-gray-500">{product.rating.toFixed(1)}</span>
                          <span className="text-gray-300 text-xs">•</span>
                          <span className="text-[10px] text-gray-400">{product.salesCount || 0} Imeuzwa</span>
                        </div>

                        {/* Title & Desc */}
                        <h3 className="font-bold text-gray-900 text-md line-clamp-1 group-hover:text-emerald-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-xs line-clamp-3 leading-normal font-light min-h-[50px]">
                          {product.description}
                        </p>

                      </div>

                      <div className="space-y-4 mt-4 pt-3 border-t border-gray-100">
                        {/* Shillings amount */}
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-[10px] text-gray-400 font-medium">Bei ya Leo</p>
                            <p className="text-emerald-600 font-extrabold text-xl tracking-tight">
                              TZS {product.price.toLocaleString()}
                            </p>
                          </div>
                          
                          {/* Add to Basket button */}
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl transition-all font-semibold text-xs border border-emerald-100 hover:border-emerald-600 cursor-pointer flex items-center gap-1"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            + Kikapu
                          </button>
                        </div>

                        {/* Interactive Direct WhatsApp order action */}
                        <button
                          onClick={() => handleSingleOrderWhatsApp(product)}
                          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                        >
                          <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
                          Agiza kupitia WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* VIEW 3: ABOUT US PAGE */}
        {activeTab === "about" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            
            {/* Split Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              <div className="md:col-span-7 space-y-6">
                <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-wider">Kuhusu Sisi • G collection store</span>
                <h2 className="text-3xl md:text-4.5xl font-extrabold text-gray-905 font-display">
                  Sisi Ni Nani na Nini Tunaamini Katika Biashara yetu? 🌿
                </h2>
                <p className="text-gray-600 text-base leading-relaxed font-light">
                  <strong>G collection store</strong> ni duka linalokua kwa kasi nchini Tanzania likiwa na makao yake makuu Kariakoo, Dar es Salaam. Tulianzishwa tukiwa na lengo rahisi: kuondoa urasimu kwenye kujaza fomu ngumu kuagiza mtandaoni na kufanya manunuzi ya kiteknolojia yawe rahisi, ya haraka na ya usalama kwa kutumia mtandao wa mawasiliano wa <strong>WhatsApp</strong> ambao kila Mtanzania anaujua na kuupenda.
                </p>
                <p className="text-gray-605 text-base leading-relaxed font-light">
                  Sisi tunaingiza bidhaa zetu moja kwa moja kutoka kwa wazalishaji wakuu duniani kama vile Asia na Ulaya. Hii inatupa fursa ya kutoa bei bora na za ushindani ambazo hutoweza kuzipata kwingine nchini. Tunaamini katika maadili ya biashara, huduma bora, na kutoa msaada kamili kwa kila hatua ya mteja.
                </p>

                {/* Company stats block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display text-emerald-600">5,000+</h3>
                    <p className="text-xs text-gray-500">Wateja Walioridhika</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display text-emerald-600">12,000+</h3>
                    <p className="text-xs text-gray-500">Mizigo Iliyofika Salama</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display text-emerald-600">100%</h3>
                    <p className="text-xs text-gray-500">Dhamana ya Ubora</p>
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-display text-emerald-600">26+</h3>
                    <p className="text-xs text-gray-500">Mikoa Yote Inafikiwa</p>
                  </div>
                </div>
              </div>

              {/* Side Visual Collage / Image representation */}
              <div className="md:col-span-5 space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-video md:aspect-square shadow-xl border border-gray-150">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent z-10 flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] bg-emerald-500 text-white font-bold tracking-wider uppercase px-2 py-1 rounded-sm w-max mb-1.5">Ofisi Yetu Kuu</span>
                    <h4 className="font-extrabold text-lg">Kariakoo, Dar es Salaam</h4>
                    <p className="text-xs text-gray-300">Tembelea ofisi zetu upate huduma ya ana kwa ana na msaada wa kutosha.</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
                    alt="Ofisi Yetu"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>

            {/* Core Values Accordion Cards */}
            <div className="space-y-6 pt-10 border-t border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 font-display text-center">Nguzo Zetu Tatu Kuu 🛡️</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Uaminifu Bora",
                    desc: "Hatuuzi bidhaa feki au zilizochakaa kama mpya. Kila maelezo ya bidhaa anayopewa mteja ni sawa na bidhaa atayoipokea."
                  },
                  {
                    title: "Kasi ya Ufikishaji",
                    desc: "Wateja wetu hawapotezi muda wao kusubiri. Tunaagiza wasafirishaji binafsi kufanya ufikishaji haraka ndani ya siku au masaa pekee."
                  },
                  {
                    title: "Rafiki na Rahisi",
                    desc: "Utaratibu wetu umerahisishwa ukiachana na fomu ngumu. Kupitia WhatsApp unaweza kuuliza maswali yoyote kupata uelewa."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm">
                      {idx + 1}
                    </div>
                    <h4 className="font-bold text-lg text-slate-850">{item.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 4: CONTACT US PAGE */}
        {activeTab === "contact" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            
            {/* Title description */}
            <div className="text-center space-y-2 max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-gray-905 font-display">Wasiliana na Huduma kwa Wateja 📞</h2>
              <p className="text-gray-500 text-sm">Maswali? Shaka au unataka msaada wa haraka? Wasiliana nasi kupitia njia yoyote ya mawasiliano hapa chini na msaidizi wetu atakuwa tayari kukusaidia ndani ya muda mfupi.</p>
            </div>

            {/* Content Row splitting */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form and Contact metadata */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Visual Direct details */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6">
                  <h3 className="font-bold text-lg text-gray-900 border-b border-gray-50 pb-2">Njia zetu za Haraka</h3>
                  
                  <div className="space-y-4">
                    {/* Phone details */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-400 font-medium">Piga Simu / SMS</h4>
                        <p className="text-sm font-semibold text-gray-800">+255 762 012 479</p>
                        <p className="text-[11px] text-gray-500">Masaa ya kazi: 2Asubuhi - 4Usiku (Kila siku)</p>
                      </div>
                    </div>

                    {/* WhatsApp details */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-green-50 text-green-600 rounded-xl">
                        <MessageCircle className="w-5 h-5 fill-none" />
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-400 font-medium">WhatsApp</h4>
                        <p className="text-sm font-semibold text-gray-800">+255 762 012 479</p>
                        <p className="text-[11px] text-gray-500">Chat moja kwa moja kupata msaada sasa!</p>
                      </div>
                    </div>

                    {/* Email details */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-400 font-medium">Barua Pepe (Email)</h4>
                        <p className="text-sm font-semibold text-gray-800">gastonmapunda24@gmail.com</p>
                        <p className="text-[11px] text-gray-500">Tujibu ndani ya masaa 24 ya kawaida.</p>
                      </div>
                    </div>

                    {/* Location details */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs text-gray-400 font-medium">Duka na Ofisi yetu</h4>
                        <p className="text-sm font-semibold text-gray-850">Kariakoo, Dar es Salaam</p>
                        <p className="text-[11px] text-gray-500">Mtaa wa Msimbazi, karibu na msikiti mkuu.</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simulated Working Hours card */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/15 rounded-full blur-xl"></div>
                  <h3 className="font-bold text-md tracking-wide">Muda wa Huduma</h3>
                  <div className="space-y-2 text-xs text-gray-300 font-light">
                    <div className="flex justify-between">
                      <span>Jumatatu - Ijumaa:</span>
                      <span className="font-semibold text-white">2:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumamosi:</span>
                      <span className="font-semibold text-white">3:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumapili na Likizo:</span>
                      <span className="font-semibold text-green-300">4:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Google Maps Embed representation */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                  <h3 className="font-bold text-lg text-gray-900">Mahali Tunapopatikana (Ramani) 📍</h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-1 rounded-sm">Kariakoo, Dar es Salaam</span>
                </div>
                
                {/* Beautiful Mock Map Canvas */}
                <div className="relative rounded-2xl overflow-hidden aspect-video w-full border border-gray-100 shadow-sm bg-slate-50 flex flex-col items-center justify-center p-4">
                  <iframe 
                    title="Duka la Kisasa Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15846.883907579975!2d39.2687!3d-6.8167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b1234567891%3A0x1234567890abcdef!2sKariakoo%2C%20Dar%20es%20Salaam!5e0!3m2!1sen!2stz!4v1620000000000!5m2!1sen!2stz" 
                    className="absolute inset-0 w-full h-full border-0 rounded-2xl" 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
                </div>

                <p className="text-gray-500 text-xs italic leading-relaxed text-center font-light pt-1">
                  Ushauri: Ukifika Kariakoo, mtaa wa Msimbazi, unaweza kutupigia simu tukufuate popote ulipo ili tusikupoteze kwenye msongamano.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* VIEW 5: FAQ SECTION */}
        {activeTab === "faq" && (
          <div className="animate-fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
            
            {/* Title */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-extrabold text-gray-905 font-display">Maswali na Majibu (FAQ) 🙋‍♂️</h2>
              <p className="text-gray-500 text-sm">Pata majibu ya haraka kwa maswali yanayoulizwa mara kwa mara kuhusu usafirishaji, ubora, utaratibu wa malipo na udhamini wa bidhaa.</p>
            </div>

            {/* Accordion List container */}
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full text-left p-5 font-bold text-gray-850 hover:text-emerald-600 transition-colors flex items-center justify-between gap-4 cursor-pointer text-md focus:outline-none"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <span className="text-slate-400 font-extrabold flex-shrink-0">
                      {expandedFaq === i ? <Minus className="w-4 h-4 text-emerald-500" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-50 font-light">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Support Notice badge */}
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center space-y-3">
              <h3 className="font-bold text-emerald-800 text-md">Je, una swali ambalo halipo hapa?</h3>
              <p className="text-emerald-700 text-xs leading-relaxed max-w-lg mx-auto">Maswali mengine yote unaweza kutuma moja kwa moja kwa timu yetu ya WhatsApp popote ulipo, tutafurahi kukusaidia haraka!</p>
              <button
                onClick={() => window.open("https://wa.me/255762012479", "_blank")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-all inline-flex items-center gap-1.5 shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                Chat nasi WhatsApp Sasa
              </button>
            </div>

          </div>
        )}

        {/* VIEW 6: ADMIN DASHBOARD PANEL */}
        {activeTab === "admin" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            
            {!isAdminLoggedIn ? (
              <div className="max-w-md mx-auto bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden p-8 space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-100 mb-2">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 font-display">Ingia Sehemu ya Udhibiti</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Weka taarifa zako za siri hapa chini ili uweze kusimamia duka la <strong>G collection store</strong>.
                  </p>
                </div>

                {loginError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3.5 rounded-xl font-medium text-center">
                    ⚠️ {loginError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Jina la Mtumiaji (Username)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-250 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm bg-slate-50/50"
                        placeholder="admin"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Nywila (Password)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-250 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm bg-slate-50/50"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-650 cursor-pointer"
                        title={showPassword ? "Ficha password" : "Onyesha password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    Ingia Sasa
                  </button>
                </form>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-[11px] text-gray-500 space-y-1 text-center">
                  <p className="font-semibold text-gray-700">💡 Taarifa za Jaribio (Demo Credentials):</p>
                  <p>Mtumiaji: <code className="font-mono bg-slate-200/50 px-1 py-0.5 rounded text-emerald-600 font-bold">admin</code></p>
                  <p>Nywila: <code className="font-mono bg-slate-200/50 px-1 py-0.5 rounded text-emerald-600 font-bold">admin123</code> au <code className="font-mono bg-slate-200/50 px-1 py-0.5 rounded text-emerald-600 font-bold">gcollection</code></p>
                </div>
              </div>
            ) : (
              <>
                {/* Admin visual header */}
                <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-150 pb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 font-display">Dhibiti Duka Lako (Admin Demo Backend) 🔐</h2>
                    <p className="text-gray-500 text-sm">Onyesho la upande wa dhibiti duka. Hapa unaweza kuongeza bidhaa mpya, kurekebisha stoki au bei, kufuta bidhaa, na kuona takwimu za soko kwa usahihi.</p>
                  </div>

                  {/* Add Product trigger button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        resetForm();
                        setAdminView("add");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-705 text-white font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md animate-fade-in"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Sajili Bidhaa Mpya
                    </button>
                    <button
                      onClick={() => setAdminView("list")}
                      className="bg-slate-100 hover:bg-slate-205 text-gray-650 font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer border border-slate-200"
                    >
                      Orodha ya Bidhaa
                    </button>
                    <button
                      onClick={handleAdminLogout}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs px-4 py-2.5 rounded-xl cursor-pointer border border-rose-200 flex items-center gap-1.5"
                      title="Ondoka kwenye mfumo"
                    >
                      <LogOut className="w-4 h-4" />
                      Ondoka
                    </button>
                  </div>
                </div>

                {/* Admin Stats counts Bento row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2.5 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kadirio la Mauzo (Simulated)</p>
                      <p className="text-2xl font-extrabold text-slate-800">{stats.totalSales} vitu</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Check className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2.5 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kadirio la Mapato yote</p>
                      <p className="text-xl font-extrabold text-emerald-600">TZS {stats.totalRevenueValue.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2.5 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Jumla ya Aina za Bidhaa</p>
                      <p className="text-2xl font-extrabold text-slate-800">{stats.totalProductsCount}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2.5 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Idadi ya Oda</p>
                      <p className="text-2xl font-extrabold text-slate-800">{stats.totalOrdersCount}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                  </div>

                </div>

                {/* List View of products with search and edit option */}
                {adminView === "list" && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <h3 className="font-bold text-gray-800">Orodha Rasmi ya Bidhaa Zinazotolewa</h3>
                      <div className="text-slate-400 text-xs">Mabadiliko yote yanahifadhiwa kwenye Local Storage kwa sasa.</div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-gray-500 font-semibold border-b border-gray-100 text-xs uppercase tracking-wider">
                          <tr>
                            <th className="p-4">Picha / Jina</th>
                            <th className="p-4">Kundi</th>
                            <th className="p-4 text-right">Bei</th>
                            <th className="p-4 text-center">Mfumo wa Stoki</th>
                            <th className="p-4 text-right">Vitendo</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                              
                              {/* Image and Name */}
                              <td className="p-4 flex items-center gap-3 max-w-xs md:max-w-md overflow-hidden text-ellipsis">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-10 h-10 object-cover rounded-lg border border-gray-100"
                                  referrerPolicy="no-referrer"
                                />
                                <div>
                                  <p className="font-bold text-gray-800 text-sm line-clamp-1">{p.name}</p>
                                  <p className="text-gray-450 text-[11px] font-light max-w-xs line-clamp-1">{p.description}</p>
                                </div>
                              </td>

                              {/* Category */}
                              <td className="p-4">
                                <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                  {p.category}
                                </span>
                              </td>

                              {/* Price */}
                              <td className="p-4 text-right font-bold text-slate-800">
                                TZS {p.price.toLocaleString()}
                              </td>

                              {/* Stock */}
                              <td className="p-4 text-center">
                                {p.stock <= 3 ? (
                                  <span className="bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md border border-rose-100">
                                    Mwisho: {p.stock}
                                  </span>
                                ) : (
                                  <span className="bg-slate-100 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-md">
                                    {p.stock} pcs
                                  </span>
                                )}
                              </td>

                              {/* Actions */}
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-1.5">
                                  {/* Edit Action Button */}
                                  <button
                                    onClick={() => startEditProduct(p)}
                                    className="p-1.5 hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 rounded-lg transition-all border border-transparent hover:border-emerald-100 cursor-pointer"
                                    title="Boresha/Hariri"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  
                                  {/* Delete Action Button */}
                                  <button
                                    onClick={() => handleDeleteProduct(p.id, p.name)}
                                    className="p-1.5 hover:bg-rose-50 text-slate-550 hover:text-rose-600 rounded-lg transition-all border border-transparent hover:border-rose-100 cursor-pointer"
                                    title="Futa Bidhaa"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Form layout (Adding or Editing) */}
                {(adminView === "add" || adminView === "edit") && (
                  <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-display">
                        {adminView === "add" ? "Sajili Bidhaa Mpya ya Biashara" : `Boresha Maelezo: ${editingProduct?.name}`}
                      </h3>
                      <p className="text-gray-500 text-xs mt-1">Jaza fomu hii kwa bidhaa yako nchini Tanzania.</p>
                    </div>

                    <form onSubmit={handleSaveProduct} className="space-y-4">
                      
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block uppercase">Jina la Bidhaa *</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                          placeholder="Mano saa ya mkononi, TV 50 inch, nk..."
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                        />
                      </div>

                      {/* Grid row for Price and Stock */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Price in Shillings */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block uppercase">Bei mteja (TZS) *</label>
                          <input
                            type="number"
                            min="1"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-550 text-sm"
                            placeholder="Mfano: 850000"
                            required
                            value={formPrice}
                            onChange={(e) => setFormPrice(e.target.value)}
                          />
                        </div>

                        {/* Stock items count */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 block uppercase">Idadi ya Stoki (Pcs) *</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                            placeholder="Mfano: 15"
                            required
                            value={formStock}
                            onChange={(e) => setFormStock(e.target.value)}
                          />
                        </div>

                      </div>

                      {/* Category dropdown selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block uppercase">Kundi (Category)</label>
                        <select
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-555 text-sm bg-white"
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                        >
                          <option value="Elektroniki">Elektroniki</option>
                          <option value="Vifaa vya Nyumbani">Vifaa vya Nyumbani</option>
                          <option value="Mavazi na Mitindo">Mavazi na Mitindo</option>
                          <option value="Burudani na Muziki">Burudani na Muziki</option>
                        </select>
                      </div>

                      {/* Image URL path */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block uppercase">Image URL (Picha)</label>
                        <input
                          type="url"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-550 text-sm"
                          placeholder="Ingiza kiungo cha picha (Unsplash au mtandao mwingine)"
                          value={formImage}
                          onChange={(e) => setFormImage(e.target.value)}
                        />
                        <p className="text-[10px] text-gray-400">Unaweza kuacha wazi ili kuweka picha yetu ya kiwango cha kuanza (default).</p>
                      </div>

                      {/* Long description text */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 block uppercase">Maelezo fupi ya bidhaa</label>
                        <textarea
                          rows={3}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-205 focus:outline-none focus:border-emerald-500 text-sm"
                          placeholder="Zidisha sifa za kipekee: warranty, betri, RAM, n.k..."
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                        />
                      </div>

                      {/* Submit actions bottom row */}
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setAdminView("list");
                          }}
                          className="px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-100 text-gray-600 transition-all border border-transparent cursor-pointer"
                        >
                          Ghairi (Cancel)
                        </button>
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-md transition-all"
                        >
                          Hifadhi Bidhaa
                        </button>
                      </div>

                    </form>
                  </div>
                )}
              </>
            )}

          </div>
        )}

      </main>

      {/* Cart Sliding Drawer Modal */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop cover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
            ></motion.div>

            {/* Main drawer content right align */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white flex flex-col justify-between shadow-2xl relative"
              >
                
                {/* Drawer Header details */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-lg text-gray-900 font-display">Kikapu cha Ununuzi</h3>
                    <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">{cartTotalItems}</span>
                  </div>
                  <button onClick={() => setCartOpen(false)} className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-all cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart list body section */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 space-y-3.5">
                      <div className="w-16 h-16 bg-slate-55 rounded-full flex items-center justify-center mx-auto text-slate-300">
                        <ShoppingCart className="w-8 h-8" />
                      </div>
                      <h4 className="font-bold text-gray-800">Kikapu chako ni tupu kwa sasa!</h4>
                      <p className="text-gray-450 text-xs leading-relaxed max-w-xs mx-auto">Chagua bidhaa unazozipenda kwenye ukurasa wa bidhaa na uziongeze hapa ili kuagiza zote kwa pamoja kirahisi.</p>
                      <button
                        onClick={() => {
                          setCartOpen(false);
                          setActiveTab("products");
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs px-5 py-2 rounded-xl cursor-pointer shadow-xs transition-all"
                      >
                        Tazama Bidhaa Zote
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-3 bg-slate-50 p-3 rounded-xl border border-gray-100 relative group">
                          
                          {/* Photo */}
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />

                          {/* Data block */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <h4 className="font-bold text-gray-800 text-xs truncate pr-5">{item.product.name}</h4>
                            <p className="text-[10px] text-emerald-600 font-extrabold">TZS {item.product.price.toLocaleString()}</p>
                            
                            {/* Quantity control */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="w-5 h-5 bg-white text-gray-500 rounded border border-gray-200 hover:bg-slate-50 flex items-center justify-center text-xs ml-0.5 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="w-5 h-5 bg-white text-gray-500 rounded border border-gray-200 hover:bg-slate-50 flex items-center justify-center text-xs cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Delete direct */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.product.name)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-rose-500 p-0.5 transition-colors cursor-pointer"
                            title="Ondoa bidhaa hii"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                        </div>
                      ))}

                      {/* Clear basket trigger */}
                      <button
                        onClick={clearCart}
                        className="text-rose-550 hover:text-rose-700 text-xs font-bold flex items-center gap-1 cursor-pointer py-1 block"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Safisha Kikapu Chote
                      </button>
                    </div>
                  )}
                </div>

                {/* Buyer delivery information & Checkout actions */}
                {cart.length > 0 && (
                  <div className="p-5 border-t border-gray-150 bg-slate-50 space-y-4">
                    
                    {/* Delivery Form inputs */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gray-700 uppercase">Habari zako za Ufikishaji (Mteja)</h4>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Jona Lako (Mfano: Amina)"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs focus:outline-none focus:border-emerald-500"
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Mahali ulipo (Mfano: Sinza)"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs focus:outline-none focus:border-emerald-500"
                          value={buyerLocation}
                          onChange={(e) => setBuyerLocation(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Cost summary */}
                    <div className="space-y-1.5 pt-1 border-t border-gray-100">
                      <div className="flex justify-between text-xs text-gray-500 font-medium">
                        <span>Lipo kwenye Kikapu:</span>
                        <span>{cartTotalItems} bidhaa</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-800">Jumla ya Gharama:</span>
                        <span className="text-md font-extrabold text-emerald-600 tracking-tight text-lg">
                          TZS {cartTotalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Main order checkout link */}
                    <button
                      onClick={handleCartOrderWhatsApp}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 fill-white text-emerald-550" />
                      Tuma Oda WhatsApp
                    </button>

                    <p className="text-[10px] text-gray-400 italic text-center leading-normal">
                      Kumbuka: Ukibofya kitufe, WhatsApp itafunguka ikiwa na ujumbe wako mzuri tayari kutumwa.
                    </p>
                  </div>
                )}

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* Styled Floating Help WhatsApp button bottom right corner */}
      <div className="fixed bottom-6 right-6 z-40 group flex flex-col items-end gap-2">
        
        {/* Support bubble text on hover */}
        <div className="bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none tracking-wide select-none">
          Msaada wa Haraka? Chati Nasi!
        </div>

        {/* Floating circular trigger */}
        <button
          onClick={() => window.open("https://wa.me/255762012479?text=Habari! Naomba kupata msaada zaidi kuhusu bidhaa za G collection store.", "_blank")}
          id="whatsapp-floating-button"
          className="p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce active:scale-95 cursor-pointer border-2 border-white flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
        </button>

      </div>

      {/* Modern Style-conscious Footer */}
      <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-500 rounded-xl text-white">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <h2 className="text-lg md:text-xl font-bold font-display text-white">
                G collection <span className="text-emerald-400">store</span>
              </h2>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light max-w-sm">
              Sisi ni wauzaji wa kuaminika wa bidhaa mbalimbali za elektroniki, mavazi, na vifaa vya nyumbani nchini Tanzania. Tunanunua bidhaa orijino na kukufikishia popote ulipo kwa kasi kubwa.
            </p>
            <p className="text-[10px] text-gray-500 font-mono">Simu: +255 762 012 479 | Kariakoo, Dar</p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-2 space-y-3 text-left">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Kurasa Mkuu</h4>
            <div className="flex flex-col gap-2 text-xs font-light">
              <button onClick={() => { setActiveTab("home"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Mwanzo</button>
              <button onClick={() => { setActiveTab("products"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Bidhaa</button>
              <button onClick={() => { setActiveTab("about"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Kuhusu Sisi</button>
            </div>
          </div>

          {/* Column 3: Support Links */}
          <div className="md:col-span-2 space-y-3 text-left">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Msaada</h4>
            <div className="flex flex-col gap-2 text-xs font-light">
              <button onClick={() => { setActiveTab("faq"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Maswali & Majibu</button>
              <button onClick={() => { setActiveTab("contact"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Mawasiliano</button>
              <button onClick={() => { setActiveTab("admin"); window.scrollTo(0,0); }} className="hover:text-emerald-400 transition-colors text-left cursor-pointer">Dhibiti Panel</button>
            </div>
          </div>

          {/* Column 4: Location Summary stats */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Huduma Yetu Tanzania</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Tunasafirisha mizigo kupitia mabasi ya uhakika kila siku kutoka Kariakoo kwenda Dodoma, Arusha, Mwanza, Mbeya, Morogoro, Tanga na mikoa yote mingine ya nchi yetu.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Kariakoo, Barabara ya Msimbazi</span>
            </div>
          </div>

        </div>

        {/* Visual Copyright line */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-550">
          <p>© {new Date().getFullYear()} G collection store (E-commerce). Haki zote zimehifadhiwa.</p>
          <p className="flex items-center gap-1 font-mono">
            Designed by Google AI Studio
          </p>
        </div>
      </footer>

      </div> {/* End Sliding Page Content Wrapper */}

      {/* Mobile Menu Backdrop/Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/45 backdrop-blur-xs z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Right Sidebar Menu Drawer */}
      <div 
        className="fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-slate-150 lg:hidden"
        style={{ transform: mobileMenuOpen ? "translateX(0)" : "translateX(280px)" }}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500 rounded-xl text-white shadow-sm shadow-emerald-500/10">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 font-display block leading-none">G collection</span>
              <span className="text-[10px] text-emerald-600 font-bold block uppercase tracking-widest mt-0.5">Store</span>
            </div>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="p-1.5 hover:bg-slate-150 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
            aria-label="Funga Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1.5">
          {[
            { id: "home", label: "Mwanzo", icon: <Home className="w-5 h-5" /> },
            { id: "products", label: "Bidhaa", icon: <Package className="w-5 h-5" /> },
            { id: "about", label: "Kuhusu Sisi", icon: <Info className="w-5 h-5" /> },
            { id: "contact", label: "Mawasiliano", icon: <Phone className="w-5 h-5" /> },
            { id: "faq", label: "Maswali na Majibu", icon: <HelpCircle className="w-5 h-5" /> },
            { id: "admin", label: "Dhibiti Duka", icon: <LayoutDashboard className="w-5 h-5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
                window.scrollTo(0, 0);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left flex items-center gap-3 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/15"
                  : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600 border border-transparent hover:border-slate-100"
              }`}
            >
              <span className={activeTab === tab.id ? "text-white" : "text-emerald-500"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Drawer Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <p className="text-[10px] text-slate-400 font-medium">Kariakoo, Dar es Salaam</p>
          <p className="text-[9px] text-slate-500 font-mono mt-0.5">+255 762 012 479</p>
        </div>
      </div>

    </div>
  );
}
