import { useState, useRef, useEffect } from "react";
import { QuoteIcon } from "./Icons";
import { navigationClass } from "./class";

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      onClick={() => setIsOpen(!isOpen)}
      ref={menuRef}
      className="cursor-pointer sm:hidden"
    >
      {isOpen ? (
        <QuoteIcon className="fill-secondary-light dark:fill-secondary-dark" />
      ) : (
        <QuoteIcon />
      )}

      {isOpen && (
        <div className="text-secondary-light dark:bg-primary-dark dark:text-secondary-dark bg-primary-light absolute right-6 mt-4 w-26 rounded-2xl text-center">
          <div className="my-4 space-y-2">
            <a href="/posts" className={navigationClass}>
              Posts
            </a>
            <a href="/tags" className={navigationClass}>
              Tags
            </a>
            <a href="/contact" className={navigationClass}>
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
