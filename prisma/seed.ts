/**
 * Seed — the two live BNZ jobs and nothing else.
 *
 * Every number below comes off a document (PO, receipt, or a cap a human set).
 * Do not add a dollar amount here that you cannot point at a document for, and
 * never move a cost from one job to the other.
 */
import { PrismaClient, ProjectType, ProjectStatus, CostCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------------------------------------------------------------- Vienna
  const vienna = await prisma.project.upsert({
    where: { code: "VIENNA" },
    update: {},
    create: {
      code: "VIENNA",
      name: "545 Vienna Street — Bathroom Renovation",
      client: "Finger Lakes",
      poNumber: "OPD01-0000122954",
      address: "545 Vienna Street",
      type: ProjectType.INSTITUTIONAL,
      status: ProjectStatus.ACTIVE,
      budgetCents: 3_450_000, // $34,500.00 per PO
    },
  });

  await prisma.costEntry.deleteMany({ where: { projectId: vienna.id } });
  await prisma.costEntry.create({
    data: {
      projectId: vienna.id,
      vendor: "E&T Plastics",
      category: CostCategory.MATERIAL,
      description: "Material purchase — E&T Plastics",
      amountCents: 542_850, // $5,428.50 documented
      incurredOn: null, // date lives on the receipt; not keyed in yet
    },
  });

  await prisma.projectNote.deleteMany({ where: { projectId: vienna.id } });
  await prisma.projectNote.create({
    data: {
      projectId: vienna.id,
      body:
        "Documented material to date is E&T Plastics only ($5,428.50). " +
        "Do not post any other Vienna spend until a receipt is uploaded.",
    },
  });

  // -------------------------------------------------------------- Maybrook
  const maybrook = await prisma.project.upsert({
    where: { code: "MAYBROOK" },
    update: {},
    create: {
      code: "MAYBROOK",
      name: "Indian Trail — CMM IRA Patch & Paint",
      client: "Maybrook",
      poNumber: "OPD01-0000123175",
      address: "Indian Trail, Maybrook, NY",
      type: ProjectType.INSTITUTIONAL,
      status: ProjectStatus.ACTIVE,
      budgetCents: 1_790_000, // $17,900.00 per PO
    },
  });

  // Posted materials on Maybrook are $0.00. That is the correct number.
  await prisma.costEntry.deleteMany({ where: { projectId: maybrook.id } });

  await prisma.spendCap.deleteMany({ where: { projectId: maybrook.id } });
  await prisma.spendCap.create({
    data: {
      projectId: maybrook.id,
      label: "First paint / protection buy",
      capCents: 250_000, // $2,500.00 cap set by the office
      note: "Hard cap on the first material run. Anything above it needs Sara's sign-off.",
    },
  });

  await prisma.projectNote.deleteMany({ where: { projectId: maybrook.id } });
  await prisma.projectNote.createMany({
    data: [
      {
        projectId: maybrook.id,
        body: "Occupied house. Residents in place — sequence work and protection around them.",
      },
      {
        projectId: maybrook.id,
        body: "Paint is ProMar 200 Zero VOC. Colors are locked by the owner — no substitutions.",
      },
      {
        projectId: maybrook.id,
        body: "Posted materials: $0.00. Do not invent paint buys; post only against a receipt.",
      },
    ],
  });

  console.log("Seeded 2 live jobs: VIENNA, MAYBROOK");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
