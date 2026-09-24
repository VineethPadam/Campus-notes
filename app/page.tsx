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
} from 'lucide-react';
import RazorpayButton from './components/RazorpayButton';

export default function NotesPage() {
  const [activePreviewNote, setActivePreviewNote] = useState<'java' | 'spring-boot'>('java');
  const [previewTab, setPreviewTab] = useState<'syllabus' | 'sample'>('syllabus');

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
          <strong>SPECIAL OFFER:</strong> Java Notes at <strong className="text-emerald-300">₹49</strong> & Spring Boot Notes at <strong className="text-emerald-300">₹69</strong> (Actual Price: <span className="line-through text-rose-300">₹150</span> each)!
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
              <span>Limited Time Offer</span>
            </div>
            <a
              href="#notes-cards"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-4 py-2 rounded-lg transition-all shadow-md shadow-emerald-900/20"
            >
              Get Notes — From ₹49
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
            <span>⏳ FLASH SALE: Actual Price ₹150 ➔ Java ₹49 | Spring Boot ₹69</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Master Java & Spring Boot with <br className="hidden sm:block" />
            <span className="gradient-text">Complete Handwritten Notes</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
            Handwritten & structured PDF guides for coding interviews, semester exams, and placements. Clear diagrams, step-by-step code execution & real-world concepts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 pt-2">
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>100% Anti-Inspect Secured</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant PDF Download</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Printable PDF Format</span>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section id="notes-cards" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Select Your Notes Package</h2>
            <p className="text-sm text-gray-400">
              Actual Price: <span className="line-through text-gray-500 font-bold">₹150</span> each • Special Offer Active
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* Interactive Syllabus & Code Preview Box */}
        <section id="preview-section" className="bg-[#0f172a]/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>Interactive Notes Inspector</span>
              </h3>
              <p className="text-xs text-gray-400">Switch tabs to view detailed module breakdowns and code samples.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
                <button
                  onClick={() => setActivePreviewNote('java')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                    activePreviewNote === 'java'
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Java Notes (₹49)
                </button>
                <button
                  onClick={() => setActivePreviewNote('spring-boot')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${
                    activePreviewNote === 'spring-boot'
                      ? 'bg-blue-500 text-slate-950 shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Spring Boot Notes (₹69)
                </button>
              </div>

              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 space-x-1">
                <button
                  onClick={() => setPreviewTab('syllabus')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                    previewTab === 'syllabus' ? 'bg-slate-800 text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Syllabus
                </button>
                <button
                  onClick={() => setPreviewTab('sample')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                    previewTab === 'sample' ? 'bg-slate-800 text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Code Preview
                </button>
              </div>
            </div>
          </div>

          {activePreviewNote === 'java' ? (
            previewTab === 'syllabus' ? (
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
            ) : (
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-gray-300">
                <div className="text-emerald-400 font-semibold">// Custom Exception Sample (Page 62 in Java Notes)</div>
                <pre className="text-gray-400 overflow-x-auto p-3 bg-slate-900/90 rounded border border-slate-800">
{`class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        try {
            System.out.print("Enter age: ");
            int age = input.nextInt();
            if (age < 18) throw new InvalidAgeException("Must be 18+");
            System.out.println("Access granted!");
        } catch (InvalidAgeException e) {
            System.out.println("Validation error: " + e.getMessage());
        }
    }
}`}
                </pre>
              </div>
            )
          ) : previewTab === 'syllabus' ? (
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
                  <p className="text-xs text-gray-400">JDBC -> Hibernate -> JPA. `@Entity`, `@Id`, `@Column`, Entity Lifecycle (Transient, Persistent, Detached, Removed).</p>
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
          ) : (
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-gray-300">
              <div className="text-blue-400 font-semibold">// Spring Boot & AOP Aspect Sample (Page 74 in Spring Boot Notes)</div>
              <pre className="text-gray-400 overflow-x-auto p-3 bg-slate-900/90 rounded border border-slate-800">
{`@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.*.*(..))")
    public void logBeforeExecution(JoinPoint joinPoint) {
        System.out.println("Executing service method: " + joinPoint.getSignature().getName());
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService; // Constructor Injection (Best Practice)
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}`}
              </pre>
            </div>
          )}
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
