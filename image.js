class Image {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.canvas = this.createCanvas();
  }

  createCanvas() {
    const canvas = document.createElement('canvas');

    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);

    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.width, this.height);
    const pixels = imageData.data;

    return {
      canvas,
      context,
      imageData,
      pixels,
    };
  }

  drawPixel(y, x, color) {
    const offset = (y * this.width + x) * 4;

    this.canvas.pixels[offset] = color.r | 0;
    this.canvas.pixels[offset + 1] = color.g | 0;
    this.canvas.pixels[offset + 2] = color.b | 0;
    this.canvas.pixels[offset + 3] = 255;
  }

  renderTo(element) {
    this.canvas.context.putImageData(this.canvas.imageData, 0, 0);

    element.appendChild(this.canvas.canvas);
  }
}
