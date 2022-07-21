export class ErrorHandler extends Error {
    message: string;
    status: number;
    constructor( message: string, status: number) {
      super(message);
      this.message =  message
      this.status = status
    }
  }
  
export interface ErrorHandlerProps extends Error {
    status: number;
    message: string;
}