'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ShieldCheck, Download, Loader2, Sparkles, Lock, X, Check, Copy, AlertCircle, Phone } from 'lucide-react';

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
  
  // Modals state
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    phone: string;
    password: string;
    paymentId: string;
    orderId: string;
    signature?: string;
    isMock?: boolean;
  } | null>(null);

  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  useEffect(() => {
    // Pre-populate phone if user previously entered it
    const saved = localStorage.getItem('campus_user_phone');
    if (saved) {
      setPhoneNumber(saved);
    }
  }, []);

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

  const handleOpenPhonePrompt = () => {
    setPhoneError('');
    setPhoneModalOpen(true);
  };

  const executeCheckout = async (phone: string) => {
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
        body: JSON.stringify({ noteId, phone }),
      });

      const orderData = await res.json();

      if (!orderData.success) {
        alert(orderData.message || 'Error initializing payment order');
        setLoading(false);
        setStatusText('');
        return;
      }

      const generatedPassword = `${phone.slice(-5)}@tech`;

      // Step 2: If key is placeholder, simulate instant test checkout
      if (orderData.isMock) {
        const mockPaymentId = 'pay_mock_' + Date.now();
        savePurchaseToLocal({
          noteId,
          notesTitle,
          priceINR,
          phone,
          password: generatedPassword,
          paymentId: mockPaymentId,
          orderId: orderData.orderId,
          purchasedAt: new Date().toISOString(),
        });

        setPaymentSuccessData({
          phone,
          password: generatedPassword,
          paymentId: mockPaymentId,
          orderId: orderData.orderId,
          isMock: true,
        });

        setPhoneModalOpen(false);
        setSuccessModalOpen(true);
        setLoading(false);
        setStatusText('');

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
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
        prefill: {
          contact: phone,
        },
        handler: async function (response: any) {
          savePurchaseToLocal({
            noteId,
            notesTitle,
            priceINR,
            phone,
            password: generatedPassword,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            purchasedAt: new Date().toISOString(),
          });

          setPaymentSuccessData({
            phone,
            password: generatedPassword,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            isMock: false,
          });

          setPhoneModalOpen(false);
          setSuccessModalOpen(true);
          setLoading(false);
          setStatusText('');

          confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.6 },
          });
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

  const savePurchaseToLocal = (purchase: any) => {
    try {
      localStorage.setItem('campus_user_phone', purchase.phone);
      const existing = JSON.parse(localStorage.getItem('campus_notes_purchases') || '[]');
      const filtered = existing.filter((p: any) => p.paymentId !== purchase.paymentId);
      const updated = [
        {
          id: 'pur_' + Date.now() + Math.random().toString(36).substring(2, 6),
          ...purchase,
        },
        ...filtered,
      ];
      localStorage.setItem('campus_notes_purchases', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setPhoneError('');
    localStorage.setItem('campus_user_phone', clean);
    executeCheckout(clean);
  };

  const handleDownloadNow = async () => {
    if (!paymentSuccessData) return;
    try {
      setDownloading(true);
      const res = await fetch('/api/verify-and-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteId,
          phone: paymentSuccessData.phone,
          razorpay_payment_id: paymentSuccessData.paymentId,
          razorpay_order_id: paymentSuccessData.orderId,
          razorpay_signature: paymentSuccessData.signature || '',
          isMock: paymentSuccessData.isMock || false,
        }),
      });

      if (!res.ok) {
        alert('Payment verification or download failed. Contact neso.vvy123@gmail.com');
        setDownloading(false);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');

      const fileNameMap: Record<string, string> = {
        'spring-boot': 'spring-boot-jpa-notes.pdf',
        'java': 'java-programming-notes.pdf',
        'c-100-coding': 'c-100-master-solved-programs.pdf',
        'c-textbook': 'c-programming-master-textbook.pdf',
        'mysql': 'mysql-8-complete-master-textbook.pdf',
        'java-interview': 'cognizant-200-java-interview-guide.pdf',
        'web-development': 'html5-css3-developer-handbook.pdf',
      };

      a.href = url;
      a.download = fileNameMap[noteId] || `${noteId}-notes.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      setDownloaded(true);
    } catch (err) {
      console.error('Download error:', err);
      alert('Error downloading notes. Please contact support at neso.vvy123@gmail.com');
    } finally {
      setDownloading(false);
    }
  };

  const copyPasswordToClipboard = (pwd: string) => {
    navigator.clipboard.writeText(pwd);
    setPasswordCopied(true);
    setTimeout(() => setPasswordCopied(false), 2500);
  };

  const cleanDigits = phoneNumber.replace(/\D/g, '');
  const previewPassword = cleanDigits.length >= 5 ? `${cleanDigits.slice(-5)}@tech` : '•••••@tech';

  const defaultButtonLabel = `Pay ₹${priceINR} & Download ${noteId === 'spring-boot' ? 'Spring Boot' : noteId === 'java-interview' ? '200+ Cognizant Interview Guide' : noteId === 'web-development' ? 'HTML5 & CSS3 Handbook' : 'Java'} Notes`;

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2">
      {/* Primary Trigger Button */}
      <button
        onClick={handleOpenPhonePrompt}
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

      {/* Security & Password Pattern Badge Below Button */}
      <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-400">
        <Lock className="w-3 h-3 text-amber-400 flex-shrink-0" />
        <span>
          PDF Password: <strong className="text-amber-300 font-mono">[Last 5 digits of your phone]@tech</strong>
        </span>
      </div>

      {statusText && !loading && (
        <p className="text-xs text-emerald-400 font-semibold text-center animate-pulse">
          {statusText}
        </p>
      )}

      {/* MODAL 1: Phone Number Input & Password Preview (Before Checkout) */}
      {phoneModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            <button
              onClick={() => {
                if (!loading) setPhoneModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 p-1.5 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Secure PDF Encryption</span>
              </div>
              <h3 className="text-xl font-bold text-white">Enter Mobile Number</h3>
              <p className="text-xs text-gray-400">
                Purchasing: <span className="text-white font-semibold">{notesTitle}</span> (₹{priceINR})
              </p>
            </div>

            {/* Password Preview Box */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-3.5 space-y-1.5 text-xs text-amber-200">
              <div className="flex items-center space-x-1.5 font-bold text-amber-300">
                <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Personal Document Password</span>
              </div>
              <p className="text-[11px] leading-relaxed text-gray-300">
                Your PDF will be encrypted with your phone credentials:
              </p>
              <div className="bg-slate-950/90 border border-amber-700/50 rounded-lg p-2 font-mono font-bold text-amber-300 text-center text-sm tracking-wide">
                🔑 {previewPassword}
              </div>
              <p className="text-[10px] text-gray-400 italic">
                *Required to open PDF. Even if resaved or moved, this password cannot be removed.
              </p>
            </div>

            <form onSubmit={handleStartPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300 block">
                  10-Digit Mobile / WhatsApp Number:
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    autoFocus
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value.replace(/\D/g, ''));
                      setPhoneError('');
                    }}
                    placeholder="98765 43210"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-2.5 text-white font-mono text-base focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                {phoneError && (
                  <p className="text-xs text-rose-400 font-semibold flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{phoneError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl transition-all text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Proceed to Pay ₹{priceINR}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Payment Success & Direct Download Button */}
      {successModalOpen && paymentSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0f172a] border-2 border-emerald-500/60 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center">
            {/* Close Button */}
            <button
              onClick={() => setSuccessModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 p-1.5 rounded-full transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Celebration Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Payment Verified • ₹{priceINR}
              </span>
              <h3 className="text-2xl font-black text-white pt-1">Payment Successful!</h3>
              <p className="text-xs text-gray-300">{notesTitle}</p>
              <p className="text-[11px] text-gray-400">Mobile: +91 {paymentSuccessData.phone}</p>
            </div>

            {/* Password Display Card */}
            <div className="bg-slate-950/90 border-2 border-amber-500/50 rounded-xl p-4 space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>PDF Opening Password:</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                  Required to open
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-lg p-2.5">
                <span className="font-mono font-black text-xl text-amber-300 tracking-wider">
                  {paymentSuccessData.password}
                </span>
                <button
                  onClick={() => copyPasswordToClipboard(paymentSuccessData.password)}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-md text-xs font-bold flex items-center space-x-1 transition-all cursor-pointer"
                >
                  {passwordCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed pt-1">
                ⚠️ <strong className="text-gray-300">Important:</strong> All pages are secured. Enter this password in your PDF viewer. Even if you resave or move the file, the password cannot be removed.
              </p>
            </div>

            {/* Direct Download Button */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownloadNow}
                disabled={downloading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base py-4 px-6 rounded-xl transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                {downloading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Encrypting & Downloading PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 text-slate-950" />
                    <span>{downloaded ? 'Download PDF Again' : '📥 Click Here to Download PDF'}</span>
                  </>
                )}
              </button>

              {downloaded && (
                <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center space-x-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download completed! You can re-download anytime.</span>
                </p>
              )}
            </div>

            <button
              onClick={() => setSuccessModalOpen(false)}
              className="text-xs text-gray-400 hover:text-white underline pt-1 cursor-pointer block mx-auto"
            >
              Done / Return to Website
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
