import * as React from "react";
import { Button } from "@/components/ui/button";
import { RiMoonFill, RiMoonLine, RiSunFill, RiSunLine } from "@remixicon/react";

export default function ThemeToggle() {
  const [theme, setThemeState] = React.useState<"light" | "dark" | "system">(
    "light",
  );

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const transition = document.startViewTransition?.(() =>
      setThemeState(newTheme),
    );
    if (!transition) return setThemeState("system");

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
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleClick}
      className="group"
    >
      <div className="scale-0 animation dark:scale-100">
        <RiSunLine className="size-4 group-active:size-0 " />
        <RiSunFill className="size-0 group-active:size-4" />
      </div>
      <div className="absolute scale-100 animation dark:scale-0">
        <RiMoonLine className="size-4 group-active:size-0" />
        <RiMoonFill className="size-0 group-active:size-4" />
      </div>
    </Button>
  );
}
