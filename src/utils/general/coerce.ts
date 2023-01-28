export function coerce() {}

coerce.media = (media: any) => {
  return media?.includes("{") ? JSON.parse(media) : media;
};
