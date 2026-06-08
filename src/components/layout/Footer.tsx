import Link from "next/link";
import FullLogo from "../ui/FullLogo";
import {
  FacebookIconAlt,
  InstagramIcon,
  LineIconAlt,
  MailIcon,
  WhatsAppIcon,
} from "../ui/SocialMediaIcon";
import type { ContactData, SocialLink } from "@/lib/wordpress";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "PROJECT CONCEPT", href: "#about" },
  { label: "PROJECT INFO", href: "#information" },
  { label: "UNIT TYPE", href: "#unit" },
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT US", href: "#contact" },
];

const SOCIAL_ICON_MAP: Record<
  SocialLink["platform"] | "email",
  React.FC<{ className?: string }>
> = {
  facebook: FacebookIconAlt,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  line: LineIconAlt,
  email: MailIcon,
};

export default function Footer({ contact }: { contact: ContactData }) {
  const socialLinks: { platform: string; url: string }[] = [
    ...contact.socials,
    ...(contact.email
      ? [{ platform: "email" as const, url: `mailto:${contact.email}` }]
      : []),
  ];

  return (
    <footer>
      {/* Main footer */}
      <div className="bg-accent text-secondary pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left: Logo */}
            <div className="lg:flex-1">
              <Link href="#" className="inline-block">
                <FullLogo className="text-secondary h-24 lg:h-32" />
              </Link>
            </div>

            {/* Right: Nav + Address + Phone + Socials */}
            <div className="lg:flex-1 flex flex-col">
              {/* Nav links — single column */}
              <nav className="mb-8 lg:mb-10">
                <ul className="flex flex-col gap-0">
                  {NAV_LINKS.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="font-body text-xs tracking-[0.2em] text-secondary hover:text-secondary/80 transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Address */}
              {contact.address.length > 0 && (
                <p className="font-body text-sm tracking-[0.05em] text-secondary mb-4">
                  {contact.address.join(" ")}
                </p>
              )}

              {/* Phone */}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="font-body text-base lg:text-lg font-bold tracking-[0.1em] text-white hover:text-secondary/80 transition-colors duration-300 mb-6"
                >
                  CALL {contact.phone}
                </a>
              )}

              {/* Social icons — horizontal row */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4 mt-auto">
                  {socialLinks.map((item) => {
                    const Icon =
                      SOCIAL_ICON_MAP[
                        item.platform as keyof typeof SOCIAL_ICON_MAP
                      ];
                    if (!Icon) return null;
                    return (
                      <a
                        key={item.platform}
                        href={item.url}
                        aria-label={item.platform}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-warm-400/40 flex items-center justify-center text-secondary hover:text-secondary/80 hover:border-secondary/80 transition-all duration-300"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-warm-100 py-4">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 flex items-center justify-center">
          <p className="font-body text-xs text-brown-500 text-center">
            <Link
              href="#"
              className="hover:text-accent transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">·</span>
            <Link
              href="#"
              className="hover:text-accent transition-colors duration-300"
            >
              Terms and Conditions
            </Link>
            <span className="mx-2">·</span>
            <span>© 2026 Kailani Private Property Co.,Ltd.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
