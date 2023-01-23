import { Media } from "types";

export function mediaCoersion(media: Media | string): Media {
  if (typeof media === "string") {
    return {
      a: "",
      p: 0,
      s: 0,
      t: "",
      u: media
    }
  } else {
    return media;
  }
}