const WIDTH = 500;
const HEIGHT = 500;

const image = new Image(WIDTH, HEIGHT);

document.image = image;

for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    image.drawPixel(x, y, {
      r: (x / WIDTH) * 256,
      g: (y / HEIGHT) * 256,
      b: 0,
    });
  }
}

image.renderTo(document.querySelector('body'));
