import { useState, useRef, useEffect } from "react";
import { Quote } from "./Icons";

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
      {isOpen ? <Quote className="fill-[var(--color-text)]" /> : <Quote />}

      {isOpen && (
        <div className="absolute right-6 mt-4 w-20 rounded-xl bg-[var(--color-bg)] text-center">
          <a href="/home" className="block px-4 py-2">
            Home
          </a>
          <a href="/about" className="block px-4 py-2">
            About
          </a>
          <a href="/contact" className="block px-4 py-2">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}
