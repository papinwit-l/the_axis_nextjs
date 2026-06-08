"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../ui/Logo";
import useScrollReveal from "@/hooks/useScrollReveal";
import {
  FacebookIcon,
  InstagramIcon,
  LineIcon,
  WhatsAppIcon,
} from "../ui/SocialMediaIcon";
import type { LocationData, ContactData, SocialLink } from "@/lib/wordpress";

const SOCIAL_ICON_MAP: Record<
  SocialLink["platform"],
  React.FC<{ className?: string }>
> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  line: LineIcon,
  whatsapp: WhatsAppIcon,
};

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
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const hv = headingVisible ? "reveal--visible" : "";
  const cl = contentVisible ? "reveal-left--visible" : "";
  const cr = contentVisible ? "reveal-right--visible" : "";
  const cv = contentVisible ? "reveal--visible" : "";

  return (
    <section id="location" className="bg-secondary py-20 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <Logo className={`mx-auto mb-2 h-3 text-accent reveal ${hv}`} />
          <h2
            className={`font-display text-3xl lg:text-4xl tracking-[0.15em] text-accent uppercase reveal reveal-delay-1 ${hv}`}
          >
            Location
          </h2>
        </div>

        {/* Map toggle */}
        {location.googleMapsUrl && (
          <div className="flex items-center justify-center gap-2 mb-4">
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

        {/* Map + Info */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Left: Map */}
          <div className={`reveal-left ${cl}`}>
            {/* Map content */}
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
                  alt="Kailani location map"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                      title="Kailani location on Google Maps"
                      className="absolute inset-0 w-full h-full"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Address, Distances, Contact */}
          <div
            className={`flex flex-col mt-2 gap-8 lg:gap-10 lg:py-4 reveal-right ${cr}`}
          >
            {/* Address */}
            {contact.address.length > 0 && (
              <div className={`reveal reveal-delay-1 ${cv}`}>
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase text-accent mb-3">
                  Address
                </h3>
                <p className="font-body text-sm text-accent/70 tracking-[0.1em] leading-relaxed">
                  {contact.address.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Distances */}
            {location.distances.length > 0 && (
              <div className={`reveal reveal-delay-2 ${cv}`}>
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase text-accent mb-3">
                  Distances
                </h3>
                <div className="space-y-1.5">
                  {location.distances.map((d, i) => (
                    <div key={i} className="flex items-baseline gap-3">
                      <span className="font-body text-sm tracking-[0.1em] text-accent w-16 shrink-0">
                        {d.value}
                      </span>
                      <span className="font-body text-sm tracking-[0.1em] text-accent/70">
                        {d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {/* {(contact.phone || contact.email) && (
              <div className={`reveal reveal-delay-3 ${cv}`}>
                <h3 className="font-body text-sm font-bold tracking-[0.1em] uppercase text-accent mb-3">
                  Contact
                </h3>
                <div className="space-y-1.5">
                  {contact.phone && (
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-sm text-brown-400 w-4 shrink-0">
                        T:
                      </span>
                      <a
                        href={`tel:${contact.phone}`}
                        className="font-body text-sm text-brown-600 hover:text-accent transition-colors duration-300"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-baseline gap-3">
                      <span className="font-body text-sm text-brown-400 w-4 shrink-0">
                        E:
                      </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-body text-sm text-brown-600 hover:text-accent transition-colors duration-300"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )} */}

            {/* Social icons — only renders icons with URLs */}

            {/* {contact.socials.length > 0 && (
              <div
                className={`flex items-center gap-4 pt-2 reveal reveal-delay-4 ${cv}`}
              >
                {contact.socials.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      aria-label={social.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-gold transition-colors duration-300"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
