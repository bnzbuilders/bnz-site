import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { getSubs } from "@/lib/data";
import { formatDate } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Subs & Compliance" };

const REQUIRED_DOCS = ["W9", "COI_GENERAL_LIABILITY", "COI_WORKERS_COMP"];

export default async function SubsPage() {
  const subs = await getSubs();

  return (
    <>
      <PageHeader
        title="Subs + compliance"
        subtitle="No current W-9 and COI, no site access. Emma chases; Sara decides who works."
      />

      {subs.length === 0 ? (
        <EmptyState
          title="No subs on file."
          hint={`Required before anyone mobilizes: ${REQUIRED_DOCS.join(", ")}.`}
        />
      ) : (
        <Card>
          <Table>
            <THead>
              <TR>
                <TH>Sub</TH>
                <TH>Trade</TH>
                <TH>County</TH>
                <TH>Status</TH>
                <TH>Docs</TH>
              </TR>
            </THead>
            <TBody>
              {subs.map((s) => (
                <TR key={s.id}>
                  <TD className="font-semibold">{s.name}</TD>
                  <TD>{s.trade}</TD>
                  <TD>{s.county ?? "—"}</TD>
                  <TD>
                    <Badge variant="muted">{s.status}</Badge>
                  </TD>
                  <TD>
                    <div className="flex flex-wrap gap-1">
                      {s.docs.length === 0 ? (
                        <span className="text-sm text-[var(--muted-foreground)]">None on file</span>
                      ) : (
                        s.docs.map((d) => (
                          <Badge
                            key={d.id}
                            variant={d.status === "CURRENT" ? "default" : "accent"}
                            title={d.expiresOn ? `Expires ${formatDate(d.expiresOn)}` : undefined}
                          >
                            {d.type.replace(/_/g, " ")}
                          </Badge>
                        ))
                      )}
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      )}
    </>
  );
}
