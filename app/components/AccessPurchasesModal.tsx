'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, X, Download, Copy, Check, Lock, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

interface PurchaseItem {
  id: string;
  noteId: string;
  notesTitle: string;
  priceINR: string;
  phone: string;
  password: string;
  paymentId: string;
  orderId: string;
  purchasedAt: string;
}

interface AccessPurchasesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessPurchasesModal({ isOpen, onClose }: AccessPurchasesModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchingPurchases, setMatchingPurchases] = useState<PurchaseItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-populate saved phone number if previously used
      const savedPhone = localStorage.getItem('campus_user_phone') || '';
      if (savedPhone) {
        setPhoneNumber(savedPhone);
        handleLookup(savedPhone);
      } else {
        setSearched(false);
        setMatchingPurchases([]);
      }
    }
  }, [isOpen]);

  const handleLookup = (phoneToSearch?: string) => {
    const raw = phoneToSearch || phoneNumber;
    const clean = raw.replace(/\D/g, '');
    setSearched(true);

    if (clean.length < 5) {
      setMatchingPurchases([]);
      return;
    }

    try {
      const stored = localStorage.getItem('campus_notes_purchases');
      if (stored) {
        const all: PurchaseItem[] = JSON.parse(stored);
        const filtered = all.filter((p) => {
          const pClean = (p.phone || '').replace(/\D/g, '');
          return pClean.endsWith(clean.slice(-10)) || clean.endsWith(pClean.slice(-10));
        });
        setMatchingPurchases(filtered);
      } else {
        setMatchingPurchases([]);
      }
    } catch (e) {
      console.error('Error reading purchases:', e);
      setMatchingPurchases([]);
    }
  };

  const handleCopyPassword = (id: string, pwd: string) => {
    navigator.clipboard.writeText(pwd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownload = async (item: PurchaseItem) => {
    try {
      setDownloadingId(item.id);
      const res = await fetch('/api/verify-and-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteId: item.noteId,
          phone: item.phone,
          razorpay_payment_id: item.paymentId,
          razorpay_order_id: item.orderId,
          isMock: true,
        }),
      });

      if (!res.ok) {
        alert('Could not download file. Please contact support at neso.vvy123@gmail.com');
        setDownloadingId(null);
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
      a.download = fileNameMap[item.noteId] || `${item.noteId}-notes.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error('Download error:', err);
      alert('Download error. Please try again or email neso.vvy123@gmail.com');
    } finally {
      setDownloadingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 p-2 rounded-full transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>My Library</span>
          </div>
          <h3 className="text-2xl font-bold text-white">Access Your Bought Books</h3>
          <p className="text-xs text-gray-400">
            Enter the 10-digit mobile number used during payment to view and download your notes.
          </p>
        </div>

        {/* Password Pattern Notice */}
        <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-3.5 text-xs text-amber-200/90 space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-amber-300">
            <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Document Security & Password Pattern</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Every downloaded PDF is encrypted with your personal password:
            <span className="font-mono font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded mx-1">
              [Last 5 digits of your phone]@tech
            </span>
            <br />
            <span className="text-gray-300">
              Example: If your phone is <strong className="text-white">9876543210</strong> &rarr; Password is{' '}
              <strong className="text-amber-300 font-mono">43210@tech</strong>. This password protects your file permanently even if resaved.
            </span>
          </p>
        </div>

        {/* Phone Lookup Input Form */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-300 block">Enter 10-Digit Mobile Number:</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                placeholder="98765 43210"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => handleLookup()}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all text-sm flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Find My Books</span>
            </button>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div className="space-y-3 pt-2 border-t border-slate-800">
            {matchingPurchases.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs text-gray-400">
                  Found <strong className="text-emerald-400">{matchingPurchases.length}</strong> purchase(s) for +91{' '}
                  <span className="font-mono text-white">{phoneNumber}</span>:
                </p>

                {matchingPurchases.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-4 space-y-3 hover:border-emerald-500/50 transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm">{item.notesTitle}</h4>
                        <p className="text-[11px] text-gray-400">
                          Purchased on {new Date(item.purchasedAt).toLocaleDateString()} • ₹{item.priceINR}
                        </p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                        PAID
                      </span>
                    </div>

                    {/* Password display */}
                    <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-400 text-[11px]">Opening Password: </span>
                        <span className="font-mono font-bold text-amber-300 ml-1">{item.password}</span>
                      </div>
                      <button
                        onClick={() => handleCopyPassword(item.id, item.password)}
                        className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 bg-slate-900 px-2 py-1 rounded border border-slate-700"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(item)}
                      disabled={downloadingId === item.id}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg transition-all text-xs flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer shadow"
                    >
                      {downloadingId === item.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Encrypting & Downloading PDF...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 text-slate-950" />
                          <span>Download Encrypted PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-amber-400 mx-auto" />
                <p className="text-xs font-semibold text-white">No purchases found on this browser for +91 {phoneNumber}</p>
                <p className="text-[11px] text-gray-400 max-w-md mx-auto leading-relaxed">
                  Purchases are automatically remembered on the browser where you completed the payment. If you paid on another mobile phone or device, please open this site on that device.
                </p>
                <p className="text-[11px] text-emerald-400 pt-1">
                  Need assistance? Email us at <strong className="underline">neso.vvy123@gmail.com</strong> with your phone number and we will send your notes immediately.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
