export class BadRequestError extends Error {
  constructor(message = 'Invalid Data') {
    super(message);
    this.name = 'BadRequestError';
  }
}
