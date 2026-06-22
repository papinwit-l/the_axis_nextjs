import { getLangField, getPosts } from "./api";

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

type WPContactResponse = {
  id: number;
  phone: string | null;
  email: string | null;
  address_th: string | null;
  address_en: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  line_url: string | null;
  whatsapp_url: string | null;
};

const FALLBACK: Record<string, ContactData> = {
  th: {
    phone: "082-110-9000",
    email: "info@clv.co.th",
    // address: ["88 แขวงศาลาธรรมสพน์", " เขตทวีวัฒนา กรุงเทพมหานคร 10170"],
    address: [
      "5 ซอยอุทยาน 6 ถนนอุทยาน-อักษะ",
      "แขวงศาลาธรรมสพน์ เขตทวีวัฒนา กรุงเทพฯ 10170",
    ],
    socials: [],
  },
  en: {
    phone: "082-110-9000",
    email: "info@clv.co.th",
    // address: [
    //   "88 Sala Thammasop Subdistrict,",
    //   " Thawi Watthana District, Bangkok 10170",
    // ],
    address: [
      "5 Utthayan 6 Alley, Utthaya-Aksa Road,",
      "Sala Thammasop, Thawi Watthana, Bangkok 10170",
    ],
    socials: [],
  },
};

const SOCIAL_MAP: { key: string; platform: SocialLink["platform"] }[] = [
  { key: "instagram_url", platform: "instagram" },
  { key: "facebook_url", platform: "facebook" },
  { key: "line_url", platform: "line" },
  { key: "whatsapp_url", platform: "whatsapp" },
];

export async function getContact(lang: string = "en"): Promise<ContactData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  try {
    const posts = await getPosts("contact", { per_page: 1 }, { embed: false });
    const post = posts[0] as unknown as WPContactResponse;
    if (!post) return fallback;

    const addressRaw = getLangField(post, "address", lang);

    return {
      phone: post.phone ?? fallback.phone,
      email: post.email ?? fallback.email,
      address: addressRaw
        ? addressRaw.split(/\r?\n/).filter(Boolean)
        : fallback.address,
      socials: SOCIAL_MAP.filter(
        (s) => post[s.key as keyof WPContactResponse],
      ).map((s) => ({
        platform: s.platform,
        url: post[s.key as keyof WPContactResponse] as string,
      })),
    };
  } catch {
    return fallback;
  }
}
