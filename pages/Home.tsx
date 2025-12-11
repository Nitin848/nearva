import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, REVIEWS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Star, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full bg-stone-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Jewelry Model" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <p className="text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in-up">The New Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 animate-fade-in-up delay-100 drop-shadow-lg">
            Timeless Elegance
          </h1>
          <Link 
            to="/shop" 
            className="border border-white bg-white/10 backdrop-blur-sm px-8 py-4 text-sm uppercase tracking-widest hover:bg-white hover:text-stone-900 transition-all duration-300 animate-fade-in-up delay-200"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">Curated Selections</h2>
            <p className="text-stone-500 font-light">Handpicked favorites for the modern muse.</p>
          </div>
          <Link to="/shop" className="hidden md:flex items-center text-sm font-medium hover:text-gold-600 transition-colors">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center md:hidden">
          <Link to="/shop" className="inline-flex items-center text-sm font-medium hover:text-gold-600 transition-colors">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="bg-stone-100 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-stone-300 z-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80" 
              alt="Artisan working" 
              className="relative z-10 w-full h-auto object-cover shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6">The Art of Nevara</h2>
            <p className="text-stone-600 leading-relaxed mb-6 font-light">
              Founded on the principles of refined luxury and conscious craftsmanship, Nevara creates pieces that transcend trends. 
              Each gemstone is ethically sourced, and every setting is hand-finished by master artisans who have dedicated their lives to the craft.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8 font-light">
              We believe jewelry is more than an accessory—it is a memory, a feeling, and a legacy passed down through generations.
            </p>
            <Link to="/contact" className="text-stone-900 border-b border-stone-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors uppercase text-xs tracking-widest">
              Read Our Full Story
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-serif text-3xl text-stone-900 mb-16">Client Love</h2>
        <div className="grid gap-12">
          {REVIEWS.map(review => (
            <div key={review.id} className="flex flex-col items-center">
              <div className="flex text-gold-500 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg md:text-xl font-serif italic text-stone-800 mb-6">"{review.comment}"</p>
              <p className="text-xs uppercase tracking-widest text-stone-500">— {review.user}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;