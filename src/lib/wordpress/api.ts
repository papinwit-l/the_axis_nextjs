const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://cms.kailanivilla.com/wp/wp-json/wp/v2";

// ============================================
// TYPES
// ============================================

export type WPMediaSize = {
  file: string;
  width: number;
  height: number;
  source_url: string;
};

export type WPMedia = {
  id: number;
  alt_text: string;
  source_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, WPMediaSize | undefined>;
  };
};

export type WPPost = {
  id: number;
  title: { rendered: string };
  slug: string;
  status: string;
  menu_order: number;
  content?: { rendered: string };
  excerpt?: { rendered: string };
  featured_media: number;
  acf: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
};

export type ImageSize =
  | "full"
  | "2048x2048"
  | "1536x1536"
  | "large"
  | "medium"
  | "thumbnail";

type FetchOptions = {
  revalidate?: number | false;
  params?: Record<string, string | number | boolean>;
  embed?: boolean;
};

// ============================================
// BASE FETCHER
// ============================================

export async function wpFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { revalidate = 60, params = {}, embed = true } = options;

  const url = new URL(`${WP_API_URL}/${endpoint}`);

  if (embed) {
    url.searchParams.set("_embed", "");
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  const res = await fetch(url.toString(), {
    next: revalidate === false ? { revalidate: false } : { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `WP API error: ${res.status} ${res.statusText} [${url.pathname}]`,
    );
  }

  return res.json();
}

// ============================================
// GENERIC FETCHERS
// ============================================

export async function getPosts(
  postType: string,
  params: Record<string, string | number | boolean> = {},
  options: Omit<FetchOptions, "params"> = {},
): Promise<WPPost[]> {
  return wpFetch<WPPost[]>(postType, {
    ...options,
    params: { per_page: 100, ...params },
  });
}

export async function getPostBySlug(
  postType: string,
  slug: string,
  options: Omit<FetchOptions, "params"> = {},
): Promise<WPPost | null> {
  const posts = await wpFetch<WPPost[]>(postType, {
    ...options,
    params: { slug },
  });
  return posts[0] || null;
}

// ============================================
// MEDIA HELPERS
// ============================================

export function getFeaturedMedia(post: WPPost): WPMedia | undefined {
  return post._embedded?.["wp:featuredmedia"]?.[0];
}

export function getImageUrl(
  media: WPMedia | undefined,
  preferredSize: ImageSize = "2048x2048",
): string {
  if (!media) return "";
  const sizes = media.media_details?.sizes;
  return (
    sizes?.[preferredSize]?.source_url ||
    sizes?.["2048x2048"]?.source_url ||
    sizes?.["1536x1536"]?.source_url ||
    sizes?.large?.source_url ||
    media.source_url ||
    ""
  );
}

export function getAltText(
  media: WPMedia | undefined,
  fallback: string = "",
): string {
  return media?.alt_text || fallback;
}
