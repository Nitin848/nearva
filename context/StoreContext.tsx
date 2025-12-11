import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load from local storage on mount (optional simulation)
  useEffect(() => {
    const savedCart = localStorage.getItem('nevara_cart');
    const savedWishlist = localStorage.getItem('nevara_wishlist');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('nevara_cart', JSON.stringify(cart));
    localStorage.setItem('nevara_wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      setIsCartOpen(true);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      setIsCartOpen,
      cartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
};
