'use client';

import React, { useState } from 'react';
import {
  Lock,
  Download,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BookOpen,
  Code2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Terminal,
  Clock,
  Flame,
} from 'lucide-react';
import RazorpayButton from './components/RazorpayButton';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'sample'>('syllabus');

  const notesTitle = process.env.NEXT_PUBLIC_NOTES_TITLE || 'Java Programming Language — Complete Handwritten Notes';
  const priceINR = process.env.NEXT_PUBLIC_NOTES_PRICE_INR || '1';

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 flex flex-col justify-between">
      {/* 24-Hour Flash Sale Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950/90 via-rose-950/90 to-amber-950/90 border-b border-rose-500/40 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-semibold flex items-center justify-center space-x-2 shadow-lg">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </span>
        <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>
          <strong>24-HOUR FLASH SALE:</strong> Get Java Handwritten Notes for <strong>₹1</strong> (99% OFF). Offer valid for <strong>24 Hours Only!</strong>
        </span>
      </div>

      {/* Navbar */}
      <header className="border-b border-gray-800/80 bg-[#0d131f]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              Campus<span className="text-emerald-400">Notes</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center text-xs font-medium text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full space-x-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Offer Ends in 24 Hours</span>
            </div>
            <a
              href="#payment-section"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-900/20"
            >
              Get Notes — ₹{priceINR}
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-950/80 via-amber-950/80 to-rose-950/80 border border-rose-500/40 px-4 py-1.5 rounded-full text-xs text-rose-200 font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>⏳ SPECIAL OFFER: ₹1 (99% OFF) — Valid for 24 Hours Only!</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Master Java & OOPs with <br className="hidden sm:block" />
            <span className="gradient-text">Complete Handwritten Notes</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            117 pages covering Java History, JVM Architecture, Scanner & Input Handling, OOPs Concepts, Inheritance, Abstraction, Interfaces, Exception Handling, Strings, Enums & JVM Memory Model.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 pt-2">
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>100% Anti-Inspect Secured</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Serverless Download</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>PDF Format (117 Pages)</span>
            </div>
          </div>
        </section>

        {/* Note Spot & Preview Section */}
        <div id="payment-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Preview Box */}
          <div className="lg:col-span-7 bg-[#0f172a]/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('syllabus')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'syllabus'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  117-Page Syllabus Breakdown
                </button>
                <button
                  onClick={() => setActiveTab('sample')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === 'sample'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Code Preview
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5" />
                <span>Protected Asset</span>
              </div>
            </div>

            {activeTab === 'syllabus' ? (
              <div className="space-y-4">
                <h3 className="font-semibold text-white text-lg">What&apos;s Covered in Java Handwritten Notes (13 Modules):</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>1. History of Java & Features:</strong> James Gosling Green Team, Oak to Java, JDK releases & 10 core attributes.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>2. JVM, JRE, JDK & Flow:</strong> Bytecode (.class execution), Interpreter vs Compiler, Machine generations.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>3. Input & Large Numbers:</strong> Scanner methods (`nextInt`, `nextLine`), BigInteger & BigDecimal arithmetic.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>4–6. Control Flow & Constructors:</strong> If-Else, Switch, Loops, No-Arg, Parameterized & Default Constructors.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>7–10. OOPs, Inheritance & Interfaces:</strong> `extends`, `super`, Overriding vs Overloading, Abstract classes & Java 8 default/static interface methods.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>11. Exception Handling:</strong> `try-catch`, Multiple Catch, Nested Try, `throw` vs `throws`, Custom Exceptions.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>12–13. Strings, Enums & JVM Memory Model:</strong> String/StringBuffer/StringBuilder, Enums, Metaspace, Heap, Stack, PC Register & Native Stack (JNI).</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-gray-300 relative">
                <div className="text-emerald-400 font-semibold">// Custom Exception & Scanner Input Handling</div>
                <pre className="text-gray-400 overflow-x-auto p-2 bg-slate-900 rounded">
{`class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter your age: ");
            int age = input.nextInt();
            if (age < 18) {
                throw new InvalidAgeException("Age must be 18 or above.");
            }
            System.out.println("Age is valid!");
        } catch (InvalidAgeException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}`}
                </pre>
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded text-emerald-300 font-sans">
                  🔒 Full 117-Page Java Handwritten Notes PDF is locked until Razorpay payment completion.
                </div>
              </div>
            )}
          </div>

          {/* Right Pricing Card (The Single Note Spot) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-emerald relative">
            <div className="absolute -top-3.5 right-6 bg-rose-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5" />
              <span>24 Hours Only</span>
            </div>

            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Instant PDF Access</span>
              <h2 className="text-2xl font-bold text-white mt-1">{notesTitle}</h2>
            </div>

            {/* 24 Hour Countdown Banner Box */}
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 text-center space-y-1">
              <div className="flex items-center justify-center space-x-1.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 animate-spin" />
                <span>24-Hour Flash Discount Active</span>
              </div>
              <p className="text-[11px] text-gray-300">
                Offer price <strong className="text-emerald-400">₹1</strong> is available for <strong>24 Hours Only</strong>. Regular price: <span className="line-through text-gray-400">₹599</span>.
              </p>
            </div>

            <div className="flex items-baseline space-x-2 border-y border-slate-800 py-4">
              <span className="text-4xl font-black text-white">₹{priceINR}</span>
              <span className="text-sm text-gray-400 line-through">₹599</span>
              <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded font-extrabold">
                99% OFF
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>117-Page Complete Handwritten PDF Guide</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero login/signup required</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cryptographically secured download</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Printable PDF with Code Templates & Diagrams</span>
              </li>
            </ul>

            {/* Official Razorpay Payment Button */}
            <div className="pt-2">
              <p className="text-xs text-center text-gray-400 mb-2 font-medium">Click below to pay with Razorpay:</p>
              <RazorpayButton priceINR={priceINR} notesTitle={notesTitle} />
            </div>

            <div className="text-center text-xs text-gray-400 space-y-1 pt-2">
              <div className="flex items-center justify-center space-x-1.5 text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secured by Razorpay • UPI, Cards, NetBanking, Wallets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Features Overview */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white flex items-center justify-center space-x-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              <span>Complete Module Breakdown (117 Pages)</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Everything you need for backend developer interviews & core Java mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">Core Java & OOPs</h4>
              <p className="text-xs text-gray-400">
                Java history, JDK/JRE/JVM, data types, Scanner input, constructors, inheritance (`super`), & method overriding.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">Interfaces & Exceptions</h4>
              <p className="text-xs text-gray-400">
                Abstract classes, default/static interface methods, try-catch blocks, custom exceptions (`throws`/`throw`).
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">Strings & JVM Memory Model</h4>
              <p className="text-xs text-gray-400">
                String/StringBuffer/StringBuilder, Enums, Metaspace, Heap, Stack, PC Register, and Native Stack (JNI).
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#0d131f] py-8 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p>© {new Date().getFullYear()} Campus Notes. All rights reserved.</p>
          <p>Powered by Next.js, Razorpay & Vercel Serverless Functions.</p>
        </div>
      </footer>
    </div>
  );
}
