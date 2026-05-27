// Standalone JavaScript Logic for Lichu Bazar
// Powered by dynamic local states and structured data matching the screenshots

const LYCHEE_PRODUCTS = [
  {
    id: 'dinajpur-budget',
    name: 'Dinajpur Lychee Budget Pack',
    banglaName: 'দিনাজপুর লিচু বাজেট প্যাক',
    category: 'dinajpur',
    categoryBangla: 'দিনাজপুর লিচু',
    priceMin: 240,
    priceMax: 470,
    rating: 5,
    reviewsCount: 17,
    soldCount: 142,
    image: 'https://images.unsplash.com/photo-1543158085-feacc490ea38?q=80&w=600&auto=format&fit=crop',
    description: 'দিনাজপুরের বিখ্যাত মিষ্টি ও রসাল লিচু সরাসরি বাগান থেকে বাছাইকৃত। বাজেটবান্ধব মূল্যে পরিবারের সকলের জন্য সেরা হাইজিনিক প্যাকেজিংয়ে পরিবেশিত।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['১০০% ফরমালিন মুক্ত', 'সরাসরি বাগান থেকে সংগ্রহ', 'সুপার মিষ্টি ও রসাল']
  },
  {
    id: 'rajshahi-gift-basket',
    name: 'Rajshahi Lychee Gift Basket',
    banglaName: 'রাজশাহী লিচু उपहार ঝুড়ি',
    category: 'rajshahi',
    categoryBangla: 'রাজশাহী লিচু',
    priceMin: 270,
    priceMax: 530,
    rating: 5,
    reviewsCount: 18,
    soldCount: 96,
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop',
    description: 'মনমুগ্ধকর ঐতিহ্যবাহী বাঁশের ঝুড়িতে সাজানো রাজশাহীর সেরা বাছাইকৃত বড় আকারের লাল টকটকে লিচু। যেকোনো উৎসব বা প্রিয়জনকে উপহার দেওয়ার জন্য এটি সর্বোত্তম পছন্দ।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['আকর্ষণীয় উপহারের ঝুড়ি', 'বাছাই করা বড় আকারের লিচু', '১০০% অরগানিক ও ফ্রেশ']
  },
  {
    id: 'seasonal-fresh-lichu',
    name: 'Seasonal Fresh Lychee Direct From Orchard',
    banglaName: 'সিজনাল টাটকা লিচু',
    category: 'dinajpur',
    categoryBangla: 'দিনাজপুর লিচু',
    priceMin: 350,
    priceMax: 680,
    rating: 5,
    reviewsCount: 9,
    soldCount: 54,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=600&auto=format&fit=crop',
    description: 'মাটির উর্বর গুণের কারণে দিনাজপুরের এই লিচুগুলো অত্যন্ত মিষ্টি এবং সুগন্ধযুক্ত। কোনো প্রকার কৃত্রিম হরমোন বা স্প্রে ছাড়া প্রাকৃতিক উপায়ে পাকা।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['প্রাকৃতিক উপায়ে পাকা', 'অত্যন্ত সুমিষ্ট গন্ধ', 'প্রিমিয়াম কোয়ালিটি নিশ্চয়তা']
  },
  {
    id: 'selected-large-lichu',
    name: 'Selected Premium Jumbo Lychee',
    banglaName: 'বাছাই করা বড় লিচু',
    category: 'dinajpur',
    categoryBangla: 'দিনাজপুর লিচু',
    priceMin: 260,
    priceMax: 520,
    rating: 5,
    reviewsCount: 12,
    soldCount: 88,
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=600&auto=format&fit=crop',
    description: 'বিশেষভাবে বাছাইকৃত বড় সাইজের কিং-সাইজ লিচু গুচ্ছ। অত্যন্ত পাতলা খোসা এবং ছোট আঁটি সংবলিত রসালো ও ঘন মিষ্টি স্বাদযুক্ত লিচু।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['জুম্বো সাইজ', 'পাতলা খোসা ও ছোট আঁটি', 'সেরা মিষ্টির স্বাদ']
  },
  {
    id: 'home-delivery-pack',
    name: 'Home Delivery Lychee Pack',
    banglaName: 'হোম ডেলিভারি লিচু প্যাক',
    category: 'dinajpur',
    categoryBangla: 'দিনাজপুর লিচু',
    priceMin: 260,
    priceMax: 510,
    rating: 5,
    reviewsCount: 7,
    soldCount: 110,
    image: 'https://images.unsplash.com/photo-1602914109724-4113cb62baee?q=80&w=600&auto=format&fit=crop',
    description: 'প্রতিটি লিচু গাছের ডালপালাসহ ফ্রেশ অবস্থায় দ্রুত কার্টনে সাবধানে প্যাকিং করে সরাসরি আপনার দরজায় ডেলিভারি দেওয়ার জন্য উপযুক্ত বিশেষ অফার প্যাক।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['ডালসহ ফ্রেশ দীর্ঘস্থায়ী সুরক্ষায়', 'বিশেষ কার্টন বক্স প্যাকেজিং', 'হোম ডেলিভারি সহায়ক']
  },
  {
    id: 'premium-red-lichu',
    name: 'Premium Red Juicy Lychee',
    banglaName: 'প্রিমিয়াম লাল লিচু',
    category: 'rajshahi',
    categoryBangla: 'রাজশাহী লিচু',
    priceMin: 430,
    priceMax: 840,
    rating: 5,
    reviewsCount: 14,
    soldCount: 73,
    image: 'https://images.unsplash.com/photo-1543158085-feacc490ea38?q=80&w=600&auto=format&fit=crop',
    description: 'রাজশাহীর বিখ্যাত লাল টকটকে শাঁসালো লিচু। স্বাদে অত্যন্ত তীব্র মিষ্টি ও ঐতিহ্যবাহী রাজকীয় মেজাজ নিয়ে আসে প্রতিটি কামড়ে।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['রক্তিম লাল বর্ণ', 'ঘন মিষ্টি শাঁস', 'বাগান থেকে সরাসরি হোম ডেলিভারি']
  },
  {
    id: 'organic-garden-fresh',
    name: 'Organic Garden Fresh Clean Lychee',
    banglaName: 'অর্গানিক বাগানের লিচু',
    category: 'rajshahi',
    categoryBangla: 'রাজশাহী লিচু',
    priceMin: 320,
    priceMax: 620,
    rating: 5,
    reviewsCount: 7,
    soldCount: 41,
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=600&auto=format&fit=crop',
    description: 'নিরাপদ উপায়ে কীটনাশক মুক্ত স্পেশাল কেয়ারে ফলানো রাজশাহীর বাগানের লিচু প্যাক। বাচ্চাদের জন্য অত্যন্ত পুষ্টিকর ও শতভাগ নিরাপদ ফল।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['১০০% নিরাপদ ও অরগানিক', 'বাচ্চাদের জন্য নিরাপদ', 'সুস্বাদু ও তরতাজা']
  },
  {
    id: 'sweet-nectar-lichu',
    name: 'Sweet Nectar Honey-Sweet Lychee Pack',
    banglaName: 'মিষ্টি রসাল লিচু প্যাক',
    category: 'rajshahi',
    categoryBangla: 'রাজশাহী লিচু',
    priceMin: 260,
    priceMax: 510,
    rating: 5,
    reviewsCount: 6,
    soldCount: 52,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=600&auto=format&fit=crop',
    description: 'মধু-মিষ্টি স্বাদের এই রসে ভরপুর রাজশাহী জেলার মিষ্টি বাগানের তরতাজা লিচু প্যাক। আড়ালে লুকিয়ে থাকা অপূর্ব স্বাদের রসালো অনুভূতি জোগাবে।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['মধু-মিষ্টি সুস্বাদু রসাল শাঁস', 'ট্যাক ব্যাক ফ্রেশ প্যাক', 'সরাসরি কৃষক থেকে সংগ্রহ']
  },
  {
    id: 'pink-rose-special',
    name: 'Pink Rose Special Scented Lychee',
    banglaName: 'গোলাপী লিচু স্পেশাল',
    category: 'rajshahi',
    categoryBangla: 'রাজশাহী লিচু',
    priceMin: 260,
    priceMax: 500,
    rating: 5,
    reviewsCount: 12,
    soldCount: 104,
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=600&auto=format&fit=crop',
    description: 'গোলাপের ন্যায় আকর্ষণীয় সুরভীযুক্ত রাজশাহীর স্পেশাল গোলাপী জাতের লিচু। এর সুমিষ্ট চমৎকার ঘ্রাণ এবং নরম রসালো শাঁস সকলের প্রশংসা অর্জন করে আসছে।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['গোলাপী চমৎকার ঘ্রাণ', 'নরম রসালো মাংসল অংশ', 'আকর্ষণীয় হালকা গোলাপী আভা']
  },
  {
    id: 'premium-bombai-lichu',
    name: 'Premium Bombai Large Lychee',
    banglaName: 'বোম্বাই লিচু প্রিমিয়াম',
    category: 'bombai',
    categoryBangla: 'বোম্বাই লিচু',
    priceMin: 300,
    priceMax: 590,
    rating: 5,
    reviewsCount: 4,
    soldCount: 49,
    image: 'https://images.unsplash.com/photo-1543158085-feacc490ea38?q=80&w=600&auto=format&fit=crop',
    description: 'বিখ্যাত বোম্বাই জাতের মাঝারি থেকে বড় আকৃতির লিচু। রসালো শাঁসের আকর্ষণীয় সুবাস এবং চমৎকার কড়া মিষ্টি স্বাদের জন্য এই দেশের সবথেকে জনপ্রিয় জাত।',
    weights: ['১ কেজি', '২ কেজি', '৫ কেজি'],
    features: ['বিখ্যাত বোম্বাই বীজ জাত', 'কড়া মিষ্টি ও ঘন রস', 'স্বাস্থ্যসম্মত প্যাকেজিং']
  }
];

