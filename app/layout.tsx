import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pulso Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <div className="sidebar-brand-icon">P</div>
              <span className="sidebar-brand-name">Pulso</span>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item active">Dashboard</li>
            </ul>
          </aside>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
