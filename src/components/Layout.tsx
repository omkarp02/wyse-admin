import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AppTheme from "../lib/theme/Apptheme";
import { CssBaseline } from "@mui/material";
import Navbar from "./Navbar/Navbar";
// import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

export default function Layout(props: { disableCustomTheme?: boolean }) {


  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {" "}
          <main>
            <Navbar />
            <Suspense fallback={<>Loading...</>}>
              <Outlet />
            </Suspense>
          </main>
        </LocalizationProvider>
      </AppTheme>
    </>
  );
}
