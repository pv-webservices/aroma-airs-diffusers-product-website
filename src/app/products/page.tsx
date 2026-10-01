import { ProductCatalogue } from "@/components/catalogue";
import { PageHero, CTA } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Our Products",
  "Explore the Aroma airs collection of compact, wall mounted and floor standing fragrance diffusers and premium fragrance oils.",
  "/products",
);
export default function ProductsPage() {
  return (
    <>
      <PageHero
        label="THE AROMA AIRS COLLECTION"
        title={
          <>
            Fragrance solutions.
            <br />
            For every space.
          </>
        }
        description="Considered design, a choice of finishes and a fragrance that feels like you. Explore our diffuser and oil collection."
        breadcrumb={[{ label: "Products" }]}
        image="hero-desktop"
      />
      <section className="section">
        <div className="container">
          <ProductCatalogue />
        </div>
      </section>
      <CTA
        title={
          <>
            Need a hand choosing
            <br />
            the right diffuser?
          </>
        }
      />
    </>
  );
}
