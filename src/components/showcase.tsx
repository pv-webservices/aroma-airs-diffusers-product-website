"use client";
import { useEffect, useRef } from "react";

/**
 * Sticky horizontal showcase: while the section is pinned, vertical scrolling
 * moves the card track sideways. Falls back to a native swipe rail when motion
 * is reduced or the track already fits on screen.
 */
export default function Showcase({
  heading,
  children,
  id,
}: {
  heading: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = outer.current;
    const rail = track.current;
    if (!section || !rail) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let distance = 0;
    let frame = 0;

    const measure = () => {
      distance = Math.max(rail.scrollWidth - window.innerWidth, 0);
      const pinned = !reduced && distance > 40;
      section.classList.toggle("is-pinned", pinned);
      section.style.height = pinned ? `${distance + window.innerHeight}px` : "";
      if (!pinned) rail.style.transform = "";
      update();
    };
    const update = () => {
      frame = 0;
      if (!section.classList.contains("is-pinned")) return;
      const rect = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0;
      rail.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px,0,0)`;
      bar.current?.style.setProperty("--p", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="showcase" ref={outer} id={id}>
      <div className="showcase-sticky">
        <div className="container showcase-head">
          {heading}
          <span className="showcase-progress" aria-hidden="true">
            <span ref={bar} />
          </span>
        </div>
        <div className="showcase-viewport">
          <div className="showcase-track" ref={track}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
