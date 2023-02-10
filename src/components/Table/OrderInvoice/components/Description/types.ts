import { IOrder } from "types";

export interface DescriptionProps {
  order: IOrder;
  payable: number;
  totalCount: number;
  isLastPage: boolean;
}
