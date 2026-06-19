import { getPosts, getFeaturedMedia, getImageUrl, getAltText } from "./api";

export type InfoItem = {
  label: string;
  value: string;
};

export type InformationData = {
  image: { src: string; alt: string };
  details: InfoItem[];
};

const FIELD_MAP = {
  th: [
    { key: "location", label: "ทำเลที่ตั้ง" },
    { key: "land_area", label: "พื้นที่โครงการ" },
    { key: "residential_unit", label: "จำนวนยูนิต" },
    { key: "home_area", label: "พื้นที่บ้าน" },
    { key: "property_type", label: "ประเภทบ้าน" },
    { key: "architecture", label: "สถาปัตยกรรม" },
  ],
  en: [
    { key: "location", label: "Location" },
    { key: "land_area", label: "Land Area" },
    { key: "residential_unit", label: "Residential Unit" },
    { key: "home_area", label: "Home Area" },
    { key: "property_type", label: "Property Type" },
    { key: "architecture", label: "Architecture" },
  ],
};

const FALLBACK: Record<string, InformationData> = {
  th: {
    image: { src: "/images/information.png", alt: "ภาพมุมสูงโครงการ" },
    details: [
      { label: "ทำเลที่ตั้ง", value: "ถนนอุทยาน – อักษะ" },
      { label: "พื้นที่โครงการ", value: "2 ไร่ 1 งาน 69 ตารางวา" },
      { label: "จำนวนยูนิต", value: "5 ยูนิต" },
      { label: "พื้นที่บ้าน", value: "64.4 – 96.6 ตารางวา" },
      { label: "ประเภทบ้าน", value: "บ้านเดี่ยวหรู 3 ชั้น" },
      { label: "สถาปัตยกรรม", value: "Modern Classic Monochrome" },
    ],
  },
  en: {
    image: { src: "/images/information.png", alt: "Aerial view" },
    details: [
      { label: "Location", value: "Utthayan - Aksa Road" },
      { label: "Land Area", value: "2 – 1 – 69 Rai" },
      { label: "Residential Unit", value: "5 Units" },
      { label: "Home Area", value: "64.4 – 96.6 Sq.wah." },
      { label: "Property Type", value: "3 - Storey House" },
      { label: "Architecture", value: "Modern Classic Monochrome" },
    ],
  },
};

export async function getInformation(
  lang: string = "en",
): Promise<InformationData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;
  const fieldMap = FIELD_MAP[lang as keyof typeof FIELD_MAP] ?? FIELD_MAP.en;

  return fallback;

  try {
    const posts = await getPosts("information", { per_page: 1 });
    const post = posts[0];
    if (!post) return fallback;

    const acf = post.acf as Record<string, string>;
    const media = getFeaturedMedia(post);

    return {
      image: {
        src: getImageUrl(media, "large") || fallback.image.src,
        alt: getAltText(media, fallback.image.alt),
      },
      details: fieldMap
        .filter((f) => acf[`${f.key}_${lang}`] || acf[f.key])
        .map((f) => ({
          label: f.label,
          value: acf[`${f.key}_${lang}`] ?? acf[f.key],
        })),
    };
  } catch {
    return fallback;
  }
}
