"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import { MasterPlanData } from "@/lib/wordpress/master-plan";

export default function MasterPlanSection({
  lang,
  data,
}: {
  lang: string;
  data: MasterPlanData;
}) {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section className="bg-primary py-14 lg:py-28">
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10"
      >
        <h2
          className={`${lang == "th" ? `font-body` : `font-display tracking-[0.15em]`} text-3xl lg:text-4xl text-accent uppercase text-center mb-10 lg:mb-16 reveal ${v}`}
        >
          {data.heading}
        </h2>
        <div
          className={`relative aspect-[16/10] reveal-scale ${isVisible ? "reveal-scale--visible" : ""}`}
        >
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </div>
    </section>
  );
}
