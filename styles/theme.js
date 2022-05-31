import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    donate: "'Poppins'",
    body: `'Inter', sans-serif`,
  },
  radii: {
    accountBtn: "115px",
    input: "6px",
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
    link: "24px",
    donate: "32px",
    small: "12px",
    title: "40px",
    pastDonation: "14px",
  },
  colors: {
    badge: {
      active: "rgba(28, 28, 28, 0.5)",
      inactive: "rgba(28, 28, 28, 0.25)",
      selected: "rgba(28, 28, 28, 1)",
    },
    networkSpeed: {
      fast: "#03DAC6",
    },
    modal: {
      active: "#3A3A3A",
      hover: "rgba(0, 0, 0, 0.2)",
      border: "#444444",
      input: "rgba(255, 255, 255, 0.07)",
    },
    learnMore: {
      active: "rgba(0, 0, 0, 0.4)",
      hover: "rgba(0, 0, 0, 0.6)",
    },
    input: {
      active: "rgba(255, 255, 255, 0.07)",
      inactive: "rgba(255, 255, 255, 0.05)",
      hover: "rgba(255, 255, 255, 0.15)",
    },
    text: "#FFFFFF",
    leftPannel: (props) => ({
      100: props.colorMode === "dark" ? "#000000" : "#000000",
      200: props.colorMode === "dark" ? "#FFFFFF" : "#FFFFFF",
    }),

    rightPannel: "#121212",
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
});
