"use client";

import React from "react";
import { sanitizeHTML } from "@/lib/dompurify";

function normalizeHtml(html: unknown): string {
  if (typeof html !== "string") return "";

  return (
    html
      // remove empty <p> tags (with or without spaces / &nbsp;)
      .replace(/<p>(\s|&nbsp;)*<\/p>/gi, "")
      // trim whitespace inside <p>
      .replace(/<p>\s+/gi, "<p>")
      .replace(/\s+<\/p>/gi, "</p>")
      // normalize multiple newlines
      .replace(/\n{2,}/g, "\n")
      .trim()
  );
}

function textToHTML(text: string): string {
  return text
    .split(/\r?\n\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\r?\n/g, "<br>")}</p>`)
    .join("");
}

interface WPContentProps {
  children?: string;
  className?: string;
}

export function WPContent({ children, className = "" }: WPContentProps) {
  if (!children) return null;

  // Normalize and sanitize inside the client component
  const cleanHtml = sanitizeHTML(normalizeHtml(children));

  return (
    <div
      className={`prose prose-slate max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      suppressHydrationWarning={true}
    />
  );
}

interface WPTextProps {
  children?: string;
  className?: string;
}

export function WPText({ children, className = "" }: WPTextProps) {
  if (!children) return null;

  const cleanHtml = sanitizeHTML(textToHTML(children));

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
      suppressHydrationWarning={true}
    />
  );
}

// Keep export for backward compatibility, but mark as deprecated
export function normalizeHtmlContent(html: unknown): string {
  console.warn(
    "normalizeHtmlContent is deprecated. Just pass raw HTML to WPContent.",
  );
  return normalizeHtml(html);
}

interface WPImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  fallback?: React.ReactNode;
}

export function WPImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallback = null,
}: WPImageProps) {
  if (!src) return fallback;

  return (
    <img
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
    />
  );
}
