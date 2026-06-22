export class ApiResponse {
  success: boolean;
  message: string;
  data: any;

  constructor(statusCode: number, message: string, data: any) {
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
  }
}