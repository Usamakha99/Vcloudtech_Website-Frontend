import localFont from "next/font/local";

/** Montserrat — local variable font (weights 100–900). */
export const montserrat = localFont({
  src: [
    {
      path: "./Montserrat-VariableFont_wght.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "./Montserrat-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});
