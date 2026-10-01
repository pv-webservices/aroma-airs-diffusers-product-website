"use client";
import Image from "next/image";
import { useState } from "react";
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="product-gallery">
      <div className="product-main-photo">
        <Image
          src={`/images/${images[selected]}.webp`}
          alt={`${name} ${selected === 0 ? "diffuser" : "detail view " + (selected + 1)}`}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 45vw"
        />
        <span className="gallery-view-label">
          {selected === 0 ? "PRODUCT VIEW" : "DETAIL " + (selected + 1)}
        </span>
      </div>
      {images.length > 1 && (
        <div className="product-thumbnails" aria-label="Product images">
          {images.map((im, i) => (
            <button
              key={im}
              onClick={() => setSelected(i)}
              className={i === selected ? "selected" : ""}
              aria-label={`View ${name} image ${i + 1}`}
              aria-pressed={i === selected}
            >
              <Image src={`/images/${im}.webp`} alt="" fill sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
