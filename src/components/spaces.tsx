"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { applications } from "@/lib/data";
import { AppIcon } from "./ui";

/** Expanding panels: hover, focus or tap a space to open it. */
export default function Spaces() {
  const [active, setActive] = useState(0);
  return (
    <div className="spaces" role="list">
      {applications.map((a, i) => (
        <article
          role="listitem"
          key={a.slug}
          className={`space ${i === active ? "is-open" : ""}`}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <Image
            src={`/images/${a.image}.webp`}
            alt={`${a.name} interior inspiration`}
            fill
            sizes="(max-width: 860px) 92vw, 40vw"
          />
          <div className="space-body">
            <span className="space-icon">
              <AppIcon name={a.icon} />
            </span>
            <h3>{a.name}</h3>
            <div className="space-more">
              <p>{a.description}</p>
              <a href={`/applications#${a.slug}`}>
                Explore this space <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
