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

const FALLBACK: Record<string, ContactData> = {
  th: {
    phone: "082-110-9000",
    email: "info@clv.co.th",
    address: ["88 แขวงศาลาธรรมสพน์", " เขตทวีวัฒนา กรุงเทพมหานคร 10170"],
    socials: [],
  },
  en: {
    phone: "+66123456789",
    email: "info@theaxis.com",
    address: [
      "88 Sala Thammasop Subdistrict,",
      " Thawi Watthana District, Bangkok 10170",
    ],
    socials: [],
  },
};

export async function getContact(lang: string = "en"): Promise<ContactData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  return fallback;

  // try {
  //   const posts = await getPosts("contact", { per_page: 1 }, { embed: false });
  //   const post = posts[0];
  //   if (!post) return fallback;

  //   const acf = post.acf as Record<string, string | undefined>;

  //   const socialMap: { key: string; platform: SocialLink["platform"] }[] = [
  //     { key: "instagram_url", platform: "instagram" },
  //     { key: "facebook_url", platform: "facebook" },
  //     { key: "line_url", platform: "line" },
  //     { key: "whatsapp_url", platform: "whatsapp" },
  //   ];

  //   const address = acf[`address_${lang}`] ?? acf.address;

  //   return {
  //     phone: acf.phone || fallback.phone,
  //     email: acf.email || fallback.email,
  //     address: address
  //       ? address.split(/\r?\n/).filter(Boolean)
  //       : fallback.address,
  //     socials: socialMap
  //       .filter((s) => acf[s.key])
  //       .map((s) => ({
  //         platform: s.platform,
  //         url: acf[s.key]!,
  //       })),
  //   };
  // } catch {
  //   return fallback;
  // }
}
