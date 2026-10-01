import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Phone,
  Waves,
  Clock3,
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

type ButtonVariant = "pink" | "outline" | "green" | "light" | "dark" | "ghost";

export function Button({
  href,
  children,
  variant = "pink",
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
      className={`button button-${variant} ${small ? "button-small" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="button-label">{children}</span>
      {arrow && <ArrowRight className="button-arrow" size={17} aria-hidden="true" />}
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
      <Button href={whatsapp(subject)} variant="green" arrow={false} small={!large}>
        <WhatsAppIcon size={large ? 18 : 15} />
        {large ? "Enquire on WhatsApp" : "WhatsApp"}
      </Button>
    </div>
  );
}

export function Eyebrow({ children, light = false }: Children & { light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
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
    <div className={`section-heading ${centered ? "centered" : ""} ${light ? "light" : ""}`}>
      <Eyebrow light={light}>{label}</Eyebrow>
      <h2>{title}</h2>
      {description && <p className="body-copy">{description}</p>}
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
      <Image src={`/images/${name}.webp`} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}

export function categoryLabel(category: Product["category"]): string {
  if (category === "wall") return "Wall Mounted";
  if (category === "tower") return "Floor Standing";
  return "Compact";
}

const lightFinish = (color: string) => /white|silver/i.test(color);

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <a href={`/products/${product.slug}`} className="product-card-main">
        <div className="product-card-image">
          <span className="card-category">{categoryLabel(product.category)}</span>
          <Image
            src={`/images/${product.image}.webp`}
            alt={`${product.name} fragrance diffuser`}
            fill
            sizes="(max-width: 600px) 70vw, (max-width: 1100px) 33vw, 18vw"
          />
          <span className="card-view" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
        <div className="product-card-text">
          <h3>{product.name}</h3>
          <ul>
            {product.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p className="color-line">
            {product.colors.map((c) => (
              <span key={c} className={`color-dot ${lightFinish(c) ? "white" : ""}`} title={c} />
            ))}
            Colour: {product.colors.join(" / ")}
          </p>
        </div>
      </a>
      <ContactButtons subject={`the ${product.name} fragrance diffuser`} />
    </article>
  );
}

export function FragranceCard({
  fragrance,
  oil = false,
}: {
  fragrance: Fragrance;
  oil?: boolean;
}) {
  return (
    <article className={`fragrance-card ${oil ? "oil-card" : ""}`}>
      <a href={`/fragrances/${fragrance.slug}`}>
        <div className="fragrance-card-photo">
          <Image
            src={`/images/${fragrance.image}.webp`}
            alt={`${fragrance.name} scent inspiration`}
            fill
            sizes="(max-width: 600px) 60vw, (max-width: 1100px) 30vw, 18vw"
          />
          <span className="fragrance-family">{fragrance.family}</span>
          <span className="photo-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
          <div className="fragrance-card-text">
            <h3>{fragrance.name}</h3>
            <p>{fragrance.mood}</p>
          </div>
        </div>
      </a>
      {oil && (
        <a
          className="oil-enquire"
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

export function ApplicationCard({
  application,
}: {
  application: (typeof applications)[number];
}) {
  const Icon = appIcons[application.icon as keyof typeof appIcons];
  return (
    <a href={`/applications#${application.slug}`} className="application-card">
      <Image
        src={`/images/${application.image}.webp`}
        alt={`${application.name} interior inspiration`}
        fill
        sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 17vw"
      />
      <div className="application-card-text">
        <span className="application-icon">
          <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3>{application.name}</h3>
        <span className="application-more">
          Explore <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}

export const benefits = [
  { icon: Waves, title: "Consistent Fragrance", text: "Advanced diffusion for uniform fragrance" },
  { icon: Clock3, title: "Long-lasting Performance", text: "Continuous & reliable scent experience" },
  { icon: VolumeX, title: "Quiet Operation", text: "Low noise, peaceful ambience" },
  { icon: Leaf, title: "Energy Efficient", text: "Designed for everyday use" },
  { icon: Gem, title: "Premium Design", text: "Sleek, modern look for any space" },
];

export function Benefits({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`benefits ${compact ? "benefits-compact" : ""}`}>
      {benefits.map(({ icon: Icon, title, text }, i) => (
        <div className="benefit reveal" style={{ "--delay": `${i * 80}ms` } as React.CSSProperties} key={title}>
          <span className="benefit-icon">
            <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

export const technologyFeatures = [
  { icon: Wind, title: "Advanced Cold-air", text: "Diffusion technology" },
  { icon: SlidersHorizontal, title: "Adjustable Intensity", text: "& timer settings" },
  { icon: Droplets, title: "Long-lasting", text: "Elegant & aromatic" },
  { icon: VolumeX, title: "Low Noise", text: "Operation" },
  { icon: Wrench, title: "Easy Installation", text: "& low maintenance" },
  { icon: Sparkles, title: "Compatible with", text: "Premium fragrance oils" },
];

export function TechnologyGrid() {
  return (
    <div className="technology-grid">
      {technologyFeatures.map(({ icon: Icon, title, text }, i) => (
        <div
          className="technology-feature reveal"
          style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
          key={title}
        >
          <span className="technology-icon">
            <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <a href="/">Home</a>
      {items.map((item, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
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
  image = "hero-lobby",
}: {
  label: string;
  title: React.ReactNode;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
  image?: string;
}) {
  return (
    <section className="page-hero" data-scroll>
      <Image src={`/images/${image}.webp`} alt="" fill priority sizes="100vw" className="page-hero-bg" />
      <div className="page-hero-shade" />
      <div className="mist mist-a" aria-hidden="true" />
      <div className="mist mist-b" aria-hidden="true" />
      <div className="container page-hero-content">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <Eyebrow light>{label}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function CTA({
  title = (
    <>
      Ready to Transform
      <br />
      Your Space with <span className="text-gradient">Aroma airs?</span>
    </>
  ),
}: {
  title?: React.ReactNode;
}) {
  return (
    <section className="cta-section" data-scroll>
      <Image src="/images/hero-lobby.webp" alt="" fill sizes="100vw" className="cta-bg" />
      <div className="container cta-content reveal">
        <div>
          <h2>{title}</h2>
          <p>Get in touch with us for product details, customised solutions or any queries.</p>
        </div>
        <div className="cta-buttons">
          <Button href={whatsapp()} variant="green" arrow={false}>
            <WhatsAppIcon size={21} /> Chat on WhatsApp
          </Button>
          <Button href={callUrl} arrow={false}>
            <Phone size={19} /> Call Now
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
          <Check size={16} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}