// Cart and state management
let CART = [];
let ACTIVE_SCREEN = 'home'; // 'home' | 'product-details' | 'checkout'
let ACTIVE_CATEGORY = 'all';
let SELECTED_PRODUCT = LYCHEE_PRODUCTS[1]; // default to Rajshahi Gift Basket
let SELECTED_DETAIL_WEIGHT = '১ কেজি';
let SELECTED_DETAIL_QTY = 1;
let ACTIVE_DELIVERY_ZONE = 'inside'; // 'inside' = 100, 'outside' = 150
let APPLIED_COUPON = null; // { code: 'LICHU20', rate: 0.20 }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts();
  setupClickListeners();
  updateCartCounters();
});

// Render the top horizontal category tabs
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;
  
  const categories = [
    { id: 'all', name: 'সব লিচু' },
    { id: 'dinajpur', name: 'দিনাজপুর লিচু' },
    { id: 'premium', name: 'প্রিমিয়াম লিচু' },
    { id: 'rajshahi', name: 'রাজশাহী লিচু' },
    { id: 'bombai', name: 'বোম্বাই লিচু' }
  ];
  
  container.innerHTML = categories.map(cat => `
    <button 
      onclick="filterCategory('${cat.id}')"
      class="text-sm font-medium py-2 px-1 transition-all capitalize border-b-2 whitespace-nowrap cursor-pointer ${
        ACTIVE_CATEGORY === cat.id 
          ? 'border-rose-600 text-rose-600 font-bold' 
          : 'border-transparent text-gray-600 hover:text-rose-600'
      }"
    >
      ${cat.name}
    </button>
  `).join('');
}

