export class TokenNotFoundError extends Error {

  constructor(tokenId: string) {
    super(`Token ${tokenId} can't be found on the board.`)
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, TokenNotFoundError.prototype);
  }
}