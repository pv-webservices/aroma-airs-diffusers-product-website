"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
const photos = [
  {
    name: "hotel-lifestyle",
    title: "Tower Series · Hotel lobby",
    category: "Lifestyle",
  },
  {
    name: "tower-pair",
    title: "Classic Black & Simple Silver",
    category: "Products",
  },
  {
    name: "wall-lifestyle",
    title: "Wall-mounted scenting",
    category: "Lifestyle",
  },
  {
    name: "table-lifestyle",
    title: "A considered finishing touch",
    category: "Lifestyle",
  },
  { name: "wall-pro-black", title: "Wall Pro Black", category: "Products" },
  {
    name: "installation",
    title: "Tower Series · On location",
    category: "Installations",
  },
  {
    name: "home-lifestyle",
    title: "A welcoming entrance",
    category: "Lifestyle",
  },
  {
    name: "wall-interior-white",
    title: "Inside Wall Pro White",
    category: "Products",
  },
  {
    name: "oil-lifestyle",
    title: "Fragrance oil collection",
    category: "Fragrance Oils",
  },
  {
    name: "tower-controls",
    title: "Tower Series · Control methods",
    category: "Products",
  },
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
      <div className="filter-bar" aria-label="Filter gallery">
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
      <p className="packaging-note">
        Client-supplied product and lifestyle imagery.
      </p>
      <div className="gallery-grid">
        {list.map((p, i) => (
          <button
            key={p.name}
            className="gallery-tile"
            onClick={() => setSelected(i)}
            aria-label={`Open image: ${p.title}`}
          >
            <Image
              src={`/images/${p.name}.webp`}
              alt={p.title}
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
              <div className="lightbox-photo">
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
