export interface TopSiteRow {
  name: string;
  href: string;
  bold?: boolean;
}

export interface TopSiteColumn {
  columnTitle: string;
  href: string;
  highlight?: boolean;
  thumb?: any;
  footer?: TopSiteRow;
  rows: TopSiteRow[];
}

export interface TopSiteMenu {
  menuTitle: string;
  href: string;
  bold?: boolean;
  footer?: boolean;
  columns: TopSiteColumn[];
}

export const initialTopSiteMenu: TopSiteMenu = {
  menuTitle: "بخش ۱",
  href: "",
  bold: false,
  columns: [
    {
      columnTitle: "ستون ۱",
      href: "",
      thumb: "",
      highlight: false,
      rows: [
        {
          name: "لینک ۱",
          href: "",
          bold: false,
        },
      ],
      footer: {
        name: "پاروقی ۱",
        href: "",
        bold: false,
      },
    },
  ],
};

export const initialTopSiteMenuColumn = {
  columnTitle: "ستون جدید",
  href: "/",
  thumb: "",
  highlight: false,
  rows: [
    {
      name: "لینک",
      href: "/",
      bold: false,
    },
  ],
  footer: {
    name: "نام پاورقی",
    href: "",
    bold: false,
  },
};

export const initialTopSiteMenuColumnRow = {
  name: "",
  href: "",
  bold: false,
};
