const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting GIAL Database Seed...');

  // 1. Load legacy programs_data.js
  global.window = {};
  require(path.join(__dirname, '..', '..', 'programs_data.js'));
  const programsData = global.window.GIAL_PROGRAMS;

  // Clear existing programs and faculty
  await prisma.faculty.deleteMany({});
  await prisma.program.deleteMany({});
  await prisma.notice.deleteMany({});
  await prisma.iqacDocument.deleteMany({});

  console.log('🧹 Cleared old records.');

  // Map slugs and titles
  for (const [slug, data] of Object.entries(programsData)) {
    console.log(`Seeding Program: ${data.title} (${slug})`);

    const createdProgram = await prisma.program.create({
      data: {
        slug: slug,
        title: data.title || slug.toUpperCase(),
        shortTitle: data.shortTitle || slug.toUpperCase(),
        code: data.shortTitle || slug.toUpperCase(),
        degreeLevel: slug === 'msw' ? 'PG' : 'UG',
        department: data.dept || 'Department of ' + slug.toUpperCase(),
        duration: slug === 'msw' ? '2 Years' : '3 Years',
        overview: data.overview || '',
        eligibility: data.eligibility || 'Plus Two (+2) / Equivalent examination recognized by M.G. University.',
        objectives: JSON.stringify(data.objectives || []),
        curriculum: JSON.stringify(data.curriculum || []),
        careerProspects: JSON.stringify(data.careers || [
          'Corporate Analyst',
          'Software Developer',
          'Academic Researcher',
          'Business Strategist'
        ]),
        syllabusPdfUrl: `/uploads/syllabus/${slug}.pdf`,
        themeColors: JSON.stringify(data.theme || {}),
        themeEmojis: JSON.stringify(data.emojis || ['🎓', '✨']),
      }
    });

    // Seed Faculty for this program
    if (data.faculties && Array.isArray(data.faculties)) {
      for (let i = 0; i < data.faculties.length; i++) {
        const fac = data.faculties[i];
        await prisma.faculty.create({
          data: {
            name: fac.name || 'Faculty Member',
            designation: fac.designation || 'Assistant Professor',
            qualification: fac.education || 'Post Graduate / Ph.D',
            specialization: fac.area || '',
            bio: fac.bio || '',
            phone: fac.contact || '',
            profileImageUrl: fac.image || null,
            priorityOrder: i,
            programId: createdProgram.id,
          }
        });
      }
    }
  }

  // 2. Seed Notices
  const notices = [
    {
      title: 'M.G. University VI Semester UG Regular / Supplementary Exam Results Published',
      category: 'Exam',
      content: 'The Mahatma Gandhi University has published the results of the 6th Semester CBCSS Undergraduate Examinations. Students can check their results on the university official portal or collect marklists from the college office.',
      isTickerActive: true,
      attachmentUrl: '/uploads/notices/mgu_results.pdf',
    },
    {
      title: 'Admissions Open for Academic Year 2024-25 (UG & PG Programs)',
      category: 'Academic',
      content: 'Applications are invited for admission to various Under Graduate (BBA, BCA, B.Sc Cyber Forensics, B.Sc Psychology, B.Com) and Post Graduate (MSW) programs for the academic year 2024-25.',
      isTickerActive: true,
      attachmentUrl: '/uploads/notices/prospectus_2024.pdf',
    },
    {
      title: 'Annual College Arts & Cultural Fest - AURA 2024',
      category: 'Event',
      content: 'The Annual Inter-Collegiate Arts Fest AURA 2024 will be held on the college campus. Registration begins on Monday for all stage and non-stage events.',
      isTickerActive: false,
      attachmentUrl: null,
    },
    {
      title: 'Internal Assessment Timetable for Odd Semesters (I, III, V)',
      category: 'Urgent',
      content: 'The First Internal Examinations for all Odd Semester classes are scheduled to commence next week. Attendance is mandatory.',
      isTickerActive: true,
      attachmentUrl: '/uploads/notices/internal_exam_timetable.pdf',
    }
  ];

  for (const n of notices) {
    await prisma.notice.create({ data: n });
  }

  // 3. Seed IQAC Documents
  const iqacDocs = [
    {
      documentTitle: 'Annual Quality Assurance Report (AQAR) 2023-24',
      aqarYear: '2023-24',
      category: 'AQAR',
      fileUrl: '/uploads/iqac/AQAR_2023_24.pdf',
      publicAccess: true,
    },
    {
      documentTitle: 'NAAC Institutional Self Study Report (SSR) - Cycle 1',
      aqarYear: '2023-24',
      category: 'SSR',
      fileUrl: '/uploads/iqac/SSR_Final.pdf',
      publicAccess: true,
    },
    {
      documentTitle: 'IQAC Meeting Minutes & Action Taken Report - Q2',
      aqarYear: '2023-24',
      category: 'Minutes',
      fileUrl: '/uploads/iqac/Minutes_Q2.pdf',
      publicAccess: true,
    },
    {
      documentTitle: 'Stakeholder Feedback Analysis Report (Students & Alumni)',
      aqarYear: '2022-23',
      category: 'Feedback',
      fileUrl: '/uploads/iqac/Feedback_Analysis.pdf',
      publicAccess: true,
    },
    {
      documentTitle: 'Annual Quality Assurance Report (AQAR) 2022-23',
      aqarYear: '2022-23',
      category: 'AQAR',
      fileUrl: '/uploads/iqac/AQAR_2022_23.pdf',
      publicAccess: true,
    }
  ];

  for (const doc of iqacDocs) {
    await prisma.iqacDocument.create({ data: doc });
  }

  console.log('✅ Database Seed Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
