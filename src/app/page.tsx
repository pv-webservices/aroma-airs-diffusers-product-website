import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Maximize,
  Droplets,
  Volume2,
  Zap,
  Gem,
  ShieldCheck,
  Layers,
  MessageCircle,
  Search,
  Flower2,
  Wrench,
} from "lucide-react";
import { products, fragrances, applications, whatsapp, callUrl } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import Testimonials from "@/components/testimonials";
import {
  Button,
  Eyebrow,
  ProductCard,
  FragranceCard,
  ApplicationCard,
  SectionHeading,
  TechnologyGrid,
  Benefits,
  CTA,
  WhatsAppIcon,
  Photo,
} from "@/components/ui";

export const metadata = {
  ...pageMeta(
    "Fragrance for Every Space",
    "Elevate every space with Aroma airs fragrance diffusers. Compact, wall mounted and tower scent diffusers plus premium fragrance oils for hotels, offices, retail and homes.",
    "/",
  ),
  title: { absolute: "Aroma airs | Fragrance Diffusers for Every Space" },
};

const heroWords = ["Hotel", "Office", "Home", "Store", "Space"];

const stats = [
  { icon: Maximize, value: 3000, suffix: "+", unit: "sq ft", label: "Coverage, up to (by model)" },
  { icon: Droplets, value: 800, suffix: "", unit: "ml", label: "Tower oil capacity" },
  { icon: Volume2, value: 35, prefix: "<", suffix: "", unit: "dB", label: "Whisper-quiet operation" },
  { icon: Zap, value: 12, prefix: "DC ", suffix: "V", unit: "", label: "Low-power supply" },
];

const steps = [
  {
    icon: MessageCircle,
    title: "Tell us about your space",
    text: "Share the room type, approximate size and the mood you want guests and family to feel.",
    image: "installation",
  },
  {
    icon: Search,
    title: "Choose the right diffuser",
    text: "Compact for cosy rooms, Wall Pro for larger areas, Tower Series for grand lobbies and lounges.",
    image: "hero-trio",
  },
  {
    icon: Flower2,
    title: "Pick your signature scent",
    text: "Florals, fresh citrus, ocean notes or warm woods — find the fragrance that feels like your brand.",
    image: "oil-lifestyle",
  },
  {
    icon: Wrench,
    title: "Install & enjoy",
    text: "Simple setup with adjustable intensity and timers, so your space smells beautiful every day.",
    image: "table-lifestyle",
  },
];

// Images not used elsewhere on the homepage; repeated twice per half so the loop never shows a gap.
const galleryUnique = [
  ["tower-pair", "Tower Series in Classic Black and Simple Silver"],
  ["wall-interior-white", "Inside Wall Pro White"],
  ["oil-bottle", "Aroma airs fragrance oil"],
  ["tower-controls", "Tower Series touch and Bluetooth controls"],
  ["spa", "Spa and wellness interior"],
];
const galleryStrip = [...galleryUnique, ...galleryUnique];

const marqueeScents = fragrances.slice(0, 10).map((f) => f.name);

