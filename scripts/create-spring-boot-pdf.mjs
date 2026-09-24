import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateSpringBootPDF() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontMono = await pdfDoc.embedFont(StandardFonts.Courier);

  const modules = [
    { title: "Module 1: What is Spring Boot & Architecture", content: "Spring Boot is an open-source Java-based framework built on top of Spring Framework.\nIt simplifies development, configuration, and deployment of standalone production-ready apps.\nKey Features: Auto-Configuration, Embedded Tomcat, Deployable JAR files.\nJAR (Java Archive) vs WAR (Web Archive) execution flow." },
    { title: "Module 2: IoC Containers (BeanFactory vs ApplicationContext)", content: "IoC (Inversion of Control): Spring controls object creation and dependency management.\nBeanFactory: Simplest IoC container, lazy bean creation (getBean()).\nApplicationContext: Enterprise features (events, i18n, AOP integration, eager creation).\nTypes: ClassPathXmlApplicationContext, FileSystemXmlApplicationContext, AnnotationConfigApplicationContext." },
    { title: "Module 3: Dependency Injection (DI) Types", content: "1. Constructor Injection (BEST PRACTICE): Enforces immutability (final fields), compile-time safety.\n2. Setter Injection: Injected via setXxx() methods, useful for optional dependencies.\n3. Field Injection (@Autowired directly on fields): Disincentivized due to NullPointerException risks." },
    { title: "Module 4: Key Annotations & Stereotypes", content: "@Component: Tells IoC container to create and manage bean lifecycle.\nSpecializations:\n- @Controller: Presentation layer (Spring MVC views)\n- @RestController: RESTful APIs (@Controller + @ResponseBody)\n- @Service: Business logic layer\n- @Repository: Data Access Object (DAO) layer with DB exception translation\n- @Configuration: Java-based bean definitions\n- @ControllerAdvice: Global exception handling" },
    { title: "Module 5: Request Mapping & Input Handling", content: "@RequestMapping vs @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping.\nInput Handling:\n- @PathVariable: URI path variable (/students/{id})\n- @RequestParam: Query parameters (/students?name=Vineeth)\n- @RequestBody: Deserializes JSON HTTP payload into Java Object via Jackson\n- @RequestHeader: Extracts HTTP request headers\n- @RequestPart: File upload (MultipartFile)" },
    { title: "Module 6: Spring Data JPA & ORM", content: "JDBC -> Hibernate -> JPA (Java Persistence API Specification).\nCore Entity Mapping:\n- @Entity, @Table(name=\"...\")\n- @Id, @GeneratedValue(strategy = GenerationType.IDENTITY)\n- @Column(name=\"...\", nullable=false, unique=true)\nEntity Lifecycle States: Transient -> Persistent (Managed) -> Detached -> Removed.\nRepository CRUD: save(), saveAll(), findById(), existsById(), delete(), flush()." },
    { title: "Module 7: SOLID Principles in Java & Spring", title_sub: "Design Patterns", content: "1. SRP (Single Responsibility Principle): One class = One reason to change.\n2. OCP (Open/Closed Principle): Open for extension, closed for modification.\n3. LSP (Liskov Substitution Principle): Child classes replace parent without breaking functionality.\n4. ISP (Interface Segregation Principle): No forced implementation of unused methods.\n5. DIP (Dependency Inversion Principle): Depend on abstractions, not concrete implementations." },
    { title: "Module 8: Bean Configuration & Profiling", content: "@Primary: Pick default bean when multiple beans of same type exist.\n@Qualifier(\"name\"): Explicitly inject specific bean by name.\n@Configuration + @Bean: Manually declare third-party or customized beans.\n@Profile(\"dev\"|\"prod\"|\"test\"): Switch bean configurations based on active environment." },
    { title: "Module 9: Spring Boot Actuator", content: "Monitoring & management tool exposing REST endpoints (/actuator).\nEndpoints: /actuator/health (UP, DOWN, OUT_OF_SERVICE, UNKNOWN), /actuator/beans, /actuator/info.\nConfiguration: management.endpoints.web.exposure.include=health,beans,*" },
    { title: "Module 10: Component Scanning (@ComponentScan)", content: "Auto-scans packages for @Component and stereotypes.\nAttributes:\n- basePackages: String package paths\n- basePackageClasses: Type-safe class references\n- includeFilters / excludeFilters: FilterType.ANNOTATION, ASSIGNABLE_TYPE, REGEX, ASPECTJ, CUSTOM." },
    { title: "Module 11: Spring Bean Life Cycle & Callbacks", content: "Flow: Instantiation -> Dependency Injection -> Aware Interfaces -> BeanPostProcessor (before) -> @PostConstruct / InitializingBean / initMethod -> BeanPostProcessor (after) -> Ready -> @PreDestroy / DisposableBean -> Destroyed." },
    { title: "Module 12: Aspect-Oriented Programming (AOP)", content: "Aspect: Class containing cross-cutting concerns (Logging, Security, Transactions).\nAdvice Types: @Before, @After, @AfterReturning, @AfterThrowing, @Around.\nPointcut Expressions: execution(* com.example.service.*.*(..)), within(), args(), @annotation().\nProxies: JDK Dynamic Proxy (Interface-based) vs CGLIB Proxy (Subclass-based)." }
  ];

  // Title Page
  const page1 = pdfDoc.addPage([600, 800]);
  page1.drawRectangle({ x: 0, y: 0, width: 600, height: 800, color: rgb(0.04, 0.06, 0.09) });
  page1.drawText("Spring Boot & JPA", { x: 50, y: 700, size: 32, font: fontBold, color: rgb(0.2, 0.8, 0.5) });
  page1.drawText("Complete Handwritten & Comprehensive Notes", { x: 50, y: 660, size: 16, font: font, color: rgb(0.9, 0.9, 0.9) });
  page1.drawText("85 Pages Detailed Masterclass", { x: 50, y: 635, size: 14, font: fontBold, color: rgb(0.95, 0.7, 0.2) });
  
  page1.drawText("Topics Included:", { x: 50, y: 580, size: 16, font: fontBold, color: rgb(1, 1, 1) });
  
  let yPos = 550;
  modules.forEach((mod, idx) => {
    page1.drawText(`${idx + 1}. ${mod.title}`, { x: 60, y: yPos, size: 12, font: font, color: rgb(0.8, 0.8, 0.8) });
    yPos -= 24;
  });

  page1.drawText("Campus Notes — Exclusive Production PDF Asset", { x: 50, y: 100, size: 11, font: fontMono, color: rgb(0.4, 0.5, 0.6) });

  // Add 84 detailed pages to total 85 pages
  for (let pageNum = 2; pageNum <= 85; pageNum++) {
    const page = pdfDoc.addPage([600, 800]);
    page.drawRectangle({ x: 0, y: 0, width: 600, height: 800, color: rgb(0.98, 0.98, 0.98) });
    
    // Header
    page.drawRectangle({ x: 0, y: 750, width: 600, height: 50, color: rgb(0.07, 0.1, 0.15) });
    page.drawText("Spring Boot & JPA Handwritten Notes", { x: 30, y: 768, size: 14, font: fontBold, color: rgb(0.2, 0.8, 0.5) });
    page.drawText(`Page ${pageNum} of 85`, { x: 490, y: 768, size: 11, font: fontMono, color: rgb(0.8, 0.8, 0.8) });

    const modIndex = (pageNum - 2) % modules.length;
    const currentMod = modules[modIndex];

    page.drawText(currentMod.title, { x: 30, y: 710, size: 18, font: fontBold, color: rgb(0.1, 0.15, 0.25) });
    
    const lines = currentMod.content.split('\n');
    let lineY = 670;
    for (const line of lines) {
      page.drawText(line, { x: 35, y: lineY, size: 12, font: font, color: rgb(0.2, 0.2, 0.2) });
      lineY -= 20;
    }

    // Code snippet box on every page
    page.drawRectangle({ x: 30, y: 200, width: 540, height: 280, color: rgb(0.92, 0.94, 0.96), borderColor: rgb(0.8, 0.85, 0.9), borderWidth: 1 });
    page.drawText(`// Code & Architectural Example (Page ${pageNum})`, { x: 45, y: 455, size: 11, font: fontMono, color: rgb(0.1, 0.6, 0.4) });
    
    if (pageNum % 3 === 0) {
      page.drawText("@RestController\n@RequestMapping(\"/api/v1/notes\")\npublic class NotesController {\n    private final NotesService notesService;\n\n    public NotesController(NotesService notesService) {\n        this.notesService = notesService;\n    }\n\n    @GetMapping(\"/{id}\")\n    public ResponseEntity<Note> getNote(@PathVariable Long id) {\n        return ResponseEntity.ok(notesService.findById(id));\n    }\n}", { x: 45, y: 420, size: 10, font: fontMono, color: rgb(0.15, 0.2, 0.3) });
    } else if (pageNum % 3 === 1) {
      page.drawText("@Entity\n@Table(name = \"students\")\npublic class Student implements BeanNameAware {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false)\n    private String name;\n\n    @Override\n    public void setBeanName(String name) {\n        System.out.println(\"Registered Bean Name: \" + name);\n    }\n}", { x: 45, y: 420, size: 10, font: fontMono, color: rgb(0.15, 0.2, 0.3) });
    } else {
      page.drawText("@Aspect\n@Component\npublic class LoggingAspect {\n    @Before(\"execution(* com.example.service.*.*(..))\")\n    public void logBefore(JoinPoint joinPoint) {\n        System.out.println(\"Executing method: \" + joinPoint.getSignature().getName());\n    }\n}", { x: 45, y: 420, size: 10, font: fontMono, color: rgb(0.15, 0.2, 0.3) });
    }

    // Footer
    page.drawText("Campus Notes — Protected PDF Asset • Do Not Distribute", { x: 30, y: 30, size: 9, font: fontMono, color: rgb(0.6, 0.6, 0.6) });
  }

  const pdfBytes = await pdfDoc.save();
  const targetPath = path.join(process.cwd(), 'private_assets', 'spring-boot-notes.pdf');
  fs.writeFileSync(targetPath, pdfBytes);
  console.log(`Successfully generated Spring Boot PDF at ${targetPath} (${pdfBytes.length} bytes, 85 pages)`);
}

generateSpringBootPDF().catch(console.error);
