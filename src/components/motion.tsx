"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const COUNT_DURATION_MS = 1600;

/** Animates a number from 0 to the element's data-count value. */
function countUp(el: HTMLElement): void {
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return;
  const start = performance.now();
  const format = new Intl.NumberFormat("en-IN");
  const tick = (now: number) => {
    const t = Math.min((now - start) / COUNT_DURATION_MS, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = format.format(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * Site-wide motion: reveal-on-scroll (.reveal), count-up ([data-count]),
 * and scroll-linked progress (--progress on [data-scroll]) used by CSS for
 * parallax "move" and "zoom" effects. Disabled when reduced motion is preferred.
 */
export default function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    if (reduced) {
      reveals.forEach((el) => el.classList.add("is-visible"));
      counters.forEach((el) => {
        el.textContent = new Intl.NumberFormat("en-IN").format(Number(el.dataset.count));
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const countObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          countUp(entry.target as HTMLElement);
          countObserver.unobserve(entry.target);
        }),
      { threshold: 0.6 },
    );
    counters.forEach((el) => countObserver.observe(el));

    const scrollers = [...document.querySelectorAll<HTMLElement>("[data-scroll]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of scrollers) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) continue;
        // 0 when the element enters at the bottom, 1 when it leaves at the top.
        const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        el.style.setProperty("--progress", progress.toFixed(4));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);
  return null;
}
