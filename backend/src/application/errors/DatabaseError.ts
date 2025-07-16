export class DatabaseError extends Error {
  constructor(message = 'Unexpected Database Error') {
    super(message);
    this.name = 'DatabaseError';
  }
}
