export class Unauthorized extends Error {
  constructor() {
    super("User is not logged in");
  }
}
