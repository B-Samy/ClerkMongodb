'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';




export default function Payments() {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const res = await fetch('/api/create-order', { method: 'POST' });
    const data = await res.json();

    if (!data?.order) {
      alert('Failed to create order');
      setLoading(false);
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK');
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: 'Test Corp',
      description: 'Test Transaction',
      order_id: data.order.id,
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    setLoading(false);
  };

  return (
    <div className="products-wrapper">
    <h1 className="products-heading">🛍️ Our Products</h1>

    <div className="products-grid">
      {[
        { id: 1, title: 'Running Shoes', desc: 'Lightweight & breathable.', image: 'https://static.vecteezy.com/system/resources/thumbnails/030/656/394/small/3d-sneakers-by-alberto-seveso-advanced-color-scheme-free-photo.jpg' },
        { id: 2, title: 'Classic Hoodie', desc: 'Warm & stylish.', image: 'https://plus.unsplash.com/premium_photo-1673356302222-45a739587333?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 3, title: 'Smart Watch', desc: 'Track fitness & more.', image: 'https://images.unsplash.com/photo-1731759992335-dd7c0860903c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 4, title: 'Sunglasses', desc: 'Polarized for clarity.', image: 'https://plus.unsplash.com/premium_photo-1733156837233-22801af8b048?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 5, title: 'Denim Jacket', desc: 'Rugged comfort.', image: 'https://plus.unsplash.com/premium_photo-1700053641043-8cc03ce39b29?q=80&w=1714&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 6, title: 'Wireless Earbuds', desc: 'Crisp sound on the go.', image: 'https://images.unsplash.com/photo-1731763104706-a70d249efb71?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 7, title: 'Leather Belt', desc: 'Classic everyday belt.', image: 'https://images.unsplash.com/photo-1679759022724-d7d99ac932ce?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { id: 8, title: 'Backpack', desc: 'Spacious and durable.', image: 'https://images.unsplash.com/photo-1621609764049-5ee1db3d7c35?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
      ].map((product) => (
        <div className="product-card" key={product.id}>
          <Image src={product.image} alt={product.title} width={400} height={300} className="product-image" />
          <h2 className="product-title">{product.title}</h2>
          <p className="product-desc">{product.desc}</p>
          <button className="buy-button" onClick={handlePayment}>
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </div>
  );
}
