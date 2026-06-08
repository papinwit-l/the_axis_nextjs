import { getPosts } from "./api";

export type VideoData = {
  videoUrl: string;
  thumbnailUrl: string;
};

const FALLBACK: VideoData = {
  videoUrl: "/videos/kailani-video.mp4",
  thumbnailUrl: "/images/video-thumb.png",
};

export async function getVideo(): Promise<VideoData> {
  try {
    return FALLBACK;

    const posts = await getPosts("video", { per_page: 1 }, { embed: false });
    const post = posts[0];
    if (!post) return FALLBACK;

    const acf = post.acf as { video_file?: string; thumbnail?: string };

    return {
      videoUrl: acf.video_file || FALLBACK.videoUrl,
      thumbnailUrl: acf.thumbnail || FALLBACK.thumbnailUrl,
    };
  } catch {
    return FALLBACK;
  }
}
