export class InvalidInputException extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputException';
  }
}
