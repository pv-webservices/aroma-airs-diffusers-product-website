"use client";
import { useState } from "react";
import { products, fragrances, oilFragrances } from "@/lib/data";
import { ProductCard, FragranceCard } from "./ui";
const productFilters = [
  { key: "all", label: "All Products" },
  { key: "compact", label: "Compact Diffusers" },
  { key: "wall", label: "Wall Mounted" },
  { key: "tower", label: "Tower / Floor Standing" },
  { key: "hvac", label: "HVAC Scenting" },
  { key: "dispenser", label: "Automatic Dispensers" },
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
      <h2 className="sr-only">Diffuser and fragrance collection</h2>
      {!fixed && (
        <div className="filter-bar" role="group" aria-label="Filter products">
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
          : `${list.length} ${list.length === 1 ? "product" : "products"}`}
        <span>Find your perfect fit.</span>
      </div>
      {filter === "oil" ? (
        <div className="oil-grid">
          {oilFragrances.map((f) => (
            <FragranceCard key={f.slug} fragrance={f} enquire />
          ))}
        </div>
      ) : (
        <div className="product-grid" key={filter}>
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
      <h2 className="sr-only">Browse our fragrances</h2>
      <div className="filter-bar" role="group" aria-label="Filter fragrances">
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
      <div className="oil-grid" key={filter}>
        {list.map((f) => (
          <FragranceCard key={f.slug} fragrance={f} enquire={f.collection === "oil"} />
        ))}
      </div>
    </>
  );
}
