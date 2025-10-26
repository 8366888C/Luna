import { useState, useRef, useEffect } from "react";
import { BookIcon, QuoteIcon, TagIcon } from "./Icons";
import { navbarClass, navIconClass, navTextClass } from "../../styles/utility";

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
        <QuoteIcon className="fill-foreground size-5" />
      ) : (
        <QuoteIcon className="size-5" />
      )}

      <div
        className={`bg-background drop-shadow-foreground/20 absolute right-3 z-3 mt-3 w-28 rounded-2xl drop-shadow-2xl ${isOpen ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}
      >
        <div className="my-4 space-y-2">
          <a href="/posts" className={`${navbarClass}`}>
            <BookIcon className={`${navIconClass}`} />
            <span className={`${navTextClass}`}>Posts</span>
          </a>
          <a href="/tags" className={`${navbarClass}`}>
            <TagIcon className={`${navIconClass}`} />
            <span className={`${navTextClass}`}>Tags</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
