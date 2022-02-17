import { css, keyframes } from 'styled-components'

export enum Devices {
  xs = 'min-width: 380px',
  sm = 'min-width: 600px',
  md = 'min-width: 960px',
  lg = 'min-width: 1280px',
  xl = 'min-width: 1600px',
}

export enum PureBreakPoints {
  xs = 380,
  sm = 600,
  md = 960,
  lg = 1280,
  xl = 1600,
}

export enum BreakPoints {
  xs = '380px',
  sm = '600px',
  md = '960px',
  lg = '1280px',
  xl = '1600px',
}

export enum Colors {
  black = '#000000',
  white = '#ffffff',
  background = '#f5f6f6',
  backgroundSecondary = '#f7f7f7',
  gold = '#ede734',
  gray = '#363738',
  grayDark = '#767677',
  grayBorder = '#d3d7da',
  grayBorderLight = '#e9ecef',
  grayBackground = '#e9ecef',
  grayDarkBackground = '#363738',
  grayLightBackground = '#e9ecef',
  green = '#2ada71',
  MaterialRed = '#b0003a',
  MaterialBlue = '#1976D2',
  Danger = '#ff3d71',
}

export enum ZIndex {
  min = '1',
  modal = '1',
  modalBackdrop = '2',
  modalContent = '3',
  sidebar = '1',
  menu = '1',
  filterBox = '1',
  filterLabel = '2',
  filterBoxActive = '3',
  filterLabeActive = '4',
  navigationButton = '1',
  searchbar = '1',
  singleProductFloatAside = '1',
  singleProductFloatAsideIllu = '1',
  singleProductReviewBar = '1',
  wishlist = '1',
  commentsOverlayer = '1',
  commentsForm = '1',
  loadingScreen = '2',
  slideContent = '1',
  singleMediaThumbnails = '1',
  singleMediaNavButton = '1',
  splashScreen = '1',
  closeButton = '1',
  floatNavbar = '5',
  rangeInput = '1',
  max = '6',
}

export const SHideScrollbar = css`
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`

export const SAdjustBackgroundImage = css`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

export const SHideNumberInputArrows = css`
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  /* [type=number] { */
  // -moz-appearance: textfield;
  /* } */
`

export const SlideInFromTop = keyframes`
  from {
    top: -5.625rem;
    
    @media(${Devices.md}) {
      top: -6.875rem;
    }
  }

  to {
    top: 0;
  }
  
`

export const SlideOutToTop = keyframes`
  from {
    top: 0;
  }

  to {
    top: -6.875rem;    
  }
  
`