function Hero() {
  return (
    <section className="hero" data-scroll>
      <picture className="hero-media">
        <source media="(max-width: 767px)" srcSet="/images/hero-mobile.webp" />
        <img
          src="/images/hero-desktop.webp"
          alt="Aroma airs Compact, Compact White and Wall Pro diffusers on a marble counter in a luxury hotel lounge"
          width={1376}
          height={768}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="hero-shade" />
      <div className="mist mist-a" aria-hidden="true" />
      <div className="mist mist-b" aria-hidden="true" />
      <div className="mist mist-c" aria-hidden="true" />
      <div className="container hero-content">
        <p className="hero-kicker hero-in" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="hero-kicker-dot" /> Scenting Diffuser
        </p>
        <h1 className="hero-in" style={{ "--i": 1 } as React.CSSProperties}>
          <span className="hero-brand">
            <span className="hero-aroma">Aroma</span> <span className="hero-airs">airs</span>
          </span>
          <span className="hero-subtitle">Fragrance Diffuser</span>
        </h1>
        <p className="hero-tagline hero-in" style={{ "--i": 2 } as React.CSSProperties}>
          Elevate Every{" "}
          <span className="word-rotator" aria-hidden="true">
            {heroWords.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </span>
          <span className="sr-only">Space</span>
          <br />
          with Lasting Fragrance.
        </p>
        <p className="hero-description hero-in" style={{ "--i": 3 } as React.CSSProperties}>
          <strong>Aroma airs</strong> fragrance diffusers deliver a consistent, luxurious scent
          experience that transforms any space into a welcoming and memorable environment.
        </p>
        <div className="hero-actions hero-in" style={{ "--i": 4 } as React.CSSProperties}>
          <Button href="/products">Explore Products</Button>
          <Button href={whatsapp()} variant="ghost" arrow={false}>
            <WhatsAppIcon /> Contact Us
          </Button>
        </div>
        <ul className="hero-trust hero-in" style={{ "--i": 5 } as React.CSSProperties}>
          <li>
            <strong>5</strong> diffuser models
          </li>
          <li>
            <strong>12+</strong> fragrances
          </li>
          <li>
            <strong>&lt;35 dB</strong> quiet
          </li>
        </ul>
      </div>
      <div className="hero-chip hero-chip-a" aria-hidden="true">
        <span className="hero-chip-icon"><Gem size={16} /></span>
        <span><strong>Premium design</strong>Built to impress</span>
      </div>
      <div className="hero-chip hero-chip-b" aria-hidden="true">
        <span className="hero-chip-icon"><ShieldCheck size={16} /></span>
        <span><strong>Cold-air diffusion</strong>No heat, no residue</span>
      </div>
      <a href="#features" className="hero-scroll" aria-label="Scroll to discover">
        <span>Scroll</span>
        <ArrowDown size={16} />
      </a>
      <div className="hero-marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeScents, ...marqueeScents].map((name, i) => (
            <span key={i}>
              {name}
              <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section id="features" className="benefit-strip">
        <div className="container">
          <Benefits />
        </div>
      </section>

      <section id="collection" className="section products-home">
        <div className="container products-layout">
          <div className="products-intro reveal">
            <SectionHeading
              label="Our Products"
              title={
                <>
                  Fragrance Experts <br />
                  for <span className="text-gradient">Every Space</span>
                </>
              }
              description="Choose from our wide range of fragrance diffusers designed for different spaces and requirements."
            />
            <Button href="/products">View All Products</Button>
            <p className="swipe-hint" aria-hidden="true">
              Swipe to explore <ArrowUpRight size={14} />
            </p>
          </div>
          <div className="product-rail">
            {products.map((p, i) => (
              <div className="reveal reveal-up" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties} key={p.slug}>
                <ProductCard product={p} />
              </div>
            ))}
            <div className="reveal reveal-up" style={{ "--delay": "450ms" } as React.CSSProperties}>
              <div className="product-help-card">
                <span className="product-help-icon">
                  <Flower2 size={26} aria-hidden="true" />
                </span>
                <h3>Not sure which diffuser suits your space?</h3>
                <p>Tell us the room size and mood you want. Our experts will recommend the perfect model and fragrance.</p>
                <Button href={whatsapp("help choosing the right diffuser")} variant="light" arrow={false} small>
                  <WhatsAppIcon size={16} /> Ask an Expert
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fragrance-band" data-scroll>
        <div className="fragrance-band-bg" aria-hidden="true" />
        <div className="container fragrance-band-layout">
          <div className="fragrance-intro reveal">
            <Eyebrow light>Signature Collection</Eyebrow>
            <h2>
              A Fragrance <br />
              for Every Mood
            </h2>
            <p>
              Explore our premium range of signature scents crafted to create the perfect
              atmosphere.
            </p>
            <Button href="/fragrances">Explore Fragrances</Button>
          </div>
          <div className="scent-marquee" tabIndex={0} aria-label="Fragrance collection">
            <div className="scent-track">
              <div className="scent-set">
                {fragrances.map((f) => (
                  <FragranceCard key={f.slug} fragrance={f} />
                ))}
              </div>
              <div className="scent-set" aria-hidden="true" inert>
                {fragrances.map((f) => (
                  <FragranceCard key={f.slug} fragrance={f} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section applications-home">
        <div className="container">
          <div className="reveal">
            <SectionHeading
              centered
              label="Perfect for Every Environment"
              title="Ideal for Multiple Spaces"
              description="Aroma airs diffusers are widely used across various industries and spaces to create a refreshing and memorable atmosphere."
            />
          </div>
          <div className="application-grid">
            {applications.slice(0, 6).map((a, i) => (
              <div className="reveal reveal-zoom" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={a.slug}>
                <ApplicationCard application={a} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section technology-home">
        <Image src="/images/leaves.webp" alt="" width={420} height={560} className="tech-leaves" aria-hidden="true" />
        <div className="container technology-layout">
          <div className="technology-sticky">
            <div className="reveal">
              <SectionHeading
                label="Why Choose Aroma airs"
                title={
                  <>
                    Advanced Technology. <br />
                    <span className="text-gradient">Lasting Experience.</span>
                  </>
                }
                description="Our diffusers combine advanced nebulizing technology with elegant design to deliver a consistent, high-quality fragrance experience with minimal maintenance."
              />
              <Button href="/about">Learn More About Us</Button>
            </div>
            <div className="tech-visual reveal" data-scroll>
              <Photo
                name="wall-interior-black"
                alt="Inside the Wall Pro Black diffuser: oil bottle and cold-air diffusion module"
                sizes="(max-width: 900px) 90vw, 40vw"
              />
            </div>
          </div>
          <TechnologyGrid />
        </div>
      </section>

      <section className="stats-band" data-scroll>
        <Image src="/images/mist-band.webp" alt="" fill sizes="100vw" className="stats-bg" />
        <div className="stats-shade" />
        <div className="container stats-layout">
          <div className="stats-title reveal">
            <h2>
              One Diffuser. <br />
              Many Impressions.
            </h2>
            <p>
              <strong>Aroma airs</strong> — Fragrance that speaks before you do.
            </p>
          </div>
          <div className="stats-grid">
            {stats.map(({ icon: Icon, value, prefix, suffix, unit, label }, i) => (
              <div className="stat reveal" style={{ "--delay": `${i * 110}ms` } as React.CSSProperties} key={label}>
                <span className="stat-icon">
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <strong>
                  {prefix}
                  <span data-count={value}>{value}</span>
                  {suffix}
                  {unit && <small> {unit}</small>}
                </strong>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-home">
        <div className="container about-layout">
          <div className="reveal">
            <SectionHeading
              label="About Aroma airs"
              title={
                <>
                  Creating Better Spaces <br />
                  with Fragrance
                </>
              }
              description="Aroma airs is dedicated to providing high-quality fragrance diffusers that enhance environments across homes, businesses and commercial spaces. Our focus is on innovative technology, premium design and memorable fragrances."
            />
            <Button href="/about">Know More</Button>
          </div>
          <div className="about-visual reveal" data-scroll>
            <div className="about-photo">
              <Photo
                name="wall-lifestyle"
                alt="Black Aroma airs wall diffuser installed in a modern interior"
                sizes="(max-width: 900px) 90vw, 45vw"
              />
            </div>
            <ul className="about-badges">
              <li>
                <Gem size={20} />
                <span>
                  <strong>Premium Design</strong>Built to impress
                </span>
              </li>
              <li>
                <ShieldCheck size={20} />
                <span>
                  <strong>Trusted for</strong>Multiple industries
                </span>
              </li>
              <li>
                <Layers size={20} />
                <span>
                  <strong>Wide Range</strong>of fragrance solutions
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="container steps-layout">
          <div className="steps-intro">
            <SectionHeading
              label="How It Works"
              title={
                <>
                  Your Signature Scent <br />
                  in <span className="text-gradient">Four Simple Steps</span>
                </>
              }
              description="From the first conversation to a beautifully scented space, our team guides you at every step."
            />
            <div className="steps-actions">
              <Button href="/contact">Start Your Consultation</Button>
              <Button href={callUrl} variant="outline" arrow={false}>
                Call Us
              </Button>
            </div>
          </div>
          <ol className="steps-stack">
            {steps.map(({ icon: Icon, title, text, image }, i) => (
              <li className="step-card" style={{ "--i": i } as React.CSSProperties} key={title}>
                <div className="step-text">
                  <span className="step-number">0{i + 1}</span>
                  <span className="step-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <Photo name={image} alt="" className="step-photo" sizes="(max-width: 900px) 40vw, 260px" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gallery-strip" aria-label="Gallery preview">
        <div className="container gallery-strip-head reveal">
          <SectionHeading label="Gallery" title="Aroma airs in Beautiful Spaces" />
          <Button href="/gallery" variant="outline">
            View Gallery
          </Button>
        </div>
        <div className="photo-marquee">
          <div className="photo-track">
            {[...galleryStrip, ...galleryStrip].map(([name, alt], i) => (
              <a
                href="/gallery"
                className="photo-tile"
                key={i}
                {...(i >= galleryStrip.length ? { "aria-hidden": true, tabIndex: -1 } : {})}
              >
                <Image src={`/images/${name}.webp`} alt={i >= galleryStrip.length ? "" : alt} fill sizes="280px" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CTA />
    </>
  );
}
