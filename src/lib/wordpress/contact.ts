import { getPosts } from "./api";

export type SocialLink = {
  platform: "instagram" | "facebook" | "line" | "whatsapp";
  url: string;
};

export type ContactData = {
  phone: string;
  email: string;
  address: string[];
  socials: SocialLink[];
};

const FALLBACK: ContactData = {
  phone: "+66847223363",
  email: "info@kailani.com",
  address: [
    "Kailani Private Property, Pattaya City,",
    "Bang Lamung District, Chon Buri 20150",
  ],
  socials: [],
};

export async function getContact(): Promise<ContactData> {
  try {
    const posts = await getPosts("contact", { per_page: 1 }, { embed: false });
    const post = posts[0];
    if (!post) return FALLBACK;

    const acf = post.acf as Record<string, string>;

    const socialMap: { key: string; platform: SocialLink["platform"] }[] = [
      { key: "instagram_url", platform: "instagram" },
      { key: "facebook_url", platform: "facebook" },
      { key: "line_url", platform: "line" },
      { key: "whatsapp_url", platform: "whatsapp" },
    ];

    return {
      phone: acf.phone || FALLBACK.phone,
      email: acf.email || FALLBACK.email,
      address: acf.address
        ? acf.address.split(/\r?\n/).filter(Boolean)
        : FALLBACK.address,
      socials: socialMap
        .filter((s) => acf[s.key])
        .map((s) => ({
          platform: s.platform,
          url: acf[s.key],
        })),
    };
  } catch {
    return FALLBACK;
  }
}
