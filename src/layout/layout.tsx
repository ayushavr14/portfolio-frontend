import "../index.css";
import ThemeContextProvider from "../context/theme-context";
import ActiveSectionContextProvider from "../context/active-section-context";
import Header from "../components/header";
import ThemeSwitch from "../components/theme-switch";
import Home from "@/pages/Home";

export default function RootLayout() {
  return (
    <div
      className={`bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
    >
      <ThemeContextProvider>
        <ActiveSectionContextProvider>
          <Header />
          <Home />
          <ThemeSwitch />
        </ActiveSectionContextProvider>
      </ThemeContextProvider>
    </div>
  );
}
