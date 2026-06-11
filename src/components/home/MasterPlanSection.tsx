"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function MasterPlanSection() {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section className="bg-primary py-14 lg:py-28">
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10"
      >
        <h2
          className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase text-center mb-10 lg:mb-16 reveal ${v}`}
        >
          Master Plan
        </h2>
        <div
          className={`relative aspect-[16/10] reveal-scale ${isVisible ? "reveal-scale--visible" : ""}`}
        >
          <Image
            src="/images/master-plan.png"
            alt="The Axis Utthayan master plan — 9 units along Soi Utthayan 6"
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
