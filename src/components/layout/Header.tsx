"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Link from "next/link";
import FullLogo from "../ui/FullLogo";

const NAV_LEFT = [
  { label: "PROJECT CONCEPT", href: "#about" },
  { label: "PROJECT INFO", href: "#information" },
  { label: "UNIT TYPE", href: "#unit" },
];

const NAV_RIGHT = [
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT US", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-100 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "bg-accent/95 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Left nav — desktop only */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LEFT.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-[11px] font-normal tracking-[0.2em] text-white/80 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link
            href="#"
            className="flex flex-col items-center justify-center gap-1 lg:absolute lg:left-1/2 lg:-translate-x-1/2 h-full"
            onClick={handleNavClick}
          >
            {/* Wave icon */}
            {/* <Logo width={30} height={10} color="white" />
            <span className="font-display text-white text-xl lg:text-2xl tracking-[0.25em] font-light">
              KAILANI
            </span> */}
            <FullLogo className="text-white h-[60%]" />
          </Link>

          {/* Right nav — desktop only */}
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_RIGHT.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-body text-[11px] font-normal tracking-[0.2em] text-white/80 hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[7.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-white transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-accent/98 backdrop-blur-md transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-8 pt-16">
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-display text-lg tracking-[0.25em] text-white/80 hover:text-gold transition-colors duration-300"
                onClick={handleNavClick}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
