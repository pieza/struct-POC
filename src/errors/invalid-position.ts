export class InvalidActionError extends Error {

  constructor(m: string) {
    super(m)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidActionError.prototype);
  }
}