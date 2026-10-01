import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { business, callUrl, products, whatsapp } from "@/lib/data";
import { WhatsAppIcon } from "./ui";

const quickLinks = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Products", "/products"],
  ["Fragrances", "/fragrances"],
  ["Applications", "/applications"],
  ["Gallery", "/gallery"],
  ["Contact Us", "/contact"],
];

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-glow" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="/" aria-label="Aroma airs home">
              <Image src="/logo-light.webp" width={640} height={232} sizes="200px" alt="Aroma airs Fragrance Diffuser" />
            </a>
            <p>Fragrance solutions for a cleaner, fresher and more memorable environment.</p>
            <div className="footer-social">
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={18} />
              </a>
              <a href={callUrl} aria-label="Call Aroma airs">
                <Phone size={17} />
              </a>
              <a href={`mailto:${business.email}`} aria-label="Email Aroma airs">
                <Mail size={17} />
              </a>
            </div>
          </div>
          <div>
            <h2>Quick Links</h2>
            {quickLinks.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <h2>Our Products</h2>
            {products.map((p) => (
              <a key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </a>
            ))}
            <a href="/products/fragrance-oils">
              Fragrance Oils <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-contact">
            <h2>Contact Us</h2>
            <a href={callUrl}>
              <span><Phone size={16} /></span>
              +91 {business.phone}
            </a>
            <a href={`mailto:${business.email}`}>
              <span><Mail size={16} /></span>
              {business.email}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span><MapPin size={16} /></span>
              {business.address}
            </a>
            <small>
              {business.legalName} · GSTIN: {business.gstin}
            </small>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Aroma airs. All rights reserved.</p>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <span aria-hidden="true">|</span>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
      <div className="mobile-contact-bar">
        <a href={callUrl}>
          <Phone size={18} />
          Call Now
        </a>
        <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
      <a
        className="floating-whatsapp"
        href={whatsapp()}
        aria-label="Chat with Aroma airs on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
