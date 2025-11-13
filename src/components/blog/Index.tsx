import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "../util/Icons";

export default function Index({ headings = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!headings.length) return null;

  return (
    <div ref={ref}>
      {open && (
        <div className="bg-background fixed bottom-6 z-3 space-y-3 justify-self-end rounded-lg px-6 py-4 select-none">
          <ul className="space-y-1 pb-2">
            {headings.map((h: any) => (
              <li key={h.slug}>
                <a
                  href={`#${h.slug}`}
                  onClick={() => setOpen(false)}
                  className="index"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="fixed right-[calc((100vw-56rem)/2-1rem)] bottom-6 z-3">
        <button
          onClick={() => setOpen(!open)}
          className="bg-foreground/5 rounded-full p-3"
        >
          <MenuIcon
            className={` ${open ? "opacity-0" : "rotate-180 opacity-100"} absolute`}
          />

          <CloseIcon
            className={`${open ? "opacity-100" : "rotate-180 opacity-0"} `}
          />
        </button>
      </div>
    </div>
  );
}
