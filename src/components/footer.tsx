import Image from "next/image";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { business, callUrl, products, whatsapp, fragrances } from "@/lib/data";
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

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-word" aria-hidden="true">
          Aroma Airs
        </div>
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="/" aria-label="Aroma Airs home">
              <Image src="/logo-light.webp" width={516} height={360} sizes="180px" alt="Aroma Airs Fragrance Solutions" />
            </a>
            <p>Fragrance solutions for better living &amp; working spaces.</p>
            <div className="footer-social">
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Aroma Airs">
                <WhatsAppIcon size={18} />
              </a>
              <a href={callUrl} aria-label="Call Aroma Airs">
                <Phone size={17} />
              </a>
              <a href={`mailto:${business.email}`} aria-label="Email Aroma Airs">
                <Mail size={17} />
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h2>Explore</h2>
            {quickLinks.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-col">
            <h2>Products</h2>
            {products.map((p) => (
              <a key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </a>
            ))}
            <a href="/products/fragrance-oils">
              Fragrance Oils <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-col">
            <h2>Fragrances</h2>
            {fragrances.slice(0, 7).map((f) => (
              <a key={f.slug} href={`/fragrances/${f.slug}`}>
                {f.name}
              </a>
            ))}
            <a href="/fragrances">All fragrances →</a>
          </div>
          <div className="footer-col footer-contact">
            <h2>Contact</h2>
            <a href={callUrl}>
              <Phone size={16} /> +91 {business.phone}
            </a>
            <a href={`mailto:${business.email}`}>
              <Mail size={16} /> {business.email}
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <MapPin size={16} /> {business.address}
            </a>
            <small>
              {business.legalName} · GSTIN: {business.gstin}
            </small>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Aroma Airs. All rights reserved.</p>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>
      <nav className="mobile-contact-bar" aria-label="Quick contact">
        <a href={callUrl}>
          <Phone size={18} />
          Call Now
        </a>
        <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
          WhatsApp
        </a>
      </nav>
      <a
        className="floating-whatsapp"
        href={whatsapp()}
        aria-label="Chat with Aroma Airs on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
