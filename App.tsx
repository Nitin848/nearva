import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import AIConcierge from './components/AIConcierge';
import { StoreProvider, useStore } from './context/StoreContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

// Cart Drawer Component (Internal for simplicity)
const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useStore();
  
  return (
    <div className={`fixed inset-0 z-50 flex justify-end transition-visibility duration-300 ${isCartOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Drawer */}
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-stone-100">
          <h2 className="font-serif text-xl">Shopping Bag ({cart.reduce((a, c) => a + c.quantity, 0)})</h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:text-gold-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="text-center text-stone-500 mt-20">
              <p>Your bag is empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-sm underline">Continue Shopping</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-stone-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-sm font-medium">{item.name}</h3>
                    <p className="text-sm font-medium">${item.price * item.quantity}</p>
                  </div>
                  <p className="text-xs text-stone-500 uppercase mb-4">{item.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-stone-200 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-100"><Minus size={14} /></button>
                      <span className="px-2 text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-100"><Plus size={14} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-stone-600">Subtotal</span>
              <span className="font-bold text-lg">${cartTotal}</span>
            </div>
            <Link 
              to="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="block w-full bg-stone-900 text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-gold-600 transition-colors"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Scroll To Top Wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <StoreProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header toggleSidebar={() => setSidebarOpen(true)} />
          
          {/* Mobile Sidebar Navigation */}
          <div className={`fixed inset-0 z-50 transition-visibility duration-300 md:hidden ${sidebarOpen ? 'visible' : 'invisible'}`}>
            <div className={`absolute inset-0 bg-black/50 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`} onClick={() => setSidebarOpen(false)} />
            <div className={`absolute left-0 top-0 bottom-0 w-64 bg-white p-6 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-serif text-2xl">NEVARA</h2>
                <button onClick={() => setSidebarOpen(false)}><X size={24} /></button>
              </div>
              <nav className="flex flex-col space-y-4">
                <a href="#/" className="text-lg font-light" onClick={() => setSidebarOpen(false)}>Home</a>
                <a href="#/shop" className="text-lg font-light" onClick={() => setSidebarOpen(false)}>Shop</a>
                <a href="#/shop?cat=Rings" className="text-lg font-light pl-4 text-stone-500" onClick={() => setSidebarOpen(false)}>Rings</a>
                <a href="#/shop?cat=Necklaces" className="text-lg font-light pl-4 text-stone-500" onClick={() => setSidebarOpen(false)}>Necklaces</a>
                <a href="#/contact" className="text-lg font-light" onClick={() => setSidebarOpen(false)}>Contact</a>
              </nav>
            </div>
          </div>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          
          <Footer />
          <CartDrawer />
          <AIConcierge />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;