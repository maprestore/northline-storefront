import { useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  CreditCard,
  ExternalLink,
  Eye,
  Filter,
  Globe2,
  GripVertical,
  ImageIcon,
  Heart,
  Instagram,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Minus,
  MoreHorizontal,
  PackageCheck,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
  Users,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  kind: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  capacity: string;
  colors: string[];
  badge?: string;
  description: string;
  image: string;
  gallery: string[];
};

type CartLine = { product: Product; color: string; quantity: number };
type Page = "home" | "shop" | "product" | "about" | "support" | "admin" | "checkout";

const images = {
  hero: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1800&q=88",
  heroSecondary: "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=900&q=85",
  story: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
  field: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=85",
};

const products: Product[] = [
  {
    id: "ridge-35",
    name: "Ridge 35L Pack",
    kind: "Backpacks",
    price: 198,
    rating: 4.9,
    reviews: 128,
    capacity: "35L",
    colors: ["moss", "sand", "ink"],
    badge: "Best seller",
    description: "A considered carry for long weekends and longer routes. Built from weatherproof recycled nylon with a suspended laptop sleeve.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1622260614153-03223fb72052?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1000&q=86",
    ],
  },
  {
    id: "roam-duffel",
    name: "Roam Duffel 42L",
    kind: "Duffels",
    price: 168,
    rating: 4.8,
    reviews: 84,
    capacity: "42L",
    colors: ["clay", "ink", "cedar"],
    badge: "New arrival",
    description: "Soft-sided, hard-wearing, and ready for the overhead bin. A shoe compartment keeps the rest of your kit fresh.",
    image: "https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1000&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1554342872-034a06541bad?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1000&q=86",
    ],
  },
  {
    id: "atlas-carry-on",
    name: "Atlas Carry-on",
    kind: "Carry-ons",
    price: 286,
    compareAt: 320,
    rating: 4.7,
    reviews: 62,
    capacity: "38L",
    colors: ["stone", "ink", "alpine"],
    badge: "Save 11%",
    description: "A quietly capable roller with an aircraft-grade shell, smooth silent wheels, and room for five days away.",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1000&q=86",
    gallery: [
      "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&w=1000&q=86",
      "https://images.unsplash.com/photo-1563217193-7a0a8e7d2b01?auto=format&fit=crop&w=1000&q=86",
    ],
  },
  {
    id: "trail-sling",
    name: "Trail Sling",
    kind: "Day bags",
    price: 88,
    rating: 4.9,
    reviews: 43,
    capacity: "8L",
    colors: ["moss", "clay", "ink"],
    description: "A compact crossbody for the essentials, cut from the same durable fabric as our expedition packs.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=86&sat=-30",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=86&sat=-30",
      "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=1000&q=86&sat=-20",
    ],
  },
];

const colorNames: Record<string, string> = { moss: "Moss", sand: "Sand", ink: "Ink", clay: "Clay", cedar: "Cedar", stone: "Stone", alpine: "Alpine" };

function money(value: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);
}

function App() {
  const [page, setPage] = useState<Page>(() => window.location.pathname === "/admin" || window.location.hash === "#admin" ? "admin" : "home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  function navigate(next: Page) {
    setPage(next);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    navigate("product");
  }

  function addToCart(product: Product, color = product.colors[0]) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id && line.color === color);
      if (existing) return current.map((line) => line === existing ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { product, color, quantity: 1 }];
    });
    setToast(`${product.name} added to your bag`);
    setCartOpen(true);
    window.setTimeout(() => setToast(null), 2600);
  }

  function changeQuantity(index: number, delta: number) {
    setCart((current) => current.flatMap((line, lineIndex) => {
      if (lineIndex !== index) return [line];
      const quantity = line.quantity + delta;
      return quantity > 0 ? [{ ...line, quantity }] : [];
    }));
  }

  function toggleWishlist(id: string) {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <div className="app-shell">
      <Announcement />
      <Header page={page} cartCount={cartCount} onNavigate={navigate} cartOpen={() => setCartOpen(true)} mobileNav={mobileNav} setMobileNav={setMobileNav} />
      <main>
        {page === "home" && <Home onNavigate={navigate} onProduct={openProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "shop" && <Shop onProduct={openProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "product" && <ProductPage product={selectedProduct} onNavigate={navigate} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} onProduct={openProduct} />}
        {page === "about" && <About onNavigate={navigate} />}
        {page === "support" && <Support onNavigate={navigate} />}
        {page === "admin" && (adminAuthenticated ? <Admin onNavigate={navigate} /> : <AdminLogin onNavigate={navigate} onLogin={() => setAdminAuthenticated(true)} />)}
        {page === "checkout" && <Checkout cart={cart} total={cartTotal} onNavigate={navigate} />}
      </main>
      {page !== "admin" && <Footer onNavigate={navigate} />}
      <CartDrawer open={cartOpen} cart={cart} total={cartTotal} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} onCheckout={() => { setCartOpen(false); navigate("checkout"); }} />
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}

function Announcement() {
  return <div className="announcement"><span className="announcement-dot" /> Free shipping on orders over ₦150 <span className="announcement-divider" /> Designed for the long way around</div>;
}

