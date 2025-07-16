export class PaymentError extends Error {
  constructor(message = 'Unexpected Payment Error') {
    super(message);
    this.name = 'PaymentError';
  }
}
