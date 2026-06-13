"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import type { AboutData } from "@/lib/wordpress";
import React from "react";
import { WPContent } from "../ui/WPRender";

export default function AboutSection({ data }: { data: AboutData }) {
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";

  return (
    <section
      id="about"
      className="bg-white py-14 lg:py-32 bg-[url('/images/bg-image-white.jpg')] bg-repeat"
    >
      <div
        ref={ref}
        className="max-w-full lg:max-w-[70vw] mx-auto px-6 lg:px-10 text-center"
      >
        {/* Heading */}
        <h2
          className={`font-display text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.3] tracking-[0.08em] md:tracking-[0.1em] text-accent uppercase mb-8 lg:mb-14 reveal reveal-delay-1 ${v}`}
        >
          {data.heading.map((heading: string, index: number) => (
            <React.Fragment key={index}>
              <span className="inline-block">{heading}</span>
              {index !== data.heading.length - 1 && (
                <br className="hidden md:inline" />
              )}
              {index !== data.heading.length - 1 && (
                <span className="md:hidden"> </span>
              )}
            </React.Fragment>
          ))}
        </h2>

        {/* Description — WordPress WYSIWYG */}
        <WPContent className={`prose-about reveal reveal-delay-2 ${v}`}>
          {data.description}
        </WPContent>
      </div>
    </section>
  );
}