function Header({ page, cartCount, onNavigate, cartOpen, mobileNav, setMobileNav }: { page: Page; cartCount: number; onNavigate: (page: Page) => void; cartOpen: () => void; mobileNav: boolean; setMobileNav: (open: boolean) => void }) {
  return <header className="site-header">
    <div className="nav-wrap">
      <button className="mobile-menu" aria-label="Open menu" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={20} /> : <Menu size={20} />}</button>
      <button className="wordmark" onClick={() => onNavigate("home")}><span className="wordmark-mark">NK</span><span className="brand-lockup"><strong>NK GREAT GLOBAL</strong><small>ENTERPRISE</small></span></button>
      <nav className={`main-nav ${mobileNav ? "is-open" : ""}`}>
        <button className={page === "shop" ? "active" : ""} onClick={() => onNavigate("shop")}>Shop</button>
        <button className={page === "about" ? "active" : ""} onClick={() => onNavigate("about")}>Our story</button>
        <button className={page === "support" ? "active" : ""} onClick={() => onNavigate("support")}>Support</button>
      </nav>
      <div className="nav-actions">
        <button className="icon-button search-toggle" aria-label="Search"><Search size={19} /></button>
        <button className="bag-button" onClick={cartOpen}><ShoppingBag size={19} /><span>Bag</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
      </div>
    </div>
  </header>;
}

