import { admin } from "utils";

export async function $_search_user_details(q: string, token?: string) {
  try {
    const response = await admin(token).get(`/users/search?q=${q}`);
    return response;
  } catch (err) {
    return new Error("request failed");
  }
}
