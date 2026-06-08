import { wpFetch } from "./api";

export type FloorPlan = {
  src: string;
  label: string;
};

export type UnitTypeData = {
  name: string;
  bedrooms: number;
  bathrooms: number;
  carparks: number;
  floors: FloorPlan[];
  rooms: { no: number; name: string }[];
};

type WPUnitTypeResponse = {
  id: number;
  title: { rendered: string };
  menu_order: number;
  bedrooms: string;
  bathrooms: string;
  carparks: string;
  room_legend: string;
  floor_plans: {
    ID: string;
    post_title: string;
    guid: string;
  }[];
};

const FALLBACK: UnitTypeData[] = [];

export async function getUnitTypes(): Promise<UnitTypeData[]> {
  try {
    const posts = await wpFetch<WPUnitTypeResponse[]>("unit_type", {
      embed: false,
      params: {
        orderby: "menu_order",
        order: "asc",
        per_page: 10,
      },
    });

    if (!posts.length) return FALLBACK;

    return posts.map((post) => ({
      name: post.title.rendered,
      bedrooms: parseInt(post.bedrooms) || 0,
      bathrooms: parseInt(post.bathrooms) || 0,
      carparks: parseInt(post.carparks) || 0,
      floors: (post.floor_plans || []).map((fp) => ({
        src: fp.guid,
        label: fp.post_title,
      })),
      rooms: post.room_legend
        ? post.room_legend
            .split(/\r?\n/)
            .filter(Boolean)
            .map((name, index) => ({
              no: index + 1,
              name: name.trim(),
            }))
        : [],
    }));
  } catch {
    return FALLBACK;
  }
}
