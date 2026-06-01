"use client";

import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { RiShareForwardLine, RiShareForwardFill, RiShareLine, RiShareFill } from "@remixicon/react";

export default function ShareButton() {
  const [active, setActive] = useState(false);

  const handleShare = useCallback(async () => {
    setActive(true);

    const url = window.location.href;
    const title = document.title;
    const text = document.querySelector("meta[name='description']")?.getAttribute("content") ?? "";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        await new Promise((r) => setTimeout(r, 2000));
      } catch {
        // clipboard unavailable
      }
    }

    setActive(false);
  }, []);

  return (
    <button onClick={handleShare} aria-label="share" className="cursor-pointer group">
      <RiShareForwardLine className="size-4 group-hover:hidden" />
      <RiShareForwardFill className="size-4 hidden group-hover:block" />
    </button>
  );
}
