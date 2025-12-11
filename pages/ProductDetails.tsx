import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useStore } from '../context/StoreContext';
import { Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useStore();
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');

  if (!product) {
    return <div className="text-center py-24">Product not found. <Link to="/shop" className="underline">Back to Shop</Link></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Section */}
        <div className="bg-stone-100 aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-sm text-stone-500 uppercase tracking-wide">{product.category}</div>
          <h1 className="font-serif text-4xl text-stone-900 mb-4">{product.name}</h1>
          <div className="flex items-center mb-6">
            <div className="flex text-gold-500 mr-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <span className="text-xs text-stone-400">(12 Reviews)</span>
          </div>
          
          <p className="text-2xl font-light text-stone-900 mb-8">${product.price}</p>
          
          <p className="text-stone-600 leading-relaxed mb-8 font-light">
            {product.description} Crafted with precision and care, this piece is designed to be a timeless addition to your collection.
          </p>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest hover:bg-gold-600 transition-colors mb-8"
          >
            Add to Bag
          </button>

          <div className="flex justify-between text-xs text-stone-500 border-t border-b border-stone-100 py-6 mb-8">
            <div className="flex flex-col items-center gap-2">
              <Truck size={20} />
              <span>Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={20} />
              <span>2 Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <RefreshCw size={20} />
              <span>Free Returns</span>
            </div>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-stone-200 mb-4">
              {['Description', 'Details', 'Shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase() as 'description' | 'details' | 'shipping')}
                  className={`pb-2 mr-8 text-sm uppercase tracking-wide transition-colors ${
                    activeTab === tab.toLowerCase() 
                      ? 'border-b-2 border-stone-900 text-stone-900' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="text-sm text-stone-600 font-light leading-relaxed min-h-[100px]">
              {activeTab === 'description' && <p>Designed in our London studio, this piece features high-quality materials ethically sourced from conflict-free zones. Each item is inspected for quality assurance.</p>}
              {activeTab === 'details' && <ul className="list-disc pl-4 space-y-1"><li>Material: 18k Recycled Gold</li><li>Gemstone: Lab-grown Diamond</li><li>Weight: 4.5g</li></ul>}
              {activeTab === 'shipping' && <p>We offer complimentary global shipping. Orders are processed within 24 hours. Estimated delivery: 3-5 business days.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;