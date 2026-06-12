"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { InformationData } from "@/lib/wordpress";
import { Fragment } from "react/jsx-runtime";

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
      className="bg-accent-light py-14 lg:py-0 overflow-hidden"
    >
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 lg:px-0"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 lg:min-h-screen items-stretch">
          {/* Left: Image — bleeds to viewport edge */}
          <div
            className={`relative aspect-[3/4] lg:aspect-auto lg:h-full
    lg:-ml-[var(--bleed-left)]
    lg:w-[calc(100%+var(--bleed-left))]
    reveal-left ${vl}`}
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
              className={`font-display text-2xl lg:text-[2.75rem] tracking-[0.2em] text-accent uppercase mb-10 lg:mb-14 reveal reveal-delay-2 ${v}`}
            >
              Information
            </h2>

            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 lg:gap-y-4">
              {data.details.map((item, index) => (
                <Fragment key={item.label}>
                  <dt
                    className={`font-body text-sm lg:text-[15px] text-accent tracking-[0.02em] reveal ${v}`}
                    style={{ transitionDelay: `${0.25 + index * 0.07}s` }}
                  >
                    {item.label}:
                  </dt>
                  <dd
                    className={`font-body text-sm lg:text-[15px] text-accent/90 tracking-[0.02em] reveal ${v}`}
                    style={{ transitionDelay: `${0.25 + index * 0.07}s` }}
                  >
                    {item.value}
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
