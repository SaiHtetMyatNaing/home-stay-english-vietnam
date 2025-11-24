"use client";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/nextjs-router";
import { RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdminLayout } from "@/components/admin/AdminLayout";

const API_URL = process.env.NODE_ENV === "development" 
    ? "http://localhost:3000/api" 
    : "https://www.englishhomestayvietnam.com/api";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#46b96c",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RefineSnackbarProvider>
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <Refine
          routerProvider={routerProvider}
          resources={[
            {
              name: "get-all-reviews",
              list: "/admin/reviews",
              show: "/admin/reviews/show/:id",
              edit: "/admin/reviews/edit/:id",
              meta: { canDelete: true },
            },
          ]}
          options={{ syncWithLocation: true }}
          dataProvider={dataProvider(API_URL)}
        >
          <AdminLayout>{children}</AdminLayout>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
