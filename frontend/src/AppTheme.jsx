import { useSelector } from "react-redux";
import createAppTheme from "./Theme/theme.js";
import { ThemeProvider } from "@emotion/react";

export default function AppTheme({ children }) {
  const mode = useSelector((state) => state.ui.mode);
  const theme = createAppTheme(mode);

  return (
    <>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
}