// Filter the active products
window.filterCategory = function(catId) {
  ACTIVE_CATEGORY = catId;
  renderCategories();
  renderProducts();
};

// Render Products in lists based on screenshots
function renderProducts() {
  const dinajpurList = document.getElementById('dinajpur-products-grid');
  const rajshahiList = document.getElementById('rajshahi-products-grid');
  
  if (!dinajpurList || !rajshahiList) return;
  
  // Dinajpur Filter criteria
  const dinajpurItems = LYCHEE_PRODUCTS.filter(p => {
    if (ACTIVE_CATEGORY !== 'all' && p.category !== ACTIVE_CATEGORY && catMapping(p.category) !== ACTIVE_CATEGORY) return false;
    return p.category === 'dinajpur';
  });
  
  // Rajshahi Filter criteria
  const rajshahiItems = LYCHEE_PRODUCTS.filter(p => {
    if (ACTIVE_CATEGORY !== 'all' && p.category !== ACTIVE_CATEGORY && catMapping(p.category) !== ACTIVE_CATEGORY) return false;
    return p.category === 'rajshahi' || p.category === 'bombai' || p.category === 'premium';
  });

  dinajpurList.innerHTML = dinajpurItems.map(p => renderCardMarkup(p)).join('');
  rajshahiList.innerHTML = rajshahiItems.map(p => renderCardMarkup(p)).join('');
}

