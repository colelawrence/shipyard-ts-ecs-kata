export class GridRender {
  private cellWidth: number;
  private cellHeight: number;
  constructor(
    private ctx: CanvasRenderingContext2D,
    private gridWidth: number,
    private gridHeight: number
  ) {
    this.cellWidth = ctx.canvas.width / gridWidth;
    this.cellHeight = ctx.canvas.height / gridHeight;
  }

  draw(posX: number, posY: number, character: string, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${this.cellHeight}px sans-serif`;
    this.ctx.fillText(
      character,
      posX * this.cellWidth,
      posY * this.cellHeight,
      this.cellWidth // max width
    );
  }

  fillAll(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
