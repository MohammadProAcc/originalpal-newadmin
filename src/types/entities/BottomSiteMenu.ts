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
  columns: BottomSiteColumn[]
}

export const initialBottomSiteRow: BottomSiteRow = {
  title: '',
  href: '',
  bold: false,
}

export const initialBottomSiteColumn: BottomSiteColumn = {
  title: '',
  href: '',
  rows: [
    {
      title: '',
      href: '',
      bold: false,
    },
  ],
}

export const initialBottomSiteMenu: BottomSiteMenu = {
  columns: [initialBottomSiteColumn],
}
