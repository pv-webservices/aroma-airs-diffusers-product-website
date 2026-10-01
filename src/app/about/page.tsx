import { pageMeta } from "@/lib/seo";
import {
  PageHero,
  Photo,
  SectionHeading,
  TechnologyGrid,
  CTA,
  Button,
  CheckList,
} from "@/components/ui";
export const metadata = pageMeta(
  "About Us",
  "Meet Aroma airs, the New Delhi fragrance diffuser and oil brand from VS Incorporation. Thoughtful scenting solutions for homes, hospitality and businesses.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT AROMA AIRS"
        title={
          <>
            Beautiful spaces.
            <br />
            Memorable atmospheres.
          </>
        }
        description="We believe fragrance is a finishing touch that makes a space feel complete. Meet a more considered approach to scenting."
        breadcrumb={[{ label: "About Us" }]}
        image="home-lifestyle"
      />
      <section className="section">
        <div className="container about-layout">
          <div>
            <SectionHeading
              label="OUR APPROACH"
              title="Good design is something you feel."
              description="Aroma airs offers fragrance diffusers and oils for homes, hospitality and commercial environments. From a compact device on a reception desk to a floor-standing tower in a hotel lobby, our collection brings scent and space together."
            />
            <p className="body-copy">
              Based in New Delhi and operated by VS Incorporation, we help you
              explore diffuser styles, fragrance choices and practical setup
              options for your environment.
            </p>
            <CheckList
              items={[
                "A model to complement your interior",
                "Fragrance profiles to suit your atmosphere",
                "Personal advice before you choose",
              ]}
            />
            <Button href="/contact">Talk to Our Team</Button>
          </div>
          <Photo
            name="table-lifestyle"
            alt="Aroma airs diffuser styled on a wooden side table"
            className="about-page-photo"
          />
        </div>
      </section>
      <section className="section philosophy-section">
        <div className="container">
          <SectionHeading
            centered
            label="SCENT. SPACE. EXPERIENCE."
            title="A space is more than what you see."
            description="The right fragrance adds character to an entrance, warmth to a shared space and a personal touch to your everyday surroundings."
          />
          <div className="philosophy-grid">
            <article>
              <span>01</span>
              <h3>Start with the space.</h3>
              <p>
                Consider your room, its layout and how people use it. The right
                diffuser begins with the right fit.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Find the feeling.</h3>
              <p>
                Fresh, floral or woody — choose the fragrance character that
                complements your environment.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Make it effortless.</h3>
              <p>
                Use your model’s controls and guidance to shape a fragrance
                experience that feels natural.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container technology-layout">
          <SectionHeading
            label="THE TECHNOLOGY"
            title="A fine mist. A considered experience."
            description="Cold-air nebulizing technology diffuses fragrance oils into the environment. Adjustable settings on supported models let you tailor scent intensity and operating times."
          />
          <TechnologyGrid />
        </div>
      </section>
      <CTA />
    </>
  );
}
