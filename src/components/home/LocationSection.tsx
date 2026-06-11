"use client";

import { useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { LocationData, ContactData } from "@/lib/wordpress";

type MapView = "graphic" | "google";

export default function LocationSection({
  location,
  contact,
}: {
  location: LocationData;
  contact: ContactData;
}) {
  const [mapView, setMapView] = useState<MapView>("graphic");
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: infoRef, isVisible: infoVisible } = useScrollReveal();

  const hv = headingVisible ? "reveal--visible" : "";
  const mv = mapVisible ? "reveal-scale--visible" : "";
  const iv = infoVisible ? "reveal--visible" : "";

  return (
    <section id="location" className="bg-secondary py-20 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-6 lg:mb-8">
          <h2
            className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase mb-6 reveal reveal-delay-1 ${hv}`}
          >
            Location
          </h2>
          {location.description && (
            <p
              className={`font-body text-sm lg:text-base text-accent/70 tracking-[0.02em] leading-relaxed max-w-[var(--container-text)] mx-auto reveal reveal-delay-2 ${hv}`}
            >
              {location.description}
            </p>
          )}
        </div>

        {/* Map toggle */}
        {location.googleMapsUrl && (
          <div className="flex items-center justify-center gap-2 mb-8 lg:mb-10">
            <button
              onClick={() => setMapView("graphic")}
              className={`font-body text-xs tracking-[0.15em] uppercase px-6 lg:px-8 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                mapView === "graphic"
                  ? "bg-accent text-white"
                  : "bg-transparent text-accent/70 border border-accent/70 hover:text-accent hover:border-accent"
              }`}
            >
              Graphic Map
            </button>
            <button
              onClick={() => setMapView("google")}
              className={`font-body text-xs tracking-[0.15em] uppercase px-6 lg:px-8 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                mapView === "google"
                  ? "bg-accent text-white"
                  : "bg-transparent text-accent/70 border border-accent/70 hover:text-accent hover:border-accent"
              }`}
            >
              Google Map
            </button>
          </div>
        )}

        {/* Map + Distance groups side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Left: Map */}
          <div ref={mapRef} className={`reveal-scale ${mv}`}>
            <div className="relative aspect-[5/4] overflow-hidden">
              {/* Graphic map */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  mapView === "graphic"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={location.mapImage}
                  alt="The Axis Utthayan location map"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>

              {/* Google map */}
              {location.googleMapsUrl && (
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    mapView === "google"
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {mapView === "google" && (
                    <iframe
                      src={location.googleMapsUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="The Axis Utthayan on Google Maps"
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Distance groups */}
          <div ref={infoRef} className="flex flex-col gap-8 lg:gap-10 lg:py-2">
            {/* Address */}
            {/* {contact.address.length > 0 && (
              <div className={`reveal ${iv}`}>
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase text-accent mb-3">
                  Address
                </h3>
                <p className="font-body text-sm text-accent/70 tracking-[0.02em] leading-relaxed">
                  {contact.address.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            )} */}

            {/* Distance groups */}
            {location.distanceGroups.map((group, gi) => (
              <div
                key={group.category}
                className={`reveal ${iv}`}
                style={{ transitionDelay: `${0.1 + gi * 0.1}s` }}
              >
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase text-accent mb-3">
                  {group.category}
                </h3>
                <div className="space-y-1.5">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="font-body text-sm tracking-[0.02em] text-accent/70">
                        {item.label}
                      </span>
                      <span className="font-body text-sm tracking-[0.05em] text-accent shrink-0">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
