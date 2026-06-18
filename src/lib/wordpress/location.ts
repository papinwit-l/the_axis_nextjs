import { getPosts } from "./api";

export type DistanceGroup = {
  category: string;
  items: { label: string; value: string }[];
};

export type LocationData = {
  mapImage: string;
  googleMapsUrl: string;
  description: string;
  distanceGroups: DistanceGroup[];
};

const FALLBACK: Record<string, LocationData> = {
  th: {
    mapImage: "/images/location-map.png",
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.672993380887!2d100.33018407509076!3d13.778885586615807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29109d47f60ed%3A0x16f3123e107630c9!2sTHE%20AXIS%20Utthayan!5e1!3m2!1sth!2sth!4v1781165790909!5m2!1sth!2sth",
    description:
      "โครงการตั้งอยู่บนถนนอุทยาน หนึ่งในถนนที่ได้รับการยกย่องว่าสวยงามและทรงคุณค่าที่สุดของประเทศไทย รายล้อมด้วยธรรมชาติของพุทธมณฑล พื้นที่สีเขียวขนาดใหญ่กว่า 2,500 ไร่ มอบบรรยากาศแห่งความสงบ อากาศบริสุทธิ์ และความสะดวกในการเชื่อมต่อสู่ถนนสายสำคัญของกรุงเทพมหานคร",
    distanceGroups: [
      {
        category: "การเดินทาง",
        items: [
          { label: "ถนนพุทธมณฑลสาย 4", value: "0.6 กม." },
          { label: "ถนนทวีวัฒนา", value: "0.8 กม." },
          { label: "ถนนบรมราชชนนี", value: "2.0 กม." },
          { label: "ถนนพุทธมณฑลสาย 3", value: "3.5 กม." },
        ],
      },
      {
        category: "สถานศึกษา",
        items: [
          { label: "มหาวิทยาลัยกรุงเทพธนบุรี", value: "2.1 กม." },
          { label: "มหาวิทยาลัยมหิดล ศาลายา", value: "4.2 กม." },
          { label: "โรงเรียนอัสสัมชัญธนบุรี", value: "9.4 กม." },
          {
            label: "โรงเรียนนานาชาติสิงคโปร์ (SISB Thonburi Campus)",
            value: "15 กม.",
          },
        ],
      },
      {
        category: "ศูนย์การค้าและไลฟ์สไตล์",
        items: [
          { label: "ฟู้ดแลนด์", value: "2.8 กม." },
          { label: "เดอะ โฟร์ท", value: "4.2 กม." },
          { label: "ตลาดธนบุรี สนามหลวง 2", value: "4.8 กม." },
          { label: "เซ็นทรัล ศาลายา", value: "9.1 กม." },
        ],
      },
    ],
  },
  en: {
    mapImage: "/images/location-map.png",
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.672993380887!2d100.33018407509076!3d13.778885586615807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29109d47f60ed%3A0x16f3123e107630c9!2sTHE%20AXIS%20Utthayan!5e1!3m2!1sen!2sth!4v1781165790909!5m2!1sen!2sth",
    description:
      "The project is located on Utthayan Road, a road considered the most beautiful and expensive in Thailand. It is located near Phutthamonthon, a large public park covering over 2,500 rai, a source of fresh air, and offers convenient transportation connections to major roads.",
    distanceGroups: [
      {
        category: "Major Roads",
        items: [
          { label: "Phutthamonthon Sai 4 Road", value: "0.6 km" },
          { label: "Thawee Watthana Road", value: "0.8 km" },
          { label: "Borommaratchachonnani Road", value: "2.0 km" },
          { label: "Phutthamonthon Sai 3", value: "3.5 km" },
        ],
      },
      {
        category: "Academy",
        items: [
          { label: "Bangkok Thonburi University", value: "2.1 km" },
          { label: "Mahidol University Salaya", value: "4.2 km" },
          { label: "Assumption College Thonburi", value: "9.4 km" },
          { label: "SISB (Thonburi Campus)", value: "15 km" },
        ],
      },
      {
        category: "Shopping Center",
        items: [
          { label: "Foodland", value: "2.8 km" },
          { label: "The Fourth", value: "4.2 km" },
          { label: "Thonburi Market, Sanam Luang 2", value: "4.8 km" },
          { label: "Central Salaya", value: "9.1 km" },
        ],
      },
    ],
  },
};

export async function getLocation(lang: string = "en"): Promise<LocationData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  return fallback;

  // try {
  //   const posts = await getPosts("location", { per_page: 1 }, { embed: false });
  //   const post = posts[0];
  //   if (!post) return fallback;

  //   const acf = post.acf as Record<
  //     string,
  //     string | DistanceGroup[] | undefined
  //   >;

  //   return {
  //     mapImage: (acf.map_image as string) || fallback.mapImage,
  //     googleMapsUrl:
  //       (acf.google_maps_embed as string) || fallback.googleMapsUrl,
  //     description:
  //       (acf[`description_${lang}`] as string) ??
  //       (acf.description as string) ??
  //       fallback.description,
  //     distanceGroups: (() => {
  //       const langGroups = acf[`distance_groups_${lang}`] as
  //         | DistanceGroup[]
  //         | undefined;
  //       const baseGroups = acf.distance_groups as DistanceGroup[] | undefined;
  //       return (
  //         langGroups ??
  //         (baseGroups?.length ? baseGroups : fallback.distanceGroups)
  //       );
  //     })(),
  //   };
  // } catch {
  //   return fallback;
  // }
}
