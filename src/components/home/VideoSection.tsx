"use client";

import { useRef, useState } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { VideoData } from "@/lib/wordpress";

export default function VideoSection({ data }: { data: VideoData }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  const sv = isVisible ? "reveal-scale--visible" : "";

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <section
      ref={ref}
      className="relative w-full aspect-[16/9] overflow-hidden bg-brown-900"
    >
      <div className={`absolute inset-0 reveal-scale ${sv}`}>
        <video
          ref={videoRef}
          src={data.videoUrl}
          poster={data.thumbnailUrl}
          controls={playing}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={() => setPlaying(false)}
        />

        {/* Play button overlay */}
        {!playing && (
          <>
            <div className="absolute inset-0 bg-black/20" />
            <button
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center z-10 group cursor-pointer"
            >
              <div className="w-16 h-16 lg:w-28 lg:h-28 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                <svg
                  width="28"
                  height="32"
                  viewBox="0 0 28 32"
                  fill="white"
                  className="ml-1.5"
                >
                  <path d="M28 16L0 32V0L28 16Z" />
                </svg>
              </div>
            </button>
          </>
        )}
      </div>
    </section>
  );
}
