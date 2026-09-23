import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateSpringBootNotesPDF() {
  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const codeFont = await pdfDoc.embedFont(StandardFonts.Courier);

  // --- Page 1: Title & Core Concepts ---
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  // Banner
  page1.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.06, 0.45, 0.25), // Spring Green Theme
  });

  page1.drawText('SPRING BOOT & JPA MASTER NOTES', {
    x: 40,
    y: height - 60,
    size: 20,
    font: titleFont,
    color: rgb(1, 1, 1),
  });

  page1.drawText('Comprehensive Placement & Enterprise Development Guide', {
    x: 40,
    y: height - 90,
    size: 12,
    font: regularFont,
    color: rgb(0.85, 0.95, 0.88),
  });

  let y = height - 150;

  page1.drawText('1. What is Spring Boot?', {
    x: 40,
    y: y,
    size: 15,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.1),
  });
  y -= 25;

  const introText = [
    'Spring Boot is an open-source Java-based framework built on top of Spring',
    'that simplifies configuration, setup, and deployment using auto-configuration,',
    'embedded Tomcat servers, and opinionated starter dependencies.',
  ];
  introText.forEach((line) => {
    page1.drawText(line, { x: 40, y: y, size: 11, font: regularFont, color: rgb(0.2, 0.25, 0.3) });
    y -= 16;
  });

  y -= 15;
  page1.drawText('2. Key Module Topics Covered', {
    x: 40,
    y: y,
    size: 15,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.1),
  });
  y -= 25;

  const topics = [
    '• Module 1: Spring vs Spring Boot & Embedded Containers (JAR vs WAR)',
    '• Module 2: IoC Containers & Dependency Injection (Constructor, Setter, Field)',
    '• Module 3: Key Annotations (@RestController, @Service, @Repository, @Configuration)',
    '• Module 4: Spring Data JPA, ORM Mappings & Entity Lifecycles',
    '• Module 5: SOLID Design Principles applied in Spring Architecture',
    '• Module 6: Spring Bean Lifecycle (@PostConstruct, BeanPostProcessor, @PreDestroy)',
    '• Module 7: Aspect-Oriented Programming (AOP), Advice Types & Proxies (JDK vs CGLIB)',
    '• Module 8: Spring Boot Actuator, Component Scanning & Profile Management',
  ];

  topics.forEach((topic) => {
    page1.drawText(topic, { x: 50, y: y, size: 11, font: regularFont, color: rgb(0.15, 0.2, 0.25) });
    y -= 22;
  });

  // Code snippet box on page 1
  y -= 15;
  page1.drawText('3. Sample Code: RestController & Constructor Injection', {
    x: 40,
    y: y,
    size: 13,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.1),
  });
  y -= 25;

  const code1 = [
    '@RestController',
    '@RequestMapping("/api/users")',
    'public class UserController {',
    '    private final UserService userService;',
    '',
    '    public UserController(UserService userService) {',
    '        this.userService = userService; // Recommended Constructor Injection',
    '    }',
    '',
    '    @GetMapping("/{id}")',
    '    public User getUser(@PathVariable Long id) {',
    '        return userService.findById(id);',
    '    }',
    '}',
  ];

  page1.drawRectangle({
    x: 40,
    y: y - 210,
    width: width - 80,
    height: 220,
    color: rgb(0.95, 0.97, 0.95),
    borderColor: rgb(0.7, 0.85, 0.7),
    borderWidth: 1,
  });

  let codeY = y - 18;
  code1.forEach((line) => {
    page1.drawText(line, { x: 55, y: codeY, size: 9.5, font: codeFont, color: rgb(0.1, 0.3, 0.15) });
    codeY -= 15;
  });

  // Footer
  page1.drawText('Campus Notes • Spring Boot & JPA Complete Guide • Strictly Confidential', {
    x: 40,
    y: 30,
    size: 9,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // --- Page 2: Spring Data JPA & AOP Overview ---
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  let y2 = height - 50;

  page2.drawText('4. Spring Data JPA & Entity Lifecycle States', {
    x: 40,
    y: y2,
    size: 15,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.1),
  });
  y2 -= 25;

  const jpaStates = [
    '1. TRANSIENT: Object exists only in JVM memory; Hibernate is unaware of it.',
    '2. PERSISTENT: Object is managed by EntityManager / Session and tracked for changes.',
    '3. DETACHED: Session closed; object exists in JVM but changes won\'t sync to DB.',
    '4. REMOVED: Entity is marked for deletion from the database.',
  ];

  jpaStates.forEach((state) => {
    page2.drawText(state, { x: 50, y: y2, size: 10.5, font: regularFont, color: rgb(0.2, 0.25, 0.3) });
    y2 -= 20;
  });

  y2 -= 15;
  page2.drawText('5. Aspect Oriented Programming (AOP) Cheat Sheet', {
    x: 40,
    y: y2,
    size: 15,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.1),
  });
  y2 -= 25;

  const aopPoints = [
    '• Aspect: A class containing cross-cutting concerns (Logging, Security, Transactions).',
    '• Advice: Defines WHAT action to perform (@Before, @After, @AfterReturning, @Around).',
    '• Pointcut: Defines WHERE the advice should be applied using expressions.',
    '• Join Point: Execution point in application where advice can be plugged in.',
    '• Proxies: JDK Dynamic Proxy (for Interfaces) vs CGLIB Proxy (for Subclasses).',
  ];

  aopPoints.forEach((pt) => {
    page2.drawText(pt, { x: 50, y: y2, size: 10.5, font: regularFont, color: rgb(0.2, 0.25, 0.3) });
    y2 -= 20;
  });

  page2.drawText('Campus Notes • Spring Boot & JPA Complete Guide • Strictly Confidential', {
    x: 40,
    y: 30,
    size: 9,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const dir = path.join(process.cwd(), 'private_assets');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'programming-notes.pdf'), pdfBytes);
  console.log('Successfully generated Spring Boot & JPA private_assets/programming-notes.pdf!');
}

generateSpringBootNotesPDF().catch(console.error);
