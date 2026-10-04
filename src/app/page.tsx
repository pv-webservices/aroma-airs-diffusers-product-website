import Image from "next/image";
import { ArrowUpRight, MessageCircle, SlidersHorizontal, Flower2 } from "lucide-react";
import { products, fragrances, oilFragrances, categories, whatsapp } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import {
  Button,
  Eyebrow,
  ProductCard,
  FragranceCard,
  SectionHeading,
  Benefits,
  CTA,
  Marquee,
  WhatsAppIcon,
} from "@/components/ui";
import Hero from "@/components/hero";
import Showcase from "@/components/showcase";
import StickyStory from "@/components/sticky-story";
import Spaces from "@/components/spaces";

export const metadata = {
  ...pageMeta(
    "Fragrance for Every Space",
    "Discover Aroma Airs fragrance diffusers and oils for homes, hotels, offices and retail. Find a scenting solution with our New Delhi team.",
    "/",
  ),
  title: { absolute: "Aroma Airs | Fragrance, Designed for Every Space" },
};

const ticker = [
  "Cold-air diffusion",
  "Hotels & resorts",
  "Luxury fragrance oils",
  "Offices & lobbies",
  "Automatic dispensers",
  "Retail & cafés",
  "HVAC scenting",
  "Homes & apartments",
];

const collectionTiles: { slug: string; image: string; count: string; wide?: boolean }[] = [
  { slug: "tower-diffusers", image: "p-square-tower", count: "2 models", wide: true },
  { slug: "compact-diffusers", image: "p-cloudy", count: "3 models" },
  { slug: "wall-mounted-diffusers", image: "s-wall-pro-black", count: "2 models" },
  { slug: "hvac-diffusers", image: "p-hvac-power", count: "Up to 3,000 sq. ft." },
  { slug: "automatic-dispensers", image: "p-automatic-dispenser", count: "YK3180" },
  { slug: "fragrance-oils", image: "p-oil-jasmine", count: `${oilFragrances.length} oils`, wide: true },
];

const story = [
  {
    image: "mist-band",
    alt: "A compact diffuser releasing a fine fragrance mist",
    eyebrow: "01 · Cold-air diffusion",
    title: "A fine, dry mist. Not heat, not water.",
    text: "Nebulizing technology breaks fragrance oil into a micro-fine mist, so the scent stays true and spreads evenly through your space.",
  },
  {
    image: "tower-controls",
    alt: "Tower Series control methods: touch and Bluetooth",
    eyebrow: "02 · Considered controls",
    title: "Set it once. Enjoy it every day.",
    text: "Timers, intensity and working hours on supported models let you shape fragrance around opening times and footfall.",
  },
  {
    image: "p-oil-oud",
    alt: "Aroma Airs Oud luxury fragrance oil",
    eyebrow: "03 · Signature fragrance",
    title: "A scent people remember you by.",
    text: "Choose from florals, fresh notes and warm woods — or let our team help you find a signature fragrance for your brand.",
    studio: true,
  },
  {
    image: "hotel-lifestyle",
    alt: "Tower diffuser in a hotel lobby",
    eyebrow: "04 · Made for your space",
    title: "From reception desks to grand lobbies.",
    text: "Compact, wall-mounted, floor-standing and HVAC models cover everything from a cabin to a 3,000 sq. ft. floor.",
  },
];

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us about your space",
    text: "Share the room type, approximate size and the atmosphere you have in mind — on WhatsApp, by phone or through our form.",
  },
  {
    icon: SlidersHorizontal,
    title: "Choose your diffuser",
    text: "We recommend a model, finish and placement that suits your interior, footfall and ventilation.",
  },
  {
    icon: Flower2,
    title: "Select your signature fragrance",
    text: "Explore oils from jasmine and rose to oud and aqua, and settle on the scent that feels like you.",
  },
];

const galleryRowA = ["hero-stage", "p-square-tower", "hotel-lifestyle", "p-cloudy", "tower-pair", "wall-lifestyle", "p-hvac-power"];
const galleryRowB = ["latest-oils", "p-oil-rose", "table-lifestyle", "p-automatic-dispenser", "essential-oils", "p-oil-aqua", "home-lifestyle"];

