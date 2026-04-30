import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Afterburn — Every action item lands. Every incident, once.",
  description:
    "Afterburn is the accountability layer for postmortem action items — auto-escalation, SLA tracking, and causal loop detection that turns incident retrospectives from theater into actual reliability improvement.",
  openGraph: {
    title: "Afterburn — Every action item lands. Every incident, once.",
    description:
      "Auto-escalation, SLA tracking, and causal loop detection for postmortem action items. Built for SRE and engineering managers at 50–300 person B2B SaaS companies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afterburn",
    description: "Every action item lands. Every incident, once.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
