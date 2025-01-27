import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import AppTheme from "../lib/theme/Apptheme";
import { Box, CssBaseline, Grid2 } from "@mui/material";
// import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Sidebar from "./Navbar/Sidebar";

export default function Layout(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {" "}
          <main>
            <Grid2 display={"flex"}>
              <Sidebar />
              <div style={{width: '100%'}}>
                <Suspense fallback={<>Loading...</>}>
                  <Outlet />
                </Suspense>
              </div>
            </Grid2>
          </main>
        </LocalizationProvider>
      </AppTheme>
    </>
  );
}
