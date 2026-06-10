// G collection store - Core Application Script

const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Smartphone ya Kisasa (Samsung Galaxy A54)",
    price: 850000,
    description: "Simu yenye kioo kikubwa cha Super AMOLED, uwezo mkubwa wa betri ya 5000mAh na kamera ya kiwango cha juu 50MP.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 145,
    rating: 4.8,
    stock: 25
  },
  {
    id: "2",
    name: "Laptop ya Kazi (HP ProBook G9)",
    price: 1450000,
    description: "Laptop imara na yenye kasi kwa ajili ya ofisi, masomo au biashara yako. Core i5, 8GB RAM na SSD ya 256GB.",
    image: "https://images.unsplash.com/photo-1496181130204-755241524eab?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 88,
    rating: 4.7,
    stock: 12
  },
  {
    id: "3",
    name: "Smart TV Inch 43 (Hisense Android TV)",
    price: 750000,
    description: "Furahia picha angavu ya 4K Ultra HD. Inakuja na mifumo ya YouTube, Netflix na Android iliyojengewa ndani.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 92,
    rating: 4.6,
    stock: 15
  },
  {
    id: "4",
    name: "Friji ya Milango Miwili (Samsung No-Frost)",
    price: 1200000,
    description: "Friji ya kisasa isiyogandisha barafu (no-frost) na isiyotumia umeme mwingi (energy saver). Inahifadhi vyakula vyako safi kwa muda mrefu.",
    image: "https://images.unsplash.com/photo-1571175432250-0196677aa4d8?auto=format&fit=crop&w=500&q=80",
    category: "Vifaa vya Nyumbani",
    salesCount: 34,
    rating: 4.9,
    stock: 8
  },
  {
    id: "5",
    name: "Mashine ya Kufulia (Front-Load 8Kg)",
    price: 1100000,
    description: "Kuosha nguo sasa ni rahisi sana! Mashine ya kufulia ya kujiendesha yenyewe (fully automatic) yenye uwezo wa kilo 8.",
    image: "https://images.unsplash.com/photo-1545173168-9f1947eebd01?auto=format&fit=crop&w=500&q=80",
    category: "Vifaa vya Nyumbani",
    salesCount: 41,
    rating: 4.5,
    stock: 6
  },
  {
    id: "6",
    name: "Viatu vya Michezo (Sports Runners)",
    price: 95000,
    description: "Viatu vyepesi, imara na vyenye faraja ya juu kwa ajili ya mazoezi au matembezi ya kawaida ya kila siku.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 210,
    rating: 4.9,
    stock: 50
  },
  {
    id: "7",
    name: "Nguo za Kijadidi (Premium Cotton T-Shirt)",
    price: 35000,
    description: "T-shati za pamba 100% zilizoshonwa kwa ubora wa kipekee kwa ajili ya kupendeza katika mazingira yoyote ya burudani au kazi.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 340,
    rating: 4.4,
    stock: 100
  },
  {
    id: "8",
    name: "Saa ya Mkononi (Minimalist Leather Watch)",
    price: 125000,
    description: "Saa ya kifahari yenye mkanda wa ngozi halisi na kioo kisichokwaruzika kirahisi. Inafaa kwa mtindo wowote wa mavazi rasmi na yasiyo rasmi.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
    category: "Mavazi na Mitindo",
    salesCount: 156,
    rating: 4.8,
    stock: 30
  },
  {
    id: "9",
    name: "Wireless Headphones (Bluetooth Bass Boost)",
    price: 150000,
    description: "Sikia kila mlio kwa usahihi wa kipekee na bass nzito. Inatoa uwezo wa kudumu na betri hadi masaa 40 mfululizo.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
    category: "Burudani na Muziki",
    salesCount: 189,
    rating: 4.7,
    stock: 40
  },
  {
    id: "10",
    name: "Speaker Inayobebeka (JBL Flip 6)",
    price: 320000,
    description: "Spika isiyoingiliwa na maji (waterproof) yenye sauti kubwa na wazi sana. Rahisi kubeba unapoenda ufukweni au safarini.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
    category: "Burudani na Muziki",
    salesCount: 110,
    rating: 4.8,
    stock: 22
  },
  {
    id: "11",
    name: "Power Bank ya Haraka (20,000mAh Power Delivery)",
    price: 65000,
    description: "Chaji simu yako haraka popote ulipo kwa kutumia nguvu ya 22.5W Fast Charging. Ina milango mitatu ya USB.",
    image: "https://images.unsplash.com/photo-1609592424109-dd77be7163c4?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 228,
    rating: 4.6,
    stock: 60
  },
  {
    id: "12",
    name: "Kamera ya Kidijitali (Canon EOS Rebel)",
    price: 1650000,
    description: "Anza safari yako ya upigaji picha wa kitaalamu kwa kamera hii yenye sensor ya 24.1 megapixel na lenzi ya 18-55mm.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80",
    category: "Elektroniki",
    salesCount: 29,
    rating: 4.9,
    stock: 5
  }
];

