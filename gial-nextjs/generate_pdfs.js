const fs = require('fs');
const path = require('path');

// Helper to create a valid minimal PDF with customizable text lines
function createPdf(title, subtitle, lines) {
  const contentStream = [
    'BT',
    '/F1 20 Tf',
    '50 740 Td',
    `(${escapePdf(title)}) Tj`,
    '/F1 12 Tf',
    '0 -25 Td',
    `(${escapePdf(subtitle)}) Tj`,
    '/F1 10 Tf',
    '0 -15 Td',
    '(----------------------------------------------------------------------------------------------------) Tj',
    '0 -25 Td',
    ...lines.map((line, idx) => {
      if (line.startsWith('###')) {
        return `/F1 14 Tf 0 -22 Td (${escapePdf(line.replace('###', '').trim())}) Tj /F1 10 Tf`;
      }
      if (line.startsWith('##')) {
        return `/F1 12 Tf 0 -18 Td (${escapePdf(line.replace('##', '').trim())}) Tj /F1 10 Tf`;
      }
      return `0 -14 Td (${escapePdf(line)}) Tj`;
    }),
    '0 -30 Td',
    '/F1 8 Tf',
    '(Official Document of Girideepam Institute of Advanced Learning (GIAL), Affiliated to M.G. University) Tj',
    'ET'
  ].join('\n');

  const streamLength = Buffer.byteLength(contentStream, 'utf8');

  const pdfBody = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
5 0 obj
<< /Length ${streamLength} >>
stream
${contentStream}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000000305 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${400 + streamLength}
%%EOF`;

  return Buffer.from(pdfBody, 'utf8');
}

function escapePdf(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Target directories
const baseDir = path.join(__dirname, 'public', 'uploads');
const syllabusDir = path.join(baseDir, 'syllabus');
const noticesDir = path.join(baseDir, 'notices');
const iqacDir = path.join(baseDir, 'iqac');

[baseDir, syllabusDir, noticesDir, iqacDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 1. Generate Program Syllabi
const programs = [
  { slug: 'cyber', name: 'B.Sc Cyber Forensics', code: 'CYBER-2024' },
  { slug: 'bba', name: 'Bachelor of Business Administration (BBA)', code: 'BBA-2024' },
  { slug: 'bca', name: 'Bachelor of Computer Applications (BCA)', code: 'BCA-2024' },
  { slug: 'psychology', name: 'B.Sc Psychology', code: 'PSY-2024' },
  { slug: 'bcom-acc', name: 'B.Com Computer Applications / Accounting', code: 'BCOM-ACC-2024' },
  { slug: 'bcom-fin', name: 'B.Com Finance & Taxation', code: 'BCOM-FIN-2024' },
  { slug: 'bcom-log', name: 'B.Com Logistics & Supply Chain Management', code: 'BCOM-LOG-2024' },
  { slug: 'msw', name: 'Master of Social Work (MSW)', code: 'MSW-2024' },
  { slug: 'commerce', name: 'B.Com Programs', code: 'BCOM-GEN-2024' },
  { slug: 'logistics', name: 'B.Com Logistics', code: 'LOG-2024' }
];

programs.forEach(prog => {
  const lines = [
    `Course Code: ${prog.code}  |  Regulation: M.G. University CBCSS Scheme`,
    'Accreditation: ISO 9001:2015 Certified  |  AICTE Approved',
    '',
    '### 1. Program Educational Objectives (PEO)',
    '  - Impart comprehensive domain knowledge with practical laboratory exposure.',
    '  - Cultivate analytical problem solving, research orientation, and digital ethics.',
    '  - Prepare graduates for global corporate leadership, entrepreneurship, and higher research.',
    '',
    '### 2. Semester-wise Core Subjects Overview',
    '  - Semester 1 & 2: Foundational Domain Theories & Applied Mathematics/Communication',
    '  - Semester 3 & 4: Intermediate Core Modules, Analytical Laboratories & Projects',
    '  - Semester 5 & 6: Advanced Electives, Comprehensive Viva & Corporate Internship',
    '',
    '### 3. Examination & Evaluation Scheme',
    '  - Continuous Assessment (Internal): 20 Marks (Tests, Assignments, Seminar)',
    '  - End Semester Examination (External): 80 Marks (Conducted by M.G. University)',
    '  - Minimum aggregate required for pass: 40% in each theory and practical paper.'
  ];

  const pdf = createPdf(
    `GIAL - ${prog.name}`,
    'OFFICIAL CURRICULUM & SYLLABUS REGULATION',
    lines
  );

  fs.writeFileSync(path.join(syllabusDir, `${prog.slug}.pdf`), pdf);
  console.log(`Generated: syllabus/${prog.slug}.pdf`);
});

// 2. Generate Notices
const notices = [
  { file: 'mgu_results.pdf', title: 'M.G. UNIVERSITY EXAMINATION RESULTS', sub: 'VI Semester CBCSS Regular/Supplementary' },
  { file: 'prospectus_2024.pdf', title: 'GIAL ADMISSIONS PROSPECTUS 2024-25', sub: 'Undergraduate & Postgraduate Degree Programs' },
  { file: 'internal_exam_timetable.pdf', title: 'INTERNAL ASSESSMENT SCHEDULE', sub: 'Odd Semesters (I, III, V) Examination Timetable' }
];

notices.forEach(n => {
  const lines = [
    'Notification No: GIAL/EXAM/2024/08',
    'Issued by: Office of the Controller of Examinations, GIAL',
    '',
    '### Key Information & Instructions',
    '  - Students must verify candidate details and register grievances within 7 days.',
    '  - Hall tickets are available through student portal authentication.',
    '  - Mandatory attendance requirement: 75% aggregate.'
  ];
  fs.writeFileSync(path.join(noticesDir, n.file), createPdf(n.title, n.sub, lines));
  console.log(`Generated: notices/${n.file}`);
});

// 3. Generate IQAC Documents
const iqac = [
  { file: 'AQAR_2023_24.pdf', title: 'ANNUAL QUALITY ASSURANCE REPORT (AQAR)', sub: 'Academic Year 2023-2024 - NAAC Criteria 1 to 7' },
  { file: 'SSR_Final.pdf', title: 'INSTITUTIONAL SELF STUDY REPORT (SSR)', sub: 'NAAC Accreditation - Cycle 1 Comprehensive Report' },
  { file: 'Minutes_Q2.pdf', title: 'IQAC COMMITTEE MEETING MINUTES', sub: 'Action Taken Report & Strategic Academic Roadmap' },
  { file: 'Feedback_Analysis.pdf', title: 'STAKEHOLDER FEEDBACK ANALYSIS', sub: 'Curriculum & Infrastructure Feedback from Students & Alumni' },
  { file: 'AQAR_2022_23.pdf', title: 'ANNUAL QUALITY ASSURANCE REPORT (AQAR)', sub: 'Academic Year 2022-2023 - Complete Filing' }
];

iqac.forEach(doc => {
  const lines = [
    'Submitted to: National Assessment and Accreditation Council (NAAC), Bengaluru',
    'Compiled by: Internal Quality Assurance Cell (IQAC), GIAL Kottayam',
    '',
    '### Institutional Performance Metrics',
    '  - Teaching-Learning & Evaluation Standards: 100% CBCSS Compliance',
    '  - Research Publications & Faculty Development: Active FDP Participation',
    '  - Infrastructure & Learning Resources: Modern Smart Labs & DELNET Library',
    '  - Student Support & Progression: Vibrant Placement & SGRC Mechanism'
  ];
  fs.writeFileSync(path.join(iqacDir, doc.file), createPdf(doc.title, doc.sub, lines));
  console.log(`Generated: iqac/${doc.file}`);
});

console.log('🎉 All official PDFs successfully generated in /public/uploads/ !');
