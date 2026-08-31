import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProgramPortalView } from "@/components/programs/ProgramPortalView";

const SLUG_ALIASES: Record<string, string> = {
  "bsc-cyber-forensics": "cyber",
  "bsc-psychology": "psychology",
  "bcom-computer-applications": "bcom-acc",
  "bcom-finance-taxation": "bcom-fin",
  "bcom-finance": "bcom-fin",
  "bcom-logistics": "bcom-log",
  "mcom-finance": "mcom-fin",
  "mcom-marketing": "mcom-mkt",
  "bcom": "bcom-acc",
  "mcom": "mcom-fin",
};

export async function generateStaticParams() {
  const programs = await db.program.findMany({ select: { slug: true } });
  return programs.map((p) => ({ slug: p.slug }));
}

export default async function ProgramDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const targetSlug = SLUG_ALIASES[params.slug.toLowerCase()] || params.slug.toLowerCase();

  let program = await db.program.findUnique({
    where: { slug: targetSlug },
    include: {
      faculty: {
        orderBy: { priorityOrder: "asc" },
      },
    },
  });

  // Fallback fuzzy search if slug is slightly different
  if (!program) {
    program = await db.program.findFirst({
      where: {
        OR: [
          { slug: { contains: targetSlug } },
          { code: { equals: targetSlug } },
        ],
      },
      include: {
        faculty: {
          orderBy: { priorityOrder: "asc" },
        },
      },
    });
  }

  if (!program) notFound();

  return <ProgramPortalView program={program as any} />;
}
