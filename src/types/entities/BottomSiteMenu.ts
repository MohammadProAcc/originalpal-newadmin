export interface BottomSiteRow {
  title: string
  href: string
  bold?: boolean
}

export interface BottomSiteColumn {
  title: string
  href: string
  rows: BottomSiteRow[]
}

export interface BottomSiteMenu {
  colomns: BottomSiteColumn[]
}
