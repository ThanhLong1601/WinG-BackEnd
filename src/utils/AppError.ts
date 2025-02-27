export class AppError extends Error {
  statusCode: number;
  data: string | null;

  constructor({ message, status, data = null }: { message: string; status: number; data?: string | null }) {
    super(message);
    this.statusCode = status;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}
