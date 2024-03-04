export interface GameObject {
  init?: () => void,
  draw: (g: CanvasRenderingContext2D) => void
}
