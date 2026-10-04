import { notFound } from "next/navigation";
import { fragrances, products } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import {
  Breadcrumb,
  Eyebrow,
  ContactButtons,
  CTA,
  SectionHeading,
  FragranceCard,
  ProductCard,
  DetailLink,
  isStudioImage,
} from "@/components/ui";
import ProductGallery from "@/components/product-gallery";

export function generateStaticParams() {
  return fragrances.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = fragrances.find((item) => item.slug === slug);
  return f ? pageMeta(f.name, f.description, `/fragrances/${slug}`, `/images/${f.image}.webp`) : {};
}

const diffuserPairings = ["cloudy", "square-tower", "compact"];

export default async function FragrancePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = fragrances.find((item) => item.slug === slug);
  if (!f) notFound();
  const isOil = f.collection === "oil";
  // Only labelled bottles get the collection shots; scent photos stand alone.
  const gallery = isStudioImage(f.image) ? [f.image, "latest-oils", "essential-oils"] : [f.image];
  const sameFamily = fragrances.filter((o) => o.slug !== f.slug && o.family === f.family);
  const more = [...sameFamily, ...fragrances.filter((o) => o.slug !== f.slug && o.family !== f.family)].slice(0, 5);

  return (
    <>
      <section className="pd">
        <div className="pd-glow" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: "Fragrances", href: "/fragrances" }, { label: f.name }]} />
          <div className="pd-layout">
            <ProductGallery images={gallery} name={f.name} />
            <div className="pd-info">
              <Eyebrow>
                {f.family} · {isOil ? "Fragrance oil" : "Signature scent"}
              </Eyebrow>
              <h1>{f.name}</h1>
              <p className="pd-tagline">{f.mood}.</p>
              <p className="lede">{f.description}</p>
              <p className="lede">
                Discover this fragrance with the Aroma Airs team. We&rsquo;ll help you choose a diffuser and intensity
                to suit your space.
              </p>
              <ContactButtons subject={`${f.name} fragrance${isOil ? " oil" : ""}`} large />
              <p className="pd-caption">Ask us about availability, bottle sizes and model compatibility.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading label="COMPLETE THE EXPERIENCE" title="Find a diffuser to match." />
            <DetailLink href="/products">All diffusers</DetailLink>
          </div>
          <div className="product-grid">
            {diffuserPairings
              .map((s) => products.find((p) => p.slug === s))
              .filter((p): p is (typeof products)[number] => Boolean(p))
              .map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading label="MORE TO DISCOVER" title="A different mood. A new favourite." />
            <DetailLink href="/fragrances">All fragrances</DetailLink>
          </div>
          <div className="oil-grid">
            {more.map((other) => (
              <FragranceCard key={other.slug} fragrance={other} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
