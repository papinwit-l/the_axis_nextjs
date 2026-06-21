import { getLangArrayField, getLangField, wpFetch } from "./api";

export type FloorPlan = {
  label: string;
  src: string;
  rooms: string[];
};

export type UnitTypeData = {
  name: string;
  usableArea: string;
  landArea: string;
  heroImage: string;
  floors: FloorPlan[];
};

type WPFloorPlan = {
  id: number;
  label_th: string | null;
  label_en: string | null;
  image: string | null;
  rooms_th: string[];
  rooms_en: string[];
  order: number;
};

type WPUnitTypeResponse = {
  id: number;
  title: { rendered: string };
  menu_order: number;
  usable_area_th: string | null;
  usable_area_en: string | null;
  land_area_th: string | null;
  land_area_en: string | null;
  hero_image: string | null;
  floor_plans: WPFloorPlan[];
};

const FALLBACK: Record<string, UnitTypeData[]> = {
  th: [
    {
      name: "Prime",
      usableArea: "448 ตร.ม.",
      landArea: "95.2 - 96.9 ตร.วา",
      heroImage: "/images/unit/prime-hero.png",
      floors: [
        {
          label: "ชั้น 1",
          src: "/images/unit/prime-1f.png",
          rooms: [
            "โถงรับแขกเพดานสูงแบบ Double Volume",
            "ห้องนอน 1",
            "รองรับการติดตั้งลิฟต์ส่วนตัว",
            "พื้นที่รับประทานอาหาร",
            "พื้นที่เตรียมอาหาร",
            "ห้องครัว",
            "ห้องน้ำสำหรับแขก",
            "ที่จอดรถ 3–5 คัน",
            "ห้องแม่บ้าน",
          ],
        },
        {
          label: "ชั้น 2",
          src: "/images/unit/prime-2f.png",
          rooms: [
            "ห้องนอนใหญ่ 1",
            "ห้องนอน 2",
            "ระเบียงส่วนตัว",
            "ห้องอเนกประสงค์",
          ],
        },
        {
          label: "ชั้น 3",
          src: "/images/unit/prime-3f.png",
          rooms: [
            "ห้องนอนใหญ่ 2",
            "ห้องแต่งตัวแบบ Walk-in Closet",
            "ห้องอเนกประสงค์",
            "พื้นที่พักผ่อนกลางแจ้ง (Terrace)",
          ],
        },
      ],
    },
    {
      name: "Privé",
      usableArea: "336 ตร.ม.",
      landArea: "64.5 - 75.2 ตร.วา",
      heroImage: "/images/unit/prive-hero.png",
      floors: [
        {
          label: "ชั้น 1",
          src: "/images/unit/prive-1f.png",
          rooms: [
            "โถงรับแขกและพื้นที่รับประทานอาหารเพดานสูงแบบ Double Volume",
            "ห้องนอน 1",
            "รองรับการติดตั้งลิฟต์ส่วนตัว",
            "พื้นที่เตรียมอาหาร",
            "ห้องครัว",
            "ห้องน้ำ",
            "ที่จอดรถ 3 คัน",
            "ห้องแม่บ้าน",
          ],
        },
        {
          label: "ชั้น 2",
          src: "/images/unit/prive-2f.png",
          rooms: ["ห้องนอน 2", "พื้นที่ระเบียงพักผ่อนกลางแจ้ง"],
        },
        {
          label: "ชั้น 3",
          src: "/images/unit/prive-3f.png",
          rooms: [
            "ห้องนอน 3",
            "ห้องนอนมาสเตอร์",
            "พื้นที่ปรับเปลี่ยนการใช้งานได้ตามไลฟ์สไตล์",
          ],
        },
      ],
    },
  ],
  en: [
    {
      name: "Prime",
      usableArea: "448 SQ.M",
      landArea: "95.2 - 96.9 SQ.WAH",
      heroImage: "/images/unit/prime-hero.png",
      floors: [
        {
          label: "1st Floor",
          src: "/images/unit/prime-1f.png",
          rooms: [
            "Double Volume Living Area",
            "Bedroom 1",
            "Elevator-Ready",
            "Dining Area",
            "Pantry Area",
            "Kitchen Room",
            "Powder Room",
            "3-5 Parking Space",
            "Maid Room",
          ],
        },
        {
          label: "2nd Floor",
          src: "/images/unit/prime-2f.png",
          rooms: ["Master Bedroom 1", "Bedroom 2", "Balcony", "Service Room"],
        },
        {
          label: "3rd Floor",
          src: "/images/unit/prime-3f.png",
          rooms: [
            "Master Bedroom 2",
            "Walk-in Closet",
            "Multi-purpose Room",
            "Terrace",
          ],
        },
      ],
    },
    {
      name: "Privé",
      usableArea: "336 SQ.M",
      landArea: "64.5 - 75.2 SQ.WAH",
      heroImage: "/images/unit/prive-hero.png",
      floors: [
        {
          label: "1st Floor",
          src: "/images/unit/prive-1f.png",
          rooms: [
            "Double Volume Living & Dining Area",
            "Bedroom 1",
            "Elevator-Ready",
            "Pantry Area",
            "Kitchen Room",
            "Bathroom",
            "3 Parking Space",
            "Maid Room",
          ],
        },
        {
          label: "2nd Floor",
          src: "/images/unit/prive-2f.png",
          rooms: ["Bedroom 2", "Outdoor Terrace"],
        },
        {
          label: "3rd Floor",
          src: "/images/unit/prive-3f.png",
          rooms: ["Bedroom 3", "Master Bedroom", "Flex Space"],
        },
      ],
    },
  ],
};

export async function getUnitTypes(
  lang: string = "en",
): Promise<UnitTypeData[]> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  try {
    const posts = await wpFetch<WPUnitTypeResponse[]>("unit_type", {
      embed: false,
      params: {
        orderby: "menu_order",
        order: "asc",
        per_page: 10,
      },
    });

    if (!posts.length) return fallback;

    return posts.map((post) => ({
      name: post.title.rendered,
      usableArea: getLangField(post, "usable_area", lang) ?? "",
      landArea: getLangField(post, "land_area", lang) ?? "",
      heroImage: post.hero_image ?? "",
      floors: (post.floor_plans || []).map((fp) => ({
        label: getLangField(fp, "label", lang) ?? "",
        src: fp.image ?? "",
        rooms: getLangArrayField(fp, "rooms", lang),
      })),
    }));
  } catch {
    return fallback;
  }
}