function GalleryRow({ names, reverse }: { names: string[]; reverse?: boolean }) {
  return (
    <Marquee reverse={reverse} speed={55} className="gallery-marquee">
      {names.map((name) => (
        <a href="/gallery" key={name} className={`g-tile ${/^(p-|s-)/.test(name) ? "is-studio" : ""}`} tabIndex={-1}>
          <Image src={`/images/${name}.webp`} alt="" fill sizes="(max-width: 600px) 60vw, 22vw" />
        </a>
      ))}
    </Marquee>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="ticker" aria-hidden="true">
        <Marquee speed={38}>
          {ticker.map((t) => (
            <span key={t} className="ticker-item">
              {t}
              <i />
            </span>
          ))}
        </Marquee>
      </div>

      <Showcase
        id="collection"
        heading={
          <>
            <div className="reveal">
              <Eyebrow>THE COLLECTION</Eyebrow>
              <h2>
                Diffusers for <em>every</em> space.
              </h2>
            </div>
            <div className="showcase-aside reveal">
              <p>
                {products.length} models — from a discreet compact to a 5,000 ml HVAC system. Keep scrolling
                to explore.
              </p>
              <Button href="/products" variant="outline" small>
                View all products
              </Button>
            </div>
          </>
        }
      >
        {products.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 2} />
        ))}
      </Showcase>

      <section className="section benefits-section">
        <div className="container">
          <Benefits />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              label="SHOP BY COLLECTION"
              title={
                <>
                  Find your <em>format.</em>
                </>
              }
              description="Floor-standing statement pieces, discreet compacts, HVAC systems, automatic dispensers and luxury oils."
            />
          </div>
          <div className="bento">
            {collectionTiles.map((tile, i) => {
              const c = categories.find((cat) => cat.slug === tile.slug)!;
              return (
                <a
                  key={tile.slug}
                  href={`/products/${c.slug}`}
                  className={`bento-tile reveal ${tile.wide ? "is-wide" : ""}`}
                  style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
                  data-tilt
                >
                  <div className="bento-media">
                    <Image src={`/images/${tile.image}.webp`} alt="" fill sizes="(max-width: 700px) 46vw, 30vw" />
                  </div>
                  <div className="bento-text">
                    <span className="chip">{tile.count}</span>
                    <h3>{c.name}</h3>
                    <p>{c.description}</p>
                  </div>
                  <span className="p-card-go" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="container">
          <SectionHeading
            label="THE TECHNOLOGY"
            title={
              <>
                Scenting, refined by <em>cold-air</em> diffusion.
              </>
            }
          />
          <StickyStory steps={story} />
        </div>
      </section>

      <section className="section dark-section oils-section">
        <div className="oils-glow" aria-hidden="true" />
        <div className="container">
          <div className="section-top">
            <SectionHeading
              light
              label="LUXURY FRAGRANCE OILS"
              title={
                <>
                  A fragrance for <em>every mood.</em>
                </>
              }
              description="Florals, fresh notes and warm woods. Hover or tap a bottle to explore its story."
            />
            <Button href="/fragrances" variant="light" small>
              Explore all {fragrances.length} fragrances
            </Button>
          </div>
        </div>
        <Marquee speed={60} className="oil-marquee" label="Fragrance oil collection">
          {fragrances.map((f) => (
            <FragranceCard key={f.slug} fragrance={f} />
          ))}
        </Marquee>
        <div className="container">
          <a href="/products/fragrance-oils" className="oil-banner reveal" data-scroll>
            <div className="oil-banner-media">
              <Image src="/images/latest-oils.webp" alt="Aroma Airs luxury fragrance oils: Rose, Oud, Jasmine, Misty M., Lavender and Lemongrass" fill sizes="(max-width: 860px) 92vw, 55vw" />
            </div>
            <div className="oil-banner-text">
              <Eyebrow light>THE LUXURY OIL COLLECTION</Eyebrow>
              <h3>Jasmine, Rose, Oud &amp; more.</h3>
              <p>Discover the labelled luxury oils, plus the new Buneez, Misfit and Aqua.</p>
              <span className="detail-link">
                Discover fragrance oils <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              label="APPLICATIONS"
              title={
                <>
                  Made for the spaces <em>you love.</em>
                </>
              }
              description="Enhance the atmosphere of the places you live, work and welcome people into."
            />
            <Button href="/applications" variant="outline" small>
              All applications
            </Button>
          </div>
          <Spaces />
        </div>
      </section>

      <section className="stats" data-scroll>
        <div className="stats-media" aria-hidden="true">
          <Image src="/images/mist-band.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="container stats-grid">
          {[
            { value: products.length, label: "Diffuser & dispenser models" },
            { value: fragrances.length, label: "Fragrances to explore" },
            { value: 3000, label: "Sq. ft. coverage (HVAC & Square Tower)" },
            { value: 5000, label: "ml HVAC oil reservoir" },
          ].map((s, i) => (
            <div className="stat reveal" key={s.label} style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
              <strong data-count={s.value}>{s.value.toLocaleString("en-IN")}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section how-section">
        <div className="container how-layout">
          <div className="how-intro">
            <SectionHeading
              label="HOW IT WORKS"
              title={
                <>
                  A simpler way to a <em>more fragrant</em> space.
                </>
              }
              description="Three easy steps, guided personally by our team."
            />
            <Button href={whatsapp("expert guidance on choosing a diffuser for my space")} variant="whatsapp" arrow={false}>
              <WhatsAppIcon /> Ask an expert
            </Button>
          </div>
          <ol className="stack">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li className="stack-card" key={title} style={{ "--i": i } as React.CSSProperties}>
                <span className="stack-num">0{i + 1}</span>
                <span className="icon-ring">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section about-strip">
        <div className="container about-strip-grid">
          <div className="about-strip-media" data-scroll>
            <Image src="/images/table-lifestyle.webp" alt="Aroma Airs diffuser styled in a furnished interior" fill sizes="(max-width: 860px) 92vw, 45vw" />
          </div>
          <div className="about-strip-copy">
            <SectionHeading
              label="ABOUT AROMA AIRS"
              title={
                <>
                  Aroma, engineered into <em>atmosphere.</em>
                </>
              }
              description="Fragrance is the finishing touch that makes a space feel complete. From a compact device on a reception desk to a tower in a hotel lobby, we bring scent and space together."
            />
            <p className="quote reveal">
              &ldquo;More than fragrance &mdash; <em>a better atmosphere.</em>&rdquo;
            </p>
            <Button href="/about">Know more about us</Button>
          </div>
        </div>
      </section>

      <section className="section gallery-section">
        <div className="container section-top">
          <SectionHeading
            label="GALLERY"
            title={
              <>
                Fragrance in <em>beautiful</em> spaces.
              </>
            }
          />
          <Button href="/gallery" variant="outline" small>
            View full gallery
          </Button>
        </div>
        <GalleryRow names={galleryRowA} />
        <GalleryRow names={galleryRowB} reverse />
      </section>

      <CTA />
    </>
  );
}
