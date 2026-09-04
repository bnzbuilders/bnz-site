import type { Metadata } from "next";
import "./globals.css";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.legalName} | Licensed & Bonded General Contractor · New York State`,
    template: `%s | ${COMPANY.legalName}`,
  },
  description:
    "BNZ Builders INC — New York State licensed and bonded general contractor. Commercial renovation, tenant fit-out, institutional and public works, site work, and specialty trades under one contract.",
  metadataBase: new URL(COMPANY.site),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
