"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { fragrances, products, whatsapp } from "@/lib/data";
import { Button, WhatsAppIcon, categoryLabel } from "./ui";

const SLIDE_MS = 4200;
const featured = ["square-tower", "cloudy", "hvac-power", "automatic-dispenser", "tower-series", "compact-white"]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p): p is (typeof products)[number] => Boolean(p));

/** Homepage hero: cinematic scene, staggered headline and an auto-playing product spotlight. */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % featured.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [index, playing]);

  const go = (delta: number) => setIndex((i) => (i + delta + featured.length) % featured.length);
  const product = featured[index];

  return (
    <section className="hero" data-scroll>
      <div className="hero-media" aria-hidden="true">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-stage-mobile.webp" />
          <img src="/images/hero-stage.webp" alt="" width={1376} height={768} fetchPriority="high" />
        </picture>
      </div>
      <div className="hero-veil" aria-hidden="true" />
      <div className="hero-mist" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span className="pulse-dot" /> Luxury fragrance solutions &middot; New Delhi
          </p>
          <h1 className="hero-title">
            <span className="line"><span>Fragrance,</span></span>
            <span className="line"><span>designed for</span></span>
            <span className="line"><span><em>every space.</em></span></span>
          </h1>
          <p className="hero-lede">
            Cold-air diffusers, automatic dispensers and luxury fragrance oils for hotels, offices,
            retail and homes &mdash; chosen with you, for your space.
          </p>
          <div className="hero-actions">
            <Button href="/products">Explore the Collection</Button>
            <Button href={whatsapp()} variant="outline" arrow={false}>
              <WhatsAppIcon /> WhatsApp Us
            </Button>
          </div>
          <dl className="hero-proof">
            <div>
              <dt>{products.length}</dt>
              <dd>Diffuser &amp; dispenser models</dd>
            </div>
            <div>
              <dt>{fragrances.length}</dt>
              <dd>Fragrances to explore</dd>
            </div>
            <div>
              <dt>
                &lt;35<small>dB</small>
              </dt>
              <dd>Quiet compact &amp; tower models</dd>
            </div>
          </dl>
        </div>

        <aside className="hero-spot" aria-label="Featured products" aria-roledescription="carousel">
          <a href={`/products/${product.slug}`} className="hero-spot-card" aria-live={playing ? "off" : "polite"}>
            <div className="hero-spot-stage">
              {featured.map((p, i) => (
                <Image
                  key={p.slug}
                  src={`/images/${p.image}.webp`}
                  alt={i === index ? `${p.name} fragrance diffuser` : ""}
                  fill
                  sizes="140px"
                  className={i === index ? "is-active" : ""}
                  priority={i === 0}
                />
              ))}
            </div>
            <div className="hero-spot-text" key={product.slug}>
              <span className="hero-spot-cat">{categoryLabel(product.category)}</span>
              <strong>{product.name}</strong>
              <span className="hero-spot-label">{product.label}</span>
              <span className="hero-spot-link">
                View product <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
          </a>
          <div className="hero-spot-controls">
            <div className="hero-spot-bars" aria-hidden="true">
              {featured.map((p, i) => (
                <span
                  key={p.slug}
                  className={`${i === index ? "is-active" : ""} ${i < index ? "is-done" : ""} ${playing ? "" : "is-paused"}`}
                  style={{ "--slide": `${SLIDE_MS}ms` } as React.CSSProperties}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(-1)} aria-label="Previous featured product">
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause featured products" : "Play featured products"}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next featured product">
              <ChevronRight size={16} />
            </button>
          </div>
        </aside>
      </div>
      <a href="#collection" className="hero-scroll" aria-label="Scroll to the collection">
        <span />
      </a>
    </section>
  );
}
