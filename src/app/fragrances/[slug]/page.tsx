import { notFound } from "next/navigation";
import { fragrances, products } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import {
  Breadcrumb,
  Eyebrow,
  ContactButtons,
  Photo,
  CTA,
  SectionHeading,
  FragranceCard,
  ProductCard,
} from "@/components/ui";
export function generateStaticParams() {
  return fragrances.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = fragrances.find((f) => f.slug === slug);
  return f
    ? pageMeta(
        f.name,
        f.description,
        `/fragrances/${slug}`,
        `/images/${f.image}.webp`,
      )
    : {};
}
export default async function FragrancePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = fragrances.find((f) => f.slug === slug);
  if (!f) notFound();
  return (
    <>
      <section className="product-detail-section">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Fragrances", href: "/fragrances" },
              { label: f.name },
            ]}
          />
          <div className="fragrance-detail-layout">
            <Photo
              name={f.image}
              alt={`${f.name} fragrance inspiration`}
              priority
              className="fragrance-detail-photo"
            />
            <div className="product-detail-info">
              <Eyebrow>
                {f.family.toUpperCase()} ·{" "}
                {f.collection === "oil" ? "FRAGRANCE OIL" : "SIGNATURE SCENT"}
              </Eyebrow>
              <h1>{f.name}</h1>
              <p className="product-positioning">{f.mood}.</p>
              <p className="body-copy">{f.description}</p>
              <p className="body-copy">
                Discover this fragrance with the Aroma airs team. We’ll help you
                choose a diffuser and intensity to suit your space.
              </p>
              <ContactButtons
                subject={`${f.name} fragrance ${f.collection === "oil" ? "oil" : ""}`}
                large
              />
              <p className="enquiry-caption">
                Ask us about availability, bottle sizes and model compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      {f.collection === "oil" && (
        <section className="section oil-detail-band">
          <div className="container oil-detail-layout">
            <Photo
              name="oil-bottle"
              alt="Representative Aroma airs fragrance oil range packaging"
              className="oil-detail-bottle"
            />
            <div>
              <SectionHeading
                label="THE FRAGRANCE OIL COLLECTION"
                title="The finishing touch to your space."
                description="Pair a considered fragrance with a diffuser that suits your interior. Contact us for usage guidance and a compatible oil for your model."
              />
              <p className="spec-note">
                Representative range packaging shown. Bottle size and labelling
                may vary by fragrance.
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <SectionHeading
            label="COMPLETE THE EXPERIENCE"
            title="Find a diffuser to match."
          />
          <div className="related-grid">
            {products.slice(0, 3).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
      <section className="section fragrance-home">
        <div className="container">
          <SectionHeading
            label="MORE TO DISCOVER"
            title="A different mood. A new favourite."
          />
          <div className="signature-grid">
            {fragrances
              .filter((other) => other.slug !== f.slug)
              .slice(0, 5)
              .map((other) => (
                <FragranceCard key={other.slug} fragrance={other} />
              ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
