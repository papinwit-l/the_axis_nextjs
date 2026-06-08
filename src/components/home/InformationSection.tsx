"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { InformationData } from "@/lib/wordpress";

export default function InformationSection({
  data,
}: {
  data: InformationData;
}) {
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";
  const vl = isVisible ? "reveal-left--visible" : "";
  const vr = isVisible ? "reveal-right--visible" : "";

  return (
    <section
      id="information"
      className="bg-accent py-14 lg:py-0 overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 lg:px-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 lg:min-h-screen items-stretch">
          {/* Left: Image — bleeds to viewport edge */}
          <div
            className={`relative aspect-[3/4] lg:aspect-auto lg:h-full lg:-ml-[calc((100vw-var(--container-max))/2)] lg:w-[calc(100%+(100vw-var(--container-max))/2)] reveal-left ${vl}`}
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Info */}
          <div
            className={`flex flex-col justify-center lg:pl-16 lg:pr-8 lg:py-20 reveal-right ${vr}`}
          >
            <h2
              className={`font-display text-2xl lg:text-[2.75rem] tracking-[0.2em] text-secondary uppercase mb-10 lg:mb-14 reveal reveal-delay-2 ${v}`}
            >
              Information
            </h2>

            <dl className="space-y-3 lg:space-y-4">
              {data.details.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex gap-4 reveal ${v}`}
                  style={{ transitionDelay: `${0.25 + index * 0.07}s` }}
                >
                  <dt className="font-body text-sm lg:text-[15px] text-secondary w-24 shrink-0 tracking-[0.02em]">
                    {item.label}:
                  </dt>
                  <dd className="font-body text-sm lg:text-[15px] text-secondary/90 tracking-[0.02em]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
