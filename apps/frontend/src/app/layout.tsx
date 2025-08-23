import "./globals.css";
import type { Metadata } from "next";
import ReactQueryProvider from "@/lib/react-query";

export const metadata: Metadata = {
  title: "Workout App",
  description: "Microservices + React + .NET + Postgres",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
