"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const COUNT_DURATION_MS = 1600;
const MAX_TILT_DEG = 5;

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

/** Pointer-driven tilt and light spot for [data-tilt] cards (mouse, pen and touch). */
function setupTilt(): () => void {
  let active: HTMLElement | null = null;
  const reset = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove("is-pressed");
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };
  const move = (event: PointerEvent) => {
    const el = (event.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
    if (el !== active) {
      reset(active);
      active = el;
    }
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    if (event.pointerType === "mouse") {
      el.style.setProperty("--rx", `${((0.5 - y) * MAX_TILT_DEG).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${((x - 0.5) * MAX_TILT_DEG).toFixed(2)}deg`);
    }
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType === "mouse") return;
    move(event);
    active?.classList.add("is-pressed");
  };
  const up = () => active?.classList.remove("is-pressed");
  const leave = () => {
    reset(active);
    active = null;
  };
  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerdown", down, { passive: true });
  document.addEventListener("pointerup", up, { passive: true });
  document.addEventListener("pointercancel", leave, { passive: true });
  document.documentElement.addEventListener("pointerleave", leave);
  return () => {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerdown", down);
    document.removeEventListener("pointerup", up);
    document.removeEventListener("pointercancel", leave);
    document.documentElement.removeEventListener("pointerleave", leave);
  };
}

/**
 * Site-wide motion: reveal-on-scroll (.reveal), count-up ([data-count]),
 * scroll-linked progress (--progress on [data-scroll]) used by CSS for
 * zoom/move effects, and pointer tilt on cards. Reduced motion disables
 * everything except final states.
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
      document.documentElement.classList.toggle("is-past-hero", window.scrollY > vh * 0.6);
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
    const cleanupTilt = setupTilt();
    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      cleanupTilt();
    };
  }, [pathname]);
  return null;
}