function Home({ onNavigate, onProduct, addToCart, wishlist, toggleWishlist }: { onNavigate: (page: Page) => void; onProduct: (product: Product) => void; addToCart: (product: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }) {
  return <>
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow light"><span /> Made for the in-between</div>
        <h1>Go further.<br /><em>Carry less.</em></h1>
        <p>Adventure-ready bags for the places you haven't planned for yet. Thoughtful design, tested in the wild.</p>
        <div className="hero-actions"><button className="button button-light" onClick={() => onNavigate("shop")}>Shop the collection <ArrowRight size={16} /></button><button className="text-button light-link" onClick={() => onNavigate("about")}>Why Northline <ChevronRight size={15} /></button></div>
        <div className="hero-proof"><div className="avatar-stack"><span>AM</span><span>JR</span><span>SK</span></div><span><strong>12,000+</strong> miles carried this year</span></div>
      </div>
      <div className="hero-image"><img src={images.hero} alt="Northline backpack resting against a mountain trail" /><div className="hero-image-note"><span className="line" /> Rocky Mountain National Park <small>40° 20' N, 105° 41' W</small></div></div>
      <div className="hero-side-note"><span>01</span><span className="side-line" /><span>04</span></div>
    </section>

     <section className="trust-strip"><div><ShieldCheck size={17} /><span><strong>Lifetime repair</strong> We make it right</span></div><div><Truck size={17} /><span><strong>Free shipping</strong> On orders ₦150+</span></div><div><RotateCcw size={17} /><span><strong>30-day returns</strong> Take your time</span></div><div><LockKeyhole size={17} /><span><strong>Secure checkout</strong> Stripe protected</span></div></section>

    <section className="section featured-section"><div className="section-heading"><div><div className="eyebrow">01 / The collection</div><h2>Carry what<br /><em>calls you.</em></h2></div><div className="heading-side"><p>From one-day escapes to open-ended itineraries, find your shape for the journey.</p><button className="text-button" onClick={() => onNavigate("shop")}>View all bags <ArrowRight size={15} /></button></div></div><div className="product-grid">{products.slice(0, 3).map((product) => <ProductCard key={product.id} product={product} onProduct={onProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div></section>

    <section className="category-band"><div className="category-image"><img src={images.heroSecondary} alt="Travel bag in a tent" /></div><div className="category-content"><div className="eyebrow">Find your carry</div><h2>One bag.<br /><em>Many ways out.</em></h2><div className="category-list"><button onClick={() => onNavigate("shop")}><span>01</span><strong>Backpacks</strong><small>For the long haul</small><ArrowRight size={17} /></button><button onClick={() => onNavigate("shop")}><span>02</span><strong>Weekenders</strong><small>Two nights, no itinerary</small><ArrowRight size={17} /></button><button onClick={() => onNavigate("shop")}><span>03</span><strong>Carry-ons</strong><small>Overhead, under control</small><ArrowRight size={17} /></button></div></div></section>

    <section className="section story-teaser"><div className="story-copy"><div className="eyebrow">02 / About Northline</div><h2>Built for the<br /><em>beautiful detour.</em></h2><p>We believe the best trips are the ones that leave room for a change of plan. Northline makes considered, durable gear for wherever the road bends next.</p><button className="button button-dark" onClick={() => onNavigate("about")}>Meet Northline <ArrowRight size={16} /></button></div><div className="story-photo"><img src={images.story} alt="Hiker walking through a high mountain valley" /><div className="photo-caption">Field notes / Dolomites, 2023</div></div></section>

    <section className="testimonial-section"><div className="testimonial-mark">“</div><blockquote>The Ridge is the first bag I've owned that feels better the more places I take it.</blockquote><div className="testimonial-author"><span className="author-avatar">MP</span><span><strong>Maya P.</strong><small>Verified Northline owner · Portland, OR</small></span></div><div className="testimonial-count">01 <span /> 03</div></section>
    <Newsletter />
  </>;
}

function ProductCard({ product, onProduct, addToCart, wishlist, toggleWishlist }: { product: Product; onProduct: (product: Product) => void; addToCart: (product: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }) {
  const saved = wishlist.includes(product.id);
  return <article className="product-card"><div className="product-image-wrap" onClick={() => onProduct(product)}><img src={product.image} alt={product.name} /><div className="product-tags">{product.badge && <span>{product.badge}</span>}</div><button className={`wishlist ${saved ? "saved" : ""}`} aria-label="Save product" onClick={(event) => { event.stopPropagation(); toggleWishlist(product.id); }}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button><button className="quick-add" onClick={(event) => { event.stopPropagation(); addToCart(product); }}>Quick add <Plus size={15} /></button></div><div className="product-info"><div><button className="product-name" onClick={() => onProduct(product)}>{product.name}</button><p>{product.kind} · {product.capacity}</p></div><strong>{money(product.price)}</strong></div><div className="product-rating"><span>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}</span> {product.rating} ({product.reviews})</div></article>;
}

function Shop({ onProduct, addToCart, wishlist, toggleWishlist }: { onProduct: (product: Product) => void; addToCart: (product: Product) => void; wishlist: string[]; toggleWishlist: (id: string) => void }) {
  const [category, setCategory] = useState("All bags");
  const [price, setPrice] = useState("All prices");
  const [filterOpen, setFilterOpen] = useState(false);
  const categories = ["All bags", "Backpacks", "Duffels", "Carry-ons", "Day bags"];
  const filtered = useMemo(() => products.filter((product) => {
    const categoryMatch = category === "All bags" || product.kind === category;
     const priceMatch = price === "All prices" || (price === "Under ₦150" && product.price < 150) || (price === "₦150–₦250" && product.price >= 150 && product.price <= 250) || (price === "₦250+" && product.price > 250);
    return categoryMatch && priceMatch;
  }), [category, price]);
  return <section className="shop-page"><div className="page-intro"><div className="eyebrow">The collection</div><h1>Good gear for<br /><em>going places.</em></h1><p>Durable, adaptable travel bags with a point of view. Find your next everyday essential.</p></div><div className="shop-toolbar"><div className="shop-count">{filtered.length} styles <span>·</span> Free shipping over ₦150</div><button className="mobile-filter" onClick={() => setFilterOpen(!filterOpen)}><SlidersHorizontal size={16} /> Filters</button><div className="sort-select"><span>Sort by</span><select><option>Featured</option><option>Price: low to high</option><option>Top rated</option></select><ChevronDown size={15} /></div></div><div className="shop-layout"><aside className={`filters ${filterOpen ? "is-open" : ""}`}><div className="filter-header"><span>Filter by</span><button onClick={() => setFilterOpen(false)}><X size={16} /></button></div><div className="filter-group"><span className="filter-label">Bag type</span>{categories.map((item) => <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)}>{item}<span>{item === "All bags" ? products.length : products.filter((product) => product.kind === item).length}</span></button>)}</div><div className="filter-group"><span className="filter-label">Price</span>{["All prices", "Under ₦150", "₦150–₦250", "₦250+"].map((item) => <button key={item} className={price === item ? "selected" : ""} onClick={() => setPrice(item)}>{item}{price === item && <Check size={14} />}</button>)}</div><div className="filter-group"><span className="filter-label">Color</span><div className="color-filter"><button className="color-dot moss" /><button className="color-dot sand" /><button className="color-dot ink" /><button className="color-dot clay" /><button className="color-dot stone" /></div></div><div className="filter-note"><Sparkles size={15} /><span>Every Northline bag includes our lifetime repair promise.</span></div></aside><div className="shop-results"><div className="result-top"><span>Showing {filtered.length} of {products.length}</span><button><Filter size={14} /> Refine</button></div><div className="product-grid shop-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} onProduct={onProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div></div></div></section>;
}

function ProductPage({ product, onNavigate, addToCart, wishlist, toggleWishlist, onProduct }: { product: Product; onNavigate: (page: Page) => void; addToCart: (product: Product, color?: string) => void; wishlist: string[]; toggleWishlist: (id: string) => void; onProduct: (product: Product) => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState(product.colors[0]);
  const [accordion, setAccordion] = useState<string | null>("Details");
  const saved = wishlist.includes(product.id);
  return <section className="product-page"><div className="breadcrumb"><button onClick={() => onNavigate("shop")}>Shop</button><ChevronRight size={13} /><span>{product.kind}</span><ChevronRight size={13} /><span>{product.name}</span></div><div className="product-detail"><div className="gallery"><div className="gallery-main"><img src={product.gallery[activeImage]} alt={`${product.name} view ${activeImage + 1}`} />{product.badge && <span className="gallery-badge">{product.badge}</span>}</div><div className="gallery-thumbs">{product.gallery.map((image, index) => <button className={index === activeImage ? "active" : ""} key={image} onClick={() => setActiveImage(index)}><img src={image} alt="" /></button>)}</div></div><div className="product-detail-copy"><div className="eyebrow">{product.kind} / Northline field series</div><h1>{product.name}</h1><div className="detail-rating"><span>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" />)}</span><u>{product.rating} · {product.reviews} reviews</u></div><div className="detail-price">{money(product.price)} {product.compareAt && <del>{money(product.compareAt)}</del>}</div><p className="detail-description">{product.description}</p><div className="option-block"><div className="option-heading"><span>Color</span><strong>{colorNames[color]}</strong></div><div className="color-options">{product.colors.map((item) => <button key={item} className={`color-swatch ${item} ${color === item ? "active" : ""}`} aria-label={colorNames[item]} onClick={() => setColor(item)}><span /></button>)}</div></div><div className="stock-note"><span className="stock-dot" /> In stock · Ships within 1–2 business days</div><button className="button button-dark add-to-cart" onClick={() => addToCart(product, color)}>Add to bag <span>{money(product.price)}</span><ShoppingBag size={16} /></button><button className={`save-product ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(product.id)}><Heart size={16} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved to wishlist" : "Save for later"}</button><div className="accordions">{["Details", "Materials & care", "Shipping & returns"].map((label) => <div className="accordion" key={label}><button onClick={() => setAccordion(accordion === label ? null : label)}><span>{label}</span>{accordion === label ? <Minus size={15} /> : <Plus size={15} />}</button>{accordion === label && <p>{label === "Details" ? `${product.capacity} capacity · 22 × 12 × 8 in · ${product.name.includes("Carry") ? "8.4 lb" : "2.1 lb"} · Padded 16-inch laptop sleeve · Two exterior access pockets` : label === "Materials & care" ? "Recycled 400D nylon shell, YKK zippers, and vegetable-tanned leather details. Spot clean with a damp cloth and air dry." : "Free shipping over ₦150. Returns accepted within 30 days. Every Northline product is covered by our lifetime repair promise."}</p>}</div>)}</div></div></div><section className="review-band"><div><div className="eyebrow">Field tested</div><h2>Made to be<br /><em>lived in.</em></h2><p>We design every detail around the way you actually move through the world.</p></div><div className="review-quote"><div className="quote-stars">★★★★★</div><blockquote>“The perfect balance of structure and give. It swallowed a week's worth of gear and still fit under the seat in front of me.”</blockquote><span>— Alex R. · Verified owner</span></div></section><section className="related-section"><div className="section-heading compact"><div><div className="eyebrow">You may also like</div><h2>Complete your<br /><em>carry system.</em></h2></div><button className="text-button" onClick={() => onNavigate("shop")}>See all bags <ArrowRight size={15} /></button></div><div className="product-grid">{products.filter((item) => item.id !== product.id).slice(0, 3).map((item) => <ProductCard key={item.id} product={item} onProduct={onProduct} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />)}</div></section></section>;
}

function About({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <section className="about-page"><div className="about-hero"><div><div className="eyebrow light"><span /> Our point of view</div><h1>Go with<br /><em>the good stuff.</em></h1><p>Northline started with one simple belief: the things that carry us should be worth carrying.</p></div><img src={images.field} alt="A road winding through a mountain landscape" /></div><div className="about-intro"><div className="eyebrow">Since 2018</div><h2>We make gear for<br /><em>the in-between.</em></h2><div><p>Not the airport lounge or the summit photo. The good stuff happens between: the early train, the wrong turn, the tiny bakery you almost missed.</p><p>Our bags are designed in Portland, field-tested everywhere, and made to age with a little grace. Less noise. More miles.</p></div></div><div className="values-grid"><div><span>01</span><h3>Useful by design</h3><p>Every pocket, panel, and pull has a reason to be there.</p></div><div><span>02</span><h3>Light on the planet</h3><p>Recycled materials, repairable parts, and fewer, better things.</p></div><div><span>03</span><h3>Ready for real life</h3><p>Rain, train platforms, and the occasional overpacking spiral.</p></div></div><div className="about-cta"><div className="eyebrow">Bring less. See more.</div><h2>Find your next<br /><em>favorite bag.</em></h2><button className="button button-light" onClick={() => onNavigate("shop")}>Shop Northline <ArrowRight size={16} /></button></div></section>;
}

function Support({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = [["How quickly will my order arrive?", "Orders ship from our Portland studio within 1–2 business days. Standard delivery takes 3–5 business days in the US. You'll receive a tracking email as soon as it is on its way."], ["What is your return policy?", "Take 30 days to decide. If it is not right, send it back unused for a full refund. We cover return shipping for exchanges."], ["Do you offer a warranty?", "Every Northline bag is covered by our lifetime repair promise. If a zipper, buckle, or seam fails, we will repair it or make it right."], ["Can I change my shipping address?", "If your order has not shipped yet, email our support team and we will do our best to update it before it leaves our studio."]];
  return <section className="support-page"><div className="support-intro"><div className="eyebrow">Support / We're here</div><h1>Questions?<br /><em>Good.</em></h1><p>Real answers from real humans. Usually within one business day.</p><div className="support-cards"><a href="mailto:hello@northline.co"><Mail size={18} /><span><small>Email us</small>hello@northline.co</span><ArrowRight size={15} /></a><a href="#faq"><CircleHelp size={18} /><span><small>Browse FAQs</small>Find your answer</span><ArrowRight size={15} /></a></div></div><div className="support-content"><div className="support-block" id="faq"><div className="eyebrow">Frequently asked</div><h2>The details,<br /><em>covered.</em></h2><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span>{openFaq === index ? <Minus size={16} /> : <Plus size={16} />}</button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div><div className="policy-grid"><div><Truck size={20} /><h3>Shipping</h3><p>Free on orders over ₦150. Worldwide delivery available at checkout.</p><button onClick={() => onNavigate("support")}>Read shipping policy <ArrowRight size={14} /></button></div><div><RotateCcw size={20} /><h3>Returns</h3><p>30 days, no questions asked. We make the process easy.</p><button onClick={() => onNavigate("support")}>Read return policy <ArrowRight size={14} /></button></div><div><ShieldCheck size={20} /><h3>Lifetime repair</h3><p>Good gear should last. We will repair your Northline for life.</p><button onClick={() => onNavigate("support")}>Learn about repairs <ArrowRight size={14} /></button></div></div></div></section>;
}

function Checkout({ cart, total, onNavigate }: { cart: CartLine[]; total: number; onNavigate: (page: Page) => void }) {
  const [placed, setPlaced] = useState(false);
  if (placed) return <section className="checkout-success"><div className="success-icon"><Check size={26} /></div><div className="eyebrow">Order confirmed</div><h1>You are going<br /><em>somewhere good.</em></h1><p>Thanks for choosing Northline. We sent your confirmation and tracking details to your inbox.</p><span className="order-number">Order NL-20481</span><button className="button button-dark" onClick={() => onNavigate("home")}>Back to Northline <ArrowRight size={16} /></button></section>;
  return <section className="checkout-page"><div className="checkout-top"><button className="wordmark" onClick={() => onNavigate("home")}><span className="wordmark-mark">N</span><span>NORTHLINE</span></button><span><LockKeyhole size={14} /> Secure checkout</span></div><div className="checkout-layout"><div className="checkout-form"><div className="checkout-breadcrumb"><span className="current">1 Contact</span><span>2 Shipping</span><span>3 Payment</span></div><h1>Almost out<br /><em>the door.</em></h1><label>Email address<input type="email" placeholder="you@example.com" /></label><div className="form-grid"><label>First name<input placeholder="First name" /></label><label>Last name<input placeholder="Last name" /></label></div><label>Country / region<select><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option></select></label><label>Address<input placeholder="Street address" /></label><div className="form-grid"><label>City<input placeholder="City" /></label><label>Postal code<input placeholder="ZIP / postal code" /></label></div><div className="shipping-estimate"><Globe2 size={16} /><span><strong>Shipping calculated next</strong><small>We will show rates based on your address.</small></span><ChevronRight size={16} /></div><button className="button button-dark checkout-button" onClick={() => setPlaced(true)}>Continue to shipping <ArrowRight size={16} /></button><p className="checkout-legal">By continuing, you agree to Northline's <u>terms</u> and <u>privacy policy</u>.</p></div><aside className="order-summary"><div className="summary-title"><span>Your bag</span><span>{cart.length} items</span></div>{cart.length === 0 ? <div className="empty-checkout">Your bag is waiting.<button onClick={() => onNavigate("shop")}>Browse bags <ArrowRight size={14} /></button></div> : cart.map((line) => <div className="summary-line" key={`${line.product.id}-${line.color}`}><img src={line.product.image} alt="" /><span><strong>{line.product.name}</strong><small>{colorNames[line.color]} · Qty {line.quantity}</small></span><b>{money(line.product.price * line.quantity)}</b></div>)}<div className="summary-totals"><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Shipping</span><span>{total >= 150 ? "Free" : "Calculated next"}</span></div><div className="total"><span>Total</span><b>{money(total)}</b></div></div><div className="payment-trust"><LockKeyhole size={15} /><span>Payments securely processed by Stripe</span></div></aside></div></section>;
}

function AdminLogin({ onNavigate, onLogin }: { onNavigate: (page: Page) => void; onLogin: () => void }) {
  const [error, setError] = useState(false);
  return <section className="admin-login-page"><div className="admin-login-art"><div className="admin-login-art-copy"><span className="eyebrow light">Owner access / 01</span><h1>Your store,<br /><em>in motion.</em></h1><p>Manage products, orders, inventory, and the next chapter of NK GREAT GLOBAL ENTERPRISE.</p></div><div className="admin-login-coordinates">45° 31' N<br />122° 40' W</div></div><div className="admin-login-panel"><button className="wordmark admin-login-logo" onClick={() => onNavigate("home")}><span className="wordmark-mark">NK</span><span className="brand-lockup"><strong>NK GREAT GLOBAL</strong><small>ENTERPRISE</small></span></button><div className="admin-login-form"><div className="eyebrow">Private workspace</div><h2>Welcome back.</h2><p>Sign in to your owner dashboard.</p><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); if (!form.get("email") || !form.get("password")) { setError(true); return; } onLogin(); }}><label>Email address<input name="email" type="email" placeholder="owner@example.com" required /></label><label>Password<div className="password-field"><input name="password" type="password" placeholder="Enter your password" required /><LockKeyhole size={15} /></div></label>{error && <span className="login-error">Enter your owner email and password to continue.</span>}<button className="button button-dark login-submit">Sign in securely <ArrowRight size={15} /></button></form><div className="login-security"><ShieldCheck size={16} /><span><strong>Protected workspace</strong><small>Use Supabase Auth and server-side role checks in production.</small></span></div><button className="text-button login-back" onClick={() => onNavigate("home")}>← Back to storefront</button></div></div></section>;
}

function CartDrawer({ open, cart, total, onClose, onQuantity, onCheckout }: { open: boolean; cart: CartLine[]; total: number; onClose: () => void; onQuantity: (index: number, delta: number) => void; onCheckout: () => void }) {
  if (!open) return null;
  return <div className="drawer-overlay" onClick={onClose}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><div className="eyebrow">Your carry</div><h2>Bag <span>{cart.length}</span></h2></div><button className="icon-button" onClick={onClose}><X size={19} /></button></div>{cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={31} /><h3>Your bag is light.</h3><p>Good things are worth finding.</p><button className="button button-dark" onClick={onClose}>Continue shopping <ArrowRight size={15} /></button></div> : <><div className="cart-lines">{cart.map((line, index) => <div className="cart-line" key={`${line.product.id}-${line.color}`}><img src={line.product.image} alt="" /><div className="cart-line-copy"><div><strong>{line.product.name}</strong><small>{colorNames[line.color]} · {line.product.capacity}</small></div><b>{money(line.product.price * line.quantity)}</b><div className="quantity"><button onClick={() => onQuantity(index, -1)}><Minus size={13} /></button><span>{line.quantity}</span><button onClick={() => onQuantity(index, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="drawer-bottom"><div className="drawer-total"><span>Subtotal</span><b>{money(total)}</b></div><p><Truck size={14} /> {total >= 150 ? "You qualify for free shipping." : `Add ${money(150 - total)} for free shipping.`}</p><button className="button button-dark" onClick={onCheckout}>Checkout securely <LockKeyhole size={15} /></button><button className="text-button continue-link" onClick={onClose}>Continue shopping</button></div></>}</aside></div>;
}

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="newsletter"><div><div className="eyebrow light">A note from the trail</div><h2>10% off your<br /><em>first escape.</em></h2><p>Get field notes, packing lists, and early access to new gear.</p></div>{submitted ? <div className="newsletter-success"><Check size={18} /> You're on the list. See you out there.</div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor="newsletter-email">Email address</label><div><input id="newsletter-email" type="email" required placeholder="you@example.com" /><button className="button button-light">Sign me up <ArrowRight size={15} /></button></div><small>By subscribing, you agree to receive Northline updates. Unsubscribe anytime.</small></form>}</section>;
}

function Footer({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><button className="wordmark inverse" onClick={() => onNavigate("home")}><span className="wordmark-mark">N</span><span className="brand-name">NK GREAT GLOBAL ENTERPRISE</span></button><p>Carry less. See more.<br />Made for the in-between.</p><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram size={16} /></a><a href="#email" aria-label="Email"><Mail size={16} /></a></div></div><div className="footer-links"><div><span>Explore</span><button onClick={() => onNavigate("shop")}>Shop all bags</button><button onClick={() => onNavigate("about")}>Our story</button><button onClick={() => onNavigate("support")}>Journal</button></div><div><span>Help</span><button onClick={() => onNavigate("support")}>Contact support</button><button onClick={() => onNavigate("support")}>Shipping & returns</button><button onClick={() => onNavigate("support")}>FAQ</button></div><div><span>For the curious</span><button>Materials</button><button>Repairs</button><button>Stockists</button></div></div></div><div className="footer-bottom"><span>© 2024 NK Great Global Enterprise.</span><span>Portland, Oregon · Made for everywhere</span><span><button>Privacy</button> <button>Terms</button></span></div></footer>;
}

function Admin({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [adminTab, setAdminTab] = useState("Overview");
  const tabs = [{ label: "Overview", icon: LayoutDashboard }, { label: "Homepage", icon: Sparkles }, { label: "Products", icon: Tag }, { label: "Orders", icon: PackageCheck }, { label: "Customers", icon: Users }];
  return <section className="admin-page"><aside className="admin-sidebar"><button className="wordmark admin-logo" onClick={() => onNavigate("home")}><span className="wordmark-mark">NK</span><span className="brand-name">NK GREAT GLOBAL ENTERPRISE</span></button><div className="admin-store"><span className="store-avatar">N</span><span><strong>NK Great Global Enterprise</strong><small>Store studio</small></span><ChevronDown size={14} /></div><nav>{tabs.map(({ label, icon: Icon }) => <button key={label} className={adminTab === label ? "active" : ""} onClick={() => setAdminTab(label)}><Icon size={17} /> {label}</button>)}</nav><div className="admin-sidebar-bottom"><button><Settings size={17} /> Settings</button><button onClick={() => onNavigate("home")}><ExternalLink size={17} /> View storefront</button><div className="admin-user"><span>AR</span><div><strong>Alex Rivera</strong><small>Owner</small></div><MoreHorizontal size={16} /></div></div></aside><div className="admin-main"><div className="admin-topbar"><div><button className="mobile-admin-menu"><Menu size={18} /></button><span>Wednesday, October 9, 2024</span><h1>{adminTab}</h1></div><div className="admin-top-actions"><button className="admin-search"><Search size={16} /> Search</button><button className="icon-button"><CircleHelp size={17} /></button><button className="admin-notifications"><span /> <MoreHorizontal size={18} /></button></div></div>{adminTab === "Overview" && <AdminOverview />}{adminTab === "Homepage" && <AdminHomepage />}{adminTab === "Products" && <AdminProducts />}{adminTab === "Orders" && <AdminOrders />}{adminTab === "Customers" && <AdminCustomers />}</div></section>;
}

function AdminOverview() {
  return <div className="admin-content"><div className="admin-welcome"><div><div className="eyebrow">Your store at a glance</div><h2>Good morning, Alex <span>✦</span></h2><p>Here's what is moving through Northline today.</p></div><button className="button button-dark"><Plus size={16} /> Add product</button></div><div className="metric-grid"><div className="metric-card"><span>Gross revenue <MoreHorizontal size={16} /></span><strong>₦24,680.40</strong><small className="positive">↑ 18.4% <em>vs last month</em></small><div className="mini-chart revenue-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="metric-card"><span>Orders <MoreHorizontal size={16} /></span><strong>184</strong><small className="positive">↑ 12.8% <em>vs last month</em></small><div className="order-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div><div className="metric-card"><span>Avg. order value <MoreHorizontal size={16} /></span><strong>₦134.13</strong><small className="positive">↑ 4.7% <em>vs last month</em></small><div className="spark-line">╱╲╱╲╱╲╱╲╱╲</div></div></div><div className="admin-grid"><div className="admin-panel sales-panel"><div className="panel-heading"><div><span className="panel-kicker">Performance</span><h3>Sales overview</h3></div><select><option>Last 30 days</option><option>Last 90 days</option></select></div><div className="chart-legend"><span><i className="legend-revenue" /> Revenue</span><span><i className="legend-orders" /> Orders</span></div><div className="sales-chart"><div className="chart-y"><span>₦8k</span><span>₦6k</span><span>₦4k</span><span>₦2k</span><span>₦0</span></div><div className="chart-area"><div className="chart-fill" /><div className="chart-line" /><div className="chart-grid-lines"><i /><i /><i /><i /><i /></div><div className="chart-x"><span>Sep 10</span><span>Sep 17</span><span>Sep 24</span><span>Oct 1</span><span>Oct 8</span></div></div></div></div><div className="admin-panel low-stock"><div className="panel-heading"><div><span className="panel-kicker">Attention needed</span><h3>Low stock</h3></div><button className="panel-link">View all <ArrowRight size={14} /></button></div>{[{ name: "Trail Sling", color: "Moss", stock: 4, image: products[3].image }, { name: "Ridge 35L Pack", color: "Sand", stock: 7, image: products[0].image }, { name: "Roam Duffel 42L", color: "Cedar", stock: 9, image: products[1].image }].map((item) => <div className="stock-row" key={item.name}><img src={item.image} alt="" /><span><strong>{item.name}</strong><small>{item.color}</small></span><b className={item.stock < 5 ? "critical" : ""}>{item.stock} left</b></div>)}<button className="stock-manage">Manage inventory <ArrowRight size={14} /></button></div></div><div className="admin-panel recent-orders"><div className="panel-heading"><div><span className="panel-kicker">Latest activity</span><h3>Recent orders</h3></div><button className="panel-link">View all <ArrowRight size={14} /></button></div><table><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th><th>Total</th><th /></tr></thead><tbody>{[["#NL-20480", "Sofia Kim", "Oct 9, 2024", "Processing", "₦286.00"], ["#NL-20479", "Jon Bell", "Oct 9, 2024", "Shipped", "₦198.00"], ["#NL-20478", "Amelia Stone", "Oct 8, 2024", "Delivered", "₦168.00"], ["#NL-20477", "Theo Grant", "Oct 8, 2024", "Delivered", "₦88.00"]].map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td><span className={`status status-${row[3].toLowerCase()}`}>{row[3]}</span></td><td><strong>{row[4]}</strong></td><td><MoreHorizontal size={16} /></td></tr>)}</tbody></table></div></div>;
}

function AdminProducts() {
  return <div className="admin-content"><div className="admin-welcome"><div><div className="eyebrow">Catalog</div><h2>Products <span className="admin-count">{products.length}</span></h2><p>Manage your collection, variants, and stock.</p></div><button className="button button-dark"><Plus size={16} /> Add product</button></div><div className="admin-panel product-management"><div className="management-toolbar"><div className="admin-search wide"><Search size={16} /> Search products</div><button><Filter size={15} /> Filter</button><button>Export <ChevronDown size={14} /></button></div><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Inventory</th><th>Status</th><th /></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><div className="admin-product"><img src={product.image} alt="" /><strong>{product.name}</strong></div></td><td>{product.kind}</td><td>{money(product.price)}</td><td>{product.id === "trail-sling" ? 4 : product.id === "ridge-35" ? 37 : 18} units</td><td><span className="status status-active">Active</span></td><td><MoreHorizontal size={16} /></td></tr>)}</tbody></table></div></div>;
}

function AdminOrders() {
  return <div className="admin-content"><div className="admin-welcome"><div><div className="eyebrow">Fulfillment</div><h2>Orders <span className="admin-count">184</span></h2><p>Keep every journey moving.</p></div><button className="button button-dark"><PackageCheck size={16} /> Fulfillment guide</button></div><div className="order-status-cards"><div><span>All orders</span><strong>184</strong></div><div><span>To fulfill</span><strong>12</strong><small>Needs attention</small></div><div><span>In transit</span><strong>28</strong></div><div><span>Returns</span><strong>3</strong></div></div><div className="admin-panel product-management"><div className="management-toolbar"><div className="admin-search wide"><Search size={16} /> Search orders</div><button><Filter size={15} /> Filter by status</button></div><table><thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Placed</th><th>Status</th><th>Total</th></tr></thead><tbody>{[["#NL-20480", "Sofia Kim", "Atlas Carry-on", "Today, 9:42 AM", "Processing", "₦286.00"], ["#NL-20479", "Jon Bell", "Ridge 35L Pack", "Today, 8:18 AM", "Shipped", "₦198.00"], ["#NL-20478", "Amelia Stone", "Roam Duffel 42L", "Yesterday", "Delivered", "₦168.00"], ["#NL-20477", "Theo Grant", "Trail Sling", "Yesterday", "Delivered", "₦88.00"]].map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><span className={`status status-${row[4].toLowerCase()}`}>{row[4]}</span></td><td><strong>{row[5]}</strong></td></tr>)}</tbody></table></div></div>;
}

function AdminCustomers() {
  return <div className="admin-content"><div className="admin-welcome"><div><div className="eyebrow">Relationships</div><h2>Customers <span className="admin-count">2,408</span></h2><p>Understand the people carrying Northline.</p></div><button className="button button-dark"><Users size={16} /> Customer insights</button></div><div className="metric-grid two"><div className="metric-card"><span>Total customers</span><strong>2,408</strong><small className="positive">↑ 9.2% <em>this quarter</em></small></div><div className="metric-card"><span>Repeat purchase rate</span><strong>34.8%</strong><small className="positive">↑ 3.1% <em>this quarter</em></small></div></div><div className="admin-panel product-management"><div className="management-toolbar"><div className="admin-search wide"><Search size={16} /> Search customers</div><button>Export <ChevronDown size={14} /></button></div><table><thead><tr><th>Customer</th><th>Location</th><th>Orders</th><th>Lifetime value</th><th>Last order</th><th /></tr></thead><tbody>{[["Sofia Kim", "Brooklyn, NY", "4", "₦712.00", "Today"], ["Jon Bell", "Austin, TX", "2", "₦356.00", "Today"], ["Amelia Stone", "Seattle, WA", "6", "₦1,124.00", "Yesterday"], ["Theo Grant", "Denver, CO", "3", "₦444.00", "Yesterday"]].map((row, index) => <tr key={row[0]}><td><div className="customer-cell"><span>{["SK", "JB", "AS", "TG"][index]}</span><strong>{row[0]}</strong></div></td><td>{row[1]}</td><td>{row[2]}</td><td><strong>{row[3]}</strong></td><td>{row[4]}</td><td><MoreHorizontal size={16} /></td></tr>)}</tbody></table></div></div>;
}

function AdminHomepage() {
  const [heroEnabled, setHeroEnabled] = useState(true);
  const [promoEnabled, setPromoEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const [heroEyebrow, setHeroEyebrow] = useState("Built for the in-between");
  const [heroTitle, setHeroTitle] = useState("Carry what calls you.");
  const [heroDescription, setHeroDescription] = useState("Thoughtful bags for the routes that matter, from the morning commute to the long way home.");
  const [heroCta, setHeroCta] = useState("Explore the collection");
  const [featuredCount, setFeaturedCount] = useState("3");

  const saveChanges = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <div className="admin-content homepage-content"><div className="admin-welcome"><div><div className="eyebrow">Storefront control room</div><h2>Shape the first impression <span>✦</span></h2><p>Update the homepage without touching code. Changes stay in draft until you publish.</p></div><div className="admin-action-row"><button className="button button-light admin-outline-button"><Eye size={15} /> Preview homepage</button><button className="button button-dark" onClick={saveChanges}><Save size={15} /> {saved ? "Published" : "Publish changes"}</button></div></div><div className="homepage-editor"><div className="homepage-editor-main"><div className="admin-panel homepage-card"><div className="panel-heading"><div><span className="panel-kicker">Above the fold</span><h3>Hero banner</h3></div><button className={`editor-toggle ${heroEnabled ? "on" : ""}`} onClick={() => setHeroEnabled(!heroEnabled)}><span /> {heroEnabled ? "Visible" : "Hidden"}</button></div><div className="homepage-form-grid"><label>Eyebrow<input value={heroEyebrow} onChange={(event) => setHeroEyebrow(event.target.value)} /></label><label>Button label<input value={heroCta} onChange={(event) => setHeroCta(event.target.value)} /></label><label className="field-wide">Headline<input value={heroTitle} onChange={(event) => setHeroTitle(event.target.value)} /></label><label className="field-wide">Supporting copy<textarea value={heroDescription} onChange={(event) => setHeroDescription(event.target.value)} rows={3} /></label></div><div className="homepage-image-picker"><img src={images.hero} alt="Current hero banner" /><div><span className="panel-kicker">Desktop + mobile image</span><strong>Mountain route / hero-01</strong><small>Recommended 1800 × 1200 px · JPG, PNG, or WebP</small></div><button><ImageIcon size={14} /> Replace image</button></div></div><div className="admin-panel homepage-card"><div className="panel-heading"><div><span className="panel-kicker">Announcement strip</span><h3>Promotion message</h3></div><button className={`editor-toggle ${promoEnabled ? "on" : ""}`} onClick={() => setPromoEnabled(!promoEnabled)}><span /> {promoEnabled ? "Visible" : "Hidden"}</button></div><div className="homepage-form-grid promotion-fields"><label className="field-wide">Message<input defaultValue="Free shipping on orders over ₦150" /></label><label>Link label<input defaultValue="See details" /></label><label>Link destination<select defaultValue="support"><option value="shop">Shop collection</option><option value="support">Shipping & returns</option><option value="about">Our story</option></select></label></div></div><div className="admin-panel homepage-card"><div className="panel-heading"><div><span className="panel-kicker">Merchandising</span><h3>Featured collection</h3></div><select className="panel-select" value={featuredCount} onChange={(event) => setFeaturedCount(event.target.value)}><option value="3">3 products</option><option value="4">4 products</option></select></div><div className="featured-product-list">{products.slice(0, Number(featuredCount)).map((product, index) => <div className="featured-product-row" key={product.id}><GripVertical size={15} /><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.kind} · {money(product.price)}</small></span><button aria-label={`Toggle ${product.name}`}><Eye size={15} /></button><b>0{index + 1}</b></div>)}</div><button className="text-button add-section-button"><Plus size={14} /> Add a product section</button></div></div><aside className="homepage-editor-side"><div className="admin-panel homepage-preview-panel"><div className="panel-heading"><div><span className="panel-kicker">Live canvas</span><h3>Homepage preview</h3></div><span className="preview-live"><i /> Draft</span></div><div className={`homepage-mini-preview ${heroEnabled ? "" : "muted"}`}><img src={images.hero} alt="Homepage preview" /><div><span>{heroEyebrow}</span><strong>{heroTitle}</strong><small>{heroDescription}</small><b>{heroCta} <ArrowRight size={12} /></b></div></div><button className="button button-dark preview-button"><Eye size={15} /> Open full preview</button></div><div className="admin-panel publish-panel"><div className="panel-heading"><div><span className="panel-kicker">Release checklist</span><h3>Ready to publish?</h3></div><Check size={17} /></div><div className="publish-check"><span><Check size={12} /></span><div><strong>Hero copy complete</strong><small>Headline, image, and CTA are ready</small></div></div><div className="publish-check"><span><Check size={12} /></span><div><strong>Promotion reviewed</strong><small>{promoEnabled ? "Visible on the storefront" : "Currently hidden"}</small></div></div><div className="publish-check"><span className="pending"><Eye size={11} /></span><div><strong>Preview on mobile</strong><small>Recommended before publishing</small></div></div><button className="button button-dark publish-button" onClick={saveChanges}><Save size={14} /> {saved ? "Changes published" : "Save and publish"}</button></div><div className="admin-panel homepage-sections"><div className="panel-heading"><div><span className="panel-kicker">Page structure</span><h3>Sections on home</h3></div><GripVertical size={15} /></div>{[["01", "Hero banner", heroEnabled], ["02", "Trust strip", true], ["03", "Featured collection", true], ["04", "Our story", true], ["05", "Newsletter", true]].map(([number, label, visible]) => <div className="homepage-section-row" key={label}><GripVertical size={13} /><span>{number}</span><strong>{label}</strong><button aria-label={`Toggle ${label}`}><Eye size={14} color={visible ? "#527365" : "#a6b0a9"} /></button></div>)}</div></aside></div></div>;
}

export default App;
