import { PageHero } from "@/components/ui";
import { business } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Terms & Conditions",
  "Terms for browsing the Aroma airs product catalogue and making product enquiries.",
  "/terms-and-conditions",
);
export default function TermsPage() {
  return (
    <>
      <PageHero
        label="WEBSITE INFORMATION"
        title="Terms & Conditions"
        description="Information about our catalogue and enquiry process."
        breadcrumb={[{ label: "Terms & Conditions" }]}
      />
      <article className="container legal-content">
        <h2>Using this website</h2>
        <p>
          This website presents the Aroma airs fragrance diffuser and oil
          collection from {business.legalName}. It is a product showcase and
          enquiry website. Products cannot be purchased through this website.
        </p>
        <h2>Product information</h2>
        <p>
          Images illustrate product design and scent inspiration. Finishes,
          packaging and available models may vary. Coverage depends on the
          environment and operating settings. Confirm current specifications,
          compatibility, availability and installation requirements with our
          team before making a purchase decision.
        </p>
        <h2>Enquiries and quotations</h2>
        <p>
          Submitting an enquiry or contacting us does not place an order or
          create a purchase agreement. Any quotation, payment, delivery,
          warranty or service terms will be discussed separately with our team.
        </p>
        <h2>Appropriate use</h2>
        <p>
          Please use the website and contact channels for legitimate enquiries.
          Do not submit misleading information or attempt to interfere with the
          website or its services.
        </p>
        <h2>External links</h2>
        <p>
          WhatsApp and map links take you to external services with their own
          terms. Fragrances should be used in accordance with product guidance,
          taking account of individual sensitivities and your environment.
        </p>
        <h2>Contact</h2>
        <p>
          For questions about this website, email{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> or call{" "}
          <a href={`tel:${business.internationalPhone}`}>{business.phone}</a>.
        </p>
      </article>
    </>
  );
}
