export class OutOfBoundsError extends Error {

  constructor(y: number, x: number) {
    super(`Coordinates [${x}, ${y}] are out of bounds.`)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, OutOfBoundsError.prototype);
  }
}