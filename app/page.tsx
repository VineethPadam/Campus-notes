'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
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
} from 'lucide-react';
import RazorpayButton from './components/RazorpayButton';

export default function NotesPage() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'sample'>('syllabus');

  const notesTitle = process.env.NEXT_PUBLIC_NOTES_TITLE || 'Spring Boot & JPA Complete Masterclass Notes';
  const priceINR = process.env.NEXT_PUBLIC_NOTES_PRICE_INR || '99';

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 flex flex-col justify-between">
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
            <div className="hidden sm:flex items-center text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Razorpay Verified Payment</span>
            </div>
            <a
              href="#payment-section"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-900/20"
            >
              Buy Now — ₹{priceINR}
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center space-x-2 bg-slate-900/80 border border-slate-700/60 px-4 py-1.5 rounded-full text-xs text-gray-300">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>2026 Edition • Complete Spring Boot, JPA & AOP Placement Notes</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Master Spring Boot & JPA with <br className="hidden sm:block" />
            <span className="gradient-text">Complete Handwritten & PDF Notes</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            85+ pages covering Spring Core, IoC, Dependency Injection, Annotations, Spring Data JPA, Hibernate Entity Lifecycles, SOLID Principles, Bean Lifecycles, AOP & Actuators.
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
              <span>PDF Format (85+ Pages)</span>
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
                  85-Page Syllabus Breakdown
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
                <h3 className="font-semibold text-white text-lg">What&apos;s Covered in Spring Boot & JPA:</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Spring Boot Core:</strong> Spring vs Spring Boot, Auto-Configuration, Embedded Tomcat, JAR vs WAR.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>IoC & Dependency Injection:</strong> BeanFactory vs ApplicationContext, Constructor Injection vs Setter/Field.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Annotations Matrix:</strong> @Controller vs @RestController, @Service, @Repository, @PathVariable, @RequestBody.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Spring Data JPA & Hibernate:</strong> Entity Lifecycle (Transient, Persistent, Detached, Removed), Mappings.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>SOLID Principles & AOP:</strong> SRP, OCP, LSP, ISP, DIP in Java + Aspect, Advice (@Before, @Around), Proxies.</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-gray-300 relative">
                <div className="text-emerald-400 font-semibold">// Spring Boot Controller & Constructor Injection</div>
                <pre className="text-gray-400 overflow-x-auto p-2 bg-slate-900 rounded">
{`@RestController
@RequestMapping("/api/users")
public class UserApiController {
    private final UserService userService;

    // Constructor Injection (Best Practice)
    public UserApiController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}`}
                </pre>
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded text-emerald-300 font-sans">
                  🔒 Full 85-Page Spring Boot PDF is locked until Razorpay payment completion.
                </div>
              </div>
            )}
          </div>

          {/* Right Pricing Card (The Single Note Spot) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-emerald relative">
            <div className="absolute -top-3.5 right-6 bg-emerald-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Single Note Spot
            </div>

            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Instant PDF Access</span>
              <h2 className="text-2xl font-bold text-white mt-1">{notesTitle}</h2>
            </div>

            <div className="flex items-baseline space-x-2 border-y border-slate-800 py-4">
              <span className="text-4xl font-black text-white">₹{priceINR}</span>
              <span className="text-sm text-gray-400 line-through">₹599</span>
              <span className="text-xs text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded font-semibold">
                83% OFF
              </span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>85+ Page Complete PDF Guide</span>
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
                <span>Printable PDF with Code Templates</span>
              </li>
            </ul>

            {/* Official Razorpay Payment Button pl_TfNHgCIyksi0PZ */}
            <div className="pt-2">
              <p className="text-xs text-center text-gray-400 mb-2 font-medium">Click below to pay with Razorpay:</p>
              <RazorpayButton buttonId="pl_TfNHgCIyksi0PZ" />
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
              <span>Complete Module Structure (85 Pages)</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Everything you need for backend developer interviews & enterprise Spring applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">Spring Boot Core & DI</h4>
              <p className="text-xs text-gray-400">
                Auto-Configuration, BeanFactory vs ApplicationContext, Constructor Injection, @Primary vs @Qualifier.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Database className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">Spring Data JPA & ORM</h4>
              <p className="text-xs text-gray-400">
                Hibernate internals, Entity Lifecycle states (Transient, Managed, Detached, Removed), Repository CRUD.
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
                <Terminal className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-white text-sm">AOP & SOLID Principles</h4>
              <p className="text-xs text-gray-400">
                Aspects, Advice (@Before, @Around), Pointcuts, JDK Dynamic Proxy vs CGLIB, and SOLID patterns in Spring.
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
