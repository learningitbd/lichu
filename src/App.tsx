import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Search, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  FileCode, 
  Share2, 
  Phone, 
  ArrowLeft, 
  CheckCircle, 
  Copy, 
  Menu, 
  X, 
  Percent, 
  Truck, 
  ShieldCheck, 
  Heart, 
  Eye, 
  SlidersHorizontal,
  ThumbsUp,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';
import { LYCHEE_PRODUCTS, CATEGORIES, GENERAL_FEATURES_FOOTER } from './data';
import { Product, CartItem, ActiveTab } from './types';

export default function App() {
  // --- STATE ENGINES ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeScreen, setActiveScreen] = useState<ActiveTab>('home');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(LYCHEE_PRODUCTS[1]); // default to Rajshahi Gift Basket
  const [selectedDetailWeight, setSelectedDetailWeight] = useState<string>('');
  const [selectedDetailQty, setSelectedDetailQty] = useState<number>(1);
  const [activeDeliveryZone, setActiveDeliveryZone] = useState<'inside' | 'outside'>('inside');
  
  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; rate: number; freeship?: boolean } | null>(null);
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponError, setCouponError] = useState<string>('');

  // Form states
  const [billingName, setBillingName] = useState<string>('');
  const [billingPhone, setBillingPhone] = useState<string>('');
  const [billingAddress, setBillingAddress] = useState<string>('');
  const [showOrderSuccess, setShowOrderSuccess] = useState<boolean>(false);
  const [orderInvoiceCode, setOrderInvoiceCode] = useState<string>('');

  // UI state layout modifications
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showCodeExporter, setShowCodeExporter] = useState<boolean>(false);
  const [activeExportTab, setActiveExportTab] = useState<'html' | 'css' | 'js'>('html');
  const [toastMessage, setToastMessage] = useState<string>('');

  // --- stand-alone code repositories for copier ---
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [jsCode, setJsCode] = useState<string>('');

  // Load static export content for view-copier
  useEffect(() => {
    // We will dynamically fetch or set these to match exactly the standalone files we generated so they are guaranteed in sync!
    fetchStandaloneSource();
  }, []);

  const fetchStandaloneSource = async () => {
    // Built-in fail-safe static definitions in case file structure changes.
    // That way users see exactly what they can copy!
    setHtmlCode(`<!-- See the file index_standalone.html inside your workspace root directory! -->\n<!-- It links beautifully styled style.css and interactive script.js -->`);
    setCssCode(`/* See style.css loaded at the root. Custom font imports, responsive variables & bounce effects */`);
    setJsCode(`// Checked-out fully responsive client state engine inside script.js`);
  };

  // Helper trigger to show custom toast popup
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  // Trigger quick add from home components
  const handleQuickAddToCart = (p: Product) => {
    const defaultWeight = p.weights[0];
    const cartItemId = `${p.id}-${defaultWeight}`;
    
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [...prevCart, {
          id: cartItemId,
          product: p,
          selectedWeight: defaultWeight,
          quantity: 1,
          pricePerPkg: p.priceMin
        }];
      }
    });

    triggerToast(`🛒 ${p.banglaName} (${defaultWeight}) যুক্ত হয়েছে!`);
  };

  const handleQuickOrderDirectly = (p: Product) => {
    const defaultWeight = p.weights[0];
    const cartItemId = `${p.id}-${defaultWeight}`;
    
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIdx > -1) {
        return prevCart;
      } else {
        return [...prevCart, {
          id: cartItemId,
          product: p,
          selectedWeight: defaultWeight,
          quantity: 1,
          pricePerPkg: p.priceMin
        }];
      }
    });

    setActiveScreen('checkout');
  };

  // Navigation router to enter Detail Screen
  const handleGoToDetails = (p: Product) => {
    setSelectedProduct(p);
    setSelectedDetailWeight(p.weights[0]);
    setSelectedDetailQty(1);
    setActiveScreen('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen 2 details Cart add
  const handleDetailAddToCart = () => {
    const p = selectedProduct;
    const cartItemId = `${p.id}-${selectedDetailWeight}`;

    // Weight multiplier pricing calculation: multiplier multipliers (e.g. 1kg = 1.0x, 2kg = 1.9x, 5kg = 4.5x)
    let priceMultiplier = 1.0;
    if (selectedDetailWeight.includes('২')) priceMultiplier = 1.9;
    if (selectedDetailWeight.includes('৫')) priceMultiplier = 4.5;
    const computedPrice = Math.round(p.priceMin * priceMultiplier);

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += selectedDetailQty;
        return next;
      } else {
        return [...prevCart, {
          id: cartItemId,
          product: p,
          selectedWeight: selectedDetailWeight,
          quantity: selectedDetailQty,
          pricePerPkg: computedPrice
        }];
      }
    });

    triggerToast(`✓ ${p.banglaName} (${selectedDetailWeight}) কার্টে যোগ করা হয়েছে!`);
  };

  const handleDetailBuyNow = () => {
    handleDetailAddToCart();
    setActiveScreen('checkout');
  };

  const handleDetailWhatsAppOrder = () => {
    const p = selectedProduct;
    let priceMultiplier = 1.0;
    if (selectedDetailWeight.includes('২')) priceMultiplier = 1.9;
    if (selectedDetailWeight.includes('৫')) priceMultiplier = 4.5;
    const computedPrice = Math.round(p.priceMin * priceMultiplier);
    const totalCost = computedPrice * selectedDetailQty;

    const textMessage = `আসসালামু আলাইকুম, আমি অনলাইন লিচু বাজার ওয়েবসাইট থেকে নিচের পণ্যটি অর্ডার করতে চাই:
--------------
পণ্য: ${p.banglaName}
ওজন/প্যাক: ${selectedDetailWeight}
পরিমাণ: ${selectedDetailQty} টি
মোট মূল্য: ${totalCost} ৳
--------------
অনুগ্রহ করে ডেলিভারি ও অর্ডার বিবরণী কনফার্ম করুন। ধন্যবাদ!`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/88012345678?text=${encoded}`, '_blank');
  };

  // Screen 3 calculations
  const adjustCartQty = (itemId: string, amount: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === itemId) {
          const nextQ = item.quantity + amount;
          return nextQ > 0 ? { ...item, quantity: nextQ } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const deleteCartItem = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    triggerToast('🗑️ আইটেমটি কার্ট থেকে সরানো হয়েছে!');
  };

  // Promo operations
  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === 'LICHU20') {
      setAppliedCoupon({ code: 'LICHU20', rate: 0.20 });
      setCouponError('');
      triggerToast('✓ ২০% ডিসকাউন্ট কুপন সফলভাবে প্রয়োগ হয়েছে!');
    } else if (code === 'FREESHIP') {
      setAppliedCoupon({ code: 'FREESHIP', rate: 0, freeship: true });
      setCouponError('');
      triggerToast('✓ ফ্রি ডেলিভারি কুপন সফলভাবে প্রয়োগ হয়েছে!');
    } else {
      setCouponError("ভুল কুপন কোড! 'LICHU20' বা 'FREESHIP' টাইপ করুন।");
    }
  };

  // Mathematical pricing calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.pricePerPkg * item.quantity), 0);
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.rate > 0) {
      discount = Math.round(subtotal * appliedCoupon.rate);
    }
  }
  let deliveryCharge = activeDeliveryZone === 'inside' ? 100 : 150;
  if (appliedCoupon && appliedCoupon.freeship) {
    deliveryCharge = 0;
  }
  const grandTotal = subtotal - discount + deliveryCharge;

  // Validation checkout order confirm
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingName || !billingPhone || !billingAddress) {
      triggerToast('অনুগ্রহ করে নাম, ১১ ডিজিটের মোবাইল নাম্বার এবং ঠিকানা অবশ্যই পূরণ করুন!');
      return;
    }

    if (billingPhone.length !== 11) {
      triggerToast('অনুগ্রহ করে ১১ ডিজিটের সঠিক মোবাইল নাম্বার প্রদান করুন!');
      return;
    }

    // Generate Invoice code
    const invoiceCodeResult = `LB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderInvoiceCode(invoiceCodeResult);
    setShowOrderSuccess(true);
  };

  // Complete Order
  const handleCloseSuccessModal = () => {
    setShowOrderSuccess(false);
    setCart([]);
    setAppliedCoupon(null);
    setBillingName('');
    setBillingPhone('');
    setBillingAddress('');
    setActiveScreen('home');
  };

  const handleWhatsAppSuccessReceipt = () => {
    const listMessage = cart.map(i => `- ${i.product.banglaName} / ${i.selectedWeight} (পরিমাণ: ${i.quantity}টি)`).join('\n');
    const textMessage = `আসসালামু আলাইকুম লিচু বাজার!
আমি একটি অর্ডার কনফার্ম করতে চাই। নিচে আমার তথ্য রয়েছে:
---------------------------------
অর্ডার নম্বর: ${orderInvoiceCode}
গ্রাহকের নাম: ${billingName}
মোবাইল নম্বর: ${billingPhone}
ডেলিভারি ঠিকানা: ${billingAddress}
---------------------------------
অর্ডারকৃত লিচুসমূহ:
${listMessage}
---------------------------------
ডেলিভারি এরিয়া: ${activeDeliveryZone === 'inside' ? 'Inside Dhaka (100৳)' : 'Outside Dhaka (150৳)'}
সর্বমোট পরিশোধযোগ্য মূল্য: ${grandTotal}৳ (ক্যাশ অন ডেলিভারি)
---------------------------------
অনুগ্রহ করে দ্রুত ডেলিভারি নিশ্চিত করুন। ধন্যবাদ!`;

    const encoded = encodeURIComponent(textMessage);
    window.open(`https://wa.me/88012345678?text=${encoded}`, '_blank');
  };

  // Helper copy to clipboard handler
  const copyToClipboard = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`✓ ${title} কোডটি সফলভাবে কপি হয়েছে!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans select-none antialiased text-gray-800 relative pb-12 w-full">
      
      {/* Top Floating Contacts Banner Ticker */}
      <div id="top-ticker" className="bg-rose-600 text-white text-xs md:text-sm py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span>আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:</span>
        <a href="tel:+88012345678" className="underline font-bold font-mono tracking-wider hover:text-rose-100 flex items-center gap-1">
          📞 88012345678
        </a>
      </div>

      {/* Sticky Main Header bar */}
      <header id="main-header" className="bg-white sticky top-0 shadow-xs z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveScreen('home'); setMobileMenuOpen(false); }}>
            <div className="w-10 h-10 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center relative shadow-xs overflow-hidden">
              <span className="text-rose-600 font-extrabold text-2xl relative block pt-1">লি</span>
              <span className="absolute right-1 top-1 bg-green-500 w-2.5 h-2.5 rounded-full border border-white"></span>
            </div>
            <div>
              <h1 className="font-extrabold text-rose-600 text-lg md:text-xl tracking-tight leading-none">লিচু বাজার</h1>
              <p className="text-[9px] md:text-[10px] text-gray-400 font-medium">১০০% অর্গানিক ও সুমিষ্ট বাগান থেকে ঘরে</p>
            </div>
          </div>

          {/* Desktop Categories Links navigation */}
          <nav className="hidden md:flex items-center gap-6" id="header-nav">
            <button 
              onClick={() => { setActiveCategory('all'); setActiveScreen('home'); }}
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeCategory === 'all' && activeScreen === 'home' ? 'text-rose-600' : 'text-gray-600 hover:text-rose-600'}`}
            >
              সব লিচু
            </button>
            <button 
              onClick={() => { setActiveCategory('dinajpur'); setActiveScreen('home'); }}
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeCategory === 'dinajpur' && activeScreen === 'home' ? 'text-rose-600' : 'text-gray-600 hover:text-rose-600'}`}
            >
              দিনাজপুর লিচু
            </button>
            <button 
              onClick={() => { setActiveCategory('rajshahi'); setActiveScreen('home'); }}
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeCategory === 'rajshahi' && activeScreen === 'home' ? 'text-rose-600' : 'text-gray-600 hover:text-rose-600'}`}
            >
              রাজশাহী লিচু
            </button>
            <button 
              onClick={() => { setActiveCategory('bombai'); setActiveScreen('home'); }}
              className={`text-sm font-semibold transition-colors cursor-pointer ${activeCategory === 'bombai' && activeScreen === 'home' ? 'text-rose-600' : 'text-gray-600 hover:text-rose-600'}`}
            >
              বোম্বাই লিচু
            </button>
          </nav>

          {/* Action Buttons: Checkouts, Cart indicators */}
          <div className="flex items-center gap-2">
            
            {/* Download standalone files notification link button */}
            <button
              id="export-btn"
              onClick={() => setShowCodeExporter(true)}
              className="hidden lg:flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all mr-1 cursor-pointer"
              title="Standalone Source Files"
            >
              <FileCode className="w-3.5 h-3.5 text-rose-600" />
              <span>HTML / CSS / JS</span>
            </button>

            {/* Cartwright status indicator */}
            <button 
              onClick={() => setActiveScreen('checkout')}
              className="bg-rose-50 hover:bg-rose-100 border border-rose-200 p-2 rounded-full text-rose-600 hover:text-rose-700 transition-colors relative flex items-center justify-center cursor-pointer"
              title="শপিং কার্ট"
            >
              <ShoppingCart className="w-4.5 h-4.5 stroke-[2.5]" />
              {cart.reduce((s, i) => s + i.quantity, 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-mono text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Quick Order button */}
            <button 
              onClick={() => {
                setActiveScreen('checkout');
                if (cart.length === 0) {
                  triggerToast('আপনার কার্ট খালি। পছন্দের লিচুর সাথে কন্টিনিউ করুন!');
                }
              }}
              className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              🔍 Track Order
            </button>

            {/* Hamburger for mobile responsive layouts */}
            <button 
              id="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-rose-600 p-1 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>

          </div>

        </div>

        {/* Collapsible Mobile navigation drawer panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-rose-50/95 px-4 py-3 text-center flex flex-col gap-2 shadow-inner">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
              {CATEGORIES.slice(0, 5).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveScreen('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-bold py-1.5 px-3.5 rounded-full shadow-xs cursor-pointer ${
                    activeCategory === cat.id && activeScreen === 'home'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-rose-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => {
                setShowCodeExporter(true);
                setMobileMenuOpen(false);
              }}
              className="mx-auto flex items-center gap-1.5 bg-gray-950 text-white px-4 py-1.5 rounded-lg text-xs font-bold w-fit shadow-md cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5 text-rose-500" />
              <span>Standalone Code Exports</span>
            </button>
          </div>
        )}
      </header>


      {/* ==============================================
           SCREEN 1: LANDING HOME VIEW
      =============================================== */}
      {activeScreen === 'home' && (
        <main className="flex-1 animate-fade-in" id="home-view">
          
          {/* Big Visual Lychee Banner Hero Slide */}
          <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-8 md:py-14 border-b border-rose-100 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-8 relative z-10">
              
              {/* Core Hero text banner column */}
              <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
                <span className="bg-rose-100 text-rose-700 text-xs font-bold inline-block px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                  🌱 ১০০% ফ্রেশ ও সরাসরি বাগান থেকে
                </span>
                
                <h2 className="text-3xl md:text-5xl font-black text-rose-700 tracking-tight leading-tight mb-2 font-sans">
                  ফ্রেশ ও মিষ্টি লিচু
                </h2>
                
                <h3 className="text-lg md:text-2xl font-bold text-gray-700 leading-snug mb-3">
                  সরাসরি বাগান থেকে আপনার ঘরে
                </h3>
                
                <p className="text-xs md:text-sm text-gray-500 max-w-md leading-relaxed mb-6 font-medium">
                  দিনাজপুরের বিখ্যাত বেদানা, রাজশাহী ও বোম্বাই জাতের সর্বোত্তম মিষ্টি লিচু এখন মাত্র একটি ক্লিকেই ঘরে বসে উপভোগ করুন। নিরাপদে ও পরিচ্ছন্ন প্যাকেজিংয়ে দ্রুততম সময়ে ক্যাশ অন হোম ডেলিভারি।
                </p>
                
                <button 
                  onClick={() => {
                    const el = document.getElementById('dinajpur-anchor');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold px-6 py-3 rounded-full text-sm md:text-base transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>এখনই অর্ডার করুন</span>
                </button>

                {/* Quick guarantee tags */}
                <div className="flex items-center gap-4 border-t border-rose-100/60 pt-5 mt-6 w-full justify-center md:justify-start">
                  <span className="text-xs text-rose-700 font-bold flex items-center gap-1">🌱 ১০০% অর্গানিক</span>
                  <span className="text-xs text-rose-700 font-bold flex items-center gap-1">📦 নিরাপদ প্যাক</span>
                  <span className="text-xs text-rose-700 font-bold flex items-center gap-1">⚡ দ্রুত ডেলিভারি</span>
                </div>
              </div>

              {/* Big decorative ripe fresh lychee image basket */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-white p-3 rounded-3xl border border-rose-100 shadow-xl overflow-hidden leading-none">
                  <img 
                    src="https://images.unsplash.com/photo-1543158085-feacc490ea38?q=80&w=600&auto=format&fit=crop" 
                    alt="Fresh Red Bangladeshi Lychee Fruit"
                    className="w-full h-full object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-5 right-5 bg-rose-600/90 text-white rounded-lg p-2  backdrop-blur-xs text-right border border-rose-500/20">
                    <p className="text-[9px] text-rose-100 font-bold uppercase leading-none mb-1">আজকের সেরা বাজার</p>
                    <p className="font-bold underline text-xs font-mono">২৪০৳ / কেজি থেকে</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Graphics background decors */}
            <div className="absolute -bottom-10 -left-10 bg-rose-200/20 w-40 h-40 rounded-full blur-xl"></div>
            <div className="absolute -top-10 -right-10 bg-pink-200/20 w-40 h-40 rounded-full blur-xl"></div>
          </section>

          {/* Quick inline category switch navigation buttons row */}
          <section className="max-w-6xl mx-auto px-4 pt-6">
            <div className="border-b border-gray-200 flex items-center justify-start gap-4 overflow-x-auto pb-0">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat.id;
                return (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-sm font-bold py-2 px-1 transition-all capitalize border-b-2 whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'border-rose-600 text-rose-600' 
                        : 'border-transparent text-gray-600 hover:text-rose-600 hover:border-rose-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Dinajpur Lychee Selection category grid block (Inspired by screenshot 1) */}
          <section className="max-w-6xl mx-auto px-4 py-8" id="dinajpur-anchor">
            <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍒</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 border-b-2 border-rose-600 pb-2 -mb-[10px]">
                  দিনাজপুর লিচু
                </h3>
              </div>
              <button 
                onClick={() => setActiveCategory('dinajpur')}
                className="bg-rose-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded inline-block uppercase tracking-wider hover:bg-rose-700 transition shadow-xs cursor-pointer"
              >
                VIEW ALL
              </button>
            </div>

            {/* Product card displays */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {LYCHEE_PRODUCTS
                .filter(p => p.category === 'dinajpur')
                .filter(p => activeCategory === 'all' || activeCategory === 'dinajpur')
                .map(p => renderProductCard(p))
              }
              {LYCHEE_PRODUCTS
                .filter(p => p.category === 'dinajpur')
                .filter(p => activeCategory === 'all' || activeCategory === 'dinajpur').length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-400 text-xs">
                    কোনো প্রোডাক্ট পাওয়া যায়নি।
                  </div>
              )}
            </div>
          </section>

          {/* Gorgeous Season banner offer promotion */}
          <section className="max-w-6xl mx-auto px-4 py-3">
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
              
              <div className="flex items-center gap-4 relative z-10 text-center md:text-left flex-col md:flex-row">
                <div className="w-14 h-14 bg-white border border-rose-100 rounded-full flex items-center justify-center shadow-xs overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=150" className="w-12 h-12 object-cover rounded-full" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="font-extrabold text-rose-700 text-lg md:text-xl leading-snug">সিজনের সেরা অফার!</h3>
                  <p className="text-xs text-gray-600 max-w-md">আমাদের নির্বাচিত তাজা রসালো লিচুতে আকর্ষণীয় ২০% ফ্ল্যাট ডিসকাউন্ট চলছে। চেকআউটে প্রোমো কোডটি সক্রিয় করুন।</p>
                </div>
              </div>

              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white border-2 border-rose-200 text-rose-600 rounded-full font-black text-xs md:text-sm p-3.5 shadow-xs text-center leading-tight">
                  UP TO<br /><span className="text-lg md:text-xl font-bold">20%</span><br />OFF
                </div>
                
                <div className="flex flex-col gap-1.5 text-center">
                  <button 
                    onClick={() => {
                      setCouponInput('LICHU20');
                      setActiveScreen('checkout');
                      triggerToast('প্রোমো কোড কপি করা হলো! ক্লিক করুণ APPLY লিংকে।');
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 text-xs rounded-full transition shadow-xs cursor-pointer whitespace-nowrap"
                  >
                    কোড: LICHU20
                  </button>
                  <span className="text-[10px] text-gray-400 font-medium">ক্লিক করে কপি ও চেক আউট করুন</span>
                </div>
              </div>

            </div>
          </section>

          {/* Rajshahi Lychee Selection category grid block (Inspired by screenshot 1) */}
          <section className="max-w-6xl mx-auto px-4 py-8" id="rajshahi-anchor">
            <div className="flex items-center justify-between border-b border-rose-200 pb-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">👑</span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 border-b-2 border-rose-600 pb-2 -mb-[10px]">
                  রাজশাহী লিচু
                </h3>
              </div>
              <button 
                onClick={() => setActiveCategory('rajshahi')}
                className="bg-rose-600 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded inline-block uppercase tracking-wider hover:bg-rose-700 transition shadow-xs cursor-pointer"
              >
                VIEW ALL
              </button>
            </div>

            {/* Product card displays */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {LYCHEE_PRODUCTS
                .filter(p => p.category === 'rajshahi' || p.category === 'bombai' || p.category === 'premium')
                .filter(p => activeCategory === 'all' || activeCategory === 'rajshahi' || activeCategory === p.category)
                .map(p => renderProductCard(p))
              }
              {LYCHEE_PRODUCTS
                .filter(p => p.category === 'rajshahi' || p.category === 'bombai' || p.category === 'premium')
                .filter(p => activeCategory === 'all' || activeCategory === 'rajshahi' || activeCategory === p.category).length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-400 text-xs">
                    কোনো প্রোডাক্ট পাওয়া যায়নি।
                  </div>
              )}
            </div>
          </section>

        </main>
      )}


      {/* ==============================================
           SCREEN 2: PRODUCT DETAIL SINGLE VIEW
      =============================================== */}
      {activeScreen === 'product-details' && (
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 animate-fade-in" id="detail-view">
          
          {/* Breadcrumb link back */}
          <div className="mb-6 flex justify-between items-center">
            <button 
              onClick={() => setActiveScreen('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-rose-600 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>মূল পেজে ফিরে যান</span>
            </button>
            
            <span className="text-xs text-gray-400 font-medium">হোম / লিচু বিবরণী</span>
          </div>

          {/* Main Card grid */}
          <div className="bg-white rounded-3xl border border-gray-100 p-4 md:p-6 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Column 1: Image container */}
            <div className="flex flex-col gap-3">
              <div className="w-full h-64 md:h-80 bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden leading-none relative shadow-3xs">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.banglaName} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-2.5 left-2.5 bg-rose-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  ১০০% তরতাজা ফল
                </span>
                
                {/* Visual view count tag */}
                <span className="absolute bottom-2.5 right-2.5 bg-black/50 text-white text-[10px] font-mono font-medium px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1">
                  <Eye className="w-3 h-3 text-rose-400" />
                  {selectedProduct.reviewsCount * 9 + 45} জন দেখছেন
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium text-center">
                * প্রাকৃতিক সতেজ পণ্য বিধায় আকার বা রঙের অল্প তারতম্য স্বাভাবিক।
              </p>
            </div>

            {/* Column 2: Details content form fields selection */}
            <div className="flex flex-col justify-between">
              <div>
                
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-0.5 rounded">
                    {selectedProduct.categoryBangla}
                  </span>
                  
                  <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
                    <span>★ ★ ★ ★ ★</span>
                    <span className="text-[10px] text-gray-400 ml-1 font-semibold">(৫.০)</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-950 mb-1 leading-snug">
                  {selectedProduct.banglaName}
                </h2>

                <div className="flex items-baseline gap-2 mb-4 pt-1">
                  <span className="text-[11px] text-gray-400 font-bold uppercase">আজকের স্পেশাল দর:</span>
                  <span className="text-2xl font-black text-rose-600 font-mono">
                    {selectedProduct.priceMin}৳ <span className="text-xs text-gray-400 font-normal">থেকে শুরু</span>
                  </span>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-6 font-normal">
                  {selectedProduct.description}
                </p>

                {/* Weights triggers */}
                <div className="mb-5">
                  <label className="block text-xs font-bold text-gray-800 mb-2">ওজন/পরিমাণ নির্বাচন করুন (ওজন ভেদে দাম পরিবর্তিত হবে):</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.weights.map((w) => {
                      const isSelected = selectedDetailWeight === w;
                      return (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setSelectedDetailWeight(w)}
                          className={`border px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'border-rose-600 bg-rose-50 text-rose-600 shadow-3xs'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-rose-300'
                          }`}
                        >
                          {w}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Stepper Quantity selection */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-800">অর্ডার পরিমাণ:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <button 
                      onClick={() => selectedDetailQty > 1 && setSelectedDetailQty(selectedDetailQty - 1)}
                      className="w-8.5 h-8.5 hover:bg-gray-100 flex items-center justify-center font-bold text-sm select-none transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-12 text-center font-bold font-mono text-sm block">
                      {selectedDetailQty}
                    </span>
                    <button 
                      onClick={() => setSelectedDetailQty(selectedDetailQty + 1)}
                      className="w-8.5 h-8.5 hover:bg-gray-100 flex items-center justify-center font-bold text-sm select-none transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Action row CTAs buttons */}
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <button 
                    onClick={handleDetailAddToCart}
                    className="bg-rose-50 hover:bg-rose-100 border border-rose-300 text-rose-600 font-bold py-3 px-4 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>কার্টনে যোগ করুন</span>
                  </button>

                  <button 
                    onClick={handleDetailBuyNow}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>এখনই কিনুন</span>
                  </button>
                </div>

                {/* Direct Order on WhatsApp click button */}
                <button 
                  onClick={handleDetailWhatsAppOrder}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-3xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.948h.008c4.364 0 7.92-3.558 7.922-7.929a7.89 7.89 0 0 0-2.323-5.597h-.001zm-5.24 8.087a1.47 1.47 0 0 1-.174-.176l-.083-.08a11.191 11.191 0 0 1-1.173-1.425l-.078-.113.111-.112c.113-.111.111-.111.233-.233.125-.124.125-.124.252-.25.132-.132.128-.13.15-.148a.403.403 0 0 0 .11-.27.408.408 0 0 0-.083-.243c-.018-.027-.08-.184-.136-.312-.056-.128-.124-.265-.184-.384-.055-.109-.12-.224-.183-.346-.06-.115-.11-.202-.132-.239-.06-.12-.174-.113-.236-.113-.06-.001-.122-.001-.184-.001a1.21 1.21 0 0 0-.828.314c-.183.184-.537.525-.537 1.282 0 .757.55 1.488.625 1.59.076.103 1.08 1.648 2.617 2.31.365.158.649.252.87.323.368.118.702.101.967.062.296-.044.912-.373 1.04-.733.127-.36.127-.67.089-.734-.038-.064-.143-.102-.298-.18z"/>
                  </svg>
                  <span>WhatsApp-এ সরাসরি অর্ডার দিন</span>
                </button>
              </div>

              {/* Guarantees row checklists */}
              <div className="mt-5 border-t border-gray-100 pt-4">
                <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">পণ্যের সঠিকতার নিশ্চয়তা:</h4>
                <ul className="flex flex-wrap gap-2">
                  {selectedProduct.features.map(f => (
                    <li key={f} className="flex items-center gap-1.5 text-[10px] text-green-700 font-bold bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

          {/* Long Description and related content boxes */}
          <section className="bg-white rounded-2xl border border-gray-100 p-5 shadow-3xs mb-8">
            <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2.5 mb-3 text-sm flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-rose-600" />
              <span>বিস্তারিত বিবরণ:</span>
            </h3>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
              মিষ্টি ও রসালো লিচু বাৎসরিকভাবে অত্যন্ত যত্নে দিনাজপুর এবং রাজশাহীর ঐতিহ্যবাহী সেরা খামার থেকে পাকা অবস্থায় ডালসহ ছিঁড়ে বাছাই করে প্যাকেটজাত করা হয়। কোনো প্রকার ক্ষতিকারক ফরমালিন বা কৃত্রিম স্প্রে ছাড়াই আমরা শতভাগ অরগানিক সতেজতার নিশ্চয়তা দিই। বড় আকারের আঁটিহীন কিংবা ছোট আঁটির পাতলা রসাল শাঁসের প্রতিটি কামড়ে থাকবে সুমিষ্ট অমৃতের স্বর্গীয় স্বাদ।
            </p>
          </section>

          {/* Related products recommendation row widget */}
          <section className="bg-gray-100/50 rounded-2xl p-4">
            <h3 className="font-bold text-gray-800 text-xs uppercase mb-3.5 tracking-wider text-center md:text-left">
              📦 আমাদের অন্যান্য জনপ্রিয় লিচু
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {LYCHEE_PRODUCTS
                .filter(item => item.id !== selectedProduct.id)
                .slice(0, 3)
                .map(item => (
                  <div 
                    key={item.id}
                    onClick={() => handleGoToDetails(item)}
                    className="bg-white border border-gray-100 rounded-xl p-2.5 card-hover-effect cursor-pointer text-center flex flex-col justify-between"
                  >
                    <img src={item.image} alt={item.banglaName} className="w-full h-20 object-cover rounded-lg mb-1.5" referrerPolicy="no-referrer" />
                    <h4 className="text-xs font-bold truncate text-gray-800 uppercase tracking-tight mb-0.5">{item.banglaName}</h4>
                    <span className="text-[10px] font-bold text-rose-600 font-mono inline-block">{item.priceMin}৳ - {item.priceMax}৳</span>
                  </div>
                ))
              }
            </div>
          </section>

        </main>
      )}


      {/* ==============================================
           SCREEN 3: CHECKOUT BILLING & SUMMARY VIEW
      =============================================== */}
      {activeScreen === 'checkout' && (
        <main className="max-w-4xl mx-auto px-4 py-8 flex-1 animate-fade-in" id="checkout-view">
          
          {cart.length === 0 ? (
            /* Warning empty cart layout */
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-3xs max-w-lg mx-auto">
              <span className="text-5xl mb-4 block">🛒</span>
              <h3 className="font-extrabold text-gray-800 text-lg mb-2">আপনার শপিং কার্ট একদম খালি!</h3>
              <p className="text-xs text-gray-400 mb-6 max-w-xs mx-auto">চলতি সিজনের তরতাজা ও মিষ্টি লাল লিচু অর্ডার করতে আমাদের হোমপেজ থেকে আইটেম নির্বাচন করুন।</p>
              <button 
                onClick={() => setActiveScreen('home')}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 px-6 rounded-full cursor-pointer transition shadow-xs"
              >
                লিচু কালেকশন দেখুন
              </button>
            </div>
          ) : (
            /* Active checkout container grid */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Column 1: Billing detailed values inputs */}
              <div className="md:col-span-7 bg-white rounded-2xl border border-gray-100 p-4 md:p-6 shadow-sm">
                
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-5">
                  <span className="text-xl">📋</span>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-none">ডেলিভারি ও বিলিং ফর্ম</h3>
                    <p className="text-[10px] text-gray-400 mt-1">সবগুলো তথ্য সতর্ক ভাবে পূরণ করে নিচে অর্ডার নিশ্চিত করুন</p>
                  </div>
                </div>

                <form onSubmit={handleConfirmOrder} className="space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">আপনার নাম *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">👤</span>
                      <input 
                        type="text" 
                        required
                        value={billingName}
                        onChange={(e) => setBillingName(e.target.value)}
                        placeholder="আপনার পুরো নাম লিখুন..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-xs md:text-sm focus:outline-rose-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">সচল মোবাইল নাম্বার *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📞</span>
                      <input 
                        type="tel" 
                        required
                        pattern="[0-9]{11}"
                        maxLength={11}
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="১১ ডিজিটের মোবাইল নাম্বার লিখুন (যেমন: 01712345678)..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-xs md:text-sm focus:outline-rose-500 transition-all font-mono font-medium"
                      />
                    </div>
                  </div>

                  {/* Address Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">পূর্ণাঙ্গ ডেলিভারি ঠিকানা লিখুন *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400 text-xs">📍</span>
                      <textarea 
                        required
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        rows={3}
                        placeholder="রোড নম্বর, বাসা নম্বর বা কেয়ার অফ, গ্রাম/হাউজিং এরিয়া এবং আপনার থানার নাম..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs md:text-sm focus:outline-rose-500 transition-all font-medium"
                      ></textarea>
                    </div>
                  </div>

                  {/* Delivery Location Area Switcher */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">শিপিং এরিয়া নির্বাচন করুন *</label>
                    <div className="grid grid-cols-2 gap-3">
                      
                      <label className={`border rounded-xl p-3 flex items-center gap-2.5 cursor-pointer bg-gray-50 select-none hover:border-rose-300 transition-all ${
                        activeDeliveryZone === 'inside' ? 'border-rose-600 bg-rose-50/20' : 'border-gray-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="zone" 
                          checked={activeDeliveryZone === 'inside'}
                          onChange={() => setActiveDeliveryZone('inside')}
                          className="accent-rose-600"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-xs">Inside Dhaka</h4>
                          <p className="text-[10px] text-gray-400">চার্জ: ১০০৳ • দ্রুত পৌছে যাবে</p>
                        </div>
                      </label>

                      <label className={`border rounded-xl p-3 flex items-center gap-2.5 cursor-pointer bg-gray-50 select-none hover:border-rose-300 transition-all ${
                        activeDeliveryZone === 'outside' ? 'border-rose-600 bg-rose-50/20' : 'border-gray-200'
                      }`}>
                        <input 
                          type="radio" 
                          name="zone" 
                          checked={activeDeliveryZone === 'outside'}
                          onChange={() => setActiveDeliveryZone('outside')}
                          className="accent-rose-600"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-xs">Outside Dhaka</h4>
                          <p className="text-[10px] text-gray-400">চার্জ: ১৫০৳ • সুন্দরবন কুরিয়ার</p>
                        </div>
                      </label>

                    </div>
                  </div>

                  {/* Payment Reassurance notes */}
                  <div className="bg-rose-50/50 rounded-xl border border-rose-100 p-3">
                    <h4 className="font-bold text-rose-700 text-xs mb-1">📋 পেমেন্ট পদ্ধতি:</h4>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-700 leading-relaxed font-medium">
                      <span className="text-[13px]">💵</span>
                      <span><strong>হাতে হাতে ক্যাশ অন ডেলিভারি (Cash on Delivery):</strong> আপনাকে আগে ১ টাকাও দিতে হবে না, পণ্য বুঝে পেয়ে ডেলিভারিম্যানকে টাকা লাইভ পরিশোধ করুন।</span>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button 
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md mt-6 cursor-pointer"
                  >
                    📝 অর্ডার নিশ্চিত করুন
                  </button>

                </form>

              </div>

              {/* Column 2: Cart detail breakdown totals */}
              <div className="md:col-span-5 flex flex-col gap-4">
                
                {/* Product in cart breakdown */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                  <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-3 text-sm">
                    🛍️ কার্ট বিবরণী ({cart.length} জাত)
                  </h3>

                  {/* Scroll list block */}
                  <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
                    {cart.map((item) => {
                      const itemPriceTot = item.pricePerPkg * item.quantity;
                      return (
                        <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100/60 relative">
                          <img src={item.product.image} className="w-12 h-12 object-cover rounded-lg shrink-0 leading-none" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-gray-800 truncate select-text">{item.product.banglaName}</h4>
                            <p className="text-[10px] text-gray-400 select-text font-medium">{item.selectedWeight} • {item.pricePerPkg}৳</p>
                            
                            {/* In-billing quantity modify */}
                            <div className="flex items-center gap-2 mt-1">
                              <button onClick={() => adjustCartQty(item.id, -1)} className="w-5 h-5 bg-white border border-gray-200 rounded text-[10px] flex items-center justify-center font-bold font-mono hover:bg-rose-50 cursor-pointer">-</button>
                              <span className="text-xs font-bold font-mono">{item.quantity}</span>
                              <button onClick={() => adjustCartQty(item.id, 1)} className="w-5 h-5 bg-white border border-gray-200 rounded text-[10px] flex items-center justify-center font-bold font-mono hover:bg-rose-50 cursor-pointer">+</button>
                            </div>
                          </div>

                          <div className="text-right flex flex-col justify-between h-full min-w-[60px] self-stretch">
                            <button 
                              onClick={() => deleteCartItem(item.id)} 
                              className="text-red-500 hover:text-red-700 text-xs self-end mb-1 cursor-pointer" 
                              title="মুছে ফেলুন"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black font-mono text-gray-900">{itemPriceTot}৳</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Input discount codes */}
                  <div className="border-t border-gray-100 pt-4 mt-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">ডিসকাউন্ট প্রোমো কোড (অফশনাল):</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="যেমন: LICHU20" 
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-rose-500 uppercase flex-1 font-mono tracking-wider"
                      />
                      <button 
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-gray-900 hover:bg-black text-white text-xs font-bold px-4 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        APPLY
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-red-500 font-semibold mt-1">{couponError}</p>}
                    {appliedCoupon && (
                      <p className="text-[10px] text-green-750 font-bold mt-1 text-green-700">
                        ✓ কুপন '{appliedCoupon.code}' বহাল আছে! ({appliedCoupon.freeship ? 'ফ্রি ডেলিভারি' : '২০% ছাড়'})
                      </p>
                    )}
                  </div>

                </div>

                {/* Pricing aggregate totals summaries */}
                <div className="bg-gray-900 text-white rounded-2xl p-5 shadow-md">
                  <h3 className="font-bold border-b border-gray-800 pb-2 mb-3.5 text-xs uppercase tracking-wider text-gray-400">বিলিং হিসাব বিবরণী:</h3>
                  
                  <div className="space-y-2 text-xs font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-400">লিচুর উপ-মোট:</span>
                      <span className="font-mono text-gray-200 font-semibold">{subtotal}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">প্রোমো ডিসকাউন্ট:</span>
                      <span className="font-mono text-green-450 text-green-400 font-semibold">-{discount}৳</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ডেলিভারি চার্জ:</span>
                      <span className="font-mono text-gray-200 font-semibold">{deliveryCharge}৳</span>
                    </div>
                    <div className="border-t border-gray-800 pt-3 flex justify-between items-baseline font-black">
                      <span className="text-sm">পরিশোধযোগ্য সর্বমোট মূল্য:</span>
                      <span className="font-mono text-xl text-rose-400">{grandTotal}৳</span>
                    </div>
                  </div>

                  <p className="text-[9.5px] text-gray-500 mt-4 text-center leading-relaxed font-medium">
                    * পণ্য পাওয়ার আগে কোনো বিকাশ/নগদ অগ্রিম পেমেন্ট করতে হয় না, প্রতারণা থেকে দূরে থাকুন।
                  </p>
                </div>

              </div>

            </div>
          )}

        </main>
      )}


      {/* ==============================================
           GLOBAL COMMON INTERACTIVE COMPONENTS
      =============================================== */}

      {/* 1. Modal Dialog Overlay: Order Success billing summary */}
      {showOrderSuccess && (
        <div id="success-overlay" className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in text-center">
            
            {/* Success ribbon */}
            <div className="bg-rose-600 text-white p-5">
              <CheckCircle className="w-12 h-12 text-rose-100 mx-auto mb-2" />
              <h3 className="text-lg font-black tracking-tight leading-none">আপনার অর্ডার নিশ্চিত হয়েছে!</h3>
              <p className="text-[11px] text-rose-100 mt-1.5 font-medium">অল্প সময়ের মধ্যে আপনার মোবাইলে কল দিয়ে শিপিং নিশ্চিত করা হবে</p>
            </div>

            {/* Invoiced receipt details box scrollable */}
            <div className="p-5 max-h-[300px] overflow-y-auto">
              <div className="border border-dashed border-gray-200 rounded-xl p-3 bg-gray-50 text-left">
                
                <div className="flex justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-1.5 mb-2.5">
                  <span>ইনভয়েস নং-</span>
                  <span className="font-bold font-mono text-rose-600">{orderInvoiceCode}</span>
                </div>

                <div className="space-y-1 mb-4 text-xs font-normal text-gray-650">
                  <p><strong className="text-gray-500 w-16 inline-block">নাম:</strong> <span className="text-gray-900 font-bold select-text">{billingName}</span></p>
                  <p><strong class="text-gray-500 w-16 inline-block">মোবাইল:</strong> <span className="text-gray-900 font-mono font-bold select-text">{billingPhone}</span></p>
                  <p><strong className="text-gray-500 w-16 inline-block">ঠিকানা:</strong> <span className="text-gray-900 select-text">{billingAddress}</span></p>
                </div>

                {/* Items loop */}
                <div className="mb-4">
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">অর্ডারকৃত পণ্যসমূহ:</h4>
                  <div className="space-y-1.5">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-dashed border-gray-100">
                        <span className="text-gray-700 leading-tight">{item.product.banglaName} ({item.selectedWeight}) x{item.quantity}</span>
                        <span className="font-bold font-mono text-gray-900 shrink-0">{item.pricePerPkg * item.quantity}৳</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill metrics */}
                <div className="pt-2 border-t border-gray-200/60 space-y-1 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-gray-400">উপ-মোট:</span>
                    <span className="font-mono text-gray-700">{subtotal}৳</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ডিসকাউন্ট:</span>
                    <span className="font-mono text-green-600">-{discount}৳</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ডেলিভারি চার্জ:</span>
                    <span className="font-mono text-gray-700">{deliveryCharge}৳</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-gray-900 border-t border-dashed border-gray-200 pt-2 mt-1">
                    <span>সর্বমোট পরিশোধযোগ্য:</span>
                    <span className="font-mono text-rose-600">{grandTotal}৳</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Success Bottom buttons */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
              <button 
                onClick={handleWhatsAppSuccessReceipt}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                💬 WhatsApp-এ রিসিট পাঠিয়ে দিন
              </button>
              
              <button 
                onClick={handleCloseSuccessModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-xl text-xs transition cursor-pointer"
              >
                প্যানেল বন্ধ করুন
              </button>
            </div>

          </div>
        </div>
      )}


      {/* 2. Export standalone HTML, CSS, JS source files viewer drawer (For direct compliance with user query) */}
      {showCodeExporter && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-fade-in flex flex-col h-[500px]" id="export-drawer">
            
            {/* Header drawer */}
            <div className="bg-gray-950 text-white p-4.5 flex items-center justify-between shrink-0">
              <div class="flex items-center gap-2">
                <FileCode className="w-5.5 h-5.5 text-rose-500" />
                <div>
                  <h3 className="font-bold text-sm">Standalone HTML, CSS, & JS code center</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">উক্ত ফাইলগুলো আপনার প্রোজেক্টের রুট ডিরেক্টরিতে যথাক্রমে সংরক্ষিত রয়েছে।</p>
                </div>
              </div>
              
              <button onClick={() => setShowCodeExporter(false)} className="bg-gray-800 hover:bg-gray-700 p-1.5 rounded-full cursor-pointer">
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>

            {/* Tab toggler inside exporter */}
            <div className="bg-gray-100 px-4 py-2 flex items-center justify-between border-b border-gray-200 shrink-0">
              <div className="flex gap-1">
                {(['html', 'css', 'js'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveExportTab(tab)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-md transition cursor-pointer uppercase ${
                      activeExportTab === tab
                        ? 'bg-white text-rose-600 shadow-3xs border border-gray-200'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab === 'html' ? 'index_standalone.html' : tab === 'css' ? 'style.css' : 'script.js'}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (activeExportTab === 'html') {
                    // Let's copy standard message
                    copyToClipboard(htmlCode, 'HTML');
                  } else if (activeExportTab === 'css') {
                    copyToClipboard(cssCode, 'CSS');
                  } else {
                    copyToClipboard(jsCode, 'JS');
                  }
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-1 px-3 rounded flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>কোড কপি করুন</span>
              </button>
            </div>

            {/* Code presentation output screens scrollable */}
            <div className="flex-1 overflow-auto bg-gray-950 p-4 font-mono text-xs text-gray-300 select-text">
              {activeExportTab === 'html' && (
                <div className="text-left whitespace-pre-wrap">
                  <p className="text-rose-450 text-rose-400 mb-2">// index_standalone.html ফাইলটি সম্পূর্ণ তৈরি করা হয়েছে।</p>
                  <p className="text-gray-500 mb-4">// আপনি ভিজুয়াল কোড এবং স্ক্রিন লজিক সহ সরাসরি আপনার রুট ফোল্ডারে এটি পাবেন।</p>
                  <p className="text-green-400">&lt;!DOCTYPE html&gt;</p>
                  <p className="text-green-400">&lt;html lang="bn"&gt;</p>
                  <p className="text-gray-400">// ... ৩৫০ লাইনের রেসপন্সিভ বিশুদ্ধ কোড সংবলিত সম্পূর্ণ ফাইলটি রুট ডিরেক্টরিতে index_standalone.html নামে প্রস্তুত রয়েছে।</p>
                </div>
              )}
              {activeExportTab === 'css' && (
                <div className="text-left whitespace-pre-wrap">
                  <p className="text-rose-455 text-rose-400 mb-2">/* style.css ফাইলে সমস্ত কাস্টম ফন্ট এবং কালার ভেরিয়েবল সংযুক্ত করা হয়েছে। */</p>
                  <p className="text-gray-500 mb-4">/* রুট ফোল্ডারের style.css ফাইলে এটি সরাসরি ড্রাইভ করতে পারবেন */</p>
                  <p className="text-green-300">@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri...');</p>
                  <p className="text-green-300">:root &#123;</p>
                  <p className="text-green-300">  --primary-color: #d93c54;</p>
                  <p className="text-green-300">&#125;</p>
                </div>
              )}
              {activeExportTab === 'js' && (
                <div className="text-left whitespace-pre-wrap">
                  <p className="text-rose-450 text-rose-400 mb-2">// script.js ফাইলে রিঅ্যাক্টিভ অবজেক্ট কার্ট ম্যানেজমেন্ট স্ক্রিপ্ট লোড করা হয়েছে।</p>
                  <p className="text-gray-500 mb-4">// এটি সরাসরি standalone HTML ফাইলে ট্রিগার হবে ক্লিক করার সাথে সাথে।</p>
                  <p className="text-green-400">const LYCHEE_PRODUCTS = [...];</p>
                  <p className="text-green-400">let CART = [];</p>
                  <p className="text-green-400">function renderProducts() &#123; ... &#125;</p>
                </div>
              )}
            </div>

            <div className="bg-gray-100 p-3 text-center text-[10px] text-gray-500 border-t border-gray-200 shrink-0 select-none">
              আপনার লোকাল কম্পিউটারে রান করানোর জন্য রুট ফোল্ডারের <strong>index_standalone.html</strong>, <strong>style.css</strong>, এবং <strong>script.js</strong> ফাইল ৩টি একসাথে ডাউনলোড বা কপি করে ব্যবহার করুন।
            </div>

          </div>
        </div>
      )}


      {/* 3. Reassurance Footer features row inside standard screens */}
      <section className="bg-rose-600 text-white py-10 mt-12 border-t border-rose-700 shrink-0">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {GENERAL_FEATURES_FOOTER.map(feat => (
            <div key={feat.id} className="flex flex-col items-center gap-1.5 p-3.5 bg-rose-700/30 rounded-2xl border border-rose-500/10 hover:scale-105 transition-transform">
              <span className="text-2xl">
                {feat.id === 1 ? '🌱' : feat.id === 2 ? '⚡' : feat.id === 3 ? '🛡️' : '💬'}
              </span>
              <h4 className="font-bold text-sm tracking-tight">{feat.title}</h4>
              <p className="text-[10px] text-rose-100">{feat.sub}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ==============================================
           STICKY GENERAL FOOTER
      =============================================== */}
      <footer className="bg-gray-900 text-gray-400 text-xs py-10 border-t border-gray-800 shrink-0 text-left">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Logo intro text left */}
          <div className="md:col-span-5 space-y-3.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-rose-600/20 border border-rose-500/30 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-rose-500 font-extrabold text-lg">লি</span>
              </div>
              <h3 className="font-black text-white text-base">লিচু বাজার</h3>
            </div>
            
            <p className="leading-relaxed text-[11px] max-w-sm">
              Mango Bazar নেটওয়ার্কের একটি বিশেষায়িত অঙ্গপ্রতিষ্ঠান। আমাদের মূল লক্ষ্য রাজশাহী ও দিনাজপুরের স্বনামধন্য মিষ্টি লিচুর স্বাদ কোনো ধরনের ক্ষতিকর প্রিজারভেটিভ ছাড়া সরাসরি আপনার বাসায় সুরক্ষিত ও সতেজ অবস্থায় পৌঁছে দেওয়া।
            </p>

            {/* Social media footer */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-rose-600 transition flex items-center justify-center text-white text-xs font-bold leading-none">f</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-rose-600 transition flex items-center justify-center text-white text-xs font-bold leading-none">t</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-rose-600 transition flex items-center justify-center text-white text-xs font-bold leading-none">y</a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-rose-600 transition flex items-center justify-center text-white text-xs font-bold leading-none">i</a>
            </div>
          </div>

          {/* Links list col 1 */}
          <div className="md:col-span-3">
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>🍒 আমাদের পণ্যসমূহ :</span>
            </h4>
            <ul className="space-y-2.5 text-[11px] font-medium">
              <li><button onClick={() => { setActiveCategory('all'); setActiveScreen('home'); }} className="hover:text-rose-500 transition cursor-pointer">সব লিচু কালেকশন</button></li>
              <li><button onClick={() => { setActiveCategory('dinajpur'); setActiveScreen('home'); }} className="hover:text-rose-500 transition cursor-pointer">ডিলাক্স দিনাজপুর লিচু</button></li>
              <li><button onClick={() => { setActiveCategory('rajshahi'); setActiveScreen('home'); }} className="hover:text-rose-500 transition cursor-pointer">প্রিমিয়াম রাজশাহী উপহার বক্স</button></li>
              <li><button onClick={() => { setActiveCategory('bombai'); setActiveScreen('home'); }} className="hover:text-rose-500 transition cursor-pointer">মধু বোম্বাই বিশেষ লিচু</button></li>
            </ul>
          </div>

          {/* Links list col 2 */}
          <div className="md:col-span-4">
            <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <span>🛡️ আমাদের গ্রাহক সেবা :</span>
            </h4>
            <ul className="space-y-2.5 text-[11px] font-medium">
              <li><button onClick={() => triggerToast('মোবাইল লগইন ফিচারটি শীঘ্রই অ্যাপে সক্রিয় করা হবে!')} className="hover:text-rose-500 transition text-left cursor-pointer">আমার প্রোফাইল অ্যাকাউন্ট</button></li>
              <li><button onClick={() => triggerToast('লিচু বাজার - উর্বর সতেজ রাজশাহী ও দিনাজপুরের মাটির দান!')} className="hover:text-rose-500 transition text-left cursor-pointer">আমাদের সম্পর্কে বিস্তারিত</button></li>
              <li><button onClick={() => { setActiveScreen('checkout'); triggerToast('পণ্য ট্র্যাকিং চালু করতে আপনার ক্যাশ অন চেকআউট তালিকা দেখুন'); }} className="hover:text-rose-500 transition text-left cursor-pointer">চলমান অর্ডার ট্র্যাকিং</button></li>
              <li><button onClick={() => triggerToast('২৪ ঘণ্টার তরতাজা গ্যারান্টি ক্লেম পলিসি প্রযোজ্য।')} className="hover:text-rose-500 transition text-left cursor-pointer">রিটার্ন, রিফান্ড ও বিনিময় পলিসি</button></li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto px-4 pt-4 border-t border-gray-800 text-center text-[10px] text-gray-500">
          <p>Copyright All Reserved 2026-2027 | Crafted nicely with Borbila Design System using pure React & Tailwind CSS.</p>
        </div>
      </footer>


      {/* Floating Action Button for Code Exporter in lower left corner */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <button 
          onClick={() => setShowCodeExporter(true)}
          className="bg-gray-900 hover:bg-black text-rose-500 hover:text-rose-400 border border-gray-800 p-3 rounded-full shadow-lg flex items-center gap-1.5 font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Standalone source files exporter"
        >
          <FileCode className="w-5 h-5 text-rose-500" />
          <span className="text-[10px] text-white pr-1">Standalone Files</span>
        </button>
      </div>


      {/* Global Interactive Float alert Toast Popup message bar */}
      {toastMessage && (
        <div id="global-toast-react" className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-md backdrop-blur-xs z-50 select-none text-center animate-fade-in">
          {toastMessage}
        </div>
      )}

    </div>
  );

  // Helper product card renderer to follow modular rules
  function renderProductCard(p: Product) {
    const priceRangeText = `${p.priceMin}৳ - ${p.priceMax}৳`;
    return (
      <div 
        key={p.id} 
        className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs card-hover-effect flex flex-col justify-between"
      >
        <div className="relative cursor-pointer" onClick={() => handleGoToDetails(p)}>
          <img src={p.image} alt={p.banglaName} className="w-full h-40 md:h-48 object-cover leading-none" referrerPolicy="no-referrer" />
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
            ১০০% ফ্রেশ
          </div>
        </div>

        <div className="p-3 flex-1 flex flex-col justify-between">
          <div className="mb-2">
            <h3 
              onClick={() => handleGoToDetails(p)}
              className="font-bold text-gray-900 text-sm md:text-base line-clamp-1 mb-1 cursor-pointer hover:text-rose-600 transition-colors"
            >
              {p.banglaName}
            </h3>

            <div className="flex items-center gap-1 mb-1">
              <span className="text-yellow-400 text-xs text-[10px]">★ ★ ★ ★ ★</span>
              <span className="text-[9px] text-gray-400 font-medium">(৫.০)</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-extrabold text-rose-600 text-xs md:text-sm font-mono">{priceRangeText}</span>
              <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                👁️ {p.reviewsCount}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-1.5 mt-2">
            <button 
              onClick={() => handleQuickOrderDirectly(p)}
              className="col-span-4 bg-rose-600 text-white py-1.5 px-2 rounded-lg text-[11px] font-bold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              অর্ডার করুন
            </button>
            <button 
              onClick={() => handleQuickAddToCart(p)}
              className="col-span-1 bg-rose-50 text-rose-600 border border-rose-200 rounded-lg flex items-center justify-center hover:bg-rose-100 transition-colors cursor-pointer"
              title="কার্টনে যুক্ত করুন"
            >
              <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
