import type { toastProps } from "../types/ToastProps";

type func = (args: toastProps) => void;
class ToastService {
  _sendNotification: func | null = null;

  _registerNotification(fn: func) {
    if (fn) {
      this._sendNotification = fn;
    }
  }

  _startNotification(data: toastProps) {
    if (this._sendNotification) {
      this._sendNotification(data);
    }
  }
}

const toastObj = new ToastService();
export default toastObj;
