import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative">
      <div className="aspect-[1/1] w-full overflow-hidden bg-stone-100 relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Quick actions overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
           <button 
             onClick={() => addToCart(product)}
             className="w-full bg-stone-900 text-white py-3 text-xs uppercase tracking-widest hover:bg-gold-600 transition-colors"
           >
             Add to Cart
           </button>
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-stone-400 hover:text-stone-900'}`} 
          />
        </button>
      </div>
      
      <div className="mt-4 flex justify-between items-start">
        <div>
          <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="text-sm font-medium text-stone-900 font-serif">
            <Link to={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-stone-900">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
