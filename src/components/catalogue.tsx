"use client";
import { useState } from "react";
import {
  products,
  fragrances,
  type Product,
  type Fragrance,
  oilFragrances,
} from "@/lib/data";
import { ProductCard, FragranceCard } from "./ui";
const productFilters = [
  { key: "all", label: "All Products" },
  { key: "compact", label: "Compact Diffusers" },
  { key: "wall", label: "Wall Mounted" },
  { key: "tower", label: "Tower / Floor Standing" },
  { key: "oil", label: "Fragrance Oils" },
];
export function ProductCatalogue({
  initialFilter = "all",
  fixed = false,
}: {
  initialFilter?: string;
  fixed?: boolean;
}) {
  const [filter, setFilter] = useState(initialFilter);
  const list = products.filter(
    (p) => filter === "all" || p.category === filter,
  );
  return (
    <>
      {!fixed && (
        <div className="filter-bar" aria-label="Filter products">
          {productFilters.map((f) => (
            <button
              key={f.key}
              className={filter === f.key ? "selected" : ""}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <div className="catalogue-status" aria-live="polite">
        {filter === "oil"
          ? `${oilFragrances.length} fragrance oils`
          : `${list.length} diffusers`}
        <span>Find your perfect fit.</span>
      </div>
      {filter === "oil" ? (
        <>
          <p className="packaging-note">
            Representative Aroma airs range packaging. Ask us about available
            bottle sizes.
          </p>
          <div className="oil-grid">
            {oilFragrances.map((f) => (
              <FragranceCard key={f.slug} fragrance={f} oil />
            ))}
          </div>
        </>
      ) : (
        <div className="product-grid">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
export function FragranceCatalogue() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Floral", "Fresh", "Woody", "Citrus", "Signature"];
  const list = fragrances.filter(
    (f) => filter === "All" || f.family === filter,
  );
  return (
    <>
      <div className="filter-bar" aria-label="Filter fragrances">
        {filters.map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            className={filter === f ? "selected" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="catalogue-status" aria-live="polite">
        {list.length} fragrances<span>Find a scent that feels like you.</span>
      </div>
      <div className="fragrance-catalogue-grid">
        {list.map((f) => (
          <div key={f.slug}>
            <FragranceCard fragrance={f} />
            <p className="fragrance-description">{f.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
