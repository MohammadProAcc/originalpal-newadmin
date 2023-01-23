import { Address } from "types";
import { api } from "utils";

export async function getOwnAddresses(props?: { token?: string }): Promise<Address[]> {
  const response = await api(props?.token).get("/dashboard/addresses");
  return response.data.data;
}
