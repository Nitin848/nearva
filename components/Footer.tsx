import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl text-white tracking-widest">NEVARA</h2>
          <p className="text-sm font-light leading-relaxed max-w-xs">
            Crafting moments of brilliance with ethically sourced materials and timeless design.
          </p>
        </div>

        <div>
          <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Collections</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link to="/shop?cat=Necklaces" className="hover:text-gold-400 transition-colors">Necklaces</Link></li>
            <li><Link to="/shop?cat=Rings" className="hover:text-gold-400 transition-colors">Rings</Link></li>
            <li><Link to="/shop?cat=Earrings" className="hover:text-gold-400 transition-colors">Earrings</Link></li>
            <li><Link to="/shop?cat=Bracelets" className="hover:text-gold-400 transition-colors">Bracelets</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Customer Care</h3>
          <ul className="space-y-3 text-sm font-light">
            <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">Care Guide</a></li>
            <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h3>
          <p className="text-sm font-light mb-4">Subscribe for exclusive access.</p>
          <form className="flex border-b border-stone-700 pb-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent w-full outline-none text-white placeholder-stone-500 text-sm"
            />
            <button className="text-xs uppercase tracking-widest text-gold-400 hover:text-white transition-colors">Join</button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Nevara Jewelry. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
