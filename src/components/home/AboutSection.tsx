"use client";

import useScrollReveal from "@/hooks/useScrollReveal";
import Logo from "../ui/Logo";
import type { AboutData } from "@/lib/wordpress";
import React from "react";

export default function AboutSection({ data }: { data: AboutData }) {
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";

  return (
    <section id="about" className="bg-white py-14 lg:py-32">
      <div
        ref={ref}
        className="max-w-full lg:max-w-[70vw] mx-auto px-6 lg:px-10 text-center"
      >
        {/* Wave icon */}
        {/* <Logo className={`mx-auto mb-5 lg:mb-8 h-3 text-accent reveal ${v}`} /> */}

        {/* Heading */}
        {/* <h2
          className={`font-display text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.25] tracking-[0.1em] text-accent uppercase mb-10 lg:mb-14 reveal reveal-delay-1 ${v}`}
        >
          {data.heading}
        </h2> */}
        <h2
          className={`font-display text-2xl md:text-4xl lg:text-[2.75rem] leading-[1.3] tracking-[0.08em] md:tracking-[0.1em] text-accent uppercase mb-8 lg:mb-14 reveal reveal-delay-1 ${v}`}
        >
          {data.heading.map((heading, index) => (
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

        {/* Description */}
        <div className="space-y-4">
          {data.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`font-body text-sm lg:text-base text-accent leading-relaxed reveal reveal-delay-${index + 2} ${v}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
