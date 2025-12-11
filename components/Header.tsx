import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Header: React.FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { cart, wishlist, setIsCartOpen } = useStore();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Story', path: '/#story' },
    { name: 'Contact', path: '/contact' },
  ];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Mobile Menu */}
        <button className="md:hidden p-2 -ml-2 text-stone-600" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="font-serif text-3xl tracking-widest text-stone-900 font-semibold">
            NEVARA
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm uppercase tracking-wider transition-colors hover:text-gold-600 ${
                location.pathname === link.path ? 'text-stone-900 font-bold' : 'text-stone-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link to="/shop" className="text-stone-600 hover:text-stone-900 transition-colors">
            <Search size={20} />
          </Link>
          <div className="relative hidden sm:block">
            <Heart size={20} className="text-stone-600 hover:text-stone-900 transition-colors cursor-pointer" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-gold-500 rounded-full"></span>
            )}
          </div>
          <button 
            className="relative text-stone-600 hover:text-stone-900 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
