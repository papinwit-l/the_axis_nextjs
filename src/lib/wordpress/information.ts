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
    {
      label: "Location",
      value: "Utthayan - Aksa Road",
    },
    { label: "Land Area", value: "2 – 1 – 69 Rai" },
    { label: "Residental Unit", value: "9 Unit." },
    { label: "Home Area", value: "64.4 – 164.1 Sq.wah." },
    { label: "Property Type", value: "3 - Storey House" },
    { label: "Archetecture", value: "Modern Classic Monochorme" },
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
