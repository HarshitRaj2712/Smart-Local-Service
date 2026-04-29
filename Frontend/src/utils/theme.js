import { useEffect, useState } from "react";

export const getThemeMode = () => {
  if (typeof document === "undefined") {
    return "dark";
  }

  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "light" ? "light" : "dark";
};

export const getThemeTokens = () => {
  if (typeof window === "undefined") {
    return {
      theme: "dark",
      text: "#F2F7FF",
      muted: "#C4D4EE",
      surface: "#0c1320",
      border: "#233858",
    };
  }

  const styles = getComputedStyle(document.documentElement);

  return {
    theme: getThemeMode(),
    text: styles.getPropertyValue("--text-main").trim() || "#F2F7FF",
    muted: styles.getPropertyValue("--text-muted").trim() || "#C4D4EE",
    surface: styles.getPropertyValue("--bg-surface").trim() || "#0c1320",
    border: styles.getPropertyValue("--border-color").trim() || "#233858",
  };
};

export const useThemeMode = () => {
  const [theme, setTheme] = useState(getThemeMode());

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getThemeMode());
    };

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("storage", syncTheme);

    return () => {
      observer.disconnect();
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
};