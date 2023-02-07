import { admin } from "utils/api/AdminApi";

export async function deleteMedia(id: number) {
  try {
    const response = await admin().delete(`/media/${id}`);
    return response;
  } catch (err) {
    return null;
  }
}
