export const FONT_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium', 
  LARGE: 'large',
  EXTRA_LARGE: 'extra_large'
} as const

export type FontSizeType = typeof FONT_SIZE[keyof typeof FONT_SIZE]

export const fontSize = (size?: FontSizeType): number => {
  switch (size) {
    case FONT_SIZE.SMALL:
      return 12
    case FONT_SIZE.MEDIUM:
      return 14
    case FONT_SIZE.LARGE:
      return 18
    case FONT_SIZE.EXTRA_LARGE:
      return 22
    default:
      return 16 // Default font size
  }
}

