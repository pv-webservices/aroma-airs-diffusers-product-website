import { pageMeta } from "@/lib/seo";
import { applications, whatsapp } from "@/lib/data";
import {
  PageHero,
  Photo,
  Eyebrow,
  Button,
  CTA,
  WhatsAppIcon,
} from "@/components/ui";
export const metadata = pageMeta(
  "Scenting Applications",
  "Explore Aroma airs scenting solutions for hotels, offices, shops, homes, restaurants and wellness spaces. Match your diffuser and fragrance to your environment.",
  "/applications",
);
export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        label="A BETTER ATMOSPHERE, EVERYWHERE"
        title={
          <>
            Your space.
            <br />A new dimension.
          </>
        }
        description="Wherever people gather, a thoughtfully chosen fragrance adds character. Find the scenting approach that suits your environment."
        breadcrumb={[{ label: "Applications" }]}
        image="cafe"
      />
      <section className="section">
        <div className="container application-sections">
          {applications.map((a, i) => (
            <article
              id={a.slug}
              className={`application-detail ${i % 2 ? "reverse" : ""}`}
              key={a.slug}
            >
              <Photo name={a.image} alt={`${a.name} interior inspiration`} />
              <div>
                <Eyebrow>0{i + 1} / YOUR ENVIRONMENT</Eyebrow>
                <h2>{a.name}</h2>
                <p className="body-copy">{a.description}</p>
                <div className="application-suggestion">
                  <strong>A starting point</strong>
                  <p>{a.suggestion}</p>
                </div>
                <div className="application-buttons">
                  <Button href="/products">Explore Diffusers</Button>
                  <Button
                    href={whatsapp(
                      `a scenting solution for ${a.name.toLowerCase()}`,
                    )}
                    variant="outline"
                    arrow={false}
                  >
                    <WhatsAppIcon />
                    Let’s Talk
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
