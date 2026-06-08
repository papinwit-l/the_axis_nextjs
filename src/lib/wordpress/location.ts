import { getPosts } from "./api";

export type Distance = {
  value: string;
  label: string;
};

export type LocationData = {
  mapImage: string;
  googleMapsUrl: string;
  distances: Distance[];
};

const FALLBACK: LocationData = {
  mapImage: "/images/location-map.png",
  googleMapsUrl: "",
  distances: [
    { value: "1.3 km", label: "from Jomtien Beach" },
    { value: "6.9 km", label: "from Pattaya Beach" },
  ],
};

export async function getLocation(): Promise<LocationData> {
  try {
    const posts = await getPosts("location", { per_page: 1 }, { embed: false });
    const post = posts[0];
    if (!post) return FALLBACK;

    const acf = post.acf as {
      map_image?: string;
      google_maps_embed?: string;
      distances?: string;
    };

    return {
      mapImage: acf.map_image || FALLBACK.mapImage,
      googleMapsUrl: acf.google_maps_embed || FALLBACK.googleMapsUrl,
      distances: acf.distances
        ? acf.distances
            .split(/\r?\n/)
            .filter(Boolean)
            .map((line) => {
              const [value, label] = line.split("|").map((s) => s.trim());
              return { value: value || "", label: label || "" };
            })
        : FALLBACK.distances,
    };
  } catch {
    return FALLBACK;
  }
}
