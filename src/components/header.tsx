"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { business, callUrl, categories, products, whatsapp } from "@/lib/data";
import { WhatsAppIcon } from "./ui";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Fragrances", href: "/fragrances" },
  { name: "Applications", href: "/applications" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    const fn = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4 || y <= 480) setHidden(false);
      last = y;
    };
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
      if (window.innerWidth > 1080) setMobile(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    if (!mobile) return;
    const elements = [...document.querySelectorAll<HTMLElement>("main, footer, .mobile-contact-bar")];
    const previous = elements.map((el) => el.inert);
    elements.forEach((el) => {
      el.inert = true;
    });
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        menuRef.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = headerRef.current?.querySelectorAll<HTMLElement>("a[href], button, summary");
        const list = [...(nodes || [])].filter((n) => n.getClientRects().length);
        const first = list[0];
        const last = list[list.length - 1];
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
      elements.forEach((el, index) => {
        el.inert = previous[index];
      });
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

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${hidden && !mobile && !dropdown ? "is-hidden" : ""} ${mobile ? "is-open" : ""}`}
    >
      <div className="container header-inner">
        <Link href="/" className="logo-link" aria-label="Aroma Airs — Home">
          <Image
            src="/logo.webp"
            alt="Aroma Airs Fragrance Solutions"
            width={516}
            height={360}
            sizes="110px"
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
                onMouseEnter={() => setDropdown(true)}
                onMouseLeave={() => setDropdown(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setDropdown(false);
                    (e.currentTarget.querySelector("button") as HTMLButtonElement)?.focus();
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdown(false);
                }}
              >
                <Link
                  href={link.href}
                  className={`nav-link ${active(link.href) ? "is-active" : ""}`}
                  aria-current={active(link.href) ? "page" : undefined}
                >
                  {link.name}
                </Link>
                <button
                  className="nav-caret"
                  aria-label="Product collections"
                  aria-expanded={dropdown}
                  aria-controls="product-menu"
                  onClick={() => setDropdown(!dropdown)}
                >
                  <ChevronDown size={14} />
                </button>
                <div
                  id="product-menu"
                  className={`mega ${dropdown ? "is-open" : ""}`}
                  hidden={!dropdown}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) setDropdown(false);
                  }}
                >
                  <div className="mega-products">
                    <p className="eyebrow">Our diffusers</p>
                    <div className="mega-grid">
                      {products.map((p) => (
                        <Link key={p.slug} href={`/products/${p.slug}`} className="mega-item">
                          <span className="mega-thumb">
                            <Image src={`/images/${p.image}.webp`} alt="" width={64} height={80} />
                          </span>
                          <span>
                            <strong>{p.name}</strong>
                            <small>{p.label}</small>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="mega-side">
                    <p className="eyebrow">Collections</p>
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/products/${c.slug}`}>
                        {c.name}
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                    <Link href="/products" className="mega-all">
                      Explore all products →
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active(link.href) ? "is-active" : ""}`}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ),
          )}
        </nav>
        <div className="header-actions">
          <a href={callUrl} className="header-phone" aria-label={`Call ${business.phone}`}>
            <Phone size={16} />
            <span>{business.phone}</span>
          </a>
          <Link href="/contact" className="btn btn-primary btn-small header-cta">
            <span className="btn-label">Get in Touch</span>
          </Link>
          <button
            ref={menuRef}
            className="menu-toggle"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
          <div className="mobile-nav-links">
            {links.map((link, i) =>
              link.href === "/products" ? (
                <details key={link.href} style={{ "--i": i } as React.CSSProperties}>
                  <summary>
                    Products
                    <ChevronDown size={20} />
                  </summary>
                  <div className="mobile-sub">
                    <Link href="/products">All products</Link>
                    {categories.map((c) => (
                      <Link key={c.slug} href={`/products/${c.slug}`}>
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{ "--i": i } as React.CSSProperties}
                  aria-current={active(link.href) ? "page" : undefined}
                >
                  {link.name}
                  <ArrowUpRight size={20} />
                </Link>
              ),
            )}
          </div>
          <div className="mobile-nav-foot">
            <a href={callUrl} className="btn btn-outline">
              <span className="btn-label">
                <Phone size={17} /> {business.phone}
              </span>
            </a>
            <a href={whatsapp()} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
              <span className="btn-label">
                <WhatsAppIcon /> WhatsApp
              </span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
