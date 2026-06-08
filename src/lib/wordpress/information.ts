import { getPosts, getFeaturedMedia, getImageUrl, getAltText } from "./api";

export type InfoItem = {
  label: string;
  value: string;
};

export type InformationData = {
  image: { src: string; alt: string };
  details: InfoItem[];
};

const FALLBACK: InformationData = {
  image: { src: "/images/information.png", alt: "Kailani villa aerial view" },
  details: [
    { label: "Project:", value: "Kailani private pool villa" },
    { label: "Developer:", value: "Kailani Property Co.,Ltd" },
    {
      label: "Location:",
      value: "Soi Chaiyapruk 2, Pattaya City Banglamung Chonburi 20150",
    },
    { label: "Land Area:", value: "1,824 sq.m. (1 rai 56 sq.wa)" },
    { label: "Total Unit:", value: "4 units" },
    { label: "Plot Area:", value: "360 – 580 sq.m. (90 – 145 sq.wa)" },
  ],
};

export async function getInformation(): Promise<InformationData> {
  try {
    return FALLBACK;

    const posts = await getPosts("information", { per_page: 1 });
    const post = posts[0];
    if (!post) return FALLBACK;

    const acf = post.acf as Record<string, string>;
    const media = getFeaturedMedia(post);

    const fieldMap: { key: string; label: string }[] = [
      { key: "project", label: "Project:" },
      { key: "developer", label: "Developer:" },
      { key: "location", label: "Location:" },
      { key: "land_area", label: "Land Area:" },
      { key: "total_unit", label: "Total Unit:" },
      { key: "plot_area", label: "Plot Area:" },
    ];

    return {
      image: {
        src: getImageUrl(media, "large") || FALLBACK.image.src,
        alt: getAltText(media, "Kailani villa aerial view"),
      },
      details: fieldMap
        .filter((f) => acf[f.key])
        .map((f) => ({
          label: f.label,
          value: acf[f.key],
        })),
    };
  } catch {
    return FALLBACK;
  }
}
