import { Metadata } from "next";

import "./styles.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">Diablo Trading App</header>
        <div id="root" className="root">
          {children}
        </div>
      </body>
    </html>
  );
}
