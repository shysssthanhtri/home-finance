export class Forbidden extends Error {
  constructor() {
    super("User is not allowed");
  }
}
