import { prisma } from "@/lib/db";

/**
 * Every read here is scoped to one project at a time. There is no query in
 * this file that sums costs across jobs, and there should never be one —
 * job costs do not mix.
 */

export async function getLiveProjects() {
  const projects = await prisma.project.findMany({
    where: { status: { in: ["ACTIVE", "AWARDED", "PUNCHLIST"] } },
    orderBy: { code: "asc" },
    include: { costs: true, caps: true, notes: { orderBy: { createdAt: "asc" } } },
  });

  return projects.map((p) => ({
    ...p,
    // Per-project total only.
    spentCents: p.costs.reduce((sum, c) => sum + c.amountCents, 0),
  }));
}

export async function getProjectByCode(code: string) {
  const project = await prisma.project.findUnique({
    where: { code },
    include: {
      costs: { orderBy: { createdAt: "asc" } },
      caps: true,
      notes: { orderBy: { createdAt: "asc" } },
      rfqs: { include: { sub: true } },
      bills: true,
      estimates: true,
    },
  });
  if (!project) return null;
  return { ...project, spentCents: project.costs.reduce((s, c) => s + c.amountCents, 0) };
}

export async function getDashboardCounts() {
  const [openEstimates, rfqsWaiting, unpaidBills, missingCois, pendingDrafts, unreadMail] =
    await Promise.all([
      prisma.estimate.count({ where: { status: { in: ["DRAFT", "IN_REVIEW", "SUBMITTED"] } } }),
      prisma.rfq.count({ where: { status: { in: ["DRAFT", "SENT"] } } }),
      prisma.bill.count({ where: { status: { in: ["UNPAID", "APPROVED"] } } }),
      prisma.complianceDoc.count({ where: { status: { in: ["MISSING", "REQUESTED", "EXPIRED"] } } }),
      prisma.draft.count({ where: { status: { in: ["DRAFT", "PENDING_APPROVAL"] } } }),
      prisma.inboxMessage.count({ where: { status: "UNREAD" } }),
    ]);

  return { openEstimates, rfqsWaiting, unpaidBills, missingCois, pendingDrafts, unreadMail };
}

export async function getEstimates() {
  return prisma.estimate.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { project: true, lines: true },
  });
}

export async function getRfqs() {
  return prisma.rfq.findMany({ orderBy: { createdAt: "desc" }, include: { project: true, sub: true } });
}

export async function getSubs() {
  return prisma.subcontractor.findMany({ orderBy: { name: "asc" }, include: { docs: true } });
}

export async function getBills() {
  return prisma.bill.findMany({ orderBy: { dueOn: "asc" }, include: { project: true, sub: true } });
}

export async function getDrafts() {
  return prisma.draft.findMany({ orderBy: { createdAt: "desc" }, include: { project: true } });
}

export async function getInbox() {
  return prisma.inboxMessage.findMany({ orderBy: { receivedAt: "desc" }, include: { project: true } });
}

export async function getEstimateRequests() {
  return prisma.estimateRequest.findMany({ orderBy: { createdAt: "desc" } });
}
