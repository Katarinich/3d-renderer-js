class RayTracer {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;
  }

  tracedValueAtPixel(x, y) {
    const xt = x / this.width;
    const yt = (this.height - y - 1) / this.height;

    const top = Vector.linearInterpolation(
      this.scene.imagePlane.topLeft,
      this.scene.imagePlane.topRight,
      xt
    );

    const bottom = Vector.linearInterpolation(
      this.scene.imagePlane.bottomLeft,
      this.scene.imagePlane.bottomRight,
      xt
    );

    const point = Vector.linearInterpolation(bottom, top, yt);
    const ray = new Ray(point, point.subtract(this.scene.camera));

    return new Color(
      (ray.direction.x + 1.2) / 2.6,
      (ray.direction.y + 0.9) / 2,
      ray.direction.z / -6
    );
  }
}

const WIDTH = 500;
const HEIGHT = 500;

const SCENE = {
  camera: new Vector(0, 0, 2),
  imagePlane: {
    topLeft: new Vector(-1.28, 0.86, -0.5),
    topRight: new Vector(1.28, 0.86, -0.5),
    bottomLeft: new Vector(-1.28, -0.86, -0.5),
    bottomRight: new Vector(1.28, -0.86, -0.5),
  },
};

const image = new Image(WIDTH, HEIGHT);

document.image = image;

const imageColorFromColor = (color) => ({
  r: Math.floor(color.r * 255),
  g: Math.floor(color.g * 255),
  b: Math.floor(color.b * 255),
});

const tracer = new RayTracer(SCENE, WIDTH, HEIGHT);

// fill image with color
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    image.drawPixel(x, y, imageColorFromColor(tracer.tracedValueAtPixel(x, y)));
  }
}

image.renderTo(document.querySelector('body'));
