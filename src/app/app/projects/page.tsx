import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { getLiveProjects } from "@/lib/data";
import { EmptyState } from "@/components/empty-state";

export const dynamic = "force-dynamic";
export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await getLiveProjects();

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="One card per job. Costs, notes, and caps live inside the job — they never roll up together."
      />
      {projects.length === 0 ? (
        <EmptyState title="No live jobs" hint="Run `npm run db:seed` to load the two current jobs." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.code} project={p} />
          ))}
        </div>
      )}
    </>
  );
}
