import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { business, callUrl, whatsapp } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import { PageHero, Button, WhatsAppIcon, Eyebrow } from "@/components/ui";
import EnquiryForm from "@/components/enquiry-form";
export const metadata = pageMeta(
  "Contact Us",
  "Contact Aroma Airs at VS Incorporation, Mahipalpur, New Delhi. Call 9015759321 or enquire on WhatsApp about fragrance diffusers and oils.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageHero
        label="LET’S CREATE SOMETHING MEMORABLE"
        title={
          <>
            A better atmosphere
            <br />
            starts with a conversation.
          </>
        }
        description="Product questions, fragrance advice or a scenting solution for your business — we’d love to hear about your space."
        breadcrumb={[{ label: "Contact Us" }]}
        image="hero-lobby"
      />
      <section className="section contact-section">
        <div className="container contact-layout">
          <div className="contact-information">
            <Eyebrow>GET IN TOUCH</Eyebrow>
            <h2>
              Let’s find your
              <br />
              perfect fit.
            </h2>
            <p className="body-copy">
              Speak to our New Delhi team for product details and guidance on
              choosing a diffuser and fragrance.
            </p>
            <a className="contact-detail" href={callUrl}>
              <span>
                <Phone size={23} />
              </span>
              <div>
                <small>CALL US</small>
                <strong>+91 {business.phone}</strong>
              </div>
              <ArrowUpRight size={18} />
            </a>
            <a className="contact-detail" href={`mailto:${business.email}`}>
              <span>
                <Mail size={23} />
              </span>
              <div>
                <small>EMAIL US</small>
                <strong>{business.email}</strong>
              </div>
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-detail">
              <span>
                <MapPin size={23} />
              </span>
              <div>
                <small>OUR ADDRESS</small>
                <strong>{business.legalName}</strong>
                <p>{business.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail-link"
                >
                  Open in Google Maps
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <p className="contact-gst">GSTIN: {business.gstin}</p>
            <Button href={whatsapp()} variant="whatsapp" arrow={false}>
              <WhatsAppIcon />
              Chat on WhatsApp
            </Button>
          </div>
          <EnquiryForm configured={Boolean(process.env.ENQUIRY_ENDPOINT)} />
        </div>
      </section>
    </>
  );
}
