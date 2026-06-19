"use client";

import { useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import { getDictionary } from "@/i18n";
import { UnitTypeData } from "@/lib/wordpress";

export default function UnitSection({
  units,
  lang,
}: {
  units: UnitTypeData[];
  lang: string;
}) {
  const t = getDictionary(lang);

  const [currentUnit, setCurrentUnit] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal();
  const { ref: plansRef, isVisible: plansVisible } = useScrollReveal();

  const unit = units[currentUnit];

  const hv = headingVisible ? "reveal--visible" : "";
  const hev = heroVisible ? "reveal-scale--visible" : "";
  const pv = plansVisible ? "reveal--visible" : "";

  const handleUnitChange = (index: number) => {
    if (index < 0 || index >= units.length) return;
    setCurrentUnit(index);
  };

  if (!unit) return null;

  return (
    <section
      id="unit"
      className="bg-secondary py-14 lg:py-28 bg-[url('/images/bg-image-white.jpg')] bg-repeat"
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-10">
          {t.unit.subHeading && <p>{t.unit.subHeading}</p>}
          <h2
            className={`${lang == "th" ? "font-body" : "font-display tracking-[0.15em]"} text-3xl lg:text-4xl text-accent uppercase reveal reveal-delay-1 ${hv}`}
          >
            {t.unit.heading}
          </h2>
        </div>

        <div
          className={`flex items-center justify-center gap-6 mb-10 lg:mb-14 reveal ${hv}`}
        >
          {units.length > 1 &&
            units.map((u, i) => (
              <button
                key={u.name}
                onClick={() => handleUnitChange(i)}
                className={`font-display text-lg lg:text-xl tracking-[0.15em] uppercase transition-colors duration-300 cursor-pointer ${
                  i === currentUnit
                    ? "text-accent"
                    : "text-brown-300 hover:text-brown-500"
                }`}
              >
                {u.name}
              </button>
            ))}
        </div>

        {/* Unit nav — arrows overlay on hero */}
        {units.length > 1 && (
          <div
            ref={heroRef}
            className={`relative mb-12 lg:mb-20 reveal-scale ${hev}`}
          >
            {/* Hero image */}
            <div className="relative aspect-[16/9]">
              <Image
                src={unit.heroImage}
                alt={unit.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 100vw"
              />
            </div>

            {/* Specs bar */}
            <div className="bg-accent/85 backdrop-blur-sm px-6 lg:px-10 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="font-display text-2xl lg:text-3xl tracking-[0.2em] text-secondary uppercase">
                {unit.name}
              </h3>
              <div className="flex gap-8 font-body text-sm">
                <div>
                  <span className="text-warm-400 text-xs uppercase tracking-[0.1em]">
                    {t.unit.usableArea}
                  </span>
                  <p className="text-secondary font-semibold mt-0.5">
                    {unit.usableArea}
                  </p>
                </div>
                <div>
                  <span className="text-warm-400 text-xs uppercase tracking-[0.1em]">
                    {t.unit.landArea}
                  </span>
                  <p className="text-secondary font-semibold mt-0.5">
                    {unit.landArea}
                  </p>
                </div>
              </div>
            </div>

            {/* Prev arrow */}
            <button
              aria-label="Previous unit"
              className="absolute left-2 lg:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center bg-accent/60 lg:bg-transparent rounded-full text-white lg:text-brown-400 hover:text-brown-800 hover:bg-accent/80 lg:hover:bg-transparent transition-all duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit - 1)}
              disabled={currentUnit === 0}
            >
              <svg
                viewBox="0 0 26 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-6 lg:w-14 lg:h-14"
              >
                <path
                  d="M0.376305 34.1962L23.1422 65.5836C23.3841 65.8995 23.6798 66.0751 24.0292 66.0751C24.728 66.0751 25.2925 65.338 25.2925 64.4251C25.2925 63.9687 25.1581 63.5475 24.9162 63.2667L2.98349 33.0378L24.9162 2.80847C25.1581 2.49249 25.2925 2.10644 25.2925 1.65003C25.2925 0.737188 24.728 0 24.0292 0C23.6798 0 23.3572 0.175597 23.1422 0.491579L0.376305 31.8789C0.1344 32.1949 0 32.5814 0 33.0378C0 33.4942 0.1344 33.9154 0.376305 34.1962Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            {/* Next arrow */}
            <button
              aria-label="Next unit"
              className="absolute right-2 lg:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center bg-accent/60 lg:bg-transparent rounded-full text-white lg:text-brown-400 hover:text-brown-800 hover:bg-accent/80 lg:hover:bg-transparent transition-all duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit + 1)}
              disabled={currentUnit === units.length - 1}
            >
              <svg
                viewBox="0 0 26 67"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-6 lg:w-14 lg:h-14"
              >
                <path
                  d="M24.9163 31.8789L2.15024 0.491579C1.90833 0.175597 1.61279 0 1.26337 0C0.564531 0 0 0.737188 0 1.65003C0 2.10644 0.134431 2.5276 0.376337 2.80847L22.309 33.0378L0.376337 63.2667C0.134431 63.5827 0 63.9687 0 64.4251C0 65.338 0.564531 66.0751 1.26337 66.0751C1.61279 66.0751 1.93521 65.8995 2.15024 65.5836L24.9163 34.1962C25.1582 33.8802 25.2925 33.4942 25.2925 33.0378C25.2925 32.5814 25.1582 32.1598 24.9163 31.8789Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )}

        {/* ===== Floor plans ===== */}
        {/* ===== Floor plans — equal 3-column grid ===== */}
        <div
          ref={plansRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {unit.floors.map((floor, i) => (
            <div
              key={floor.label}
              className={`reveal ${pv}`}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="relative aspect-square mb-5">
                {/* <MockImage
                  text={floor.label}
                  className="bg-warm-200 border border-dashed border-brown-300"
                /> */}
                <Image
                  src={floor.src}
                  alt={floor.label}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
                />
              </div>
              <div className="w-fit mx-auto text-center">
                <h4
                  className={`${lang == "th" ? "font-body" : "font-display tracking-[0.15em]"} text-lg lg:text-xl text-accent mb-3`}
                >
                  {floor.label}
                </h4>
                <ul className="font-body text-sm text-brown-500 leading-loose">
                  {floor.rooms.map((room) => (
                    <li key={room}>{room}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
