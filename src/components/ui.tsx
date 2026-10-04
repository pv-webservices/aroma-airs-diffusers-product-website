import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Waves,
  VolumeX,
  Leaf,
  Gem,
  Wind,
  SlidersHorizontal,
  Droplets,
  Wrench,
  Hotel,
  Building2,
  Store,
  Hospital,
  Coffee,
  House,
  Check,
  Sparkles,
} from "lucide-react";
import {
  callUrl,
  whatsapp,
  type Product,
  type Fragrance,
  applications,
} from "@/lib/data";

type Children = { children: React.ReactNode };

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.86 3.73Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02c0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.13 3.65 1.54.66 2.14.72 2.91.6.47-.07 1.46-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

export type ButtonVariant = "primary" | "outline" | "whatsapp" | "light" | "dark";

/**
 * Link styled as a button. Colour-flow animation lives in CSS (.btn-*):
 * the gradient drifts slowly at rest and shifts hue on hover/tap.
 */
export function Button({
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  small = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  small?: boolean;
}) {
  const external = href.startsWith("https:");
  return (
    <a
      href={href}
      className={`btn btn-${variant} ${small ? "btn-small" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="btn-label">{children}</span>
      {arrow && (
        <span className="btn-arrow" aria-hidden="true">
          <ArrowRight size={16} />
        </span>
      )}
    </a>
  );
}

export function ContactButtons({
  subject,
  large = false,
}: {
  subject?: string;
  large?: boolean;
}) {
  return (
    <div className={`contact-buttons ${large ? "large" : ""}`}>
      <Button href={callUrl} variant="outline" arrow={false} small={!large}>
        <Phone size={large ? 17 : 14} aria-hidden="true" />
        {large ? "Call for Details" : "Call"}
      </Button>
      <Button
        href={whatsapp(subject)}
        variant="whatsapp"
        arrow={false}
        small={!large}
      >
        <WhatsAppIcon size={large ? 18 : 15} />
        {large ? "Enquire on WhatsApp" : "WhatsApp"}
      </Button>
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
}: Children & { light?: boolean }) {
  return (
    <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  centered = false,
  light = false,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div
      className={`section-heading reveal ${centered ? "centered" : ""} ${light ? "light" : ""}`}
    >
      <Eyebrow light={light}>{label}</Eyebrow>
      <h2>{title}</h2>
      {description && <p className="lede">{description}</p>}
    </div>
  );
}

export function Photo({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  name: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/images/${name}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

/** Studio product shots are on white and blend into the warm card stage. */
export function isStudioImage(name: string): boolean {
  return /^(p-|s-)/.test(name);
}

export function categoryLabel(category: Product["category"]): string {
  if (category === "wall") return "Wall Mounted";
  if (category === "tower") return "Floor Standing";
  if (category === "hvac") return "HVAC Scenting";
  if (category === "dispenser") return "Automatic Spray";
  return "Compact";
}

const lightFinish = (color: string) => /white|silver/i.test(color);

export function Swatches({ colors }: { colors: string[] }) {
  return (
    <p className="swatches">
      {colors.map((c) => (
        <span
          key={c}
          className={`swatch ${lightFinish(c) ? "is-light" : ""}`}
          title={c}
        />
      ))}
      <span className="swatch-label">{colors.join(" / ")}</span>
    </p>
  );
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <article className="p-card" data-tilt>
      <a href={`/products/${product.slug}`} className="p-card-link">
        <div className="p-card-stage">
          <span className="chip">{categoryLabel(product.category)}</span>
          <Image
            src={`/images/${product.image}.webp`}
            alt={`${product.name} ${product.category === "dispenser" ? "fragrance dispenser" : "fragrance diffuser"}`}
            fill
            priority={priority}
            className="p-card-img"
            sizes="(max-width: 600px) 80vw, (max-width: 1100px) 40vw, 22vw"
          />
          <span className="p-card-go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="p-card-body">
          <h3>{product.name}</h3>
          <p className="p-card-label">{product.label}</p>
          <ul className="p-card-feats">
            {product.features.slice(0, 3).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Swatches colors={product.colors} />
        </div>
      </a>
      <ContactButtons
        subject={`the ${product.name} ${product.category === "dispenser" ? "fragrance dispenser" : "fragrance diffuser"}`}
      />
    </article>
  );
}

export function FragranceCard({
  fragrance,
  enquire = false,
}: {
  fragrance: Fragrance;
  enquire?: boolean;
}) {
  const bottle = isStudioImage(fragrance.image);
  return (
    <article className={`f-card ${bottle ? "is-bottle" : ""}`} data-tilt>
      <a href={`/fragrances/${fragrance.slug}`} className="f-card-link">
        <div className="f-card-media">
          <Image
            src={`/images/${fragrance.image}.webp`}
            alt={
              bottle
                ? `${fragrance.name} fragrance oil bottle`
                : `${fragrance.name} scent inspiration`
            }
            fill
            sizes="(max-width: 600px) 60vw, (max-width: 1100px) 30vw, 18vw"
          />
          <span className="chip">{fragrance.family}</span>
          <span className="p-card-go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="f-card-body">
          <h3>{fragrance.name}</h3>
          <p>{fragrance.mood}</p>
        </div>
      </a>
      {enquire && (
        <a
          className="f-card-enquire"
          href={whatsapp(`${fragrance.name} fragrance oil`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={15} /> Enquire about this oil
        </a>
      )}
    </article>
  );
}

const appIcons = {
  hotel: Hotel,
  building: Building2,
  store: Store,
  hospital: Hospital,
  coffee: Coffee,
  home: House,
  leaf: Leaf,
};

export function AppIcon({ name, size = 22 }: { name: string; size?: number }) {
  const Icon = appIcons[name as keyof typeof appIcons] ?? Leaf;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}

export function ApplicationCard({
  application,
}: {
  application: (typeof applications)[number];
}) {
  return (
    <a
      href={`/applications#${application.slug}`}
      className="a-card"
      data-tilt
    >
      <Image
        src={`/images/${application.image}.webp`}
        alt={`${application.name} interior inspiration`}
        fill
        sizes="(max-width: 600px) 80vw, (max-width: 1100px) 33vw, 20vw"
      />
      <div className="a-card-body">
        <span className="a-card-icon">
          <AppIcon name={application.icon} />
        </span>
        <h3>{application.name}</h3>
        <span className="a-card-more">
          Explore <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export const benefits = [
  {
    icon: Wind,
    title: "Cold-Air Diffusion",
    text: "Fine, dry mist on nebulizing models",
  },
  {
    icon: Waves,
    title: "Consistent Fragrance",
    text: "An even scent from entrance to lounge",
  },
  {
    icon: VolumeX,
    title: "Quiet Operation",
    text: "Low noise for calm interiors",
  },
  {
    icon: SlidersHorizontal,
    title: "Considered Controls",
    text: "Timers and intensity by model",
  },
  {
    icon: Gem,
    title: "Premium Design",
    text: "Finishes that suit your interior",
  },
];

export function Benefits() {
  return (
    <div className="benefits">
      {benefits.map(({ icon: Icon, title, text }, i) => (
        <div
          className="benefit reveal"
          style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
          key={title}
        >
          <span className="icon-ring">
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <p className="benefit-title">{title}</p>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export const technologyFeatures = [
  { icon: Wind, title: "Cold-air diffusion", text: "On supported nebulizing models" },
  {
    icon: SlidersHorizontal,
    title: "Adjustable settings",
    text: "Timers and intensity by model",
  },
  { icon: Droplets, title: "Long-lasting", text: "Premium fragrance oils" },
  { icon: VolumeX, title: "Low noise", text: "Calm, discreet operation" },
  { icon: Wrench, title: "Easy setup", text: "Wall, tabletop or floor" },
  { icon: Sparkles, title: "Signature scent", text: "Matched to your space" },
];

export function TechnologyGrid() {
  return (
    <div className="tech-grid">
      {technologyFeatures.map(({ icon: Icon, title, text }, i) => (
        <div
          className="tech-item reveal"
          data-tilt
          style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
          key={title}
        >
          <span className="icon-ring">
            <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true" className="breadcrumb-sep">
            /
          </span>
          {item.href ? (
            <a href={item.href}>{item.label}</a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  label,
  title,
  description,
  breadcrumb,
  image = "hero-stage",
  studio = false,
}: {
  label: string;
  title: React.ReactNode;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
  image?: string;
  studio?: boolean;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          <Eyebrow>{label}</Eyebrow>
          <h1>{title}</h1>
          <p className="lede">{description}</p>
        </div>
        <div
          className={`page-hero-media ${studio ? "is-studio" : ""}`}
          data-scroll
        >
          <Image
            src={`/images/${image}.webp`}
            alt=""
            fill
            priority
            sizes="(max-width: 860px) 92vw, 42vw"
          />
        </div>
      </div>
    </section>
  );
}

export function CTA({
  title = (
    <>
      Create a signature scent
      <br />
      experience for your space.
    </>
  ),
}: {
  title?: React.ReactNode;
}) {
  return (
    <section className="cta" data-scroll>
      <div className="cta-media">
        <Image src="/images/hero-lobby.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="container cta-inner reveal">
        <div>
          <Eyebrow light>LET&rsquo;S TALK</Eyebrow>
          <h2>{title}</h2>
          <p>
            Product details, fragrance advice or a complete scenting solution
            &mdash; our New Delhi team is a message away.
          </p>
        </div>
        <div className="cta-actions">
          <Button href={whatsapp()} variant="whatsapp" arrow={false}>
            <WhatsAppIcon size={20} /> Chat on WhatsApp
          </Button>
          <Button href={callUrl} variant="light" arrow={false}>
            <Phone size={18} /> Call Now
          </Button>
        </div>
      </div>
    </section>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="check-list">
      {items.map((t) => (
        <li key={t}>
          <span>
            <Check size={14} aria-hidden="true" />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Infinite, CSS-driven horizontal slideshow. Content is duplicated for a seamless loop. */
export function Marquee({
  children,
  reverse = false,
  speed = 40,
  className = "",
  label,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`marquee ${reverse ? "is-reverse" : ""} ${className}`}
      style={{ "--speed": `${speed}s` } as React.CSSProperties}
      aria-label={label}
      role={label ? "region" : undefined}
    >
      <div className="marquee-track">
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

export function DetailLink({ href, children }: { href: string } & Children) {
  return (
    <a href={href} className="detail-link">
      {children} <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
}
