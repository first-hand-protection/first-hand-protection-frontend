/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import {
  THEME_ID as MATERIAL_THEME_ID,
  ThemeProvider,
  createTheme as materialExtendTheme,
} from "@mui/material/styles";

import { SnackbarProvider } from "notistack";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./core/store";
import { Router } from "./routes/index";

const materialTheme = materialExtendTheme({
  palette: {
    mode: "light",
    default: {
      main: grey[300],
      dark: grey[400],
    },
    neutral: grey[300],
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <SnackbarProvider>
          <StoreProvider>
            <Router />
          </StoreProvider>
        </SnackbarProvider>
      </JoyCssVarsProvider>
    </ThemeProvider>
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => root.unmount());
}
