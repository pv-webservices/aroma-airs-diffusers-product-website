import { PageHero, CTA } from "@/components/ui";
import { FragranceCatalogue } from "@/components/catalogue";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Our Fragrances",
  "Find your signature scent. Explore Aroma Airs floral, fresh, woody and citrus fragrances for residential and commercial spaces.",
  "/fragrances",
);
export default function FragrancesPage() {
  return (
    <>
      <PageHero
        label="A SCENT FOR EVERY STORY"
        title={
          <>
            Find the fragrance
            <br />
            that feels like you.
          </>
        }
        description="Delicate florals. Fresh citrus. Warm woods. A collection of fragrances to set the mood and make a space your own."
        breadcrumb={[{ label: "Fragrances" }]}
        image="scent-white-blossom"
      />
      <section className="section">
        <div className="container">
          <FragranceCatalogue />
        </div>
      </section>
      <CTA
        title={
          <>
            Your signature scent
            <br />
            is waiting.
          </>
        }
      />
    </>
  );
}
