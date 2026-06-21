import { getPosts, getFeaturedMedia, getImageUrl, getAltText } from "./api";

export type BannerSlide = {
  src: string;
  mobileSrc: string;
  alt: string;
};

export async function getBanners(): Promise<BannerSlide[]> {
  const posts = await getPosts("banner", {
    orderby: "menu_order",
    order: "asc",
  });

  return posts.map((post) => {
    const media = getFeaturedMedia(post);
    const mobileImage = post.mobile_image as {
      url: string;
      alt: string;
    } | null;

    return {
      src: getImageUrl(media, "full"),
      mobileSrc: mobileImage?.url || getImageUrl(media, "full"),
      alt: getAltText(media, post.title.rendered),
    };
  });
}
