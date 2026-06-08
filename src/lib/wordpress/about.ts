import { getPosts } from "./api";

export type AboutData = {
  heading: string[];
  paragraphs: string[];
};

const FALLBACK: AboutData = {
  heading: ["Where the sea meets the sky,", "and life meets design."],
  paragraphs: [
    `The AXIS is a boutique collection of private luxury pool villas nestled on Pattaya's eastern coastline, just 900 meters from Jomtien Beach.Taking its name from the Hawaiian word for "heavenly sea" a union of kai (ocean) and land (sky) — the project is conceived as more than a residence.It is a sanctuary where nature, architecture, and the rhythm of tropical living converge`,
  ],
};

export async function getAbout(): Promise<AboutData> {
  try {
    return FALLBACK;

    // const posts = await getPosts("about", { per_page: 1 });
    // const post = posts[0];
    // if (!post) return FALLBACK;

    // const acf = post.acf as { heading?: string; description?: string };

    // return {
    //   heading: acf.heading
    //     ? acf.heading.split(/\r?\n/).filter(Boolean)
    //     : FALLBACK.heading,
    //   paragraphs: acf.description
    //     ? acf.description.split(/\r?\n\r?\n/).filter(Boolean)
    //     : FALLBACK.paragraphs,
    // };
  } catch {
    return FALLBACK;
  }
}
