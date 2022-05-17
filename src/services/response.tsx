export class Response {
  isSuccess: boolean;
  message: string;
  data: any;

  constructor(isSuccess: boolean, message: string, data: any) {
      this.isSuccess = isSuccess;
      this.message = message;
      this.data = data
  }
}
