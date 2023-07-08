import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

// import Dashboard from "./pages/dashboard";
// import Form from "./pages/form";
// import FAQ from "./pages/faq";
// import Team from "./pages/team";
import { Navbar } from "../navbar/Navbar";

const Dashboard2 = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar page="Dashboard" />
        <MyProSidebarProvider>
          <div style={{ height: "100vh", width: "100%" }}>
            <main>

              <Topbar />
              <div style={{ height: 'calc(100vh - 71.75px)', overflowY: 'scroll' }}>
                <Outlet />
              </div>

            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
};

export default Dashboard2;
