"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { isStudioImage } from "./ui";

/** Product images with thumbnail switching and a pointer-following zoom (mouse and touch). */
export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const pointerType = useRef("mouse");
  const current = images[selected];

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
  };

  return (
    <div className="pg">
      <div
        className={`pg-main ${isStudioImage(current) ? "is-studio" : ""} ${zoom ? "is-zoomed" : ""}`}
        style={{ "--origin": origin } as React.CSSProperties}
        onPointerEnter={(e) => e.pointerType === "mouse" && setZoom(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setZoom(false)}
        onPointerMove={track}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
          track(e);
        }}
        onClick={() => {
          // Mouse users zoom on hover; touch and pen users tap to toggle.
          if (pointerType.current !== "mouse") setZoom((z) => !z);
        }}
      >
        <Image
          key={current}
          src={`/images/${current}.webp`}
          alt={`${name} ${selected === 0 ? "product view" : "view " + (selected + 1)}`}
          fill
          priority
          sizes="(max-width: 860px) 92vw, 48vw"
        />
        <span className="pg-hint" aria-hidden="true">
          <ZoomIn size={15} /> {zoom ? "Tap to reset" : "Hover or tap to zoom"}
        </span>
      </div>
      {images.length > 1 && (
        <div className="pg-thumbs" role="group" aria-label={`${name} images`}>
          {images.map((im, i) => (
            <button
              key={im}
              type="button"
              onClick={() => {
                setSelected(i);
                setZoom(false);
              }}
              className={`${i === selected ? "is-active" : ""} ${isStudioImage(im) ? "is-studio" : ""}`}
              aria-label={`View ${name} image ${i + 1}`}
              aria-pressed={i === selected}
            >
              <Image src={`/images/${im}.webp`} alt="" fill sizes="90px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
