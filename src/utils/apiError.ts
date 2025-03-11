export interface ApiErrorParams {
  message: string;
  status: number;
  data?: any;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor({ message, status, data = null }: ApiErrorParams) {
    super(message);
    this.status = status;
    this.data = data;
  }
}