class Sphere {
  constructor(center, radius, color) {
    this.center = center;
    this.radius = radius;
    this.color = color;
  }

  getIntersection(ray) {
    // here we need to find if the ray is intersections with the shape
    // we need to solve the equation at^2 + bt + c = 0 and find t
    // where "a" is the squared direction of the ray
    // where "b" is a product of the direction of the ray and cp doubled
    // where "cp" is origin of the ray minus center of the sphere
    // and where "c" is squared cp

    const cp = ray.origin.subtract(this.center);

    const a = ray.direction.dotProduct(ray.direction);
    const b = 2 * cp.dotProduct(ray.direction);
    const c = cp.dotProduct(cp) - this.radius * this.radius;

    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      // if discriminant is less than 0, then no intersection
      return null;
    }

    // now we need to find the root of the equation
    // which is (-b (+/-) sqrt(discriminant)) / 2a

    const discriminantSqrt = Math.sqrt(discriminant);

    const equationRoots = [];

    const firstRoot = (-b - discriminantSqrt) / (2 * a);

    if (firstRoot >= 0) {
      equationRoots.push(firstRoot);
    }

    const secondRoot = (-b + discriminantSqrt) / (2 * a);

    if (secondRoot >= 0) {
      equationRoots.push(secondRoot);
    }

    if (equationRoots.length == 0) {
      return null;
    }

    // if there is two root we need to get the smallest one, 
    // as it means what ray comes through the sphere and we need to get the closest one
    return Math.min.apply(null, equationRoots);
  }
}
