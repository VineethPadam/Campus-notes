import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateJavaNotesPDF() {
  const pdfDoc = await PDFDocument.create();
  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const codeFont = await pdfDoc.embedFont(StandardFonts.Courier);

  // --- Page 1: Title, Index & Core History ---
  const page1 = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  // Top Banner
  page1.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: rgb(0.09, 0.35, 0.62), // Java Blue Theme
  });

  page1.drawText('JAVA PROGRAMMING LANGUAGE', {
    x: 40,
    y: height - 55,
    size: 22,
    font: titleFont,
    color: rgb(1, 1, 1),
  });

  page1.drawText('Handwritten Notes — Complete Masterclass Edition (117 Pages)', {
    x: 40,
    y: height - 85,
    size: 12,
    font: regularFont,
    color: rgb(0.85, 0.92, 0.98),
  });

  let y = height - 150;

  // Table of Contents Header
  page1.drawText('TABLE OF CONTENTS / INDEX (13 MODULES)', {
    x: 40,
    y: y,
    size: 14,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.4),
  });
  y -= 20;

  const tocItems = [
    '1. History of Java & Core Features (Pages 1 – 5)',
    '2. JVM, JRE, JDK & Program Generations (Pages 6 – 9)',
    '3. Input Handling: Scanner, BigInteger & BigDecimal (Pages 10 – 14)',
    '4. Java Expressions, Data Types & Flow Control (Pages 15 – 18)',
    '5. Control Flow Statements (If-Else, Switch, Loops) (Pages 19 – 23)',
    '6. Classes, Objects & Constructors (Pages 24 – 32)',
    '7. Object-Oriented Programming (OOPs) Concepts (Pages 33 – 42)',
    '8. Inheritance, Super Keyword & Method Overriding (Pages 43 – 52)',
    '9. Polymorphism, Abstraction & Abstract Classes (Pages 53 – 62)',
    '10. Interfaces, Default/Static Methods & Packages (Pages 63 – 72)',
    '11. Exception Handling (Try-Catch, Custom Exceptions) (Pages 73 – 85)',
    '12. String Handling, StringBuilder & StringBuffer (Pages 86 – 100)',
    '13. Enums, Static Keyword & JVM Memory Model (Pages 101 – 117)',
  ];

  tocItems.forEach((item) => {
    page1.drawText(item, { x: 50, y: y, size: 10, font: regularFont, color: rgb(0.15, 0.2, 0.3) });
    y -= 17;
  });

  y -= 15;
  page1.drawText('1. History of Java & Core Features', {
    x: 40,
    y: y,
    size: 13,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.4),
  });
  y -= 18;

  const historyText = [
    '• Initiated in June 1991 by James Gosling, Mike Sheridan, and Patrick Naughton (Green Team).',
    '• Initially named Greentalk (.gt) and Oak, later renamed Java in 1995.',
    '• JDK 1.0 released on January 23, 1996.',
    '• Core Attributes: Simple, Portable, Secure, High-Performance, Multithreaded, Platform-Independent,',
    '  Robust, Object-Oriented, Architecture-Neutral, Dynamic.',
  ];

  historyText.forEach((line) => {
    page1.drawText(line, { x: 45, y: y, size: 9.5, font: regularFont, color: rgb(0.2, 0.25, 0.3) });
    y -= 15;
  });

  // Footer page 1
  page1.drawText('Campus Notes • Java Programming Language Handwritten Notes • Strictly Confidential', {
    x: 40,
    y: 30,
    size: 9,
    font: regularFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // --- Page 2: Scanner, OOPs & Exception Handling Snippets ---
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  let y2 = height - 50;

  page2.drawText('2. Input Handling with Scanner & BigInteger', {
    x: 40,
    y: y2,
    size: 14,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.4),
  });
  y2 -= 20;

  const codeScanner = [
    'import java.util.Scanner;',
    'import java.math.BigInteger;',
    '',
    'public class InputDemo {',
    '    public static void main(String[] args) {',
    '        Scanner sc = new Scanner(System.in);',
    '        System.out.print("Enter large number: ");',
    '        BigInteger b1 = sc.nextBigInteger();',
    '        BigInteger b2 = BigInteger.valueOf(100);',
    '        System.out.println("Result: " + b1.add(b2));',
    '    }',
    '}',
  ];

  page2.drawRectangle({
    x: 40,
    y: y2 - 170,
    width: width - 80,
    height: 175,
    color: rgb(0.96, 0.98, 1.0),
    borderColor: rgb(0.7, 0.8, 0.9),
    borderWidth: 1,
  });

  let cY = y2 - 18;
  codeScanner.forEach((line) => {
    page2.drawText(line, { x: 50, y: cY, size: 9, font: codeFont, color: rgb(0.1, 0.2, 0.5) });
    cY -= 14;
  });

  y2 -= 195;

  page2.drawText('3. Object-Oriented Concepts, Inheritance & Exception Handling', {
    x: 40,
    y: y2,
    size: 14,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.4),
  });
  y2 -= 20;

  const codeOOP = [
    '// Inheritance, super keyword, and Custom Exception',
    'class InvalidAgeException extends Exception {',
    '    public InvalidAgeException(String msg) { super(msg); }',
    '}',
    '',
    'class Person {',
    '    int age;',
    '    Person(int age) { this.age = age; }',
    '}',
    '',
    'class Student extends Person {',
    '    Student(int age) throws InvalidAgeException {',
    '        super(age); // Call superclass constructor',
    '        if (age < 18) throw new InvalidAgeException("Underage student!");',
    '    }',
    '}',
  ];

  page2.drawRectangle({
    x: 40,
    y: y2 - 230,
    width: width - 80,
    height: 235,
    color: rgb(0.96, 0.98, 1.0),
    borderColor: rgb(0.7, 0.8, 0.9),
    borderWidth: 1,
  });

  cY = y2 - 18;
  codeOOP.forEach((line) => {
    page2.drawText(line, { x: 50, y: cY, size: 9, font: codeFont, color: rgb(0.1, 0.2, 0.5) });
    cY -= 14;
  });

  y2 -= 255;

  page2.drawText('4. JVM Memory Model Areas', {
    x: 40,
    y: y2,
    size: 14,
    font: titleFont,
    color: rgb(0.1, 0.2, 0.4),
  });
  y2 -= 20;

  const jvmAreas = [
    '• Metaspace: Stores class metadata, bytecodes, static variables.',
    '• Heap: Stores all instantiated objects and instance variables.',
    '• Stack: Holds stack frames, method calls, local variables & object references.',
    '• PC Register: Holds the address of the currently executing JVM instruction per thread.',
    '• Native Method Stack: Stores native (C/C++) method execution state via JNI.',
  ];

  jvmAreas.forEach((area) => {
    page2.drawText(area, { x: 45, y: y2, size: 9.5, font: regularFont, color: rgb(0.2, 0.25, 0.3) });
    y2 -= 16;
  });

  page2.drawText('Campus Notes • Java Programming Language Handwritten Notes • Strictly Confidential', {
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
  console.log('Successfully generated Java Notes private_assets/programming-notes.pdf!');
}

generateJavaNotesPDF().catch(console.error);
