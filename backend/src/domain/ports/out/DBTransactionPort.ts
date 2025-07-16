export interface DBTransactionPort {
  createTransaction<T>(fn: (t?: unknown) => Promise<T>): Promise<T>;
}
