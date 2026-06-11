"use client";

import { useState } from "react";
import Image from "next/image";
import MockImage from "../ui/MockImage";
import useScrollReveal from "@/hooks/useScrollReveal";

interface FloorPlan {
  label: string;
  src: string;
  rooms: string[];
}

interface UnitType {
  name: string;
  usableArea: string;
  landArea: string;
  heroImage: string;
  floors: FloorPlan[];
}

const UNITS: UnitType[] = [
  {
    name: "Prime",
    usableArea: "448 SQ.M",
    landArea: "95.2 - 96.9 SQ.WAH",
    heroImage: "/images/unit/prime-hero.png",
    floors: [
      {
        label: "1st Floor",
        src: "/images/unit/prime-1f.png",
        rooms: [
          "Double Volume Living Area",
          "Bedroom 1",
          "Elevator-Ready",
          "Dining Area",
          "Pantry Area",
          "Kitchen Room",
          "Powder Room",
          "3-5 Parking Space",
          "Maid Room",
        ],
      },
      {
        label: "2nd Floor",
        src: "/images/unit/prime-2f.png",
        rooms: ["Master Bedroom 1", "Bedroom 2", "Balcony", "Service Room"],
      },
      {
        label: "3rd Floor",
        src: "/images/unit/prime-3f.png",
        rooms: [
          "Master Bedroom 2",
          "Walk-in Closet",
          "Multi-purpose Room (Tea Room)",
          "Terrace",
        ],
      },
    ],
  },
  {
    name: "Prive",
    usableArea: "336 SQ.M",
    landArea: "64.5 - 75.2 SQ.WAH",
    heroImage: "/images/unit/prive-hero.png",
    floors: [
      {
        label: "1st Floor",
        src: "/images/unit/prive-1f.png",
        rooms: [
          "Double Volume Living & Dining Area",
          "Bedroom 1",
          "Elevator-Ready",
          "Pantry Area",
          "Kitchen Room",
          "Bathroom",
          "3 Parking Space",
          "Maid Room",
        ],
      },
      {
        label: "2nd Floor",
        src: "/images/unit/prive-2f.png",
        rooms: ["Bedroom 2", "Outdoor Terrace"],
      },
      {
        label: "3rd Floor",
        src: "/images/unit/prive-3f.png",
        rooms: ["Bedroom 3", "Master Bedroom", "Flex Space"],
      },
    ],
  },
];

export default function UnitSection() {
  const units = UNITS;
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
    <section id="unit" className="bg-secondary py-14 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-10 lg:mb-16">
          <h2
            className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase reveal reveal-delay-1 ${hv}`}
          >
            Unit Type
          </h2>
        </div>

        {/* Unit nav arrows + dots */}
        {units.length > 1 && (
          <div
            className={`flex items-center justify-center gap-6 mb-10 lg:mb-14 reveal ${hv}`}
          >
            <button
              aria-label="Previous unit"
              className="w-8 h-8 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit - 1)}
              disabled={currentUnit === 0}
            >
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2L2 10L10 18" />
              </svg>
            </button>

            {units.map((u, i) => (
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

            <button
              aria-label="Next unit"
              className="w-8 h-8 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit + 1)}
              disabled={currentUnit === units.length - 1}
            >
              <svg
                width="12"
                height="20"
                viewBox="0 0 12 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 2L10 10L2 18" />
              </svg>
            </button>
          </div>
        )}

        {/* ===== Hero: Exterior image with specs overlay ===== */}
        <div
          ref={heroRef}
          className={`relative mb-12 lg:mb-20 reveal-scale flex flex-col ${hev}`}
        >
          <div className="relative aspect-[16/9] ">
            {/* swap MockImage → Image when assets arrive */}
            {/* <MockImage
              text={`${unit.name} Exterior`}
              className="bg-warm-200 border border-dashed border-brown-300"
            /> */}
            <Image
              src={unit.heroImage}
              alt={unit.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
            />
          </div>

          {/* Specs overlay bar at bottom */}
          {/* <div className="absolute bottom-0 inset-x-0 bg-accent/85 backdrop-blur-sm px-6 lg:px-10 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"> */}
          <div className=" bg-accent/85 backdrop-blur-sm px-6 lg:px-10 py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <h3 className="font-display text-2xl lg:text-3xl tracking-[0.2em] text-secondary uppercase">
              {unit.name}
            </h3>
            <div className="flex gap-8 font-body text-sm">
              <div>
                <span className="text-warm-400 text-xs uppercase tracking-[0.1em]">
                  Usable Area
                </span>
                <p className="text-secondary font-semibold mt-0.5">
                  {unit.usableArea}
                </p>
              </div>
              <div>
                <span className="text-warm-400 text-xs uppercase tracking-[0.1em]">
                  Land Area
                </span>
                <p className="text-secondary font-semibold mt-0.5">
                  {unit.landArea}
                </p>
              </div>
            </div>
          </div>
        </div>

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
              <h4 className="font-display text-lg lg:text-xl tracking-[0.15em] text-accent mb-3">
                {floor.label}
              </h4>
              <ul className="font-body text-sm text-brown-500 leading-loose">
                {floor.rooms.map((room) => (
                  <li key={room}>{room}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
