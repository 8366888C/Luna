import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "./util/Icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("");

  // initialization from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      "light",
      initialTheme === "light",
    );
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // keep localStorage + document class in sync
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // utility function
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
  };

  // button handler
  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";

    const transition = (document as any).startViewTransition?.(() =>
      changeTheme(newTheme),
    );
    if (!transition) return changeTheme(newTheme);

    const x = event.clientX;
    const y = event.clientY;

    transition.ready.then(() => {
      const path = [
        `circle(0% at ${x}px ${y}px)`,
        `circle(150% at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: theme === "dark" ? path : [...path].reverse(),
        },
        {
          duration: 600,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement:
            newTheme === "light"
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
        },
      );
    });
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Activate ${theme === "light" ? "dark" : "light"} mode`}
      aria-pressed={theme === "dark"}
      title={`Activate ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <MoonIcon className="active:fill-foreground size-5" />
      ) : (
        <SunIcon className="active:fill-foreground size-5" />
      )}
    </button>
  );
}
