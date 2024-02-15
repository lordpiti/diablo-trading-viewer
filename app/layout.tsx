import { Metadata } from "next";

import "./styles.css";
import Settings from "@/components/settings";
import { Container, Grid } from "@mui/material";
import OrdersAccordion from "@/components/orders-accordion";

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
          <div style={{ paddingTop: "20px" }}>
            <Container maxWidth={false}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Settings />
                </Grid>
                <Grid item xs={12} md={9}>
                  {children}
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </body>
    </html>
  );
}
