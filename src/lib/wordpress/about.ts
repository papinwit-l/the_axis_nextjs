import { getPosts } from "./api";

export interface AboutData {
  heading: string[];
  description: string; // raw HTML from WordPress WYSIWYG
}

const FALLBACK: AboutData = {
  heading: ["WHERE EVERY MOMENT", "BECOMES A FAMILY LEGACY"],
  description:
    "<p><em>Nestled along one of Bangkok's most beautiful roads,</em></p>\n\n<p><strong>The Axis Utthayan</strong> presents an exclusive collection of\n<strong>modern classic monochrome residences.</strong></p>\n\n<p>Designed with <em>timeless sophistication</em> and crafted for\n<em>multigenerational living,</em> each home stands as an enduring\nexpression of <strong>legacy</strong></p>\n\n<p><em>where refined living today becomes\na treasured inheritance tomorrow.</em></p>",
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