const WHATSAPP_NUMBER = "255762012479";

// Global variables initialized
let products = [];
let cart = [];
let selectedCategory = "Zote";
let searchQuery = "";

// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadCart();
  renderProducts();
  renderFeaturedProducts();
  setupEventListeners();
  updateCartUI();
});

function loadProducts() {
  const saved = localStorage.getItem("duka_products");
  if (saved) {
    try {
      products = JSON.parse(saved);
    } catch (e) {
      products = INITIAL_PRODUCTS;
    }
  } else {
    products = INITIAL_PRODUCTS;
    localStorage.setItem("duka_products", JSON.stringify(INITIAL_PRODUCTS));
  }
}

function loadCart() {
  const saved = localStorage.getItem("duka_cart");
  if (saved) {
    try {
      cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCart() {
  localStorage.setItem("duka_cart", JSON.stringify(cart));
}

// Render product list with filters
function renderProducts() {
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "Zote" || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (filtered.length === 0) {
    productsGrid.innerHTML = `
      <div class="col-span-12 text-center py-5">
        <i class="fas fa-box-open text-muted mb-3" style="font-size: 3rem;"></i>
        <h4 class="font-display">Hakuna bidhaa iliyopatikana</h4>
        <p class="text-muted">Tafadhali badilisha neno la utafutaji au aina ya bidhaa.</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = filtered.map(p => `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
      <div class="product-card">
        <div class="img-container">
          <span class="badge-category">${p.category}</span>
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="p-4 d-flex flex-column flex-grow-1 justify-content-between">
          <div>
            <div class="d-flex align-items-center mb-1 text-warning gap-1" style="font-size: 0.8rem;">
              ${Array(5).fill(0).map((_, i) => `<i class="${i < Math.floor(p.rating) ? 'fas' : 'far'} fa-star"></i>`).join('')}
              <span class="text-muted ms-1 font-weight-bold">(${p.rating.toFixed(1)})</span>
            </div>
            <h5 class="text-dark font-display mb-2 text-truncate" title="${p.name}">${p.name}</h5>
            <p class="text-muted small mb-3 description-clamp">${p.description}</p>
          </div>
          <div>
            <div class="d-flex justify-content-between align-items-end pt-3 border-top border-light mb-3">
              <div>
                <span class="text-muted xsmall block">Bei ya Leo</span>
                <span class="text-success h5 font-weight-extrabold m-0">TZS ${p.price.toLocaleString()}</span>
              </div>
              <button onclick="addToCart('${p.id}')" class="btn btn-outline-success btn-sm rounded-pill px-3">
                <i class="fas fa-shopping-cart"></i> +Kikapu
              </button>
            </div>
            <button onclick="orderSingleWhatsApp('${p.id}')" class="w-105 btn btn-emerald py-2">
              <i class="fab fa-whatsapp me-2"></i> Agiza kwa WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render limited products for home page
function renderFeaturedProducts() {
  const grid = document.getElementById("featured-grid");
  if (!grid) return;

  grid.innerHTML = products.slice(0, 4).map(p => `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="product-card">
        <div class="img-container">
          <span class="badge-category">${p.category}</span>
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="p-4 d-flex flex-column flex-grow-1 justify-content-between">
          <div>
            <h5 class="text-dark font-display mb-2 text-truncate">${p.name}</h5>
            <p class="text-muted small mb-3 text-truncate">${p.description}</p>
          </div>
          <div>
            <div class="d-flex justify-content-between align-items-center pt-3 border-top border-light">
              <span class="text-success font-weight-bold">TZS ${p.price.toLocaleString()}</span>
              <button onclick="addToCart('${p.id}')" class="btn btn-emerald btn-sm py-1.5 px-2.5 rounded-lg">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Search and filtering action setups
function setupEventListeners() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Categories filter click listeners
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        filterButtons.forEach(b => b.classList.remove("active", "btn-emerald"));
        filterButtons.forEach(b => b.classList.add("btn-light"));
        
        btn.classList.remove("btn-light");
        btn.classList.add("active", "btn-emerald");
        
        selectedCategory = btn.getAttribute("data-category");
        renderProducts();
      });
    });
  }

  // Cart quantity callbacks
  window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }
    
    saveCart();
    updateCartUI();
    showToast(`"${product.name}" imeongezwa kwenye kikapu chako!`);
  };

  window.removeFromCart = (productId) => {
    cart = cart.filter(item => item.product.id !== productId);
    saveCart();
    updateCartUI();
    showToast("Bidhaa imeondolewa kwenye kikapu.", "info");
  };

  window.adjustQty = (productId, delta) => {
    const item = cart.find(item => item.product.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.product.id !== productId);
    }
    
    saveCart();
    updateCartUI();
  };

  window.clearAllCart = () => {
    if (confirm("Je, una uhakika unataka kufuta bidhaa zote kwenye kikapu?")) {
      cart = [];
      saveCart();
      updateCartUI();
      showToast("Kikapu kimesafishwa.", "info");
    }
  };

  window.orderSingleWhatsApp = (productId) => {
    const p = products.find(prod => prod.id === productId);
    if (!p) return;

    const message = `Habari, naomba kuagiza bidhaa hii:

Jina la Bidhaa: ${p.name}
Bei: TZS ${p.price.toLocaleString()}
Idadi: 1

Jina langu: __________
Mahali nilipo: __________

Asante.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  window.sendCartToWhatsApp = () => {
    if (cart.length === 0) {
      showToast("Kikapu chako ni tupu!", "error");
      return;
    }

    const name = document.getElementById("buyer-name")?.value.trim() || "__________";
    const location = document.getElementById("buyer-location")?.value.trim() || "__________";

    let itemsList = "";
    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.product.price * item.quantity;
      total += subtotal;
      itemsList += `${index + 1}. ${item.product.name} (Idadi: ${item.quantity}) - TZS ${subtotal.toLocaleString()}\n`;
    });

    const message = `Habari, naomba kuagiza bidhaa zifuatazo kutoka kwenye Cart yangu:

${itemsList}
Jumla ya Gharama: TZS ${total.toLocaleString()}

Jina langu: ${name}
Mahali nilipo: ${location}

Asante.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };
}

// Update Cart side UI updates
function updateCartUI() {
  const badge = document.getElementById("cart-count-badge");
  const cartBody = document.getElementById("cart-items-body");
  const totalAmountElem = document.getElementById("cart-total-amount");
  const footerDetails = document.getElementById("cart-footer");

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  if (badge) badge.innerText = totalItems;
  if (totalAmountElem) totalAmountElem.innerText = `TZS ${totalAmount.toLocaleString()}`;

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="text-center py-5">
        <i class="fas fa-shopping-basket text-muted mb-3" style="font-size: 2.5rem;"></i>
        <h6 class="font-display">Kikapu chako ni tupu</h6>
        <p class="text-xs text-muted mb-0">Ongeza bidhaa hapa ili kuagiza pamoja.</p>
      </div>
    `;
    if (footerDetails) footerDetails.style.display = "none";
  } else {
    cartBody.innerHTML = cart.map(item => `
      <div class="d-flex align-items-center justify-content-between p-3 mb-2 rounded bg-light border border-light position-relative">
        <img src="${item.product.image}" alt="${item.product.name}" class="rounded border" style="width: 50px; height: 50px; object-fit: cover;">
        <div class="flex-grow-1 ms-3 min-width-0">
          <h6 class="text-dark small mb-1 text-truncate font-weight-bold" style="max-width: 150px;">${item.product.name}</h6>
          <span class="text-success small font-weight-bold">TZS ${item.product.price.toLocaleString()}</span>
          
          <div class="d-flex align-items-center mt-2 gap-1.5">
            <button onclick="adjustQty('${item.product.id}', -1)" class="btn btn-xs btn-white border px-1.5 py-0">-</button>
            <span class="small font-weight-bold px-1.5">${item.quantity}</span>
            <button onclick="adjustQty('${item.product.id}', 1)" class="btn btn-xs btn-white border px-1.5 py-0">+</button>
          </div>
        </div>
        <button onclick="removeFromCart('${item.product.id}')" class="btn text-danger btn-sm" title="Ondoa">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `).join('');
    if (footerDetails) footerDetails.style.display = "block";
  }
}

// Small toast notice
function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");
  if (!toastContainer) return;

  const bg = type === "error" ? "bg-danger" : type === "info" ? "bg-secondary" : "bg-success";
  const el = document.createElement("div");
  el.className = `toast show ${bg} text-white border-0 p-3 mb-2 rounded shadow-lg`;
  el.style.minWidth = "250px";
  el.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <span><i class="fas fa-check-circle me-2"></i> ${message}</span>
      <button type="button" class="btn-close btn-close-white" onclick="this.parentElement.parentElement.remove()"></button>
    </div>
  `;
  toastContainer.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}
