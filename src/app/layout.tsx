import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Healthcare Booking System",
  description: "DBMS Project for 23-24 Sem 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
