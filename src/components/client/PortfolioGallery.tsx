"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useState, useRef, useCallback, useMemo } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

type GalleryItem = { type: "image"; src: string; alt: string } | { type: "video"; videoId: string; alt: string };

export default function PortfolioGallery({ images, videoId, title }: { images: GalleryImage[]; videoId?: string | null; title?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const items = useMemo<GalleryItem[]>(() => {
    const result: GalleryItem[] = [];
    if (videoId) {
      result.push({ type: "video", videoId, alt: title ? `${title} demo video` : "Demo video" });
    }
    images.forEach((img) => result.push({ type: "image", ...img }));
    return result;
  }, [images, videoId, title]);

  const goNext = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => {
      const next = (prev + 1) % items.length;
      scrollThumbTo(next);
      return next;
    });
  }, [items.length]);

  const goPrev = useCallback(() => {
    if (items.length === 0) return;
    setCurrentIndex((prev) => {
      const next = (prev - 1 + items.length) % items.length;
      scrollThumbTo(next);
      return next;
    });
  }, [items.length]);

  const scrollThumbTo = (index: number) => {
    if (thumbRef.current) {
      const child = thumbRef.current.children[index] as HTMLElement | undefined;
      if (child) {
        child.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        if (e.deltaY > 0) goNext();
        else if (e.deltaY < 0) goPrev();
      }
    },
    [goNext, goPrev],
  );

  const handleThumbWheel = useCallback((e: React.WheelEvent) => {
    if (!e.shiftKey) {
      e.stopPropagation();
      if (thumbRef.current) {
        thumbRef.current.scrollLeft += e.deltaY;
      }
    }
  }, []);

  if (items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <div onWheel={handleWheel} className="select-none">
      <div className="aspect-video border border-border overflow-hidden bg-muted">{current.type === "image" ? <img src={current.src} alt={current.alt} className="w-full h-full object-contain" /> : <iframe src={`https://www.youtube.com/embed/${current.videoId}`} title={current.alt} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />}</div>

      {items.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button onClick={goPrev} className="shrink-0 size-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-accent-foreground animation cursor-pointer active:scale-95 animation" aria-label="Previous image">
            <RiArrowLeftSLine className="size-4" />
          </button>

          <div ref={thumbRef} onWheel={handleThumbWheel} className="flex gap-2 overflow-x-auto max-w-full" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {items.map((item, index) => (
              <button
                key={item.type === "video" ? item.videoId : item.src}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollThumbTo(index);
                }}
                className={`shrink-0 size-14 cursor-pointer overflow-hidden animation relative ${index === currentIndex ? "border-3 border-secondary-foreground/80" : "border border-border hover:border-secondary-foreground/50"}`}
              >
                {item.type === "image" ? (
                  <img loading="lazy" width={1920} src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                ) : (
                  <>
                    <img loading="lazy" width={1920} src={`https://img.youtube.com/vi/${item.videoId}/default.jpg`} alt={item.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="text-foreground text-xl leading-none">▶</span>
                    </div>
                  </>
                )}
              </button>
            ))}
          </div>

          <button onClick={goNext} className="shrink-0 size-8 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-accent-foreground animation cursor-pointer active:scale-95 animation" aria-label="Next image">
            <RiArrowRightSLine className="size-4" />
          </button>
        </div>
      )}

      {items.length > 1 && (
        <div className="mt-3 flex justify-center">
          <span className="text-sm text-muted-foreground border border-border px-3 py-1">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
}
