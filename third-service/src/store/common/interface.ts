export interface sendMessageParams {
  mobile: String;
}
export interface LoginForm {
  mobile: String;
  validCode: String;
}
export interface ModalData {
  show?: boolean;
  title?: string;
  content?: string;
  subTitle?: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelActive?: boolean;
  confirmActive?: boolean;
  showConfirm?: boolean;
  confirmText?: string;
  clickCancel?: () => void;
  clickConfirm?: () => void;
}
