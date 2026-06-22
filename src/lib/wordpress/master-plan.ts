import { getPosts, getLangField } from "./api";

export type MasterPlanData = {
  heading: string;
  image: string;
  imageAlt: string;
};

type WPMasterPlanResponse = {
  id: number;
  heading_th: string | null;
  heading_en: string | null;
  image: string | null;
  image_alt_th: string | null;
  image_alt_en: string | null;
};

const FALLBACK: Record<string, MasterPlanData> = {
  th: {
    heading: "ผังโครงการ",
    image: "/images/master-plan.png",
    imageAlt: "ผังโครงการ The Axis Utthayan",
  },
  en: {
    heading: "MASTER PLAN",
    image: "/images/master-plan.png",
    imageAlt: "The Axis Utthayan master plan",
  },
};

export async function getMasterPlan(
  lang: string = "en",
): Promise<MasterPlanData> {
  const fallback = FALLBACK[lang] ?? FALLBACK.en;

  try {
    const posts = await getPosts("master_plan", { per_page: 1 });
    const post = posts[0] as unknown as WPMasterPlanResponse;
    if (!post) return fallback;

    return {
      heading: getLangField(post, "heading", lang) ?? fallback.heading,
      image: post.image ?? fallback.image,
      imageAlt: getLangField(post, "image_alt", lang) ?? fallback.imageAlt,
    };
  } catch {
    return fallback;
  }
}
