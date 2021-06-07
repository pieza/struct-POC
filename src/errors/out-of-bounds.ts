export class OutOfBoundsError extends Error {

  constructor(x: any, y: any) {
    super(`Coordinates [${x}, ${y}] are out of bounds.`)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OutOfBoundsError.prototype);
  }
}