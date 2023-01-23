export interface IOrderForCreation {
  stocks: IStockForCreation[];
}

export interface IStockForCreation {
  id: number;
  quantity: number;
}
