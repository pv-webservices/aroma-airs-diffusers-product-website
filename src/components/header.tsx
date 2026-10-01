"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import {
  business,
  callUrl,
  categories,
  products,
  oilFragrances,
} from "@/lib/data";
const links = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Fragrances", href: "/fragrances" },
  { name: "Applications", href: "/applications" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
];
export default function Header() {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 25);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    setMobile(false);
    setDropdown(false);
  }, [pathname]);
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth > 1000) setMobile(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(
        "main, footer, .mobile-contact-bar, .floating-whatsapp",
      ),
    ];
    const previous = elements.map((el) => el.inert);
    elements.forEach((el) => {
      el.inert = true;
    });
    return () =>
      elements.forEach((el, index) => {
        el.inert = previous[index];
      });
  }, [mobile]);
  useEffect(() => {
    if (!mobile) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        menuRef.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = headerRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button, summary",
        );
        const list = [...(nodes || [])].filter(
          (n) => n.getClientRects().length,
        );
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = before;
      document.removeEventListener("keydown", key);
    };
  }, [mobile]);
  useEffect(() => {
    const fn = (e: PointerEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdown(false);
    };
    document.addEventListener("pointerdown", fn);
    return () => document.removeEventListener("pointerdown", fn);
  }, []);
  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "scrolled" : ""}`}
    >
      <div className="header-inner">
        <Link href="/" className="logo-link" aria-label="Aroma airs — Home">
          <Image
            src="/logo-dark.webp"
            alt="Aroma airs Fragrance Diffuser"
            width={640}
            height={232}
            sizes="150px"
            priority
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) =>
            link.href === "/products" ? (
              <div
                key={link.href}
                ref={dropdownRef}
                className="nav-products"
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setDropdown(false);
                    (
                      e.currentTarget.querySelector(
                        "button",
                      ) as HTMLButtonElement
                    )?.focus();
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setDropdown(false);
                }}
              >
                <div className="nav-product-links">
                  <Link
                    href={link.href}
                    className={active(link.href) ? "active" : ""}
                    aria-current={active(link.href) ? "page" : undefined}
                  >
                    {link.name}
                  </Link>
                  <button
                    aria-label="Product collections"
                    aria-expanded={dropdown}
                    aria-controls="product-menu"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <ChevronDown size={12} />
                  </button>
                </div>
                {dropdown && (
                  <div
                    id="product-menu"
                    className="mega-menu"
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("a"))
                        setDropdown(false);
                    }}
                  >
                    <div>
                      <p className="eyebrow">OUR DIFFUSERS</p>
                      {products.map((p) => (
                        <Link key={p.slug} href={`/products/${p.slug}`}>
                          {p.name}
                          <ArrowUpRight size={14} />
                        </Link>
                      ))}
                      <Link href="/products">Explore all products →</Link>
                    </div>
                    <div>
                      <p className="eyebrow">FRAGRANCE OILS</p>
                      {oilFragrances.map((f) => (
                        <Link key={f.slug} href={`/fragrances/${f.slug}`}>
                          {f.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mega-feature">
                      <Image
                        src="/images/tower-pair.webp"
                        alt="Tower Series in black and silver"
                        width={220}
                        height={220}
                      />
                      <p>A signature for your space.</p>
                      <Link href="/products/fragrance-diffusers">
                        Browse collections →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={active(link.href) ? "active" : ""}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ),
          )}
        </nav>
        <div className="header-contact">
          <a href={callUrl} className="header-phone">
            <span>
              <Phone size={15} />
            </span>
            {business.phone}
          </a>
          <Link href="/contact" className="button button-pink button-small">
            <span className="button-label">Get in Touch</span>
          </Link>
        </div>
        <button
          ref={menuRef}
          className="mobile-toggle"
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          aria-controls="mobile-nav"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <X /> : <Menu />}
        </button>
      </div>
      {mobile && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMobile(false);
          }}
        >
          {links.map((link) =>
            link.href === "/products" ? (
              <details key={link.href}>
                <summary>
                  Products
                  <ChevronDown size={18} />
                </summary>
                <Link href="/products">All products</Link>
                {categories.map((c) => (
                  <Link key={c.slug} href={`/products/${c.slug}`}>
                    {c.name}
                  </Link>
                ))}
                <Link href="/products/tower-series">Tower Series</Link>
              </details>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.name}
                <ArrowUpRight size={18} />
              </Link>
            ),
          )}
          <a href={callUrl} className="mobile-nav-call">
            <Phone size={19} />
            {business.phone}
          </a>
          <Link href="/contact" className="button button-pink mobile-nav-cta">
            <span className="button-label">Get in Touch</span>
          </Link>
          <p>Thoughtful scenting. Beautiful spaces.</p>
        </nav>
      )}
    </header>
  );
}
