export interface BottomSiteDescription {
  title: string
  paragraphs: string[]
}

export type BottomSiteDescriptionMenu = BottomSiteDescription[]

export const initialBottomSiteDescription: BottomSiteDescription = {
  title: 'عنوان بخش',
  paragraphs: ['بند اول'],
}
