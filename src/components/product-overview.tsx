"use client";
import { useState } from "react";
import type { Product } from "@/lib/data";
import ProductGallery from "./product-gallery";
import { Eyebrow, CheckList, ContactButtons, Swatches, categoryLabel } from "./ui";

export default function ProductOverview({ product: p }: { product: Product }) {
  const [finish, setFinish] = useState(p.colors[0]);
  const images = p.finishGalleries?.[finish] ?? p.gallery;
  const isDispenser = p.category === "dispenser";
  const noun = isDispenser ? "fragrance dispenser" : "fragrance diffuser";
  return (
    <div className="pd-layout">
      <ProductGallery key={finish} images={images} name={`${p.name}${p.finishGalleries ? ` · ${finish}` : ""}`} />
      <div className="pd-info">
        <Eyebrow>{categoryLabel(p.category)} · {isDispenser ? "Dispenser" : "Diffuser"}</Eyebrow>
        <h1>{p.name}</h1>
        <p className="pd-tagline">{p.label}</p>
        <p className="lede">{p.description}</p>
        <CheckList items={p.features} />
        {p.finishGalleries ? (
          <div className="pd-finish" role="group" aria-label="Available finishes">
            <span>Available finishes</span>
            {p.colors.map((color) => (
              <button key={color} type="button" className="finish-option" aria-pressed={finish === color} onClick={() => setFinish(color)}>
                <span className={`swatch ${/silver|white/i.test(color) ? "is-light" : ""}`} aria-hidden="true" />
                {color}
              </button>
            ))}
          </div>
        ) : p.showFinish ? (
          <div className="pd-finish"><span>Available finish</span><Swatches colors={p.colors} /></div>
        ) : null}
        <ContactButtons subject={`the ${p.name} ${noun}${p.finishGalleries ? ` in ${finish}` : ""}`} large />
        <p className="pd-caption">Personal advice · Product details · A solution for your space</p>
      </div>
    </div>
  );
}
