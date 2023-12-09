export interface ISnackbarConfig {
  isOpen: boolean;
  type: 'error' | 'warning' | 'info' | 'success';
  timeOut: number;
  message: string;
}
