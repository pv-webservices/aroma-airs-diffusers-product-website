import { notFound } from "next/navigation";
import {
  products,
  categories,
  applications,
  signatureFragrances,
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
} from "@/components/ui";
import { ProductCatalogue } from "@/components/catalogue";
import ProductGallery from "@/components/product-gallery";
export function generateStaticParams() {
  return [...products, ...categories].map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item =
    products.find((p) => p.slug === slug) ||
    categories.find((c) => c.slug === slug);
  return item ? pageMeta(item.name, item.description, `/products/${slug}`) : {};
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (category)
    return (
      <>
        <PageHero
          label="EXPLORE THE COLLECTION"
          title={category.name}
          description={category.description}
          breadcrumb={[
            { label: "Products", href: "/products" },
            { label: category.name },
          ]}
          image={category.key === "oil" ? "scent-flora" : "hero-trio"}
        />
        <section className="section">
          <div className="container">
            <ProductCatalogue initialFilter={category.key} fixed />
          </div>
        </section>
        {category.key !== "oil" && (
          <section className="section category-benefits">
            <div className="container">
              <SectionHeading
                label="DESIGNED FOR EVERYDAY"
                title="A better atmosphere, made simple."
              />
              <TechnologyGrid />
              <div className="category-apps">
                <SectionHeading
                  label="FIND YOUR FIT"
                  title="Made for the spaces you love."
                />
                <div className="application-grid">
                  {applications.slice(0, 6).map((a) => (
                    <ApplicationCard key={a.slug} application={a} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <CTA />
      </>
    );
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: "Aroma airs" },
    description: p.description,
    ...(siteUrl
      ? {
          url: `${siteUrl}/products/${p.slug}`,
          image: siteUrl + `/images/${p.image}.webp`,
        }
      : {}),
    color: p.colors.join(" / "),
  };
  return (
    <>
      <section className="product-detail-section">
        <div className="container">
          <Breadcrumb
            items={[
              { label: "Products", href: "/products" },
              { label: p.name },
            ]}
          />
          <div className="product-detail-layout">
            <ProductGallery images={p.gallery} name={p.name} />
            <div className="product-detail-info">
              <Eyebrow>
                {p.category === "tower"
                  ? "FLOOR STANDING DIFFUSER"
                  : p.category === "wall"
                    ? "WALL MOUNTED DIFFUSER"
                    : "COMPACT DIFFUSER"}
              </Eyebrow>
              <h1>{p.name}</h1>
              <p className="product-positioning">{p.label}</p>
              <p className="body-copy">{p.description}</p>
              <CheckList items={p.features} />
              <div className="product-finishes">
                <span>Available finish{p.colors.length > 1 ? "es" : ""}</span>
                {p.colors.map((c) => (
                  <span key={c} className="finish-chip">
                    <i
                      className={
                        c.includes("White") || c.includes("Silver")
                          ? "light"
                          : ""
                      }
                    />
                    {c}
                  </span>
                ))}
              </div>
              <ContactButtons
                subject={`the ${p.name} fragrance diffuser`}
                large
              />
              <p className="enquiry-caption">
                Personal advice. Product details. A solution for your space.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section specifications-section">
        <div className="container specifications-layout">
          <div>
            <SectionHeading
              label="THE DETAILS"
              title="Designed with purpose."
              description="Explore the confirmed details for this model. For sizing, setup and the latest technical specifications, speak to our team."
            />
          </div>
          <div>
            <table className="spec-table">
              <caption>{p.name} specifications</caption>
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
              Coverage depends on room layout, ventilation and settings. Confirm
              suitability with us before installation.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            label="YOUR SPACE, CONSIDERED"
            title="A natural fit for your environment."
          />
          <div className="detail-app-grid">
            {applications
              .filter((a) => p.applications.includes(a.name))
              .map((a) => (
                <ApplicationCard key={a.slug} application={a} />
              ))}
          </div>
        </div>
      </section>
      <section className="section fragrance-home">
        <div className="container">
          <SectionHeading
            label="MAKE IT YOURS"
            title="Pair it with a signature fragrance."
          />
          <div className="signature-grid">
            {signatureFragrances.map((f) => (
              <FragranceCard key={f.slug} fragrance={f} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-top">
            <SectionHeading
              label="KEEP EXPLORING"
              title="Meet the rest of the collection."
            />
            <a href="/products" className="detail-link">
              All products →
            </a>
          </div>
          <div className="related-grid">
            {products
              .filter((other) => other.slug !== p.slug)
              .slice(0, 3)
              .map((other) => (
                <ProductCard key={other.slug} product={other} />
              ))}
          </div>
        </div>
      </section>
      <CTA
        title={
          <>
            Let’s find your
            <br />
            perfect atmosphere.
          </>
        }
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
