import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { getEstimates } from "@/lib/data";
import { formatCents, formatDate } from "@/lib/money";

export const dynamic = "force-dynamic";
export const metadata = { title: "Estimates" };

export default async function EstimatesPage() {
  const estimates = await getEstimates();

  return (
    <>
      <PageHeader
        title="Estimates"
        subtitle="Taylor's board. A total stays blank until the takeoff supports it."
        right={
          <Link href="/app/taylor">
            <Button variant="accent" size="sm">
              Open Taylor's workspace
            </Button>
          </Link>
        }
      />

      {estimates.length === 0 ? (
        <EmptyState
          title="No estimates on the board."
          hint="Start one in Taylor's workspace. Nothing is pre-filled — a number needs a takeoff behind it."
        />
      ) : (
        <Card>
          <Table>
            <THead>
              <TR>
                <TH>Job</TH>
                <TH>Client</TH>
                <TH>Status</TH>
                <TH>Due</TH>
                <TH className="text-right">Total</TH>
              </TR>
            </THead>
            <TBody>
              {estimates.map((e) => (
                <TR key={e.id}>
                  <TD className="font-semibold">{e.title}</TD>
                  <TD>{e.client}</TD>
                  <TD>
                    <Badge variant="muted">{e.status}</Badge>
                  </TD>
                  <TD>{formatDate(e.dueOn)}</TD>
                  <TD className="text-right font-extrabold tabular-nums">{formatCents(e.totalCents)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </Card>
      )}
    </>
  );
}
