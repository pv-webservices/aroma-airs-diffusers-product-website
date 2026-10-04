"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { products, oilFragrances, whatsapp } from "@/lib/data";
import { WhatsAppIcon } from "./ui";
export default function EnquiryForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setStatus("");
    if (!configured) {
      const text = `Hello Aroma Airs, I would like to enquire about ${values.product || "a scenting solution"}.\nName: ${values.name}\nPhone: ${values.phone}\n${values.email ? `Email: ${values.email}\n` : ""}${values.company ? `Company: ${values.company}\n` : ""}City: ${values.city}\nSpace type: ${values.spaceType || "Please advise"}\nMessage: ${values.message}`;
      const href =
        whatsapp().split("?")[0] + `?text=${encodeURIComponent(text)}`;
      window.open(href, "_blank", "noopener,noreferrer");
      setStatus(
        "Your enquiry is prepared in WhatsApp. Review it and press Send there to contact our team.",
      );
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error ||
            "Unable to send your enquiry. Please try WhatsApp or call us.",
        );
      setStatus("Your enquiry has been sent. Our team will be in touch.");
      form.reset();
    } catch (e) {
      setStatus(
        e instanceof Error
          ? e.message
          : "Unable to send your enquiry. Please contact us on WhatsApp.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <h2>Tell us about your space.</h2>
        <p>
          {configured
            ? "Share a few details and our team will get in touch."
            : "Share a few details, then send your enquiry through WhatsApp."}
        </p>
      </div>
      <div className="form-grid">
        <label>
          Full name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        <label>
          Phone number <span>*</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="Your phone number"
            required
            pattern={"[+0-9\\s\\(\\)\\-]{7,20}"}
            maxLength={20}
          />
        </label>
        <label>
          Email address
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={160}
          />
        </label>
        <label>
          Business / company
          <input
            name="company"
            autoComplete="organization"
            placeholder="Company name (optional)"
            maxLength={120}
          />
        </label>
        <label>
          City <span>*</span>
          <input
            name="city"
            autoComplete="address-level2"
            placeholder="Your city"
            required
            maxLength={100}
          />
        </label>
        <label>
          Interested in
          <select name="product" defaultValue="">
            <option value="">Help me choose</option>
            <option value="Complete scenting solution">
              Complete scenting solution
            </option>
            <optgroup label="Diffusers">
              {products.map((p) => (
                <option key={p.slug}>{p.name}</option>
              ))}
            </optgroup>
            <optgroup label="Fragrance oils">
              {oilFragrances.map((f) => (
                <option key={f.slug}>{f.name}</option>
              ))}
            </optgroup>
          </select>
        </label>
        <label className="full-width">
          Space type
          <select name="spaceType" defaultValue="">
            <option value="">Help me choose</option>
            {[
              "Home / Apartment",
              "Office / Workspace",
              "Hotel / Resort",
              "Retail Store",
              "Restaurant / Café",
              "Hospital / Clinic",
              "Spa / Wellness",
              "Other",
            ].map((space) => (
              <option key={space}>{space}</option>
            ))}
          </select>
        </label>
        <label className="full-width">
          Your message <span>*</span>
          <textarea
            name="message"
            placeholder="Tell us about your space, approximate size and what you have in mind…"
            required
            minLength={10}
            maxLength={3000}
            rows={4}
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="form-consent">
        <input type="checkbox" name="consent" required />{" "}
        <span>
          I agree to be contacted about this enquiry and have read the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>
      <button
        className={`btn btn-${configured ? "primary" : "whatsapp"} form-submit`}
        disabled={busy}
        type="submit"
      >
        {busy ? (
          <LoaderCircle className="spin" size={18} />
        ) : !configured ? (
          <WhatsAppIcon />
        ) : null}
        {busy
          ? "Sending…"
          : configured
            ? "Send Enquiry"
            : "Continue on WhatsApp"}
        <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        {configured
          ? "Your details are used to respond to your enquiry."
          : "This opens WhatsApp with your message. No enquiry is submitted until you send it there."}
      </p>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
    </form>
  );
}
