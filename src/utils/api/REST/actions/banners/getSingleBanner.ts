import { admin } from "utils";

export const getSingleBanner = async (bannerId: string, token?: string) => {
  try {
    const { data: banner } = await admin(token).get(
      `/banners/single/${bannerId}`,
    );
    return banner.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
