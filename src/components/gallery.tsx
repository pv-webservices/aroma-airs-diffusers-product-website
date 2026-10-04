"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
const photos = [
  { name: "hero-stage", title: "Tower Series, Square Tower & Cloudy", category: "Lifestyle" },
  { name: "p-square-tower", title: "Square Tower", category: "Products" },
  { name: "p-hvac-power", title: "HVAC Power", category: "Products" },
  { name: "p-cloudy", title: "Cloudy · White finish", category: "Products" },
  { name: "p-automatic-dispenser", title: "Automatic Dispenser · YK3180", category: "Products" },
  { name: "latest-oils", title: "The luxury fragrance oil collection", category: "Fragrance Oils" },
  { name: "essential-oils", title: "Buneez, Lavender, Misfit & Aqua", category: "Fragrance Oils" },
  { name: "hotel-lifestyle", title: "Tower Series · Hotel lobby", category: "Lifestyle" },
  { name: "tower-pair", title: "Classic Black & Simple Silver", category: "Products" },
  { name: "p-oil-jasmine", title: "Jasmine · Luxury fragrance oil", category: "Fragrance Oils" },
  { name: "wall-lifestyle", title: "Wall-mounted scenting", category: "Lifestyle" },
  { name: "s-compact-white", title: "Compact White", category: "Products" },
  { name: "table-lifestyle", title: "A considered finishing touch", category: "Lifestyle" },
  { name: "s-wall-pro-black", title: "Wall Pro Black", category: "Products" },
  { name: "installation", title: "Square Tower · On location", category: "Installations" },
  { name: "p-oil-rose", title: "Rose · Luxury fragrance oil", category: "Fragrance Oils" },
  { name: "home-lifestyle", title: "A welcoming entrance", category: "Lifestyle" },
  { name: "wall-interior-white", title: "Inside Wall Pro White", category: "Products" },
  { name: "hero-stage-mobile", title: "A sunlit atmosphere", category: "Lifestyle" },
  { name: "p-oil-aqua", title: "Aqua · Fragrance oil", category: "Fragrance Oils" },
  { name: "tower-controls", title: "Tower Series · Control methods", category: "Products" },
  { name: "s-compact", title: "Compact · Black", category: "Products" },
];
export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const list = photos.filter((p) => filter === "All" || p.category === filter);
  const photo = selected === null ? null : list[selected];
  const move = (delta: number) =>
    setSelected((n) =>
      n === null ? null : (n + delta + list.length) % list.length,
    );
  useEffect(() => {
    if (selected !== null) {
      dialog.current?.showModal();
      closeRef.current?.focus();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    } else dialog.current?.close();
  }, [selected]);
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filter gallery">
        {[
          "All",
          "Products",
          "Lifestyle",
          "Installations",
          "Fragrance Oils",
        ].map((f) => (
          <button
            key={f}
            className={f === filter ? "selected" : ""}
            aria-pressed={f === filter}
            onClick={() => {
              setFilter(f);
              setSelected(null);
            }}
          >
            {f}
          </button>
        ))}
      </div>
            <div className="gallery-grid" key={filter}>
        {list.map((p, i) => (
          <button
            key={p.name}
            className={`gallery-tile ${/^(p-|s-)/.test(p.name) ? "is-studio" : ""}`}
            data-tilt
            onClick={() => setSelected(i)}
            aria-label={`Open image: ${p.title}`}
          >
            <Image
              src={`/images/${p.name}.webp`}
              alt=""
              fill
              sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 33vw"
            />
            <span>
              <strong>{p.title}</strong>
              <ZoomIn size={20} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
        aria-label={photo?.title || "Image viewer"}
      >
        <div className="lightbox-inner">
          <button
            ref={closeRef}
            className="lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close image"
          >
            <X />
          </button>
          {photo && (
            <>
              <div className={`lightbox-photo ${/^(p-|s-)/.test(photo.name) ? "is-studio" : ""}`}>
                <Image
                  src={`/images/${photo.name}.webp`}
                  alt={photo.title}
                  fill
                  sizes="90vw"
                />
              </div>
              <div className="lightbox-controls">
                <button onClick={() => move(-1)} aria-label="Previous image">
                  <ChevronLeft />
                </button>
                <p>
                  {photo.title}
                  <span>
                    {(selected || 0) + 1} / {list.length}
                  </span>
                </p>
                <button onClick={() => move(1)} aria-label="Next image">
                  <ChevronRight />
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
