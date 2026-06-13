"use client";

import DOMPurify from "dompurify";

let isInitialized: boolean = false;

function initDOMPurify(): void {
  if (typeof window !== "undefined" && !isInitialized) {
    DOMPurify.addHook("afterSanitizeAttributes", (node: Element) => {
      if (node.tagName === "A") {
        node.setAttribute("rel", "noopener noreferrer");
      }
    });
    isInitialized = true;
  }
}

export const sanitizeHTML = (html: string | null | undefined): string => {
  if (typeof window === "undefined") {
    // Server: return as-is (will be sanitized on client hydration)
    return html || "";
  }

  initDOMPurify();

  return DOMPurify.sanitize(html || "", {
    ALLOWED_TAGS: [
      "p",
      "strong",
      "em",
      "a",
      "ul",
      "ol",
      "li",
      "br",
      "b",
      "i",
      "span",
      "div",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "hr",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "id"],
    ADD_ATTR: ["target"],
    FORBID_ATTR: ["style", "onerror", "onclick"],
  });
};
