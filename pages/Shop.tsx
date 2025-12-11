import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat');
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCat = selectedCategory === 'All' || product.category === selectedCategory;
      const matchPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchCat && matchPrice;
    });
  }, [selectedCategory, priceRange]);

  const categories = ['All', ...Object.values(Category)];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h1 className="font-serif text-4xl text-stone-900">Shop Collection</h1>
        <button 
          className="md:hidden flex items-center mt-4 text-sm font-medium"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={16} className="mr-2" /> Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 space-y-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-sm ${selectedCategory === cat ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-900'} transition-colors`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Price Range</h3>
            <div className="flex items-center gap-4 text-sm text-stone-600 mb-2">
              <span>${priceRange[0]}</span>
              <span>-</span>
              <span>${priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              step="100"
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-stone-50">
              <p className="text-stone-500">No products found matching your criteria.</p>
              <button 
                onClick={() => {setSelectedCategory('All'); setPriceRange([0,5000]);}}
                className="mt-4 text-sm underline hover:text-gold-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
