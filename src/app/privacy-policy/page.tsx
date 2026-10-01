import { PageHero } from "@/components/ui";
import { business } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
export const metadata = pageMeta(
  "Privacy Policy",
  "How Aroma airs uses contact information provided in product and fragrance enquiries.",
  "/privacy-policy",
);
export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="YOUR INFORMATION"
        title="Privacy Policy"
        description="How information is handled when you browse or enquire about our products."
        breadcrumb={[{ label: "Privacy Policy" }]}
      />
      <article className="container legal-content">
        <h2>Who we are</h2>
        <p>
          Aroma airs is operated by {business.legalName}, at {business.address}.
          Contact us at{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a> with
          questions about your information.
        </p>
        <h2>Information you choose to share</h2>
        <p>
          An enquiry may include your name, phone number, email address,
          company, city, product interest and message. We use these details to
          answer your enquiry and discuss suitable products. Please do not
          include sensitive personal information in your message.
        </p>
        <h2>How enquiries are sent</h2>
        <p>
          When you continue through WhatsApp, the website prepares your message
          and opens WhatsApp. You decide whether to send it. WhatsApp processes
          information under its own privacy policy. When online enquiry
          submission is enabled, the information is sent to the configured
          enquiry service so our team can respond.
        </p>
        <h2>Links to other services</h2>
        <p>
          Links to WhatsApp, email and Google Maps open external services. Their
          own privacy policies and terms apply. This website does not include
          customer accounts, online payments or shopping carts.
        </p>
        <h2>Website storage</h2>
        <p>
          This website does not set advertising or analytics cookies. Website
          hosting providers may process technical request information to operate
          and protect the service.
        </p>
        <h2>Questions and requests</h2>
        <p>
          To ask about access, correction or deletion of information you have
          shared, contact{" "}
          <a href={`mailto:${business.email}`}>{business.email}</a>. We will
          review your request and respond as appropriate.
        </p>
      </article>
    </>
  );
}
