import { notFound } from "next/navigation";
import {
  products,
  categories,
  applications,
  signatureFragrances,
  oilFragrances,
  siteUrl,
} from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import {
  Breadcrumb,
  Eyebrow,
  ContactButtons,
  CheckList,
  ProductCard,
  SectionHeading,
  FragranceCard,
  ApplicationCard,
  CTA,
  PageHero,
  TechnologyGrid,
  Swatches,
  DetailLink,
  categoryLabel,
} from "@/components/ui";
import { ProductCatalogue } from "@/components/catalogue";
import ProductGallery from "@/components/product-gallery";

const categoryImages: Record<string, string> = {
  all: "hero-stage",
  compact: "p-cloudy",
  wall: "wall-lifestyle",
  tower: "p-square-tower",
  hvac: "p-hvac-power",
  dispenser: "p-automatic-dispenser",
  oil: "latest-oils",
};

export function generateStaticParams() {
  return [...products, ...categories].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (product)
    return pageMeta(product.name, product.description, `/products/${slug}`, `/images/${product.image}.webp`);
  const category = categories.find((c) => c.slug === slug);
  return category ? pageMeta(category.name, category.description, `/products/${slug}`) : {};
}

function CategoryPage({ category }: { category: (typeof categories)[number] }) {
  const image = categoryImages[category.key] ?? "hero-stage";
  return (
    <>
      <PageHero
        label="EXPLORE THE COLLECTION"
        title={category.name}
        description={category.description}
        breadcrumb={[{ label: "Products", href: "/products" }, { label: category.name }]}
        image={image}
        studio={image.startsWith("p-")}
      />
      <section className="section">
        <div className="container">
          <ProductCatalogue initialFilter={category.key} fixed={category.key !== "all"} />
        </div>
      </section>
      {category.key !== "oil" && category.key !== "dispenser" && (
        <section className="section soft-section">
          <div className="container">
            <SectionHeading label="DESIGNED FOR EVERYDAY" title="A better atmosphere, made simple." />
            <TechnologyGrid />
          </div>
        </section>
      )}
      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading label="FIND YOUR FIT" title="Made for the spaces you love." />
            <DetailLink href="/applications">All applications</DetailLink>
          </div>
          <div className="app-grid">
            {applications.slice(0, 6).map((a) => (
              <ApplicationCard key={a.slug} application={a} />
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (category) return <CategoryPage category={category} />;
  const p = products.find((item) => item.slug === slug);
  if (!p) notFound();
  const isDispenser = p.category === "dispenser";
  const noun = isDispenser ? "fragrance dispenser" : "fragrance diffuser";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: "Aroma Airs" },
    description: p.description,
    ...(siteUrl ? { url: `${siteUrl}/products/${p.slug}`, image: siteUrl + `/images/${p.image}.webp` } : {}),
    color: p.colors.join(" / "),
  };
  const related = [
    ...products.filter((o) => o.slug !== p.slug && o.category === p.category),
    ...products.filter((o) => o.slug !== p.slug && o.category !== p.category),
  ].slice(0, 3);

  return (
    <>
      <section className="pd">
        <div className="pd-glow" aria-hidden="true" />
        <div className="container">
          <Breadcrumb items={[{ label: "Products", href: "/products" }, { label: p.name }]} />
          <div className="pd-layout">
            <ProductGallery images={p.gallery} name={p.name} />
            <div className="pd-info">
              <Eyebrow>
                {categoryLabel(p.category)} · {isDispenser ? "Dispenser" : "Diffuser"}
              </Eyebrow>
              <h1>{p.name}</h1>
              <p className="pd-tagline">{p.label}</p>
              <p className="lede">{p.description}</p>
              <CheckList items={p.features} />
              <div className="pd-finish">
                <span>Available finish{p.colors.length > 1 ? "es" : ""}</span>
                <Swatches colors={p.colors} />
              </div>
              <ContactButtons subject={`the ${p.name} ${noun}`} large />
              <p className="pd-caption">Personal advice · Product details · A solution for your space</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container specs-layout">
          <SectionHeading
            label="THE DETAILS"
            title="Designed with purpose."
            description="The confirmed details for this model. For sizing, setup and the latest technical specifications, speak to our team."
          />
          <div className="reveal">
            <table className="spec-table">
              <caption className="sr-only">{p.name} specifications</caption>
              <tbody>
                {Object.entries(p.specs).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="spec-note">
              Coverage depends on room layout, ventilation and settings. Confirm suitability with us before installation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading label="YOUR SPACE, CONSIDERED" title="A natural fit for your environment." />
          <div className="app-grid">
            {applications
              .filter((a) => p.applications.includes(a.name))
              .map((a) => (
                <ApplicationCard key={a.slug} application={a} />
              ))}
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              light
              label="MAKE IT YOURS"
              title={isDispenser ? "Choose the right aerosol refill." : "Pair it with a signature fragrance."}
              description={
                isDispenser
                  ? "This dispenser uses a 300 ml perfume can. Ask our team for compatible aerosol refills and available fragrances."
                  : "Ask our team about fragrance oil compatibility for your selected model."
              }
            />
            <a href="/fragrances" className="detail-link is-light">
              All fragrances →
            </a>
          </div>
          {!isDispenser && (
            <div className="oil-grid">
              {[...oilFragrances.slice(0, 3), ...signatureFragrances.slice(0, 2)].map((f) => (
                <FragranceCard key={f.slug} fragrance={f} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading label="KEEP EXPLORING" title="Meet the rest of the collection." />
            <DetailLink href="/products">All products</DetailLink>
          </div>
          <div className="product-grid">
            {related.map((other) => (
              <ProductCard key={other.slug} product={other} />
            ))}
          </div>
        </div>
      </section>
      <CTA
        title={
          <>
            Let&rsquo;s find your
            <br />
            perfect atmosphere.
          </>
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
