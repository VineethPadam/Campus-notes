'use client';

import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BookOpen,
  Code2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Clock,
  Flame,
  Server,
  ArrowRight,
  FileCode,
  BookMarked,
  Package,
  Globe,
  Table,
  Mail,
  HelpCircle,
} from 'lucide-react';
import RazorpayButton from './components/RazorpayButton';
import AccessPurchasesModal from './components/AccessPurchasesModal';

export default function NotesPage() {
  const [activePreviewNote, setActivePreviewNote] = useState<
    'java' | 'spring-boot' | 'c-100-coding' | 'c-textbook' | 'mysql' | 'java-interview' | 'web-development'
  >('java');
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-gray-100 flex flex-col justify-between">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950/90 via-rose-950/90 to-amber-950/90 border-b border-rose-500/40 text-amber-200 text-xs sm:text-sm py-2 px-4 text-center font-semibold flex items-center justify-center space-x-2 shadow-lg">
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </span>
        <Flame className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>
          <strong>JUST RELEASED:</strong> 200+ Cognizant Based Java Interview Q&A Guide — <strong className="text-amber-300">Special Offer ₹49!</strong>
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
            <a
              href="mailto:neso.vvy123@gmail.com"
              className="hidden md:flex items-center text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1.5 rounded-full space-x-1.5 hover:bg-emerald-950/90 transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Queries: neso.vvy123@gmail.com</span>
            </a>
            <div className="hidden sm:flex items-center text-xs font-medium text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full space-x-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Special Offer Active</span>
            </div>
            <a
              href="#mysql-section"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-900/20"
            >
              Get Notes — From ₹39
            </a>
          </div>
        </div>
      </header>

      {/* Top Category Navigation Filter Bar */}
      <nav className="bg-[#0d1322]/90 border-b border-slate-800/80 backdrop-blur-md sticky top-16 z-30 py-2.5 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
          <a
            href="#interview-section"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center space-x-1.5"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>200+ Cognizant Q&A (₹49)</span>
          </a>

          <a
            href="#mysql-section"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center space-x-1.5"
          >
            <Table className="w-4 h-4 text-cyan-400" />
            <span>MySQL 8.0 Notes (₹49)</span>
          </a>

          <a
            href="#c-section"
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all flex items-center space-x-1.5"
          >
            <FileCode className="w-4 h-4 text-amber-400" />
            <span>C Programming Notes</span>
          </a>

          <a
            href="#java-section"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all flex items-center space-x-1.5"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Java Notes</span>
          </a>

          <a
            href="#spring-boot-section"
            className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all flex items-center space-x-1.5"
          >
            <Database className="w-4 h-4 text-blue-400" />
            <span>Spring Boot Notes</span>
          </a>

          <a
            href="#web-dev-section"
            className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all flex items-center space-x-1.5"
          >
            <Globe className="w-4 h-4 text-purple-400" />
            <span>HTML5 & CSS3 Notes (₹39)</span>
          </a>

          <button
            onClick={() => setIsAccessModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition-all flex items-center space-x-1.5 font-bold cursor-pointer shadow-md"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Access Your Bought Books</span>
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-950/80 via-amber-950/80 to-rose-950/80 border border-rose-500/40 px-4 py-1.5 rounded-full text-xs text-rose-200 font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>🔥 NEW RELEASE: 200+ Cognizant Based Java Interview Q&A Guide (232 Pages) — Only ₹49!</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Master Programming, Databases & Frameworks with <br className="hidden sm:block" />
            <span className="gradient-text">Complete Master Notes & Textbooks</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            High-quality PDF study guides for MySQL 8.0, C Programming, Core Java & Spring Boot. Executed queries, output tables, pro tips, and exam-ready master textbook notes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 pt-2">
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>100% Anti-Inspect Secured</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Serverless PDF Download</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Printable PDF Format</span>
            </div>
          </div>

          {/* Document Security & Access Purchases Info Bar */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-slate-900 via-[#0d1627] to-slate-900 border border-slate-700/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-xl">
            <div className="flex items-center space-x-2.5 text-left text-gray-300">
              <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-bold text-white">Document Password Protection: </span>
                <span className="text-gray-300">
                  All books open with:{' '}
                  <span className="text-amber-300 font-mono font-bold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
                    [Last 5 digits of your phone]@tech
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsAccessModalOpen(true)}
              className="w-full sm:w-auto bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold px-3.5 py-1.5 rounded-xl border border-amber-500/40 flex items-center justify-center space-x-1.5 flex-shrink-0 transition-all cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Access Your Bought Books</span>
            </button>
          </div>
        </section>

        {/* SECTION 0: INTERVIEW QUESTIONS & GUIDES SECTION */}
        <section id="interview-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full inline-block">
              Cognizant & Top MNC Placement Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2 flex-wrap">
              <span>200+</span>
              <span className="text-[#00B2FE] font-black">Cognizant</span>
              <span>Based Java Interview Questions</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Comprehensive 232-page guide containing <strong className="text-[#00B2FE]">200+ real interview questions</strong> asked in Cognizant GenC, GenC Elevate, TCS, Infosys & Wipro placement drives.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-b from-[#0d1428] via-[#0c1020] to-[#090b16] border-2 border-[#00B2FE]/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-blue-950/80 glow-blue relative flex flex-col justify-between">
              
              {/* Floating Top Badge */}
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 via-[#00B2FE] to-cyan-400 text-slate-950 text-[10px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center space-x-1 shadow-lg">
                <Flame className="w-3 h-3" />
                <span>COGNIZANT SPECIAL EDITION</span>
              </div>

              <div className="space-y-5">
                {/* Prominent Cognizant Logo Brand Banner */}
                <div className="bg-[#00003a]/90 border border-[#00B2FE]/50 rounded-xl p-3.5 flex items-center justify-between shadow-inner">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#000066] border border-[#00B2FE] flex items-center justify-center font-black text-[#00B2FE] text-2xl tracking-tighter shadow-md">
                      C
                    </div>
                    <div>
                      <div className="text-sm font-black text-white flex items-center space-x-2">
                        <span className="text-[#00B2FE] tracking-wide text-base">COGNIZANT</span>
                        <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold px-2 py-0.5 rounded">
                          GenC & Elevate
                        </span>
                      </div>
                      <p className="text-xs text-blue-200 font-medium">200+ Real Technical Interview Questions & Solutions</p>
                    </div>
                  </div>
                  <span className="bg-[#00B2FE] text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block shadow">
                    2026 Batch Ready
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <HelpCircle className="w-3.5 h-3.5 mr-1" />
                    232 Pages • 200+ Questions
                  </span>

                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2.5 py-1 rounded">
                    HOT SELLER FOR PLACEMENTS
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <span>200+ <span className="text-[#00B2FE]">Cognizant</span> Java Interview Guide</span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Full 232-page master guide with 200+ real interview questions covering Core Java, OOPs, Collections, Stream API, Exception Handling, Tricky Output Questions & Coding Patterns.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-blue-900/60 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹200</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-[#00B2FE] font-bold">Special Offer Price:</span>
                    <span className="text-3xl font-black text-white">₹49</span>
                  </div>
                  <p className="text-[11px] text-[#00B2FE] text-right font-semibold">You Save ₹151 (75% OFF)</p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span><strong className="text-white">200+ Cognizant Real Placement Q&A</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span>Cognizant GenC & Elevate Assessment Questions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span>Core Java, OOPs & Memory Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span>Java 8+ Streams & Lambda Expressions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span>Array & String Tricky Coding Patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B2FE] flex-shrink-0" />
                    <span>Behavioral Questions & Last Minute Revision</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => {
                    setActivePreviewNote('java-interview');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-bold text-[#00B2FE] bg-blue-950/40 hover:bg-blue-950/80 border border-blue-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview 200+ Cognizant Interview Questions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <RazorpayButton
                  noteId="java-interview"
                  priceINR="49"
                  notesTitle="200+ Cognizant Based Java Interview Questions Guide (232 Pages)"
                  buttonLabel="Pay ₹49 & Download 200+ Cognizant Interview Guide"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: MYSQL 8.0 & SQL SECTION */}
        <section id="mysql-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-widest bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 rounded-full inline-block">
              Database Engineering Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">MySQL 8.0 & SQL Master Textbook</h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Complete <strong className="text-cyan-300">208 A4 Pages • 202 Subtopics Edition</strong> covering DDL, DML, Joins, String/Numeric/Date Functions, Views & Prepared Statements.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-b from-[#0f1d2e] to-[#0a1523] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-blue relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <Table className="w-3.5 h-3.5 mr-1" />
                    208 A4 Pages • 202 Subtopics
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2.5 py-1 rounded">
                    SPECIAL OFFER
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">MySQL 8.0 & SQL Complete Master Textbook</h3>
                  <p className="text-xs text-gray-300 mt-1">Full-Page A4 Reference Manual with multi-line indented query hierarchy, executed queries, result tables & pro tips.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹200</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-cyan-400 font-bold">Offer Price:</span>
                    <span className="text-3xl font-black text-white">₹49</span>
                  </div>
                  <p className="text-[11px] text-cyan-400 text-right font-semibold">You Save ₹151 (75% OFF)</p>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Database Fundamentals & DDL (#1-#23)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>SQL Queries, Joins & Views (#24-#64)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>String Functions Exhaustive Reference (#65-#97)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Numeric & Math Functions (#98-#133)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Date & Time Functions Reference (#134-#183)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Advanced Functions & Prepared Statements (#184-#202)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('mysql');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-bold text-cyan-400 bg-cyan-950/40 hover:bg-cyan-950/80 border border-cyan-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview MySQL Syllabus & SQL Queries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <RazorpayButton
                  noteId="mysql"
                  priceINR="49"
                  notesTitle="MySQL 8.0 & SQL Complete Master Textbook (208 Pages)"
                  buttonLabel="Pay ₹49 & Download MySQL Textbook"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: C PROGRAMMING SECTION */}
        <section id="c-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-amber-400 font-bold uppercase tracking-widest bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full inline-block">
              C Programming Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">C Programming Notes</h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              Individual Books at <strong className="text-emerald-400">₹39</strong> each (Actual Price <span className="line-through text-gray-500 font-bold">₹200</span>). High-quality C programming study guides with 100 Solved Programs and Master Textbook Notes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {/* Card 1: C 100 Master Solved Programs */}
            <div className="bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-emerald-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <FileCode className="w-3.5 h-3.5 mr-1" />
                    110 Pages • 100 Programs
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2 py-0.5 rounded">
                    Lab & Exam Ready
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">C 100 Master Solved Programs</h3>
                  <p className="text-xs text-gray-400 mt-1">100 complete C coding questions with problem statements, source code & GCC output.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹200</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                    <span className="text-xs text-emerald-400 font-bold">Offer Price:</span>
                    <span className="text-2xl font-black text-white">₹39</span>
                  </div>
                  <p className="text-[10px] text-emerald-400 text-right font-semibold">Save ₹161 (80% OFF)</p>
                </div>

                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>100 Practical C Solved Exercises</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Basics, Loops, Functions & Arrays</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Pointers, Strings, Structs & File I/O</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('c-100-coding');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview 100 Programs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <RazorpayButton
                  noteId="c-100-coding"
                  priceINR="39"
                  notesTitle="C Programming — 100 Master Solved Programs Book"
                  buttonLabel="Pay ₹39 & Download 100 C Programs"
                />
              </div>
            </div>

            {/* Card 2: C Programming Master Textbook Notes */}
            <div className="bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-amber-500/40 rounded-2xl p-6 space-y-5 shadow-xl relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <BookMarked className="w-3.5 h-3.5 mr-1" />
                    49 Pages • Master Textbook
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2 py-0.5 rounded">
                    ANSI C Standard
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">C Master Textbook Notes</h3>
                  <p className="text-xs text-gray-400 mt-1">Structured point-wise edition for students building exam-ready C programming fundamentals.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹200</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-1.5">
                    <span className="text-xs text-amber-400 font-bold">Offer Price:</span>
                    <span className="text-2xl font-black text-white">₹39</span>
                  </div>
                  <p className="text-[10px] text-amber-400 text-right font-semibold">Save ₹161 (80% OFF)</p>
                </div>

                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Point-Wise Standard ANSI C / C99 / C11</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Control Flow, Functions, Arrays & Pointers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>Dynamic Memory (malloc/calloc) & File I/O</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('c-textbook');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-1.5 text-xs font-bold text-amber-400 bg-amber-950/40 hover:bg-amber-950/80 border border-amber-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview Textbook Notes</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <RazorpayButton
                  noteId="c-textbook"
                  priceINR="39"
                  notesTitle="C Programming Master Textbook Notes"
                  buttonLabel="Pay ₹39 & Download Textbook Notes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: JAVA NOTES SECTION */}
        <section id="java-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full inline-block">
              Core Java Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Java Programming Notes</h2>
            <p className="text-sm text-gray-400">
              Actual Price: <span className="line-through text-gray-500 font-bold">₹150</span> • Special Offer Active
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Java Notes Card */}
            <div className="bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-emerald relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <Cpu className="w-3.5 h-3.5 mr-1" />
                    117 Pages • Core Java
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2.5 py-1 rounded">
                    SPECIAL OFFER
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">Java Programming Notes</h3>
                  <p className="text-xs text-gray-400 mt-1">Complete Handwritten Guide covering JVM, Scanner, OOPs, Interfaces & Exception Handling.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹150</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-emerald-400 font-bold">Offer Price:</span>
                    <span className="text-3xl font-black text-white">₹49</span>
                  </div>
                  <p className="text-[11px] text-emerald-400 text-right font-semibold">You Save ₹101 (67% OFF)</p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>History of Java & 10 Core Features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>JVM, JRE, JDK & Bytecode Execution Flow</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>OOPs Concepts, Inheritance & Interfaces</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Exception Handling, Strings & JVM Memory Model</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('java');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/80 border border-emerald-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview Java Syllabus & Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <RazorpayButton
                  noteId="java"
                  priceINR="49"
                  notesTitle="Java Programming Language — Complete Handwritten Notes"
                  buttonLabel="Pay ₹49 & Download Java Notes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: SPRING BOOT NOTES SECTION */}
        <section id="spring-boot-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-blue-400 font-bold uppercase tracking-widest bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full inline-block">
              Enterprise Framework Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Spring Boot & JPA Notes</h2>
            <p className="text-sm text-gray-400">
              Actual Price: <span className="line-through text-gray-500 font-bold">₹150</span> • Special Offer Active
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Spring Boot Notes Card */}
            <div className="bg-gradient-to-b from-[#111c2e] to-[#0d1522] border-2 border-blue-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-blue relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <Database className="w-3.5 h-3.5 mr-1" />
                    85 Pages • Spring Boot & JPA
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2.5 py-1 rounded">
                    HOT OFFER
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">Spring Boot & JPA Notes</h3>
                  <p className="text-xs text-gray-400 mt-1">Handwritten Guide covering IoC, DI, Annotations, JPA, SOLID Principles, Actuator & AOP.</p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹150</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-blue-400 font-bold">Offer Price:</span>
                    <span className="text-3xl font-black text-white">₹69</span>
                  </div>
                  <p className="text-[11px] text-blue-400 text-right font-semibold">You Save ₹81 (54% OFF)</p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Spring vs Spring Boot, Auto-Config & Embedded Tomcat</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>IoC Containers, DI Types & Stereotype Annotations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Spring Data JPA, Entity Lifecycle & CRUD Operations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>SOLID Principles, Actuator, Lifecycle Callbacks & AOP</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('spring-boot');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-bold text-blue-400 bg-blue-950/40 hover:bg-blue-950/80 border border-blue-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview Spring Boot Syllabus & Code</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <RazorpayButton
                  noteId="spring-boot"
                  priceINR="69"
                  notesTitle="Spring Boot & JPA — Complete Handwritten Notes"
                  buttonLabel="Pay ₹69 & Download Spring Boot Notes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: WEB DEVELOPMENT NOTES SECTION */}
        <section id="web-dev-section" className="space-y-6 scroll-mt-28">
          <div className="text-center space-y-2">
            <span className="text-xs text-purple-400 font-bold uppercase tracking-widest bg-purple-950/60 border border-purple-800/50 px-3 py-1 rounded-full inline-block">
              Web Architecture & Frontend Series
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">HTML5 & CSS3 Developer Handbook</h2>
            <p className="text-sm text-gray-400">
              Actual Price: <span className="line-through text-gray-500 font-bold">₹199</span> • Special Offer Active • 177 Comprehensive Pages
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* HTML5 & CSS3 Developer Handbook Card */}
            <div className="bg-gradient-to-b from-[#19112e] to-[#120d22] border-2 border-purple-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl glow-purple relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800 px-2.5 py-1 rounded flex items-center space-x-1">
                    <Globe className="w-3.5 h-3.5 mr-1" />
                    177 Pages • 23 Chapters • Edition 2026
                  </span>
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-2.5 py-1 rounded">
                    HOT OFFER (80% OFF)
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">HTML5 & CSS3 Complete Developer Handbook</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    TechBridge Official Curriculum Master Notes — Semantic HTML5, Modern Forms, CSS Specificity, Box Model, Flexbox (1D) & CSS Grid (2D).
                  </p>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Actual Price:</span>
                    <span className="line-through font-bold text-gray-400">₹199</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-purple-400 font-bold">Offer Price:</span>
                    <span className="text-3xl font-black text-white">₹39</span>
                  </div>
                  <p className="text-[11px] text-purple-400 text-right font-semibold">You Save ₹160 (80% OFF)</p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Web Architecture, Client-Server Flow, DOM Tree & HTML5 Semantic Layouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Modern Forms, Inputs, Validation Constraints & Accessible Tables</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>CSS Selectors, Combinators, Specificity Hierarchy & Box Model (`border-box`)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Flexbox 1D & CSS Grid 2D Complete Layout Systems with Real Visuals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Responsive Breakpoints, Mobile-First Design & Media Queries</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    setActivePreviewNote('web-development');
                    const previewEl = document.getElementById('preview-section');
                    previewEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 text-xs font-bold text-purple-400 bg-purple-950/40 hover:bg-purple-950/80 border border-purple-800/50 rounded-lg transition-all flex items-center justify-center space-x-1"
                >
                  <span>Preview HTML5 & CSS3 Syllabus & Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <RazorpayButton
                  noteId="web-development"
                  priceINR="39"
                  notesTitle="HTML5 & CSS3 Complete Developer Handbook (177 Pages)"
                  buttonLabel="Pay ₹39 & Download HTML5 & CSS3 Handbook"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Syllabus Inspector Box */}
        <section id="preview-section" className="bg-[#0f172a]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl scroll-mt-28">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>Interactive Notes Inspector</span>
              </h3>
              <p className="text-xs text-gray-400">View detailed module breakdowns and syllabus topics for each course.</p>
            </div>

            <div className="flex flex-wrap items-center bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
              <button
                onClick={() => setActivePreviewNote('java-interview')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'java-interview'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                200+ Cognizant Q&A (₹49)
              </button>
              <button
                onClick={() => setActivePreviewNote('mysql')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'mysql'
                    ? 'bg-cyan-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                MySQL (₹49)
              </button>
              <button
                onClick={() => setActivePreviewNote('java')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'java'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Java (₹49)
              </button>
              <button
                onClick={() => setActivePreviewNote('spring-boot')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'spring-boot'
                    ? 'bg-blue-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Spring Boot (₹69)
              </button>
              <button
                onClick={() => setActivePreviewNote('web-development')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'web-development'
                    ? 'bg-purple-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                HTML5 & CSS3 (₹39)
              </button>
              <button
                onClick={() => setActivePreviewNote('c-100-coding')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'c-100-coding'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                C 100 Programs (₹39)
              </button>
              <button
                onClick={() => setActivePreviewNote('c-textbook')}
                className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                  activePreviewNote === 'c-textbook'
                    ? 'bg-purple-500 text-slate-950 shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                C Textbook (₹39)
              </button>
            </div>
          </div>

          {activePreviewNote === 'web-development' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span>HTML5 & CSS3 Developer Handbook Breakdown (177 Pages • 23 Chapters):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. Web Architecture & HTML5 Semantics (Ch 1–4)</p>
                  <p className="text-xs text-gray-400">HTTP/HTTPS flow, DOM tree, doctype, character sets, &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;section&gt;, &lt;aside&gt;, &lt;footer&gt;, &lt;figure&gt; &amp; &lt;figcaption&gt;.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. Multimedia, Tables & Modern Forms (Ch 5–8)</p>
                  <p className="text-xs text-gray-400">&lt;picture&gt;, &lt;video&gt;, &lt;audio&gt;, accessible tables (&lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;), inputs, &lt;select&gt;, &lt;datalist&gt;, validation attributes &amp; regex patterns.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. CSS Selectors, Pseudo-Classes & Elements (Ch 9–12)</p>
                  <p className="text-xs text-gray-400">Element, class, id, attribute selectors, combinators, :hover, :focus, :nth-child(), :is(), :where(), ::before, ::after &amp; marker.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. Specificity Hierarchy & Box Model (Ch 13–16)</p>
                  <p className="text-xs text-gray-400">Cascade calculation (Inline &gt; ID &gt; Class &gt; Element), !important, content-box vs border-box, margin collapsing &amp; overflow handling.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. CSS Flexbox 1D Layout System (Ch 17–19)</p>
                  <p className="text-xs text-gray-400">Flex containers vs items, flex-direction, justify-content, align-items, flex-wrap, gap, flex-grow, flex-shrink &amp; auto margins.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. CSS Grid 2D System & Media Queries (Ch 20–23)</p>
                  <p className="text-xs text-gray-400">grid-template-columns, grid-template-rows, fr units, minmax(), repeat(), grid-area, responsive breakpoints &amp; mobile-first media queries.</p>
                </div>
              </div>
            </div>
          ) : activePreviewNote === 'java-interview' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>200+ Cognizant & MNC Based Java Interview Questions Breakdown (232 Pages):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. Cognizant Core Java & OOPs (Q#1 - Q#45)</p>
                  <p className="text-xs text-gray-400">Classloaders, JVM memory architecture, JDK vs JRE, immutability, static vs instance, interface vs abstract class.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. Cognizant Output-Based & Tricky Coding (Q#46 - Q#90)</p>
                  <p className="text-xs text-gray-400">Method overloading/overriding tricks, exception propagation order, try-catch-finally edge cases & return behaviors.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. Cognizant Collections & Generics (Q#91 - Q#135)</p>
                  <p className="text-xs text-gray-400">HashMap internal working, ConcurrentHashMap, ArrayList vs LinkedList, Fail-fast vs Fail-safe iterators.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. Cognizant Java 8+ Streams & Lambdas (Q#136 - Q#170)</p>
                  <p className="text-xs text-gray-400">Map, filter, reduce, Collectors, Optional handling, Parallel Streams & Functional Interfaces.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. Cognizant Array & String Tricky Coding (Q#171 - Q#200+)</p>
                  <p className="text-xs text-gray-400">Two pointer technique, sliding window, palindrome, sub-arrays, string anagrams & frequency count.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. Cognizant GenC Elevate Behavioral Sheet</p>
                  <p className="text-xs text-gray-400">STAR method interview responses, design patterns overview & last-minute placement revision summary.</p>
                </div>
              </div>
            </div>
          ) : activePreviewNote === 'mysql' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <Table className="w-4 h-4 text-cyan-400" />
                <span>MySQL 8.0 & SQL Master Textbook Breakdown (208 Pages • 202 Subtopics):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. Database Fundamentals & DDL (#1-#23)</p>
                  <p className="text-xs text-gray-400">RDBMS, MySQL Architecture, CREATE/DROP/ALTER/TRUNCATE TABLE, Constraints (PK, FK, UNIQUE, CHECK, DEFAULT, AUTO_INCREMENT), Indexes & Views.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. MySQL SQL & Queries (#24-#64)</p>
                  <p className="text-xs text-gray-400">INSERT, SELECT DISTINCT, WHERE, ORDER BY, UPDATE, DELETE, GROUP BY, HAVING, Joins (INNER, LEFT, RIGHT, CROSS, Self), UNION, Subqueries & CASE.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. String Functions (#65-#97)</p>
                  <p className="text-xs text-gray-400">CONCAT, CONCAT_WS, SUBSTR, SUBSTRING_INDEX, REPLACE, REVERSE, TRIM, LTRIM, RTRIM, LPAD, RPAD, STRCMP, FIELD, FIND_IN_SET.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. Numeric & Math Functions (#98-#133)</p>
                  <p className="text-xs text-gray-400">ABS, CEIL, FLOOR, ROUND, TRUNCATE, MOD, POW, SQRT, RAND, LOG, LOG10, LOG2, SIN, COS, TAN, DEGREES, RADIANS.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. Date & Time Functions (#134-#183)</p>
                  <p className="text-xs text-gray-400">ADDDATE, ADDTIME, CURDATE, CURTIME, NOW, DATEDIFF, DATE_ADD, DATE_SUB, DATE_FORMAT, DAYNAME, MONTHNAME, TIMEDIFF.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. Advanced Functions & Security (#184-#202)</p>
                  <p className="text-xs text-gray-400">COALESCE, CAST, CONVERT, IF, IFNULL, ISNULL, NULLIF, Prepared Statements against SQL Injection & User Session functions.</p>
                </div>
              </div>
            </div>
          ) : activePreviewNote === 'java' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Java Notes Module Breakdown (117 Pages):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. History & Features of Java</p>
                  <p className="text-xs text-gray-400">Green team history, Oak to Java evolution, JDK releases, 10 key features.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. JVM Architecture & Execution</p>
                  <p className="text-xs text-gray-400">Bytecode compilation (.class), Interpreter vs JIT, Machine code execution flow.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. Scanner Input & Large Numbers</p>
                  <p className="text-xs text-gray-400">Scanner methods, BigInteger and BigDecimal arithmetic handling.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. OOPs, Constructors & Inheritance</p>
                  <p className="text-xs text-gray-400">`extends`, `super`, constructor chaining, method overriding vs overloading.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. Interfaces & Exception Handling</p>
                  <p className="text-xs text-gray-400">Abstract classes, Java 8 interface methods, `try-catch`, custom exceptions (`throws`/`throw`).</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. Strings & JVM Memory Model</p>
                  <p className="text-xs text-gray-400">String/StringBuffer/StringBuilder, Enums, Metaspace, Heap, Stack, PC Register & JNI.</p>
                </div>
              </div>
            </div>
          ) : activePreviewNote === 'spring-boot' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <Server className="w-4 h-4 text-blue-400" />
                <span>Spring Boot & JPA Notes Module Breakdown (85 Pages):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. Spring vs Spring Boot & IoC</p>
                  <p className="text-xs text-gray-400">Auto-configuration, Embedded Tomcat, JAR vs WAR, BeanFactory vs ApplicationContext.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. Dependency Injection & Stereotypes</p>
                  <p className="text-xs text-gray-400">Constructor Injection, `@Component`, `@Controller`, `@RestController`, `@Service`, `@Repository`.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. Controller Inputs & Mappings</p>
                  <p className="text-xs text-gray-400">`@RequestMapping`, `@PathVariable`, `@RequestParam`, `@RequestBody`, Jackson conversion, `@RequestPart`.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. Spring Data JPA & ORM</p>
                  <p className="text-xs text-gray-400">JDBC &rarr; Hibernate &rarr; JPA. `@Entity`, `@Id`, `@Column`, Entity Lifecycle (Transient, Persistent, Detached, Removed).</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. SOLID Principles & Profiling</p>
                  <p className="text-xs text-gray-400">SRP, OCP, LSP, ISP, DIP code examples; `@Primary`, `@Qualifier`, `@Bean`, `@Profile` (`dev`/`prod`), Actuator.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. Bean Lifecycle & Spring AOP</p>
                  <p className="text-xs text-gray-400">`@ComponentScan`, `@PostConstruct`, `InitializingBean`, `@PreDestroy`, Aspect, Pointcuts & JDK vs CGLIB Proxies.</p>
                </div>
              </div>
            </div>
          ) : activePreviewNote === 'c-100-coding' ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>C 100 Solved Programs Breakdown (110 Pages):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">1. Basics & I/O (Ex 1–10)</p>
                  <p className="text-xs text-gray-400">Hello World, printf/scanf, ASCII values, quotient/remainder, data type sizes, swapping & even/odd.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">2. Branching & Loops (Ex 11–35)</p>
                  <p className="text-xs text-gray-400">Vowel check, quadratic roots, leap year, Fibonacci, GCD/LCM, Armstrong numbers & prime ranges.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">3. Functions & Recursion (Ex 46–55)</p>
                  <p className="text-xs text-gray-400">Sum of natural numbers, recursive factorial, GCD recursion, sentence reversal & Tower of Hanoi.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">4. Arrays & Matrices (Ex 56–72)</p>
                  <p className="text-xs text-gray-400">Array average, min/max, Bubble Sort, Linear/Binary search, matrix multiplication & transpose.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">5. Pointers & Strings (Ex 73–88)</p>
                  <p className="text-xs text-gray-400">Call by reference, dynamic memory (malloc/calloc), pointer arithmetic, string sorting & anagrams.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">6. Structs, Files & Patterns (Ex 89–100)</p>
                  <p className="text-xs text-gray-400">Student structs, file read/write (`fopen`/`fgets`), pyramids, Pascal triangle & hourglass patterns.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-semibold text-white text-base flex items-center space-x-2">
                <BookMarked className="w-4 h-4 text-purple-400" />
                <span>C Master Textbook Notes Breakdown (49 Pages):</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300 pt-1">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 1: Fundamentals & Syntax</p>
                  <p className="text-xs text-gray-400">Compilation pipeline (preprocessing, assembly, linking), data types, operators, precedence tables.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 2: Control Flow</p>
                  <p className="text-xs text-gray-400">`if-else`, `switch-case`, `for`, `while`, `do-while`, `break`, `continue`, `goto` error recovery.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 3: Functions & Storage Classes</p>
                  <p className="text-xs text-gray-400">Prototypes, definitions, 4 function types, recursion, `auto`, `register`, `static`, `extern`.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 4: Memory & Pointers</p>
                  <p className="text-xs text-gray-400">1D/2D arrays, pointer dereferencing, call by reference, `malloc()`, `calloc()`, `realloc()`, `free()`.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 5: Strings & Standard Library</p>
                  <p className="text-xs text-gray-400">Null-terminated strings, `strlen()`, `strcpy()`, `strcat()`, `strcmp()`, palindrome verification.</p>
                </div>
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-1">
                  <p className="font-bold text-white">Chapter 6 & 7: Structs, Files & Preprocessor</p>
                  <p className="text-xs text-gray-400">`struct`, `union`, `enum`, file handles (`fopen`, `fprintf`), bitwise operators & macros (`#define`).</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-[#0d131f] py-8 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          <p>
            <button
              onClick={() => setIsAccessModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center space-x-1.5 cursor-pointer bg-amber-950/40 border border-amber-600/40 px-3 py-1 rounded-lg"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Already bought a book? Click here to Access & Download Your Notes</span>
            </button>
          </p>
          <p className="flex items-center justify-center space-x-2 text-gray-300 font-medium">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>For any queries or support, email us at: <a href="mailto:neso.vvy123@gmail.com" className="text-emerald-400 hover:underline font-bold">neso.vvy123@gmail.com</a></span>
          </p>
          <p>© {new Date().getFullYear()} Campus Notes. All rights reserved.</p>
          <p>Powered by Next.js, Razorpay & Vercel Serverless Functions.</p>
        </div>
      </footer>

      {/* Access Purchases Modal */}
      <AccessPurchasesModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </div>
  );
}
