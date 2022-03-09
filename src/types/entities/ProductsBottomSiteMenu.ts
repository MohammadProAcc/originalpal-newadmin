export interface ProductsBottomSiteRow {
  name: string
  url: string
}

export type ProductsBottomSiteColumn = ProductsBottomSiteRow[]

export type ProductsBottomSiteMenu = ProductsBottomSiteColumn[]

export const initialProductsBottomSiteRow: ProductsBottomSiteRow = {
  name: 'نام',
  url: 'پیوند',
}

export const initialProductsBottomSiteColumn: ProductsBottomSiteColumn = [initialProductsBottomSiteRow]

export const initialProductsBottomSiteMenu: ProductsBottomSiteMenu = [initialProductsBottomSiteColumn]
