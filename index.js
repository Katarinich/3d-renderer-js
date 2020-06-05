function min(array, fn) {
  if (array.length == 0) {
    return null;
  }

  let minValue = Infinity;
  let minElement = null;

  for (let x of array) {
    const value = fn(x);

    if (value < minValue) {
      minValue = value;
      minElement = x;
    }
  }

  return minElement;
}

class RayTracer {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;
  }

  tracedValueAtPixel(x, y) {
    const ray = this.getRayForPixel(x, y);

    // now we need to find all of the intersections for the ray
    const intersections = this.scene.objects
      .map((obj) => ({ object: obj, t: obj.getIntersection(ray) }))
      .filter((intersection) => intersection.t);

    // if there are more than one intersection we need to get with the smallest t as the closest
    const intersection = min(intersections, (intersection) => intersection.t);

    if(x === 255) {
      console.log(intersection)
    }

    if (!intersection) {
      // if no intersection at all, the pixel is black
      return new Color(0, 0, 0);
    }

    return intersection.object.color;
  }

  getRayForPixel(x, y) {
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

    return new Ray(point, point.subtract(this.scene.camera));
  }
}

const WIDTH = 256;
const HEIGHT = 192;

const SCENE = {
  camera: new Vector(0, 0, 2),
  imagePlane: {
    topLeft: new Vector(-1.28, 0.86, -0.5),
    topRight: new Vector(1.28, 0.86, -0.5),
    bottomLeft: new Vector(-1.28, -0.86, -0.5),
    bottomRight: new Vector(1.28, -0.86, -0.5),
  },
  objects: [
    new Sphere(new Vector(-1.1, 0.6, -1), 0.2, new Color(0, 0, 1)),
    new Sphere(new Vector(0.2, -0.1, -1), 0.5, new Color(1, 0, 0)),
    new Sphere(new Vector(1.2, -0.5, -1.75), 0.4, new Color(0, 1, 0)),
  ],
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
    image.drawPixel(y, x, imageColorFromColor(tracer.tracedValueAtPixel(x, y)));
  }
}

image.renderTo(document.querySelector('body'));