function catMapping(cat) {
  if (cat === 'bombai') return 'bombai';
  if (cat === 'rajshahi' || cat === 'premium') return 'rajshahi';
  return cat;
}

// Layout helper for product cards (matching screenshots exactly)
function renderCardMarkup(p) {
  // Convert min price to Bangla characters or keep numerical for usability
  const priceText = `${p.priceMin}৳ - ${p.priceMax}৳`;
  
  return `
    <div class="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-xs card-hover-effect flex flex-col justify-between">
      <div class="relative cursor-pointer" onclick="goToDetails('${p.id}')">
        <img src="${p.image}" alt="${p.banglaName}" class="w-full h-48 object-cover leading-none" referrerpolicy="no-referrer">
        <div class="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          তাঁজা বাগান
        </div>
      </div>
      
      <div class="p-3 flex-1 flex flex-col justify-between">
        <div class="mb-2">
          <h3 class="font-semibold text-gray-900 text-base line-clamp-1 mb-1 cursor-pointer hover:text-rose-600" onclick="goToDetails('${p.id}')">
            ${p.banglaName}
          </h3>
          
          <div class="flex items-center gap-1 mb-1">
            <span class="text-yellow-400 text-xs">★★★★★</span>
            <span class="text-[10px] text-gray-400">(৫.০)</span>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="font-bold text-rose-600 text-[15px] font-mono">${priceText}</span>
            <span class="text-[11px] text-gray-400 flex items-center gap-1">
              👁️ ${p.reviewsCount}
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-5 gap-1.5 mt-auto">
          <button 
            onclick="quickOrder('${p.id}')"
            class="col-span-4 bg-rose-600 text-white py-1.5 px-2 rounded text-xs font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            অর্ডার করুন
          </button>
          <button 
            onclick="quickAddToCart('${p.id}')"
            class="col-span-1 bg-rose-50 text-rose-600 border border-rose-200 rounded flex items-center justify-center hover:bg-rose-100 transition-colors cursor-pointer"
            title="কার্টনে যুক্ত করুন"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  `;
}

