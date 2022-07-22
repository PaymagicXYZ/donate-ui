import { extendTheme } from "@chakra-ui/react";

const createTheme = (mode) => {
  const isDarkMode = mode === "dark";
  return extendTheme({
    initialColorMode: "dark",
    fonts: {
      donate: "'Poppins'",
      body: `'Inter', sans-serif`,
    },
    radii: {
      accountBtn: "115px",
      input: "6px",
      networkOption: "16px",
    },
    sizes: {
      logo: {
        width: "26px",
        height: "26px",
      },
      input: "56px",
      modal: {
        width: "390px",
      },
    },
    lineHeights: {
      description: "31.5px",
    },
    fontSizes: {
      select: "18px",
      input: "18px",
      link: "24px",
      donate: "32px",
      small: "12px",
      medium: "16px",
      title: "40px",
      pastDonation: "14px",
    },
    colors: {
      twitter: "#00ACEE",
      success: "#58C573",
      error: "#F6677C",
      modalList: {
        hover: isDarkMode ? "#1A1A1A" : "rgba(0, 0, 0, 0.05)",
        active: isDarkMode ? "#272727" : "#FFFFFF",
      },
      modal: {
        active: isDarkMode ? "#3A3A3A" : "rgba(251, 251, 251, 1)",
        hover: isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.05)",
        border: isDarkMode ? "#444444" : "rgba(230, 230, 230, 1)",
        input: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
      },
      badge: isDarkMode ? "#1C1C1C" : "rgba(0, 0, 0, 0.1)",
      networkSpeed: {
        fast: "#03DAC6",
      },
      learnMore: {
        active: isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.8)",
        hover: isDarkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.9)",
        text: "rgba(255, 255, 255, 1)",
      },
      input: {
        placeholder: isDarkMode ? "white" : "rgba(0, 0, 0, 1)",
        active: isDarkMode
          ? "rgba(255, 255, 255, 0.07)"
          : "rgba(0, 0, 0, 0.07)",
        inactive: isDarkMode
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.05)",
        hover: isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
      },
      divider: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.8)",
      switch: isDarkMode
        ? "rgba(111, 111, 111, 0.3)"
        : "rgba(191, 191, 191, 0.4)",
      text: isDarkMode ? "#FFFFFF" : "black",
      leftPanel: isDarkMode ? "rgb(45, 45, 45)" : "#FFFFFF",
      // rightPanel: isDarkMode ? "#121212" : "#FBFBFB",
      rightPanel: isDarkMode ? "#121212" : "#FBFBFB",
      brand: {
        100: "#f7fafc",
        900: "#1a202c",
      },
    },
    components: {
      Button: {
        baseStyle: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  });
};

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");
