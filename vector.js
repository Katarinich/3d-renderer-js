class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector) {
    const { x, y, z } = vector;

    return new Vector(this.x + x, this.y + y, this.z + z);
  }

  subtract(vector) {
    const { x, y, z } = vector;

    return new Vector(this.x - x, this.y - y, this.z - z);
  }

  scale(number) {
    return new Vector(this.x * number, this.y * number, this.z * number);
  }

  dotProduct(vector) {
    const { x, y, z } = vector;

    return this.x * x + this.y * y + this.z * z;
  }

  static linearInterpolation(startVector, endVector, alpha) {
    return startVector.scale(1 - alpha).add(endVector.scale(alpha));
  }
}
