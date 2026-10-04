import Gallery from "@/components/gallery";
import { PageHero, CTA } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Gallery",
  "See Aroma Airs diffuser designs, product details, fragrance oils and lifestyle imagery. Explore our gallery of scenting inspiration.",
  "/gallery",
);
export default function GalleryPage() {
  return (
    <>
      <PageHero
        label="A CLOSER LOOK"
        title={
          <>
            Considered design.
            <br />
            In beautiful company.
          </>
        }
        description="Explore our collection in detail, and discover the spaces that inspire us."
        breadcrumb={[{ label: "Gallery" }]}
        image="hotel-lifestyle"
      />
      <section className="section">
        <div className="container">
          <Gallery />
        </div>
      </section>
      <CTA />
    </>
  );
}
