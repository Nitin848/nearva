import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl mb-4">Contact Us</h1>
        <p className="text-stone-500 font-light max-w-lg mx-auto">
          We are here to assist with your order, styling advice, or any other inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6">Get in Touch</h2>
          <div className="space-y-8 text-sm font-light text-stone-600">
            <div>
              <p className="font-medium text-stone-900 mb-1">Customer Care</p>
              <p>Mon-Fri, 9am - 6pm EST</p>
              <p>+1 (800) 555-0199</p>
              <p>care@nevara.com</p>
            </div>
            <div>
              <p className="font-medium text-stone-900 mb-1">Press Inquiries</p>
              <p>press@nevara.com</p>
            </div>
            <div>
              <p className="font-medium text-stone-900 mb-1">Showroom</p>
              <p>123 Luxury Ave, Suite 400</p>
              <p>New York, NY 10012</p>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full border-b border-stone-300 py-3 bg-transparent text-sm focus:outline-none focus:border-stone-900 transition-colors" />
          <input type="email" placeholder="Email" className="w-full border-b border-stone-300 py-3 bg-transparent text-sm focus:outline-none focus:border-stone-900 transition-colors" />
          <textarea rows={4} placeholder="Message" className="w-full border-b border-stone-300 py-3 bg-transparent text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none"></textarea>
          <button type="submit" className="bg-stone-900 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold-600 transition-colors mt-4">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
