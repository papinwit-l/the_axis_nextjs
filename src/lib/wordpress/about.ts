import { getAltText, getFeaturedMedia, getImageUrl, getPosts } from "./api";

export interface AboutData {
  image: string;
  imageAlt: string;
  heading: string[];
  description: string;
}

const FALLBACK: Record<string, AboutData> = {
  th: {
    image: "/images/about-image.png",
    imageAlt: "ภาพแนวคิดโครงการ",
    heading: [
      "ทุกช่วงเวลาแห่งชีวิต",
      "หลอมรวมเป็นมรดกแห่งความทรงจำของครอบครัว",
    ],
    description:
      "<strong>The Axis Utthayan</strong> เกิดขึ้นจากแนวคิดที่ว่า <em>“บ้านไม่ใช่เพียงสถานที่สำหรับการอยู่อาศัย”</em><br>แต่คือพื้นที่ที่เก็บรักษาเรื่องราว ความสัมพันธ์ และคุณค่าที่จะถูกส่งต่อจากคนรุ่นหนึ่งสู่อีกรุ่นหนึ่ง</p>\n\n<p>ทุกองค์ประกอบของโครงการได้รับการออกแบบอย่างพิถีพิถัน เพื่อรองรับการใช้ชีวิตของครอบครัวยุคใหม่<br>พร้อมสะท้อนรสนิยมอันเหนือกาลเวลา ผ่านสถาปัตยกรรม Modern Classic Monochrome ที่สง่างามในทุกมิติ</p>",
  },
  en: {
    image: "/images/about-image.png",
    imageAlt: "Concept Image",
    heading: ["WHERE EVERY MOMENT", "BECOMES A FAMILY LEGACY"],
    description:
      "<p>Nestled along one of Bangkok's most beautiful roads,</p>\n\n<p><strong>The Axis Utthayan</strong> presents an exclusive collection of<br>modern-classic monochrome residences.</p>\n\n<p>Designed with timeless sophistication and crafted for multigenerational living,<br>each home is an enduring expression of legacy<br>where refined living today becomes a treasured inheritance for generations to come.</p>",
  },
};

export async function getAbout(lang: string = "en"): Promise<AboutData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  // return fallback;

  try {
    const posts = await getPosts("about", { per_page: 1 });
    const post = posts[0];
    if (!post) return fallback;

    const media = getFeaturedMedia(post);

    const heading = (post[`heading_${lang}`] as string) ?? null;
    const description = (post[`description_${lang}`] as string) ?? null;
    const imageAlt = (post[`image_alt_${lang}`] as string) ?? null;

    return {
      image: getImageUrl(media, "full") || fallback.image,
      imageAlt: imageAlt ?? getAltText(media) ?? fallback.imageAlt,
      heading: heading
        ? heading.split(/\r?\n/).filter(Boolean)
        : fallback.heading,
      description: description ?? fallback.description,
    };
  } catch {
    return fallback;
  }
}
