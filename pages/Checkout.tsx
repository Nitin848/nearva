import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string>('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: ''
  });

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-serif text-2xl mb-4">Your bag is empty</h2>
        <Link to="/shop" className="text-stone-900 border-b border-stone-900 hover:text-gold-600 hover:border-gold-600 transition-colors">Continue Shopping</Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      cartItems: cart,
      cartTotal: cartTotal
    };

    try {
      // Using text/plain to avoid CORS preflight OPTIONS request
      const response = await fetch('https://script.google.com/macros/s/AKfycbyu_OM0EJnAb4DZtIyqn3uRi9gA2l1tmTKg-LTI3vx3t0UQGP4JNk4iKph2-D-3xiRD/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();

      if (data.result === 'success') {
        setOrderId(data.orderId);
        clearCart();
        setStep(3);
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }

    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl text-center mb-12">Checkout</h1>
      
      <div className={`grid grid-cols-1 ${step !== 3 ? 'lg:grid-cols-2' : ''} gap-16`}>
        {/* Left Col: Forms or Success Message */}
        <div className={step === 3 ? 'mx-auto max-w-2xl w-full' : ''}>
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">Shipping Information</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                  />
                  <input 
                    required 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                  />
                </div>
                <input 
                  required 
                  type="email" 
                  name="email"
                  placeholder="Email Address" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                />
                <input 
                  required 
                  type="text" 
                  name="address"
                  placeholder="Address" 
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required 
                    type="text" 
                    name="city"
                    placeholder="City" 
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                  />
                  <input 
                    required 
                    type="text" 
                    name="postalCode"
                    placeholder="Postal Code" 
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                  />
                </div>
                <button type="submit" className="w-full bg-stone-900 text-white py-4 mt-4 text-sm uppercase tracking-widest hover:bg-stone-800">Continue to Payment</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-bold uppercase tracking-widest mb-6 border-b border-stone-200 pb-2">Payment</h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="bg-stone-50 p-4 border border-stone-200 rounded text-sm text-stone-500 mb-4">
                  <p>Secure SSL Encryption. This is a demo; no real payment will be processed.</p>
                </div>
                <input required type="text" placeholder="Card Number" className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="MM/YY" className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" />
                  <input required type="text" placeholder="CVC" className="w-full border border-stone-200 p-3 text-sm focus:outline-none focus:border-stone-900 transition-colors" />
                </div>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border border-stone-300 py-4 text-sm uppercase tracking-widest hover:border-stone-900">Back</button>
                  <button type="submit" disabled={loading} className="flex-1 bg-stone-900 text-white py-4 text-sm uppercase tracking-widest hover:bg-gold-600 transition-colors">
                    {loading ? 'Processing...' : `Pay $${cartTotal}`}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-fade-in">
              <h2 className="font-serif text-3xl mb-4">Thank You</h2>
              <p className="text-stone-600 mb-8">Your order has been placed successfully. Order #{orderId}</p>
              <Link to="/" className="inline-block bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-stone-800">Return Home</Link>
            </div>
          )}
        </div>

        {/* Right Col: Summary - Only show if not on success step */}
        {step !== 3 && (
          <div className="bg-stone-50 p-8 h-fit sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover bg-stone-200" />
                  <div className="flex-1">
                    <p className="text-sm font-serif">{item.name}</p>
                    <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span>${cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4">
                <span>Total</span>
                <span>${cartTotal}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;