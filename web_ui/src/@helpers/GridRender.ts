import { ui } from "src/executor";

export class GridRender {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(posX: number, posY: number, renderable: ui.Renderable) {
    const imageElt = document.getElementById(renderable.imageID);
    if (imageElt instanceof HTMLImageElement) {
      this.ctx.drawImage(
        imageElt,
        posX - renderable.origin_x,
        posY - renderable.origin_y,
        renderable.width,
        renderable.height
      );
    }
  }

  fillAll(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}
