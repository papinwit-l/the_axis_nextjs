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
import { getDictionary } from "@/i18n";

const NAV_LINKS = {
  th: [
    { label: "หน้าแรก", href: "#" },
    { label: "แนวคิดโครงการ", href: "#about" },
    { label: "ข้อมูลโครงการ", href: "#information" },
    { label: "แบบบ้าน", href: "#unit" },
    { label: "แกลเลอรี", href: "#gallery" },
    { label: "ทำเลที่ตั้ง", href: "#location" },
    { label: "ติดต่อเรา", href: "#contact" },
  ],
  en: [
    { label: "HOME", href: "#" },
    { label: "PROJECT CONCEPT", href: "#about" },
    { label: "PROJECT INFO", href: "#information" },
    { label: "UNIT TYPE", href: "#unit" },
    { label: "GALLERY", href: "#gallery" },
    { label: "LOCATION", href: "#location" },
    { label: "CONTACT US", href: "#contact" },
  ],
};

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

export default function Footer({
  contact,
  lang,
}: {
  contact: ContactData;
  lang: string;
}) {
  const navItems = NAV_LINKS[lang as keyof typeof NAV_LINKS] ?? NAV_LINKS.en;
  const socialLinks: { platform: string; url: string }[] = [
    ...contact.socials,
    ...(contact.email
      ? [{ platform: "email" as const, url: `mailto:${contact.email}` }]
      : []),
  ];

  const t = getDictionary(lang).footer;

  return (
    <footer>
      {/* Main footer */}
      <div className="bg-accent text-secondary pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Left: Logo */}
            <div className="lg:flex-1">
              <Link href={`/${lang}`} className="inline-block">
                <FullLogo className="text-secondary h-24 lg:h-32" />
              </Link>
            </div>

            {/* Right: Nav + Address + Phone + Socials */}
            <div className="lg:flex-1 flex flex-col">
              {/* Nav links — single column */}
              <nav className="mb-8 lg:mb-10">
                <ul className="flex flex-col gap-0">
                  {navItems.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="font-body text-xs text-secondary hover:text-secondary/80 transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Address */}
              {contact.address.length > 0 && (
                <p className="font-body text-sm text-secondary mb-4">
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
              href={`/${lang}/privacy-policy`}
              className="hover:text-accent transition-colors duration-300"
            >
              {t.privacy}
            </Link>
            <span className="mx-2">·</span>
            <Link
              href={`/${lang}/terms-and-conditions`}
              className="hover:text-accent transition-colors duration-300"
            >
              {t.terms}
            </Link>
            <span className="mx-2">·</span>
            <span>{t.copyright}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
