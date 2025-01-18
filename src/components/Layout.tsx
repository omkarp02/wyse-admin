import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AppTheme from "../lib/theme/Apptheme";
import { CssBaseline } from "@mui/material";
import Navbar from "./Navbar/Navbar";

export default function Layout(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <main>
          <Navbar />
          <Suspense fallback={<>Loading...</>}>
            <Outlet />
          </Suspense>
        </main>
      </AppTheme>
    </>
  );
}
