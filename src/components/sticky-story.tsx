"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type StoryStep = {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  text: string;
  studio?: boolean;
};

/** Sticky visual that swaps and zooms as each text step scrolls past it. */
export default function StickyStory({ steps }: { steps: StoryStep[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="story">
      <div className="story-visual">
        <div className="story-frame">
          {steps.map((s, i) => (
            <Image
              key={s.image}
              src={`/images/${s.image}.webp`}
              alt={i === active ? s.alt : ""}
              fill
              sizes="(max-width: 860px) 92vw, 46vw"
              className={`${i === active ? "is-active" : ""} ${s.studio ? "is-studio" : ""}`}
            />
          ))}
          <span className="story-count" aria-hidden="true">
            0{active + 1} <i>/ 0{steps.length}</i>
          </span>
        </div>
      </div>
      <ol className="story-steps">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={i === active ? "is-active" : ""}
          >
            <p className="eyebrow">{s.eyebrow}</p>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
