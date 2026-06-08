import { getPosts, getFeaturedMedia, getImageUrl, getAltText } from "./api";

export type BannerSlide = {
  src: string;
  alt: string;
};

export async function getBanners(): Promise<BannerSlide[]> {
  const posts = await getPosts("banner", {
    orderby: "menu_order",
    order: "asc",
  });

  return posts.map((post) => {
    const media = getFeaturedMedia(post);
    return {
      src: getImageUrl(media, "full"),
      alt: getAltText(media, post.title.rendered),
    };
  });
}
