"use client";

import { useState } from "react";
import Link from "next/link";
import useScrollReveal from "@/hooks/useScrollReveal";
import FullLogo from "../ui/FullLogo";

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Social Media",
  "Friend / Referral",
  "Property Agent",
  "Billboard / Signage",
  "News / Article",
  "Other",
];

export default function FormSection() {
  const [accepted, setAccepted] = useState(false);
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: handle form submission
  };

  return (
    <section id="contact" className="bg-accent-light py-14 lg:py-28">
      <div
        ref={ref}
        className="max-w-[var(--container-narrow)] mx-auto px-6 lg:px-10"
      >
        {/* Heading */}
        <div className="text-center mb-8 lg:mb-16">
          <FullLogo className={`mx-auto mb-16 text-accent h-16 reveal ${v}`} />

          <h2
            className={`font-display text-accent text-3xl lg:text-4xl tracking-[0.2em] uppercase mb-4 reveal reveal-delay-1 ${v}`}
          >
            Register
          </h2>
          <p
            className={`font-body text-xs lg:text-sm tracking-[0.15em] uppercase text-accent reveal reveal-delay-2 ${v}`}
          >
            Register for more information with exclusive privileges.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-10">
          {/* Row 1: First Name / Last Name */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 reveal reveal-delay-2 ${v}`}
          >
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                required
                className="w-full py-3 bg-transparent border-b border-accent/40 text-accent text-sm font-body placeholder:text-accent outline-none focus:border-brown-800 transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                required
                className="w-full py-3 bg-transparent border-b border-accent/40 text-accent text-sm font-body placeholder:text-accent outline-none focus:border-brown-800 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Row 2: Email / Mobile */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 reveal reveal-delay-3 ${v}`}
          >
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                className="w-full py-3 bg-transparent border-b border-accent/40 text-accent text-sm font-body placeholder:text-accent outline-none focus:border-brown-800 transition-colors duration-300"
              />
            </div>
            <div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number*"
                required
                className="w-full py-3 bg-transparent border-b border-accent/40 text-accent text-sm font-body placeholder:text-accent outline-none focus:border-brown-800 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Row 3: How did you hear about us */}
          <div className={`reveal reveal-delay-4 ${v}`}>
            <div className="relative">
              <select
                name="hearAbout"
                defaultValue=""
                className="w-full py-3 bg-transparent border-b border-accent/40 text-sm font-body text-accent outline-none appearance-none cursor-pointer focus:border-brown-800 transition-colors duration-300"
              >
                <option value="" disabled>
                  How did you hear about us?
                </option>
                {HEAR_ABOUT_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-accent-light text-accent"
                  >
                    {option}
                  </option>
                ))}
              </select>
              {/* Dropdown arrow */}
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-accent"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Register button */}
          <div
            className={`flex justify-center pt-4 reveal reveal-delay-5 ${v}`}
          >
            <button
              type="submit"
              className="font-display text-lg lg:text-xl tracking-[0.15em] text-accent border border-accent rounded-full px-12 lg:px-20 py-3 lg:py-3.5 hover:bg-accent hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              Register
            </button>
          </div>

          {/* Privacy policy checkbox */}
          <div
            className={`flex items-start gap-3 pt-2 reveal reveal-delay-5 ${v}`}
          >
            <input
              type="checkbox"
              id="privacy"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 shrink-0 appearance-none border border-accent/50 bg-transparent checked:bg-warm-200 checked:border-accent cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-accent checked:after:text-[10px] checked:after:font-bold"
            />
            <label
              htmlFor="privacy"
              className="font-body text-[10px] lg:text-xs tracking-[0.05em] uppercase text-accent leading-relaxed cursor-pointer"
            >
              Accept I have read and accept the{" "}
              <Link
                href="#"
                className="underline underline-offset-2 hover:text-brown-800 transition-colors duration-300"
              >
                Privacy Policys
              </Link>{" "}
              which contains the details of the protection of my personal data.
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
