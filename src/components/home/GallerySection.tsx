"use client";

import { useState } from "react";
import Image from "next/image";
import Logo from "../ui/Logo";
import ImageModal from "../ui/modals/ImageModal";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { GalleryData } from "@/lib/wordpress";

type Tab = "exterior" | "interior";

export default function GallerySection({ data }: { data: GalleryData }) {
  const [activeTab, setActiveTab] = useState<Tab>("exterior");
  const [tabTransition, setTabTransition] = useState(true);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

  const hv = headingVisible ? "reveal--visible" : "";
  const gv = gridVisible ? "reveal-scale--visible" : "";

  const images = data[activeTab];

  const openImageModal = (index: number) => {
    setImageModalOpen(true);
    setImageModalIndex(index);
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setTabTransition(false);
    setTimeout(() => {
      setActiveTab(tab);
      setTabTransition(true);
    }, 200);
  };

  return (
    <section id="gallery" className="bg-accent-light py-14 lg:py-28">
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8 lg:mb-14">
          {/* <Logo className={`mx-auto mb-2 h-3 text-accent reveal ${hv}`} /> */}
          <h2
            className={`font-display text-2xl lg:text-4xl tracking-[0.15em] text-accent uppercase mb-6 lg:mb-8 reveal reveal-delay-1 ${hv}`}
          >
            Gallery
          </h2>

          {/* Tabs */}
          <div
            className={`flex items-center justify-center gap-10 reveal reveal-delay-2 ${hv}`}
          >
            {(["exterior", "interior"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`font-body text-base lg:text-lg tracking-[0.05em] capitalize pb-1.5 transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? "text-accent border-b-2 border-brown-500 hover:text-accent/80"
                    : "text-accent/80 border-b-2 border-transparent hover:text-accent/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Image grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5 transition-opacity duration-300 ${
            tabTransition ? "opacity-100" : "opacity-0"
          }`}
        >
          {images.map((img, index) => (
            <div
              key={img.src}
              className={`relative aspect-[16/9] overflow-hidden group cursor-pointer reveal-scale ${gv}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
              onClick={() => openImageModal(index)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>

        {/* Image modal */}
        <ImageModal
          images={images}
          initialIndex={imageModalIndex}
          isOpen={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
        />
      </div>
    </section>
  );
}
