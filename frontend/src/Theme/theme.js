import { createTheme } from "@mui/material/styles";

const createAppTheme = (mode) => {
  const isDark = mode === "dark";
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#9c27b0",
      },
      custom: {
        borderC: isDark ? "#3A3A42" : "#9e9e9e",
        background: isDark ? "#0B0B0F" : "#f7f7fa",
        card: isDark ? "#12151c" : "#ffffff",
        cartHeader: isDark ? "#25213A" : "#F5F3FF",
        border: mode === "dark" ? "#292D36" : "#E0E0E0",
        featuresBg: isDark ? "#15151d" : "#f5f6fa",
        search: isDark ? "#1C1B22" : "#f5f6f6",
        text: isDark ? "#F5F5F5" : "#171717",
        textSecondary: isDark ? "#B0ADB5" : "#666666",
        navbarText: isDark ? "#EDE9FE" : "#333333",
        navbarIcon: isDark ? "#B8B3C2" : "#555555",
        heroBg:
          mode === "dark"
            ? "linear-gradient(135deg, #101018 0%, #171522 50%, #1d1728 100%)"
            : "linear-gradient(135deg, #f6f4ff 0%, #f2f0ff 50%, #ece9ff 100%)",

        divider: isDark ? "#2a2a33" : "#e0e0e0",

        swiperButton: isDark ? "#313131" : "#E5E7EB",
        swiperButtonColor: isDark ? "white" : "black",
        swiperDotInactive: mode === "dark" ? "#5C5863" : "#BDBDBD",

        heroButton: isDark ? "#E5E7EB" : "#111827",
        heroButtonText: isDark ? "#111827" : "#FFFFFF",
        heroButtonHover: isDark ? "#FFFFFF" : "#252525",
      },
    },

    typography: {
      fontFamily: ["Inter, sans-serif"],
    },
  });
};

export default createAppTheme;
