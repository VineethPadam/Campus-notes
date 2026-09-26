'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Download, Loader2, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayButtonProps {
  noteId?: string;
  priceINR?: string;
  notesTitle?: string;
  buttonLabel?: string;
}

export default function RazorpayButton({
  noteId = 'java',
  priceINR = '49',
  notesTitle = 'Java Programming Language — Complete Handwritten Notes',
  buttonLabel,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Dynamically load Razorpay standard checkout script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const downloadNotes = async (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    isMock?: boolean;
    noteId?: string;
  }) => {
    try {
      setStatusText(`Downloading ${noteId === 'spring-boot' ? 'Spring Boot' : 'Java'} Notes PDF...`);
      const response = await fetch('/api/verify-and-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...paymentDetails, noteId }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        alert(errJson.error || 'Payment verification failed');
        return;
      }

      // Download file directly in browser
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      const fileNameMap: Record<string, string> = {
        'spring-boot': 'spring-boot-jpa-notes.pdf',
        'java': 'java-programming-notes.pdf',
        'c-100-coding': 'c-100-master-solved-programs.pdf',
        'c-textbook': 'c-programming-master-textbook.pdf',
        'c-combo': 'c-programming-complete-combo.pdf',
      };

      a.href = url;
      a.download = fileNameMap[noteId || 'java'] || 'programming-notes.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.error('Download Error:', err);
      alert('Download failed. Please try again or contact support.');
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setStatusText('Initializing Razorpay Checkout...');

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        setStatusText('');
        return;
      }

      // Step 1: Create Order on backend API
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId }),
      });

      const orderData = await res.json();

      if (!orderData.success) {
        alert(orderData.message || 'Error initializing payment order');
        setLoading(false);
        setStatusText('');
        return;
      }

      // Step 2: If key is placeholder, simulate instant test checkout & download
      if (orderData.isMock) {
        setStatusText('Test mode: Simulating payment & downloading PDF...');
        await downloadNotes({
          razorpay_payment_id: 'pay_mock_' + Date.now(),
          razorpay_order_id: orderData.orderId,
          razorpay_signature: 'mock_signature',
          isMock: true,
          noteId,
        });
        setLoading(false);
        setStatusText('');
        return;
      }

      // Real Razorpay Standard Checkout Popup
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Campus Notes',
        description: notesTitle,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          await downloadNotes({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            isMock: false,
            noteId,
          });
          setLoading(false);
          setStatusText('');
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setStatusText('');
          },
        },
        theme: {
          color: '#10b981', // Emerald theme
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error: any) {
      console.error('Payment Error:', error);
      alert('Payment processing failed. Please try again.');
      setLoading(false);
      setStatusText('');
    }
  };

  const defaultButtonLabel = `Pay ₹${priceINR} & Download ${noteId === 'spring-boot' ? 'Spring Boot' : 'Java'} Notes`;

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-3">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base sm:text-lg py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
            <span>{statusText || 'Processing...'}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
            <span>{buttonLabel || defaultButtonLabel}</span>
          </>
        )}
      </button>

      {statusText && !loading && (
        <p className="text-xs text-emerald-400 font-semibold text-center animate-pulse">
          {statusText}
        </p>
      )}
    </div>
  );
}
