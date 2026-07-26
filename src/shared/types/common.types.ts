export interface BackendErrorResponse {
  success: boolean;
  error?: {
    code: number;
    httpCode: number;
    message: string;
  };
  snackbar?: {
    type: string;
    message: string;
  };
}
