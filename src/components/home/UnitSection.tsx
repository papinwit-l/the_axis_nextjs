"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../ui/Logo";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { UnitTypeData } from "@/lib/wordpress";

interface UnitType {
  name: string;
  bedrooms: number;
  bathrooms: number;
  carparks: number;
  floors: { src: string; label: string }[];
  rooms: { no: number; name: string }[];
}

const UNITS: UnitType[] = [
  {
    name: "Type A",
    bedrooms: 4,
    bathrooms: 5,
    carparks: 3,
    floors: [
      { src: "/images/unit/type-a-1f.png", label: "1st Floor Plan" },
      { src: "/images/unit/type-a-2f.png", label: "2nd Floor Plan" },
    ],
    rooms: [
      { no: 1, name: "Carpark" },
      { no: 2, name: "Foyer" },
      { no: 3, name: "Living Room" },
      { no: 4, name: "Dining Room" },
      { no: 5, name: "Kitchen" },
      { no: 6, name: "Powder Room" },
      { no: 7, name: "Storage" },
      { no: 8, name: "Bedroom 1" },
      { no: 9, name: "Bathroom 1" },
      { no: 10, name: "Terrace" },
      { no: 11, name: "Pool" },
      { no: 12, name: "Backyard" },
      { no: 13, name: "Laundry" },
      { no: 14, name: "Stairs" },
      { no: 15, name: "Bedroom 2" },
      { no: 16, name: "Bathroom 2" },
      { no: 17, name: "Bedroom 3" },
      { no: 18, name: "Bathroom 3" },
      { no: 19, name: "Master Bedroom" },
      { no: 20, name: "Walk In Closet" },
      { no: 21, name: "Bathroom 4" },
      { no: 22, name: "Storage" },
      { no: 23, name: "Terrace" },
      { no: 24, name: "Terrace (Bedroom 3)" },
    ],
  },
  {
    name: "Type B",
    bedrooms: 5,
    bathrooms: 6,
    carparks: 4,
    floors: [
      { src: "/images/unit/type-b-1f.png", label: "1st Floor Plan" },
      { src: "/images/unit/type-b-2f.png", label: "2nd Floor Plan" },
    ],
    rooms: [
      { no: 1, name: "Carpark" },
      { no: 2, name: "Foyer" },
      { no: 3, name: "Living Room" },
      { no: 4, name: "Dining Room" },
      { no: 5, name: "Kitchen" },
      { no: 6, name: "Powder Room" },
      { no: 7, name: "Storage" },
      { no: 8, name: "Bedroom 1" },
      { no: 9, name: "Bathroom 1" },
      { no: 10, name: "Terrace" },
      { no: 11, name: "Pool" },
      { no: 12, name: "Backyard" },
      { no: 13, name: "Laundry" },
      { no: 14, name: "Stairs" },
      { no: 15, name: "Bedroom 2" },
      { no: 16, name: "Bathroom 2" },
      { no: 17, name: "Master bedroom" },
      { no: 18, name: "Walk In Closet" },
      { no: 19, name: "Master bathroom" },
      { no: 20, name: "Bedroom 4" },
      { no: 21, name: "Bathroom 4" },
      { no: 22, name: "Bedtoom 5" },
      { no: 23, name: "Bathroom 5" },
      { no: 24, name: "Terrace" },
      { no: 25, name: "Terrace (Bedroom 5)" },
    ],
  },
];

// export default function UnitSection({ units }: { units: UnitTypeData[] }) {
export default function UnitSection() {
  const units = UNITS;
  const [currentUnit, setCurrentUnit] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: plansRef, isVisible: plansVisible } = useScrollReveal();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollReveal();

  const unit = units[currentUnit];

  const hv = headingVisible ? "reveal--visible" : "";
  const pv = plansVisible ? "reveal-scale--visible" : "";
  const dv = detailsVisible ? "reveal--visible" : "";

  const handleUnitChange = (index: number) => {
    if (index < 0 || index >= units.length) return;
    setCurrentUnit(index);
  };

  if (!unit) return null;

  return (
    <section id="unit" className="bg-secondary py-14 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8 lg:mb-16">
          {/* <Logo className={`mx-auto mb-2 h-3 text-brown-800 reveal ${hv}`} /> */}
          <h2
            className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase mb-8 reveal reveal-delay-1 ${hv}`}
          >
            Unit Type
          </h2>
        </div>

        {/* Floor plans with arrows */}
        <div ref={plansRef} className="relative">
          {/* Left arrow */}
          {units.length > 1 && (
            <button
              aria-label="Previous unit"
              className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit - 1)}
              disabled={currentUnit === 0}
            >
              <svg
                width="16"
                height="28"
                viewBox="0 0 16 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2L2 14L14 26" />
              </svg>
            </button>
          )}

          {/* Floor plan images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 px-2 lg:px-12">
            {unit.floors.map((floor, index) => (
              <div
                key={floor.label}
                className={`reveal-scale ${pv}`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={floor.src}
                    alt={floor.label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <p className="font-body text-sm text-brown-500 text-center mt-4">
                  {floor.label}
                </p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          {units.length > 1 && (
            <button
              aria-label="Next unit"
              className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-brown-400 hover:text-brown-800 transition-colors duration-300 cursor-pointer disabled:opacity-30"
              onClick={() => handleUnitChange(currentUnit + 1)}
              disabled={currentUnit === units.length - 1}
            >
              <svg
                width="16"
                height="28"
                viewBox="0 0 16 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 2L14 14L2 26" />
              </svg>
            </button>
          )}
        </div>

        {/* Dot Indicators */}
        {units.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {units.map((_, i) => (
              <button
                key={i}
                onClick={() => handleUnitChange(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  i === currentUnit ? "bg-brown-800" : "bg-brown-300"
                }`}
                aria-label={`Go to unit ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Gold divider */}
        <hr className="border-gold/50 mt-6 lg:mt-10 mb-6 lg:mb-8" />

        {/* Unit specs + Room legend */}
        <div
          ref={detailsRef}
          className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-16"
        >
          {/* Left: Type specs */}
          <div className={`shrink-0 reveal ${dv}`}>
            <h3 className="font-display text-xl lg:text-3xl tracking-[0.1em] text-brown-800 mb-3">
              {unit.name}
            </h3>
            <ul className="font-body text-sm text-brown-600 flex gap-4 lg:flex-col lg:gap-1 lg:space-y-0">
              <li>{unit.bedrooms} Bedrooms</li>
              <li className="lg:hidden text-brown-300">·</li>
              <li>{unit.bathrooms} Bathrooms</li>
              <li className="lg:hidden text-brown-300">·</li>
              <li>{unit.carparks} Carparks</li>
            </ul>
          </div>

          {/* Right: Room legend */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-x-10">
            {/* <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-1.5"
            style={{
              gridAutoFlow: "column",
              gridTemplateRows: `repeat(${Math.ceil(unit.rooms.length / 4)}, auto)`,
            }}
          > */}
            {unit.rooms.map((room) => (
              <div
                key={room.no}
                className={`flex items-baseline gap-2 mb-1.5 break-inside-avoid reveal ${dv}`}
                style={{ transitionDelay: `${0.1 + room.no * 0.03}s` }}
              >
                <span className="font-body text-xs text-brown-400 w-5 text-right shrink-0">
                  {room.no}.
                </span>
                <span className="font-body text-xs text-brown-600">
                  {room.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
