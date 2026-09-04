/** Single source of truth for public-facing company facts. */
export const COMPANY = {
  legalName: "BNZ Builders INC",
  shortName: "BNZ Builders",
  tagline: "Built right. On time. On budget.",
  promise:
    "The same project manager who scopes your job runs it to close-out. No hand-offs.",
  license: "New York State licensed and bonded general contractor",
  phone: "1-332-258-1401",
  phoneHref: "tel:+13322581401",
  officeEmail: "bnzbuilders1@gmail.com",
  pmName: "Sara Cooper",
  pmEmail: "saracooper@bnzbuildersinc.com",
  serviceArea: "New York State",
  site: "https://buildwithbnz.com",
} as const;

// Bonding capacity, financials, and job costs never appear on a public page.
