"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type ModalImage = {
  src: string;
  alt: string;
};

type ImageModalProps = {
  images: ModalImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
};

// Wrapper: only mounts the inner content when open
// This avoids setCurrent inside useEffect — fresh mount = fresh useState
export default function ImageModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageModalProps) {
  if (!isOpen || images.length === 0) return null;

  return (
    <ImageModalContent
      key={initialIndex}
      images={images}
      initialIndex={initialIndex}
      onClose={onClose}
    />
  );
}

// Inner component: mounts fresh each time the modal opens
function ImageModalContent({
  images,
  initialIndex,
  onClose,
}: {
  images: ModalImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Trigger fade-in on mount
  useEffect(() => {
    requestAnimationFrame(() => setIsAnimating(true));
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const prev = useCallback(() => {
    setLoaded(false);
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setLoaded(false);
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, handleClose]);

  return (
    <div
      className={`fixed inset-0 z-300 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-950/90 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close modal"
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-warm-300 hover:text-white transition-colors duration-300 cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M2 2L18 18" />
          <path d="M18 2L2 18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-7 left-6 z-10">
        <span className="font-body text-xs tracking-[0.15em] text-warm-400">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Image container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-16 lg:px-24">
        <div
          className={`relative aspect-[16/10] transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
            onLoad={() => setLoaded(true)}
          />
        </div>

        {/* Caption */}
        <p
          className={`text-center font-body text-xs tracking-[0.1em] text-warm-400 mt-4 transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {images[current].alt}
        </p>
      </div>

      {/* Nav arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-warm-400 hover:text-white transition-colors duration-300 cursor-pointer"
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

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center text-warm-400 hover:text-white transition-colors duration-300 cursor-pointer"
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
        </>
      )}
    </div>
  );
}
