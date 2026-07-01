// Single source of truth for facts about Elan Exports Consultancy that are
// restated across multiple pages (UEN, incorporation date, address, contact,
// supplier count). Import these instead of hardcoding the value again.
//
// public/index.html cannot import this file (CRA serves it as static HTML,
// outside the webpack/JS bundle), so its JSON-LD block must be kept in sync
// with these values by hand. If you change a value here, also update
// public/index.html.
export const COMPANY = {
  legalName: "Elan Exports Consultancy Pte. Ltd.",
  brandName: "Elan Exports Consultancy",
  shortName: "EEC",
  uen: "202501728W",
  incorporationDateDisplay: "13 January 2025",
  incorporationDateISO: "2025-01-13",
  incorporationMonthYear: "January 2025",
  addressStreet: "36 Jalan Sampurna",
  addressCity: "Singapore",
  addressPostalCode: "268304",
  addressCountry: "SG",
  addressFull: "36 Jalan Sampurna, Singapore 268304",
  supplierCountClaim: "70+ verified suppliers",
  contactEmail: "partners@eectrade.com",
  socialLinks: [
    "https://www.linkedin.com/company/elan-exports/",
    "https://www.instagram.com/elan_exports_consultancy/",
    "https://www.facebook.com/profile.php?id=61591311811743",
  ],
};
