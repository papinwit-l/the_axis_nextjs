"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// Replace these with your actual banner images
const SLIDES = [
  // {
  //   src: "/images/banner/banner-01.jpg",
  //   alt: "Kailani luxury pool villa exterior view",
  // },
  {
    src: "/images/banner/banner-image-01.png",
    mobileSrc: "/images/banner/banner-image-mobile-01.png",
    alt: "banner-01",
  },
  {
    src: "/images/banner/banner-image-02.png",
    mobileSrc: "/images/banner/banner-image-mobile-02.png",
    alt: "banner-02",
  },
  {
    src: "/images/banner/banner-image-03.png",
    mobileSrc: "/images/banner/banner-image-mobile-03.png",
    alt: "banner-03",
  },
];

const AUTO_PLAY_INTERVAL = 6000;

type BannerSlide = {
  src: string;
  mobileSrc: string;
  alt: string;
};

// export default function BannerSection({slides = SLIDES,}: {slides: BannerSlide[];}) {
export default function BannerSection() {
  const slides = SLIDES;
  // console.log(slides);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  }, [current, goTo, slides.length]);

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  }, [current, goTo, slides.length]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[70dvh] lg:h-dvh overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Desktop */}
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover hidden lg:block"
            priority={index === 0}
            sizes="(max-width: 1023px) 0px, 100vw"
          />
          {/* Mobile */}
          <Image
            src={slide.mobileSrc}
            alt={slide.alt}
            fill
            className="object-cover block lg:hidden"
            priority={index === 0}
            sizes="(max-width: 1023px) 100vw, 0px"
          />
        </div>
      ))}

      {/* Subtle dark overlay for header readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/30 via-transparent to-black/10 pointer-events-none" />

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        <svg
          width="16"
          height="28"
          viewBox="0 0 24 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lg:w-6 lg:h-10"
        >
          <path d="M20 2L4 20L20 38" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        <svg
          width="16"
          height="28"
          viewBox="0 0 24 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lg:w-6 lg:h-10"
        >
          <path d="M4 2L20 20L4 38" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 lg:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
              index === current
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
