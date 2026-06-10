"use client";

import { useState } from "react";
import Image from "next/image";
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
  floors: FloorPlan[];
}

const UNITS: UnitType[] = [
  {
    name: "Prime",
    usableArea: "448 SQ.M",
    landArea: "95.2 - 96.9 SQ.WAH",
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
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const unit = units[currentUnit];

  const hv = headingVisible ? "reveal--visible" : "";
  const cv = contentVisible ? "reveal--visible" : "";

  const handleUnitChange = (index: number) => {
    if (index < 0 || index >= units.length) return;
    setCurrentUnit(index);
  };

  if (!unit) return null;

  return (
    <section id="unit" className="bg-secondary py-14 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 lg:mb-16">
          <h2
            className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase mb-8 reveal reveal-delay-1 ${hv}`}
          >
            Unit Type
          </h2>
        </div>

        {/* Unit selector + specs bar */}
        <div
          ref={contentRef}
          className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 lg:mb-14 reveal ${cv}`}
        >
          {/* Unit name + nav */}
          <div className="flex items-center gap-4">
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

            <h3 className="font-display text-2xl lg:text-4xl tracking-[0.15em] text-accent uppercase">
              {unit.name}
            </h3>

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

          {/* Specs */}
          <div className="flex gap-6 lg:gap-10 font-body text-sm text-brown-500 tracking-[0.05em]">
            <div>
              <span className="text-brown-400 text-xs uppercase tracking-[0.1em]">
                Usable Area
              </span>
              <p className="text-brown-800 font-semibold mt-0.5">
                {unit.usableArea}
              </p>
            </div>
            <div>
              <span className="text-brown-400 text-xs uppercase tracking-[0.1em]">
                Land Area
              </span>
              <p className="text-brown-800 font-semibold mt-0.5">
                {unit.landArea}
              </p>
            </div>
          </div>
        </div>

        {/* Dot Indicators */}
        {units.length > 1 && (
          <div className="flex justify-center gap-2 mb-10 lg:mb-14">
            {units.map((_, i) => (
              <button
                key={i}
                onClick={() => handleUnitChange(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                  i === currentUnit ? "bg-brown-800" : "bg-brown-300"
                }`}
                aria-label={`Go to ${units[i].name}`}
              />
            ))}
          </div>
        )}

        {/* Floor plans — 1F large, 2F + 3F side by side */}
        <div className="space-y-10 lg:space-y-14">
          {/* 1st Floor — full width */}
          {unit.floors[0] && (
            <FloorCard floor={unit.floors[0]} visible={cv} index={0} />
          )}

          {/* 2nd + 3rd Floor — side by side on desktop */}
          {unit.floors.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {unit.floors.slice(1).map((floor, i) => (
                <FloorCard
                  key={floor.label}
                  floor={floor}
                  visible={cv}
                  index={i + 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FloorCard({
  floor,
  visible,
  index,
}: {
  floor: FloorPlan;
  visible: string;
  index: number;
}) {
  return (
    <div
      className={`reveal ${visible}`}
      style={{ transitionDelay: `${0.15 + index * 0.12}s` }}
    >
      {/* Floor plan image */}
      <div className="relative aspect-[4/3] mb-6">
        <Image
          src={floor.src}
          alt={floor.label}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
        />
      </div>

      {/* Floor label */}
      <h4 className="font-display text-xl lg:text-2xl tracking-[0.15em] text-accent mb-3">
        {floor.label}
      </h4>

      {/* Room list */}
      <ul className="columns-2 gap-x-8 font-body text-sm text-brown-500 leading-relaxed">
        {floor.rooms.map((room) => (
          <li key={room} className="break-inside-avoid mb-1">
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}