// Router trigger for Screens
window.changeScreen = function(screenName) {
  ACTIVE_SCREEN = screenName;
  
  // Hide all main containers
  document.getElementById('screen-home').classList.add('hidden');
  document.getElementById('screen-product-details').classList.add('hidden');
  document.getElementById('screen-checkout').classList.add('hidden');
  
  // Show target
  if (screenName === 'home') {
    document.getElementById('screen-home').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screenName === 'product-details') {
    document.getElementById('screen-product-details').classList.remove('hidden');
    renderProductDetailsPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screenName === 'checkout') {
    document.getElementById('screen-checkout').classList.remove('hidden');
    renderCheckoutPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Route to screen 2: Product details
window.goToDetails = function(prodId) {
  const p = LYCHEE_PRODUCTS.find(item => item.id === prodId);
  if (!p) return;
  SELECTED_PRODUCT = p;
  SELECTED_DETAIL_WEIGHT = p.weights[0];
  SELECTED_DETAIL_QTY = 1;
  changeScreen('product-details');
};

// Quick action: Order Now from card (takes straight to checkout with that 1 item)
window.quickOrder = function(prodId) {
  const p = LYCHEE_PRODUCTS.find(item => item.id === prodId);
  if (!p) return;
  
  // Add to cart and redirect
  const cartItemId = `${p.id}-${p.weights[0]}`;
  const existingIndex = CART.findIndex(item => item.id === cartItemId);
  
  if (existingIndex > -1) {
    CART[existingIndex].quantity += 1;
  } else {
    CART.push({
      id: cartItemId,
      product: p,
      selectedWeight: p.weights[0],
      quantity: 1,
      pricePerPkg: p.priceMin // default 1kg price
    });
  }
  
  updateCartCounters();
  changeScreen('checkout');
};

// Quick action: Add to Cart from card with notification toast
window.quickAddToCart = function(prodId) {
  const p = LYCHEE_PRODUCTS.find(item => item.id === prodId);
  if (!p) return;
  
  const cartItemId = `${p.id}-${p.weights[0]}`;
  const existingIndex = CART.findIndex(item => item.id === cartItemId);
  
  if (existingIndex > -1) {
    CART[existingIndex].quantity += 1;
  } else {
    CART.push({
      id: cartItemId,
      product: p,
      selectedWeight: p.weights[0],
      quantity: 1,
      pricePerPkg: p.priceMin
    });
  }
  
  updateCartCounters();
  showToast(`${p.banglaName} কার্টনে যোগ করা হয়েছে!`);
};

// Render Screen 2 Details
function renderProductDetailsPage() {
  const p = SELECTED_PRODUCT;
  
  // UI Left: Product Image
  const imgEl = document.getElementById('detail-product-image');
  imgEl.src = p.image;
  imgEl.alt = p.banglaName;
  
  // UI Right Content
  document.getElementById('detail-title').innerText = p.banglaName;
  document.getElementById('detail-category').innerText = p.categoryBangla;
  document.getElementById('detail-base-price').innerText = `${p.priceMin}৳`;
  document.getElementById('detail-description-para').innerText = p.description;
  document.getElementById('detail-long-desc').innerText = p.description;
  
  // Render Weight Buttons
  const weightGrp = document.getElementById('detail-weight-buttons');
  weightGrp.innerHTML = p.weights.map((w, index) => {
    const isSelected = SELECTED_DETAIL_WEIGHT === w;
    return `
      <button 
        onclick="setDetailWeight('${w}', ${index})"
        class="border px-3 py-1.5 rounded transition-all text-sm font-semibold cursor-pointer ${
          isSelected 
            ? 'border-rose-600 bg-rose-50 text-rose-600' 
            : 'border-gray-200 bg-white text-gray-700 hover:border-rose-400'
        }"
      >
        ${w}
      </button>
    `;
  }).join('');
  
  // Update Qty Text
  document.getElementById('detail-qty-num').innerText = SELECTED_DETAIL_QTY;
  
  // Features checklist
  const featuresList = document.getElementById('detail-features-list');
  featuresList.innerHTML = p.features.map(f => `
    <li class="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded">
      ✓ ${f}
    </li>
  `).join('');
  
  // Recommended related products
  const relatedList = document.getElementById('detail-related-grid');
  const relatedItems = LYCHEE_PRODUCTS.filter(item => item.id !== p.id).slice(0, 3);
  relatedList.innerHTML = relatedItems.map(item => `
    <div class="bg-white border border-gray-100 rounded-lg p-2 card-hover-effect cursor-pointer text-center" onclick="goToDetails('${item.id}')">
      <img src="${item.image}" alt="${item.banglaName}" class="w-full h-24 object-cover rounded mb-1.5" referrerpolicy="no-referrer">
      <h4 class="text-xs font-semibold truncate text-gray-800">${item.banglaName}</h4>
      <span class="text-[11px] font-bold text-rose-600 font-mono">${item.priceMin}৳ - ${item.priceMax}৳</span>
    </div>
  `).join('');
}

// Selection triggers
window.setDetailWeight = function(w, index) {
  SELECTED_DETAIL_WEIGHT = w;
  renderProductDetailsPage();
};

window.adjustDetailQty = function(amount) {
  const nextVal = SELECTED_DETAIL_QTY + amount;
  if (nextVal < 1) return;
  SELECTED_DETAIL_QTY = nextVal;
  document.getElementById('detail-qty-num').innerText = SELECTED_DETAIL_QTY;
};

// Screen 2 Cart Addition
window.detailAddToCart = function() {
  const p = SELECTED_PRODUCT;
  
  // Weight premium calculation: multipliers e.g. 1kg = 1.0x, 2kg = 1.9x, 5kg = 4.5x
  let multiplier = 1.0;
  if (SELECTED_DETAIL_WEIGHT.includes('২')) multiplier = 1.9;
  if (SELECTED_DETAIL_WEIGHT.includes('৫')) multiplier = 4.5;
  const computedPrice = Math.round(p.priceMin * multiplier);

  const cartItemId = `${p.id}-${SELECTED_DETAIL_WEIGHT}`;
  const existingIndex = CART.findIndex(item => item.id === cartItemId);
  
  if (existingIndex > -1) {
    CART[existingIndex].quantity += SELECTED_DETAIL_QTY;
  } else {
    CART.push({
      id: cartItemId,
      product: p,
      selectedWeight: SELECTED_DETAIL_WEIGHT,
      quantity: SELECTED_DETAIL_QTY,
      pricePerPkg: computedPrice
    });
  }
  
  updateCartCounters();
  showToast(`${p.banglaName} (${SELECTED_DETAIL_WEIGHT}) কার্টে যোগ হয়েছে!`);
};

// Direct Checkout trigger
window.detailBuyNow = function() {
  detailAddToCart();
  changeScreen('checkout');
};

// WhatsApp instant order click (individual product detail screen)
window.detailWhatsAppOrder = function() {
  const p = SELECTED_PRODUCT;
  
  let multiplier = 1.0;
  if (SELECTED_DETAIL_WEIGHT.includes('২')) multiplier = 1.9;
  if (SELECTED_DETAIL_WEIGHT.includes('৫')) multiplier = 4.5;
  const computedPrice = Math.round(p.priceMin * multiplier);
  const totalCost = computedPrice * SELECTED_DETAIL_QTY;
  
  const textMessage = `আসসালামু আলাইকুম, আমি অনলাইন লিচু বাজার ওয়েবসাইট থেকে নিচের পণ্যটি অর্ডার করতে চাই:
--------------
পণ্য: ${p.banglaName}
ওজন/প্যাক: ${SELECTED_DETAIL_WEIGHT}
পরিমাণ: ${SELECTED_DETAIL_QTY} টি
মোট মূল্য: ${totalCost} ৳
--------------
অনুগ্রহ করে ডেলিভারি ও অর্ডার বিবরণী কনফার্ম করুন। ধন্যবাদ!`;

  const encoded = encodeURIComponent(textMessage);
  window.open(`https://wa.me/88012345678?text=${encoded}`, '_blank');
};


// Render Screen 3 Checkout calculations
function renderCheckoutPage() {
  const summaryList = document.getElementById('checkout-items-list');
  const cartEmptyWarning = document.getElementById('checkout-empty-warning');
  const checkoutMainGrid = document.getElementById('checkout-main-grid');
  
  if (CART.length === 0) {
    if (cartEmptyWarning) cartEmptyWarning.classList.remove('hidden');
    if (checkoutMainGrid) checkoutMainGrid.classList.add('hidden');
    return;
  } else {
    if (cartEmptyWarning) cartEmptyWarning.classList.add('hidden');
    if (checkoutMainGrid) checkoutMainGrid.classList.remove('hidden');
  }

  // Draw Items
  summaryList.innerHTML = CART.map(item => {
    const itemTotal = item.pricePerPkg * item.quantity;
    return `
      <div class="flex items-center gap-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100 mb-2 relative">
        <img src="${item.product.image}" class="w-12 h-12 object-cover rounded shrink-0 leading-none">
        <div class="flex-1 min-w-0">
          <h4 class="font-semibold text-xs text-gray-800 truncate">${item.product.banglaName}</h4>
          <p class="text-[10px] text-gray-500">${item.selectedWeight} • ${item.pricePerPkg}৳</p>
          
          <div class="flex items-center gap-2 mt-1">
            <button onclick="adjustCartQty('${item.id}', -1)" class="w-5 h-5 bg-white border border-gray-200 rounded text-xs flex items-center justify-center font-bold font-mono">-</button>
            <span class="text-xs font-semibold font-mono">${item.quantity}</span>
            <button onclick="adjustCartQty('${item.id}', 1)" class="w-5 h-5 bg-white border border-gray-200 rounded text-xs flex items-center justify-center font-bold font-mono">+</button>
          </div>
        </div>
        
        <div class="text-right flex flex-col justify-between h-full min-w-[60px] self-stretch">
          <button onclick="deleteCartItem('${item.id}')" class="text-red-500 hover:text-red-700 text-xs self-end mb-1 cursor-pointer" title="মুছে ফেলুন">🗑️</button>
          <span class="text-xs font-bold font-mono text-gray-900">${itemTotal}৳</span>
        </div>
      </div>
    `;
  }).join('');
  
  recalculateTotals();
}

// Adjust Cart Qty from checkout list
window.adjustCartQty = function(itemId, amount) {
  const index = CART.findIndex(item => item.id === itemId);
  if (index === -1) return;
  const nextQty = CART[index].quantity + amount;
  if (nextQty < 1) {
    deleteCartItem(itemId);
  } else {
    CART[index].quantity = nextQty;
    updateCartCounters();
    renderCheckoutPage();
  }
};

// Delete single cart item
window.deleteCartItem = function(itemId) {
  CART = CART.filter(item => item.id !== itemId);
  updateCartCounters();
  renderCheckoutPage();
};

// Choose shipping region
window.setDeliveryArea = function(zone) {
  ACTIVE_DELIVERY_ZONE = zone;
  recalculateTotals();
};

// Discount Promo Codes validation
window.applyPromoCode = function() {
  const couponInput = document.getElementById('promo-input');
  const code = couponInput.value.trim().toUpperCase();
  const alertEl = document.getElementById('coupon-alert');
  
  if (code === 'LICHU20') {
    APPLIED_COUPON = { code: 'LICHU20', rate: 0.20 };
    alertEl.innerHTML = `<span class="text-xs text-green-700 font-semibold">✓ কুপন 'LICHU20' সফলভাবে কাজ করেছে! ২০% ছাড় যুক্ত হলো।</span>`;
    recalculateTotals();
  } else if (code === 'FREESHIP') {
    APPLIED_COUPON = { code: 'FREESHIP', rate: 0, freeship: true };
    alertEl.innerHTML = `<span class="text-xs text-green-700 font-semibold">✓ কুপন 'FREESHIP' সফলভাবে কাজ করেছে! কোনো ডেলিভারি চার্জ নেই।</span>`;
    recalculateTotals();
  } else {
    alertEl.innerHTML = `<span class="text-xs text-red-500 font-semibold">✗ ভুল কুপন কোড! LICHU20 বা FREESHIP ব্যবহার করুন।</span>`;
  }
};

// Totals calculations
function recalculateTotals() {
  // Items subtotal
  const subtotal = CART.reduce((sum, item) => sum + (item.pricePerPkg * item.quantity), 0);
  
  // Discount
  let discount = 0;
  if (APPLIED_COUPON) {
    if (APPLIED_COUPON.rate > 0) {
      discount = Math.round(subtotal * APPLIED_COUPON.rate);
    }
  }
  
  // Shipping
  let deliveryCharge = ACTIVE_DELIVERY_ZONE === 'inside' ? 100 : 150;
  if (APPLIED_COUPON && APPLIED_COUPON.freeship) {
    deliveryCharge = 0;
  }
  
  const total = subtotal - discount + deliveryCharge;
  
  // Draw inside summary
  document.getElementById('summary-subtotal').innerText = `${subtotal}৳`;
  document.getElementById('summary-discount').innerText = `-${discount}৳`;
  document.getElementById('summary-delivery').innerText = `${deliveryCharge}৳`;
  document.getElementById('summary-total').innerText = `${total}৳`;
}

// Global cart count indicators
function updateCartCounters() {
  const totalCount = CART.reduce((sum, item) => sum + item.quantity, 0);
  
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.innerText = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Toggle checkout submit to trigger beautiful receipt Dialog Modal
window.confirmOrder = function(event) {
  if (event) event.preventDefault();
  
  // Forms inputs validation
  const name = document.getElementById('billing-name').value.trim();
  const phone = document.getElementById('billing-phone').value.trim();
  const address = document.getElementById('billing-address').value.trim();
  
  if (!name || !phone || !address) {
    showToast('অনুগ্রহ করে নাম, সচল মোবাইল নাম্বার এবং পুরো ঠিকানা প্রদান করুন।');
    return;
  }
  
  // Create beautiful Invoice Slip
  const invoiceNum = 'LB-' + Math.floor(100000 + Math.random() * 900000);
  const subtotal = CART.reduce((sum, item) => sum + (item.pricePerPkg * item.quantity), 0);
  let discount = APPLIED_COUPON && APPLIED_COUPON.rate > 0 ? Math.round(subtotal * APPLIED_COUPON.rate) : 0;
  let delCharge = ACTIVE_DELIVERY_ZONE === 'inside' ? 100 : 150;
  if (APPLIED_COUPON && APPLIED_COUPON.freeship) delCharge = 0;
  const grandTotal = subtotal - discount + delCharge;

  // Build items rows markup
  const itemRowHTML = CART.map(item => `
    <div class="flex justify-between items-center text-xs py-1 border-b border-dashed border-gray-100">
      <span class="text-gray-700">${item.product.banglaName} (${item.selectedWeight}) x${item.quantity}</span>
      <span class="font-semibold font-mono text-gray-900">${item.pricePerPkg * item.quantity}৳</span>
    </div>
  `).join('');

  // Render modal content
  document.getElementById('modal-invoice-num').innerText = invoiceNum;
  document.getElementById('modal-client-name').innerText = name;
  document.getElementById('modal-client-phone').innerText = phone;
  document.getElementById('modal-client-address').innerText = address;
  document.getElementById('modal-items-sublist').innerHTML = itemRowHTML;
  document.getElementById('modal-subtotal').innerText = `${subtotal}৳`;
  document.getElementById('modal-discount').innerText = `-${discount}৳`;
  document.getElementById('modal-delivery').innerText = `${delCharge}৳`;
  document.getElementById('modal-total').innerText = `${grandTotal}৳`;
  
  // Reveal success overlay
  document.getElementById('order-success-modal').classList.remove('hidden');
};

// Close modal & Clean cart
window.closeOrderModal = function() {
  document.getElementById('order-success-modal').classList.add('hidden');
  CART = [];
  APPLIED_COUPON = null;
  updateCartCounters();
  
  // clear form
  document.getElementById('billing-name').value = '';
  document.getElementById('billing-phone').value = '';
  document.getElementById('billing-address').value = '';
  
  changeScreen('home');
};

// Finish Order & Redirect to Phone Call or WhatsApp Notification
window.triggerWhatsAppReceipt = function() {
  const name = document.getElementById('modal-client-name').innerText;
  const phone = document.getElementById('modal-client-phone').innerText;
  const address = document.getElementById('modal-client-address').innerText;
  const invoice = document.getElementById('modal-invoice-num').innerText;
  const total = document.getElementById('modal-total').innerText;
  
  const listMessage = CART.map(i => `- ${i.product.banglaName} / ${i.selectedWeight} (পরিমাণ: ${i.quantity}টি)`).join('\n');
  
  const textMessage = `আসসালামু আলাইকুম লিচু বাজার!
আমি একটি অর্ডার কনফার্ম করতে চাই। নিচে আমার তথ্য রয়েছে:
---------------------------------
অর্ডার নম্বর: ${invoice}
গ্রাহকের নাম: ${name}
মোবাইল নম্বর: ${phone}
ডেলিভারি ঠিকানা: ${address}
---------------------------------
অর্ডারকৃত লিচুসমূহ:
${listMessage}
---------------------------------
ডেলিভারি এরিয়া: ${ACTIVE_DELIVERY_ZONE === 'inside' ? 'Inside Dhaka (100৳)' : 'Outside Dhaka (150৳)'}
সর্বমোট পরিশোধযোগ্য মূল্য: ${total} (ক্যাশ অন ডেলিভারি)
---------------------------------
অনুগ্রহ করে দ্রুত ডেলিভারি নিশ্চিত করুন। ধন্যবাদ!`;

  const encoded = encodeURIComponent(textMessage);
  window.open(`https://wa.me/88012345678?text=${encoded}`, '_blank');
};


// Custom listeners for popup/toaster alerts
const toastQueue = [];
window.showToast = function(msg) {
  const toast = document.getElementById('global-toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.remove('opacity-0', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'translate-y-2');
  }, 2500);
};

function setupClickListeners() {
  // Mobile nav toggles
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-panel');
  
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }
}
