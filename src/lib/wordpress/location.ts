import { getPosts } from "./api";

export type DistanceGroup = {
  category: string;
  items: { label: string; value: string }[];
};

export type LocationData = {
  mapImage: string;
  googleMapsUrl: string;
  description: string;
  distanceGroups: DistanceGroup[];
};

const FALLBACK: LocationData = {
  mapImage: "/images/location-map.png",
  googleMapsUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.672993380887!2d100.33018407509076!3d13.778885586615807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29109d47f60ed%3A0x16f3123e107630c9!2sTHE%20AXIS%20Utthayan!5e1!3m2!1sen!2sth!4v1781165790909!5m2!1sen!2sth",
  description:
    "The project is located on Utthayan Road, a road considered the most beautiful and expensive in Thailand. It is located near Phutthamonthon, a large public park covering over 2,500 rai, a source of fresh air, and offers convenient transportation connections to major roads.",
  distanceGroups: [
    {
      category: "Major Roads",
      items: [
        { label: "Phutthamonthon Sai 4 Road", value: "0.6 km" },
        { label: "Thawee Watthana Road", value: "0.8 km" },
        { label: "Borommaratchachonnani Road", value: "2.0 km" },
        { label: "Phutthamonthon Sai 3", value: "3.5 km" },
      ],
    },
    {
      category: "Academy",
      items: [
        { label: "Bangkok Thonburi University", value: "2.1 km" },
        { label: "Mahidol University Salaya", value: "4.2 km" },
        { label: "Assumption College Thonburi", value: "9.4 km" },
        { label: "SISB (Thonburi Campus)", value: "15 km" },
      ],
    },
    {
      category: "Shopping Center",
      items: [
        { label: "Foodland", value: "2.8 km" },
        { label: "The Fourth", value: "4.2 km" },
        { label: "Thonburi Market, Sanam Luang 2", value: "4.8 km" },
        { label: "Central Salaya", value: "9.1 km" },
      ],
    },
  ],
};

export async function getLocation(): Promise<LocationData> {
  try {
    return FALLBACK;

    // const posts = await getPosts("location", { per_page: 1 }, { embed: false });
    // const post = posts[0];
    // if (!post) return FALLBACK;

    // const acf = post.acf as {
    //   map_image?: string;
    //   google_maps_embed?: string;
    //   description?: string;
    //   distance_groups?: {
    //     category: string;
    //     items: { label: string; value: string }[];
    //   }[];
    // };

    // return {
    //   mapImage: acf.map_image || FALLBACK.mapImage,
    //   googleMapsUrl: acf.google_maps_embed || FALLBACK.googleMapsUrl,
    //   description: acf.description || FALLBACK.description,
    //   distanceGroups:
    //     acf.distance_groups && acf.distance_groups.length > 0
    //       ? acf.distance_groups
    //       : FALLBACK.distanceGroups,
    // };
  } catch {
    return FALLBACK;
  }
}
