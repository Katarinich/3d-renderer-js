export default class Vector {
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
}
