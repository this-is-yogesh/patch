import React, { createContext, useCallback, useState, useEffect } from "react";
import Toast from "../components/Toast";
import "../styles/toast.css";
import toastObj from "../services/ToastService";

type ContextProps = {
  children: React.ReactNode;
};
type NotificationKeys = "success" | "info" | "danger";
type toastProps = {
  position: string;
  type: NotificationKeys;
  title: string;
  desc: string;
  id?: number;
  exiting?: boolean;
};
type ToastContextType = {
  addNotification: (args: toastProps) => void;
  onUpdate: (id: number) => void;
  onRemove: (id: number) => void;
};
export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

function ToastProvider({ children }: ContextProps) {
  const [toasts, setToasts] = useState<toastProps[]>([]);
  const [sample, setSample] = useState<boolean>(false);

  useEffect(() => {
    toastObj._registerNotification(addNotification);
  }, []);
  const addNotification = useCallback(
    (obj: toastProps) => {
      let id = new Date().getTime();
      setToasts(prev => {
        let a = [{ ...obj, id }, ...prev];
        return a;
      });
    },
    [sample]
  );

  let component = function toastContainer() {
    let positionData = toasts?.[0]?.position || "top-right";
    return (
      <div data-position={positionData} className="toast-container">
        {toasts.map(t => (
          <Toast {...t} key={t.id} />
        ))}
      </div>
    );
  };

  function onUpdate(id: number) {
    setToasts(prev => {
      return prev.map(toast => {
        if (toast.id === id) {
          return { ...toast, exiting: true };
        } else {
          return { ...toast, exiting: false };
        }
      });
    });
  }
  function onRemove(id: number) {
    setToasts(prev => {
      return prev.filter(toast => {
        if (toast.id === id) {
          return false;
        } else {
          return true;
        }
      });
    });
  }
  return (
    <ToastContext.Provider value={{ addNotification, onUpdate, onRemove }}>
      <div>{children}</div>
      <div>{component()}</div>
    </ToastContext.Provider>
  );
}

export default ToastProvider;
