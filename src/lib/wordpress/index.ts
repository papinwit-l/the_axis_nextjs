// Base
export {
  wpFetch,
  getPosts,
  getPostBySlug,
  getFeaturedMedia,
  getImageUrl,
  getAltText,
} from "./api";
export type { WPPost, WPMedia, WPMediaSize, ImageSize } from "./api";

// Sections
export { getBanners } from "./banner";
export type { BannerSlide } from "./banner";

export { getAbout } from "./about";
export type { AboutData } from "./about";

export { getInformation } from "./information";
export type { InformationData, InfoItem } from "./information";

export { getGallery } from "./gallery";
export type { GalleryData, GalleryImage } from "./gallery";

export { getUnitTypes } from "./unit-type";
export type { UnitTypeData, FloorPlan } from "./unit-type";

export { getVideo } from "./video";
export type { VideoData } from "./video";

export { getContact } from "./contact";
export type { ContactData, SocialLink } from "./contact";

export { getLocation } from "./location";
export type { LocationData, Distance } from "./location";
