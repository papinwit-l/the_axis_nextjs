import { getPosts } from "./api";

export interface AboutData {
  image: string;
  imageMobile: string;
  imageAlt: string;
  heading: string[];
  description: string; // raw HTML from WordPress WYSIWYG
}

const FALLBACK: AboutData = {
  image: "/images/about-image.png",
  imageMobile: "/images/about-image-crop.png",
  imageAlt: "Concept Image",
  heading: ["WHERE EVERY MOMENT", "BECOMES A FAMILY LEGACY"],
  description:
    "<p>Nestled along one of Bangkok's most beautiful roads,</p>\n\n<p><strong>The Axis Utthayan</strong> presents an exclusive collection of<br>modern-classic monochrome residences.</p>\n\n<p>Designed with timeless sophistication and crafted for multigenerational living,<br>each home is an enduring expression of legacy<br>where refined living today becomes a treasured inheritance for generations to come.</p>",
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
